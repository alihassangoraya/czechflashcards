do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'profiles are readable to friendship participants') then
    create policy "profiles are readable to friendship participants" on public.profiles
      for select using (
        auth.uid() = user_id
        or exists (
          select 1 from public.friendships f
          where (f.requester_id = auth.uid() and f.addressee_id = profiles.user_id)
             or (f.addressee_id = auth.uid() and f.requester_id = profiles.user_id)
        )
      );
  end if;
end $$;

notify pgrst, 'reload schema';
