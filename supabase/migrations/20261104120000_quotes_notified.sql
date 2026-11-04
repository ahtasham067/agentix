-- True once the owner notification email was sent. A failed send leaves it false.
-- Derived from notified_at, so the quote action needs no extra write.
alter table public.quotes
  add column notified boolean generated always as (notified_at is not null) stored;

comment on column public.quotes.notified is 'True once the owner notification email was sent (notified_at is set). False if it failed.';
