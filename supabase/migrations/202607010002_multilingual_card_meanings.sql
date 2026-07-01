alter table public.cards add column if not exists cs text not null default '';
alter table public.cards add column if not exists uk text not null default '';
alter table public.custom_cards add column if not exists cs text not null default '';
alter table public.custom_cards add column if not exists uk text not null default '';

create or replace function public.apply_sync_event()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  event_state jsonb := new.payload -> 'state';
  event_review jsonb := new.payload -> 'event';
  event_card jsonb := new.payload -> 'card';
  event_settings jsonb := new.payload -> 'settings';
  event_day date := coalesce(new.payload ->> 'date', current_date::text)::date;
  event_deck jsonb;
begin
  if new.event_type = 'review_recorded' then
    insert into public.user_cards (user_id, card_id, known_streak, again_count, due_at, seen, updated_at)
    values (new.user_id, event_state ->> 'cardId', (event_state ->> 'knownStreak')::integer, (event_state ->> 'againCount')::integer, to_timestamp((event_state ->> 'dueAt')::bigint / 1000.0), (event_state ->> 'seen')::integer, now())
    on conflict (user_id, card_id) do update set known_streak = excluded.known_streak, again_count = excluded.again_count, due_at = excluded.due_at, seen = excluded.seen, updated_at = now();
    insert into public.reviews (user_id, card_id, grade, reviewed_at, was_new, next_due_at)
    values (new.user_id, event_review ->> 'cardId', event_review ->> 'grade', to_timestamp((event_review ->> 'reviewedAt')::bigint / 1000.0), coalesce((event_review ->> 'wasNew')::boolean, false), to_timestamp((event_review ->> 'nextDueAt')::bigint / 1000.0));
    insert into public.daily_progress (user_id, progress_on, reviewed, new_cards, goal, completed)
    values (new.user_id, event_day, 1, case when coalesce((event_review ->> 'wasNew')::boolean, false) then 1 else 0 end, (new.payload ->> 'dailyGoal')::integer, false)
    on conflict (user_id, progress_on) do update set reviewed = public.daily_progress.reviewed + 1, new_cards = public.daily_progress.new_cards + excluded.new_cards, goal = excluded.goal, completed = public.daily_progress.reviewed + 1 >= excluded.goal, updated_at = now();
  elsif new.event_type = 'custom_card_upserted' then
    insert into public.custom_cards (id, user_id, cz, en, cs, hi, ur, uk, sentence, sentence_en, level, tags, deleted_at, updated_at)
    values (event_card ->> 'id', new.user_id, event_card ->> 'cz', event_card ->> 'en', coalesce(event_card ->> 'cs', ''), event_card ->> 'hi', event_card ->> 'ur', coalesce(event_card ->> 'uk', ''), event_card ->> 'sentence', coalesce(event_card ->> 'sentenceEn', ''), event_card ->> 'level', array(select jsonb_array_elements_text(event_card -> 'tags')), null, now())
    on conflict (user_id, id) do update set cz = excluded.cz, en = excluded.en, cs = excluded.cs, hi = excluded.hi, ur = excluded.ur, uk = excluded.uk, sentence = excluded.sentence, sentence_en = excluded.sentence_en, level = excluded.level, tags = excluded.tags, deleted_at = null, updated_at = now();
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
    update public.user_decks set deleted_at = now(), updated_at = now() where user_id = new.user_id and id not in (select value ->> 'id' from jsonb_array_elements(coalesce(event_settings -> 'customDecks', '[]'::jsonb)) as value);
    for event_deck in select * from jsonb_array_elements(coalesce(event_settings -> 'customDecks', '[]'::jsonb)) loop
      insert into public.user_decks (id, user_id, name, deleted_at, updated_at)
      values (event_deck ->> 'id', new.user_id, event_deck ->> 'name', null, now())
      on conflict (user_id, id) do update set name = excluded.name, deleted_at = null, updated_at = now();
    end loop;
  elsif new.event_type = 'deck_card_added' then
    insert into public.user_deck_cards (user_id, deck_id, card_id, added_at)
    values (new.user_id, new.payload ->> 'deckId', new.payload ->> 'cardId', to_timestamp((new.payload ->> 'addedAt')::bigint / 1000.0))
    on conflict (user_id, deck_id, card_id) do update set added_at = excluded.added_at;
  elsif new.event_type = 'deck_card_removed' then
    delete from public.user_deck_cards where user_id = new.user_id and deck_id = new.payload ->> 'deckId' and card_id = new.payload ->> 'cardId';
  end if;
  return new;
end;
$$;
