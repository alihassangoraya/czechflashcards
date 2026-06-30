alter table public.cards
  add column if not exists pronunciation text not null default '',
  add column if not exists synonyms text not null default '',
  add column if not exists antonyms text not null default '',
  add column if not exists grammar jsonb,
  add column if not exists google_category text not null default '',
  add column if not exists seed_version text not null default '';

create index if not exists cards_google_category_idx on public.cards(google_category);
create index if not exists cards_seed_version_idx on public.cards(seed_version);
