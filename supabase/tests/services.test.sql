-- The four services and the pricing plan column.
-- Run with: npm run db:test
begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(10);

-- Constraints, checked as the service role (the only role that writes quotes).
set local role service_role;

select lives_ok(
  $$insert into public.quotes (full_name, email, service, plan, budget, details)
    select 'Test Visitor', 'services@example.com', s, 'one-time', 'not-sure',
      'We need a dashboard for our team and customers.'
    from unnest(array['chatbots-ai-agents', 'automation', 'web-development', 'seo-geo', 'not-sure']) s$$,
  'a quote can name each of the four services and not-sure'
);
select throws_ok(
  $$insert into public.quotes (full_name, email, service, budget, details)
    values ('Test Visitor', 'old@example.com', 'ai-agents', 'not-sure',
      'We need a dashboard for our team and customers.')$$,
  '23514',
  null,
  'old service slugs are rejected'
);
select lives_ok(
  $$insert into public.quotes (full_name, email, service, plan, budget, details)
    values ('Test Visitor', 'plan@example.com', 'web-development', 'subscription', 'not-sure',
      'We need a dashboard for our team and customers.')$$,
  'a quote can choose the subscription plan'
);
select throws_ok(
  $$insert into public.quotes (full_name, email, service, plan, budget, details)
    values ('Test Visitor', 'plan@example.com', 'web-development', 'lifetime', 'not-sure',
      'We need a dashboard for our team and customers.')$$,
  '23514',
  null,
  'unknown plans are rejected'
);

reset role;
set local role anon;
select throws_ok(
  $$insert into public.quotes (full_name, email, service, budget, details, notified_at)
    values ('Test Visitor', 'plan@example.com', 'web-development', 'not-sure',
      'We need a dashboard for our team and customers.', now())$$,
  '42501',
  null,
  'anon cannot set notified_at'
);

reset role;

select throws_ok(
  $$update public.products set related_services = array['web-apps'] where slug = 'clinidesk'$$,
  '23514',
  null,
  'products reject old service slugs'
);
select throws_ok(
  $$insert into public.posts (slug, title, seo_title, description, body, related_services)
    values ('old-slug', 'A post with an old slug', 'A post title that is long enough', repeat('d', 130), repeat('b', 300), array['n8n-automation'])$$,
  '23514',
  null,
  'posts reject old service slugs'
);
select is_empty(
  $$select 1 from public.products
    where not related_services <@ array['chatbots-ai-agents', 'automation', 'web-development', 'seo-geo']$$,
  'every seeded product uses the new service slugs'
);

set local role service_role;

select lives_ok(
  $$update public.quotes set notified_at = now() where email = 'plan@example.com'$$,
  'service role can record when the owner email was sent'
);
select throws_ok(
  $$update public.quotes set details = 'Changed by the server, which should never happen.'
    where email = 'plan@example.com'$$,
  '42501',
  null,
  'service role can update only notified_at'
);

select * from finish();
rollback;
