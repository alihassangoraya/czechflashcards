create or replace function public.send_friend_request(target_friend_code text)
returns public.friendships language plpgsql security definer set search_path = public as $$
declare target_id uuid; result public.friendships;
begin
  select user_id into target_id from public.profiles where friend_code = lower(trim(target_friend_code));
  if target_id is null then raise exception 'Friend code not found'; end if;
  if target_id = auth.uid() then raise exception 'You cannot add yourself'; end if;
  select * into result from public.friendships
    where (requester_id = auth.uid() and addressee_id = target_id) or (requester_id = target_id and addressee_id = auth.uid())
    limit 1;
  if result.id is not null then return result; end if;
  insert into public.friendships (requester_id, addressee_id) values (auth.uid(), target_id) returning * into result;
  return result;
end;
$$;

create or replace function public.friend_requests()
returns table (id uuid, friend_code text, display_name text)
language sql security definer set search_path = public as $$
  select f.id, p.friend_code, p.display_name
  from public.friendships f join public.profiles p on p.user_id = f.requester_id
  where f.addressee_id = auth.uid() and f.status = 'pending';
$$;

create or replace function public.respond_to_friend_request(request_id uuid, accept_request boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.friendships
  set status = case when accept_request then 'accepted' else 'blocked' end, updated_at = now()
  where id = request_id and addressee_id = auth.uid() and status = 'pending';
  if not found then raise exception 'Friend request not found'; end if;
end;
$$;

grant execute on function public.friend_requests() to authenticated;
grant execute on function public.respond_to_friend_request(uuid, boolean) to authenticated;
