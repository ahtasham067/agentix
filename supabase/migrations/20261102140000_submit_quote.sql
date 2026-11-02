-- Atomic rate limit + insert for the quote form.
--
-- Before: the server counted recent quotes and then inserted in two requests,
-- so parallel submissions from one IP could all pass the count. Now one
-- function takes a transaction-level advisory lock per IP hash, counts and
-- inserts in the same transaction. Returns the new id, or null when the IP
-- already sent p_max quotes inside the window.
--
-- Only the service role (the server action) may call it.

create or replace function public.submit_quote(
  p_full_name text,
  p_email text,
  p_whatsapp text,
  p_service text,
  p_plan text,
  p_budget text,
  p_details text,
  p_ip_hash text,
  p_max integer,
  p_window_minutes integer
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  recent integer;
  new_id uuid;
begin
  if p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid ip hash' using errcode = '22023';
  end if;
  if p_max < 1 or p_window_minutes < 1 then
    raise exception 'invalid rate limit' using errcode = '22023';
  end if;

  -- Serialize submissions from the same IP hash until this transaction ends.
  perform pg_advisory_xact_lock(hashtextextended('quote:' || p_ip_hash, 0));

  select count(*) into recent
  from public.quotes
  where ip_hash = p_ip_hash
    and created_at >= now() - make_interval(mins => p_window_minutes);

  if recent >= p_max then
    return null;
  end if;

  insert into public.quotes (full_name, email, whatsapp, service, plan, budget, details, ip_hash)
  values (p_full_name, p_email, nullif(p_whatsapp, ''), p_service, p_plan, p_budget, p_details, p_ip_hash)
  returning id into new_id;

  return new_id;
end;
$$;

comment on function public.submit_quote is
  'Rate-limited quote insert (advisory lock per IP hash). Service role only.';

revoke all on function public.submit_quote(text, text, text, text, text, text, text, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.submit_quote(text, text, text, text, text, text, text, text, integer, integer)
  to service_role;
