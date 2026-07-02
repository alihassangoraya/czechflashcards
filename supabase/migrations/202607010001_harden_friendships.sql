create extension if not exists pgcrypto;

create or replace function public.generate_friend_code()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  code text;
begin
  loop
    code := lower(substr(encode(gen_random_bytes(6), 'hex'), 1, 8));
    exit when not exists (select 1 from public.profiles where friend_code = code);
  end loop;
  return code;
end;
$$;

create or replace function public.ensure_profile()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  code text;
begin
  if auth.uid() is null then
    raise exception 'You must be signed in.';
  end if;

  insert into public.profiles (user_id, display_name, friend_code)
  values (auth.uid(), '', public.generate_friend_code())
  on conflict (user_id) do nothing;

  update public.profiles
  set friend_code = public.generate_friend_code(), updated_at = now()
  where user_id = auth.uid() and coalesce(trim(friend_code), '') = '';

  select friend_code into code from public.profiles where user_id = auth.uid();
  return code;
end;
$$;

create or replace function public.create_profile_for_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name, friend_code)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''), public.generate_friend_code())
  on conflict (user_id) do nothing;
  return new;
end;
$$;

update public.profiles
set friend_code = lower(regexp_replace(friend_code, '[^a-zA-Z0-9]', '', 'g')), updated_at = now()
where friend_code is not null and friend_code <> lower(regexp_replace(friend_code, '[^a-zA-Z0-9]', '', 'g'));

update public.profiles
set friend_code = public.generate_friend_code(), updated_at = now()
where coalesce(trim(friend_code), '') = '';

create or replace function public.send_friend_request(target_friend_code text)
returns public.friendships
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_code text := regexp_replace(lower(trim(target_friend_code)), '[^a-z0-9]', '', 'g');
  target_id uuid;
  result public.friendships;
begin
  if auth.uid() is null then raise exception 'You must be signed in.'; end if;
  if coalesce(normalized_code, '') = '' then raise exception 'Enter a friend code.'; end if;
  perform public.ensure_profile();

  select user_id into target_id from public.profiles where friend_code = normalized_code;
  if target_id is null then raise exception 'Friend code not found.'; end if;
  if target_id = auth.uid() then raise exception 'You cannot add yourself.'; end if;

  select * into result from public.friendships
  where (requester_id = auth.uid() and addressee_id = target_id) or (requester_id = target_id and addressee_id = auth.uid())
  order by updated_at desc limit 1;

  if result.id is not null and result.status = 'accepted' then return result; end if;
  if result.id is not null and result.status = 'blocked' then raise exception 'This friendship is unavailable.'; end if;
  if result.id is not null and result.requester_id = target_id then
    update public.friendships set status = 'accepted', updated_at = now() where id = result.id returning * into result;
    return result;
  end if;
  if result.id is not null then return result; end if;

  insert into public.friendships (requester_id, addressee_id) values (auth.uid(), target_id) returning * into result;
  return result;
end;
$$;

drop function if exists public.friend_requests();

create or replace function public.friend_requests()
returns table (id uuid, friend_code text, display_name text, created_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select f.id, p.friend_code, p.display_name, f.created_at
  from public.friendships f
  join public.profiles p on p.user_id = f.requester_id
  where f.addressee_id = auth.uid() and f.status = 'pending'
  order by f.created_at desc;
$$;

create or replace function public.respond_to_friend_request(request_id uuid, accept_request boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if accept_request then
    update public.friendships set status = 'accepted', updated_at = now()
    where id = request_id and addressee_id = auth.uid() and status = 'pending';
  else
    delete from public.friendships where id = request_id and addressee_id = auth.uid() and status = 'pending';
  end if;
  if not found then raise exception 'Friend request not found.'; end if;
end;
$$;

drop function if exists public.friend_streaks();

create or replace function public.friend_streaks()
returns table (friend_code text, display_name text, current_streak integer, longest_streak integer, last_completed_on date, privacy_level text, status text)
language sql
security definer
set search_path = public
as $$
  select p.friend_code, p.display_name,
    case when f.status = 'accepted' and p.privacy_level in ('friends', 'public') then ds.current_streak else null end,
    case when f.status = 'accepted' and p.privacy_level in ('friends', 'public') then ds.longest_streak else null end,
    case when f.status = 'accepted' and p.privacy_level in ('friends', 'public') then ds.last_completed_on else null end,
    p.privacy_level,
    f.status
  from public.friendships f
  join public.profiles p on p.user_id = case when f.requester_id = auth.uid() then f.addressee_id else f.requester_id end
  left join public.daily_streaks ds on ds.user_id = p.user_id
  where (f.requester_id = auth.uid() or f.addressee_id = auth.uid()) and (f.status = 'accepted' or (f.status = 'pending' and f.requester_id = auth.uid()))
  order by f.status, p.display_name nulls last, p.friend_code;
$$;

grant execute on function public.ensure_profile() to authenticated;
revoke all on function public.generate_friend_code() from public;
grant execute on function public.send_friend_request(text) to authenticated;
grant execute on function public.friend_requests() to authenticated;
grant execute on function public.respond_to_friend_request(uuid, boolean) to authenticated;
grant execute on function public.friend_streaks() to authenticated;
