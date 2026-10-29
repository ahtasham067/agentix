-- Products shown on the public site. Anyone can read published rows; only the
-- service role (server side) can write.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (char_length(slug) between 2 and 60 and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 80),
  summary text not null check (char_length(summary) between 1 and 240),
  description text not null check (char_length(description) between 1 and 2000),
  tagline text check (char_length(tagline) <= 160),
  tags text[] not null default '{}' check (cardinality(tags) <= 10),
  stack text not null check (char_length(stack) between 1 and 120),
  category text not null check (category in ('ai-agents', 'web-apps', 'automation')),
  thumbnail text not null check (
    thumbnail in (
      'clinidesk', 'nexa-ai', 'autobuffy', 'meyamb', 'research-buddy', 'uphex', 'nizame-taleem'
    )
  ),
  website_url text check (website_url ~ '^https://[^\s]+$' and char_length(website_url) <= 200),
  role text check (char_length(role) <= 240),
  audience text check (char_length(audience) <= 240),
  client_work boolean not null default false,
  facts jsonb not null default '[]' check (jsonb_typeof(facts) = 'array'),
  features jsonb not null default '[]' check (jsonb_typeof(features) = 'array'),
  steps jsonb not null default '[]' check (jsonb_typeof(steps) = 'array'),
  sections jsonb not null default '[]' check (jsonb_typeof(sections) = 'array'),
  faqs jsonb not null default '[]' check (jsonb_typeof(faqs) = 'array'),
  screenshots jsonb not null default '[]' check (jsonb_typeof(screenshots) = 'array'),
  screens text[] not null default '{}' check (cardinality(screens) <= 6),
  built_with text[] not null default '{}' check (cardinality(built_with) <= 20),
  related_services text[] not null default '{}'
    check (related_services <@ array['ai-agents', 'n8n-automation', 'web-apps']),
  related_projects text[] not null default '{}' check (cardinality(related_projects) <= 6),
  seo_title text not null check (char_length(seo_title) between 30 and 60),
  seo_description text not null check (char_length(seo_description) between 120 and 155),
  primary_keyword text not null check (char_length(primary_keyword) between 2 and 100),
  indexable boolean not null default true,
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.products is 'Portfolio products. Public read of published rows only.';

create index products_published_sort_idx on public.products (sort_order) where published;
create unique index products_single_featured_idx on public.products (featured) where featured;

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

revoke all on table public.products from anon, authenticated;
grant select on table public.products to anon, authenticated;
grant all on table public.products to service_role;

create policy "Published products are public"
  on public.products
  for select
  to anon, authenticated
  using (published);
