create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'hi' check (preferred_language in ('hi', 'ur')),
  privacy_level text not null default 'private' check (privacy_level in ('public', 'friends', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cards (
  id text primary key,
  cz text not null,
  en text not null,
  hi text not null,
  ur text not null,
  sentence text not null,
  sentence_en text not null default '',
  level text not null check (level in ('a2', 'b1')),
  tags text[] not null default '{}',
  source text not null default 'seed' check (source in ('seed', 'legacy-web')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_cards (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null references public.cards(id) on delete cascade,
  known_streak integer not null default 0,
  again_count integer not null default 0,
  due_at timestamptz not null default now(),
  seen integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  grade text not null check (grade in ('again', 'hard', 'good', 'easy')),
  reviewed_at timestamptz not null,
  was_new boolean not null default false,
  next_due_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.daily_streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_completed_on date,
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  progress_on date not null,
  reviewed integer not null default 0,
  new_cards integer not null default 0,
  goal integer not null default 30,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, progress_on)
);

create table if not exists public.custom_cards (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  cz text not null,
  en text not null,
  hi text not null,
  ur text not null,
  sentence text not null,
  sentence_en text not null default '',
  level text not null default 'a2' check (level in ('a2', 'b1')),
  tags text[] not null default '{custom}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint friendships_not_self check (requester_id <> addressee_id),
  constraint friendships_unique_pair unique (requester_id, addressee_id)
);

create table if not exists public.notification_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  platform text not null check (platform in ('ios', 'android', 'web')),
  token text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, token)
);

create table if not exists public.notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  daily_reminder_enabled boolean not null default false,
  daily_reminder_time time not null default '19:00',
  streak_risk_enabled boolean not null default true,
  review_due_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.sync_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  local_id bigint not null,
  event_type text not null,
  payload jsonb not null,
  created_at_ms bigint not null,
  received_at timestamptz not null default now(),
  unique (user_id, local_id)
);

create index if not exists cards_level_idx on public.cards(level);
create index if not exists cards_tags_idx on public.cards using gin(tags);
create index if not exists reviews_user_reviewed_idx on public.reviews(user_id, reviewed_at desc);
create index if not exists daily_progress_user_date_idx on public.daily_progress(user_id, progress_on desc);
create index if not exists friendships_addressee_idx on public.friendships(addressee_id, status);
create index if not exists sync_events_user_idx on public.sync_events(user_id, received_at desc);

create or replace function public.recalculate_daily_streak(target_user_id uuid)
returns public.daily_streaks
language plpgsql
security definer
set search_path = public
as $$
declare
  completed_days date[];
  day_item date;
  previous_day date;
  current_count integer := 0;
  longest_count integer := 0;
  tail_count integer := 0;
  last_day date;
  result public.daily_streaks;
begin
  select coalesce(array_agg(progress_on order by progress_on), '{}')
    into completed_days
  from public.daily_progress
  where user_id = target_user_id and completed = true;

  foreach day_item in array completed_days loop
    if previous_day is null or day_item = previous_day + 1 then
      current_count := current_count + 1;
    else
      current_count := 1;
    end if;
    longest_count := greatest(longest_count, current_count);
    previous_day := day_item;
    last_day := day_item;
  end loop;

  if last_day is not null and (last_day = current_date or last_day = current_date - 1) then
    tail_count := current_count;
  else
    tail_count := 0;
  end if;

  insert into public.daily_streaks (user_id, current_streak, longest_streak, last_completed_on, updated_at)
  values (target_user_id, tail_count, longest_count, last_day, now())
  on conflict (user_id) do update set
    current_streak = excluded.current_streak,
    longest_streak = excluded.longest_streak,
    last_completed_on = excluded.last_completed_on,
    updated_at = excluded.updated_at
  returning * into result;

  return result;
end;
$$;

create or replace function public.recalculate_daily_streak_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.completed = true then
    perform public.recalculate_daily_streak(new.user_id);
  end if;
  return new;
end;
$$;

drop trigger if exists daily_progress_recalculate_streak on public.daily_progress;
create trigger daily_progress_recalculate_streak
after insert or update of completed on public.daily_progress
for each row execute function public.recalculate_daily_streak_trigger();

alter table public.profiles enable row level security;
alter table public.cards enable row level security;
alter table public.user_cards enable row level security;
alter table public.reviews enable row level security;
alter table public.daily_streaks enable row level security;
alter table public.daily_progress enable row level security;
alter table public.custom_cards enable row level security;
alter table public.friendships enable row level security;
alter table public.notification_tokens enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.sync_events enable row level security;

create policy "profiles are self readable" on public.profiles for select using (auth.uid() = user_id);
create policy "profiles are self writable" on public.profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "seed cards are public" on public.cards for select using (true);

create policy "user cards are self owned" on public.user_cards for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "reviews are self owned" on public.reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "daily streaks are self readable" on public.daily_streaks for select using (auth.uid() = user_id);
create policy "daily progress is self owned" on public.daily_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "custom cards are self owned" on public.custom_cards for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notification tokens are self owned" on public.notification_tokens for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notification preferences are self owned" on public.notification_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sync events are self owned" on public.sync_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "friendships are visible to participants" on public.friendships
  for select using (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "friend requests can be created by requester" on public.friendships
  for insert with check (auth.uid() = requester_id);

create policy "friendships can be updated by participants" on public.friendships
  for update using (auth.uid() = requester_id or auth.uid() = addressee_id)
  with check (auth.uid() = requester_id or auth.uid() = addressee_id);
