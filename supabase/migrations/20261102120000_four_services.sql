-- Four services replace the original three:
--   ai-agents      -> chatbots-ai-agents
--   n8n-automation -> automation
--   web-apps       -> web-development
--   (new)          -> seo-geo
-- Quotes also record the pricing plan the visitor picked, and when the owner
-- email was sent (null means the notification failed or is still pending).

-- Quotes ---------------------------------------------------------------------
alter table public.quotes drop constraint quotes_service_check;

update public.quotes
set service = case service
  when 'ai-agents' then 'chatbots-ai-agents'
  when 'n8n-automation' then 'automation'
  when 'web-apps' then 'web-development'
  else service
end;

alter table public.quotes
  add constraint quotes_service_check
  check (service in ('chatbots-ai-agents', 'automation', 'web-development', 'seo-geo', 'not-sure'));

alter table public.quotes
  add column plan text check (plan in ('one-time', 'subscription', 'not-sure')),
  add column notified_at timestamptz;

comment on column public.quotes.plan is 'Pricing plan chosen in the form: one-time, subscription or not-sure.';
comment on column public.quotes.notified_at is 'When the owner notification email was sent. Null if it failed.';

grant insert (plan) on table public.quotes to anon;
grant update (notified_at) on table public.quotes to service_role;

-- Products and posts ---------------------------------------------------------
create or replace function private_rename_services(services text[])
returns text[]
language sql
immutable
set search_path = ''
as $$
  select coalesce(array_agg(
    case s
      when 'ai-agents' then 'chatbots-ai-agents'
      when 'n8n-automation' then 'automation'
      when 'web-apps' then 'web-development'
      else s
    end order by ord), '{}')
  from unnest(services) with ordinality as t(s, ord)
$$;

alter table public.products drop constraint products_related_services_check;
update public.products set related_services = private_rename_services(related_services);
alter table public.products
  add constraint products_related_services_check
  check (related_services <@ array['chatbots-ai-agents', 'automation', 'web-development', 'seo-geo']);

alter table public.posts drop constraint posts_related_services_check;
update public.posts set related_services = private_rename_services(related_services);
alter table public.posts
  add constraint posts_related_services_check
  check (related_services <@ array['chatbots-ai-agents', 'automation', 'web-development', 'seo-geo']);

drop function private_rename_services(text[]);
