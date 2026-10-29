-- Quote requests from the contact form. Anonymous visitors may insert the form
-- columns only. Nobody except the service role can read, change or delete rows.

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (
    char_length(email) between 6 and 254
    and email ~* '^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$'
  ),
  whatsapp text check (whatsapp ~ '^\+?[0-9][0-9 ()-]{6,19}$'),
  service text not null check (service in ('ai-agents', 'n8n-automation', 'web-apps', 'not-sure')),
  budget text not null check (budget in ('under-250k', '250k-1m', '1m-3m', '3m-plus', 'not-sure')),
  details text not null check (char_length(details) between 20 and 4000),
  ip_hash text check (ip_hash ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now()
);

comment on table public.quotes is 'Quote requests. Anonymous insert only; read via service role.';
comment on column public.quotes.ip_hash is 'Salted SHA-256 of the client IP, used for rate limiting.';

create index quotes_ip_hash_created_idx on public.quotes (ip_hash, created_at desc);
create index quotes_created_idx on public.quotes (created_at desc);

alter table public.quotes enable row level security;

revoke all on table public.quotes from anon, authenticated;
grant insert (full_name, email, whatsapp, service, budget, details) on table public.quotes to anon;
grant select, insert, delete on table public.quotes to service_role;

create policy "Anyone can submit a quote"
  on public.quotes
  for insert
  to anon
  with check (true);
