-- Blog posts. Anyone can read published posts; only the service role writes.
-- New posts start as drafts so the owner can review them before publishing.

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (char_length(slug) between 2 and 80 and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 10 and 120),
  seo_title text not null check (char_length(seo_title) between 30 and 60),
  description text not null check (char_length(description) between 120 and 155),
  body text not null check (char_length(body) between 200 and 40000),
  author_name text not null default 'Ahtasham Naeem' check (char_length(author_name) <= 80),
  related_services text[] not null default '{}'
    check (related_services <@ array['ai-agents', 'n8n-automation', 'web-apps']),
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_published_has_date check (not published or published_at is not null)
);

comment on table public.posts is 'Blog posts. Public read of published rows only.';

create index posts_published_at_idx on public.posts (published_at desc) where published;

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

revoke all on table public.posts from anon, authenticated;
grant select on table public.posts to anon, authenticated;
grant all on table public.posts to service_role;

create policy "Published posts are public"
  on public.posts
  for select
  to anon, authenticated
  using (published);
