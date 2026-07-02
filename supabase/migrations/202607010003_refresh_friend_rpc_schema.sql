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

grant execute on function public.friend_requests() to authenticated;

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

grant execute on function public.friend_streaks() to authenticated;
notify pgrst, 'reload schema';
