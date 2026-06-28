alter table public.profiles add column if not exists friend_code text;
create unique index if not exists profiles_friend_code_unique on public.profiles(friend_code) where friend_code is not null;

-- The app can sync learner progress before an operator imports the public seed
-- cards into Supabase. The card ID remains stable, but must not block backup.
alter table public.user_cards drop constraint if exists user_cards_card_id_fkey;

create table if not exists public.saved_cards (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  saved_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.card_overrides (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.study_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.saved_cards enable row level security;
alter table public.card_overrides enable row level security;
alter table public.study_settings enable row level security;
create policy "saved cards are self owned" on public.saved_cards for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "card overrides are self owned" on public.card_overrides for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "study settings are self owned" on public.study_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.create_profile_for_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name, friend_code)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''), lower(substr(replace(new.id::text, '-', ''), 1, 8)))
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists auth_user_profile on auth.users;
create trigger auth_user_profile after insert on auth.users for each row execute function public.create_profile_for_user();
update public.profiles set friend_code = lower(substr(replace(user_id::text, '-', ''), 1, 8)) where friend_code is null;

create or replace function public.apply_sync_event()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  event_state jsonb := new.payload -> 'state';
  event_review jsonb := new.payload -> 'event';
  event_card jsonb := new.payload -> 'card';
  event_settings jsonb := new.payload -> 'settings';
  event_day date := coalesce(new.payload ->> 'date', current_date::text)::date;
begin
  if new.event_type = 'review_recorded' then
    insert into public.user_cards (user_id, card_id, known_streak, again_count, due_at, seen, updated_at)
    values (new.user_id, event_state ->> 'cardId', (event_state ->> 'knownStreak')::integer, (event_state ->> 'againCount')::integer,
      to_timestamp((event_state ->> 'dueAt')::bigint / 1000.0), (event_state ->> 'seen')::integer, now())
    on conflict (user_id, card_id) do update set known_streak = excluded.known_streak, again_count = excluded.again_count,
      due_at = excluded.due_at, seen = excluded.seen, updated_at = now();
    insert into public.reviews (user_id, card_id, grade, reviewed_at, was_new, next_due_at)
    values (new.user_id, event_review ->> 'cardId', event_review ->> 'grade', to_timestamp((event_review ->> 'reviewedAt')::bigint / 1000.0),
      coalesce((event_review ->> 'wasNew')::boolean, false), to_timestamp((event_review ->> 'nextDueAt')::bigint / 1000.0));
    insert into public.daily_progress (user_id, progress_on, reviewed, new_cards, goal, completed)
    values (new.user_id, event_day, 1, case when coalesce((event_review ->> 'wasNew')::boolean, false) then 1 else 0 end,
      (new.payload ->> 'dailyGoal')::integer, false)
    on conflict (user_id, progress_on) do update set reviewed = public.daily_progress.reviewed + 1,
      new_cards = public.daily_progress.new_cards + excluded.new_cards, goal = excluded.goal,
      completed = public.daily_progress.reviewed + 1 >= excluded.goal, updated_at = now();
  elsif new.event_type = 'custom_card_upserted' then
    insert into public.custom_cards (id, user_id, cz, en, hi, ur, sentence, sentence_en, level, tags, deleted_at, updated_at)
    values (event_card ->> 'id', new.user_id, event_card ->> 'cz', event_card ->> 'en', event_card ->> 'hi', event_card ->> 'ur',
      event_card ->> 'sentence', coalesce(event_card ->> 'sentenceEn', ''), event_card ->> 'level',
      array(select jsonb_array_elements_text(event_card -> 'tags')), null, now())
    on conflict (user_id, id) do update set cz = excluded.cz, en = excluded.en, hi = excluded.hi, ur = excluded.ur,
      sentence = excluded.sentence, sentence_en = excluded.sentence_en, level = excluded.level, tags = excluded.tags,
      deleted_at = null, updated_at = now();
  elsif new.event_type = 'custom_card_deleted' then
    update public.custom_cards set deleted_at = now(), updated_at = now() where user_id = new.user_id and id = new.payload ->> 'cardId';
  elsif new.event_type = 'card_correction_upserted' then
    insert into public.card_overrides (user_id, card_id, payload, updated_at) values (new.user_id, event_card ->> 'id', event_card, now())
    on conflict (user_id, card_id) do update set payload = excluded.payload, updated_at = now();
  elsif new.event_type = 'saved_card_added' then
    insert into public.saved_cards (user_id, card_id, saved_at) values (new.user_id, new.payload ->> 'cardId', to_timestamp((new.payload ->> 'savedAt')::bigint / 1000.0))
    on conflict (user_id, card_id) do update set saved_at = excluded.saved_at;
  elsif new.event_type = 'saved_card_removed' then
    delete from public.saved_cards where user_id = new.user_id and card_id = new.payload ->> 'cardId';
  elsif new.event_type = 'settings_updated' then
    insert into public.study_settings (user_id, payload, updated_at) values (new.user_id, event_settings, now())
    on conflict (user_id) do update set payload = excluded.payload, updated_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists sync_event_apply on public.sync_events;
create trigger sync_event_apply after insert on public.sync_events for each row execute function public.apply_sync_event();

create or replace function public.send_friend_request(target_friend_code text)
returns public.friendships language plpgsql security definer set search_path = public as $$
declare target_id uuid; result public.friendships;
begin
  select user_id into target_id from public.profiles where friend_code = lower(trim(target_friend_code));
  if target_id is null then raise exception 'Friend code not found'; end if;
  if target_id = auth.uid() then raise exception 'You cannot add yourself'; end if;
  insert into public.friendships (requester_id, addressee_id) values (auth.uid(), target_id)
  on conflict (requester_id, addressee_id) do update set status = 'pending', updated_at = now()
  returning * into result;
  return result;
end;
$$;

create or replace function public.friend_streaks()
returns table (friend_code text, display_name text, current_streak integer, privacy_level text)
language sql security definer set search_path = public as $$
  select p.friend_code, p.display_name, ds.current_streak, p.privacy_level
  from public.friendships f
  join public.profiles p on p.user_id = case when f.requester_id = auth.uid() then f.addressee_id else f.requester_id end
  left join public.daily_streaks ds on ds.user_id = p.user_id
  where f.status = 'accepted' and (f.requester_id = auth.uid() or f.addressee_id = auth.uid()) and p.privacy_level in ('friends', 'public');
$$;

grant execute on function public.send_friend_request(text) to authenticated;
grant execute on function public.friend_streaks() to authenticated;

create or replace function public.sync_snapshot()
returns jsonb language sql security definer set search_path = public as $$
  select jsonb_build_object(
    'user_cards', coalesce((select jsonb_agg(to_jsonb(uc)) from public.user_cards uc where uc.user_id = auth.uid()), '[]'::jsonb),
    'custom_cards', coalesce((select jsonb_agg(to_jsonb(cc)) from public.custom_cards cc where cc.user_id = auth.uid() and cc.deleted_at is null), '[]'::jsonb),
    'saved_cards', coalesce((select jsonb_agg(to_jsonb(sc)) from public.saved_cards sc where sc.user_id = auth.uid()), '[]'::jsonb),
    'card_overrides', coalesce((select jsonb_agg(to_jsonb(co)) from public.card_overrides co where co.user_id = auth.uid()), '[]'::jsonb),
    'settings', coalesce((select payload from public.study_settings ss where ss.user_id = auth.uid()), '{}'::jsonb)
  );
$$;

grant execute on function public.sync_snapshot() to authenticated;
