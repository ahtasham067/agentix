-- Quotes are written only by the quote form's server action, through
-- submit_quote with the service role, which also applies the rate limit.
-- Close the direct anonymous insert path so the anon key cannot add quotes
-- around it. Backward compatible: the site never inserts with the anon key.
drop policy if exists "Anyone can submit a quote" on public.quotes;
revoke all on table public.quotes from anon, authenticated;

comment on table public.quotes is 'Quote requests. Written only through submit_quote (service role); anon and authenticated have no access.';
