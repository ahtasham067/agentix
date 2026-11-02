-- Row Level Security and grants for the public site.
-- Run with: npm run db:test
begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(22);

-- Setup sanity: the seed holds 8 published products and 1 draft.
select results_eq(
  $$select count(*)::int from public.products$$,
  array[9],
  'postgres sees all seeded products'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.products'::regclass),
  'RLS is enabled on products'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.quotes'::regclass),
  'RLS is enabled on quotes'
);

-- anon: products
set local role anon;

select results_eq(
  $$select count(*)::int from public.products$$,
  array[8],
  'anon reads the 8 published products'
);
select is_empty(
  $$select 1 from public.products where not published$$,
  'anon cannot read unpublished products'
);
select is_empty(
  $$select 1 from public.products where slug = 'internal-draft'$$,
  'anon cannot read the draft product by slug'
);
select throws_ok(
  $$insert into public.products (slug, name, summary, description, stack, category, thumbnail,
      seo_title, seo_description, primary_keyword)
    values ('hack', 'Hack', 'x', 'x', 'x', 'web-apps', 'uphex',
      'A title that is long enough for the check',
      repeat('d', 130), 'hack')$$,
  '42501',
  null,
  'anon cannot insert products'
);
select throws_ok(
  $$update public.products set name = 'Changed'$$,
  '42501',
  null,
  'anon cannot update products'
);
select throws_ok(
  $$delete from public.products$$,
  '42501',
  null,
  'anon cannot delete products'
);

-- anon: quotes
select lives_ok(
  $$insert into public.quotes (full_name, email, whatsapp, service, budget, details)
    values ('Test Visitor', 'visitor@example.com', '+92 302 5889452', 'chatbots-ai-agents', 'under-250k',
      'We need a WhatsApp booking agent for our clinic.')$$,
  'anon can insert a valid quote'
);
select throws_ok(
  $$insert into public.quotes (full_name, email, service, budget, details)
    values ('Test Visitor', 'not-an-email', 'web-development', 'not-sure',
      'We need a dashboard for our team and customers.')$$,
  '23514',
  null,
  'invalid email is rejected'
);
select throws_ok(
  $$insert into public.quotes (full_name, email, service, budget, details)
    values ('Test Visitor', 'visitor@example.com', 'web-development', 'not-sure', 'Too short')$$,
  '23514',
  null,
  'too-short project details are rejected'
);
select throws_ok(
  $$insert into public.quotes (full_name, email, service, budget, details)
    values ('Test Visitor', 'visitor@example.com', 'crypto', 'not-sure',
      'We need a dashboard for our team and customers.')$$,
  '23514',
  null,
  'unknown service is rejected'
);
select throws_ok(
  $$insert into public.quotes (full_name, email, service, budget, details, ip_hash)
    values ('Test Visitor', 'visitor@example.com', 'web-development', 'not-sure',
      'We need a dashboard for our team and customers.', repeat('a', 64))$$,
  '42501',
  null,
  'anon cannot set server-only columns'
);
select throws_ok(
  $$select * from public.quotes$$,
  '42501',
  null,
  'anon cannot read quotes'
);
select throws_ok(
  $$update public.quotes set full_name = 'Changed'$$,
  '42501',
  null,
  'anon cannot update quotes'
);
select throws_ok(
  $$delete from public.quotes$$,
  '42501',
  null,
  'anon cannot delete quotes'
);

-- authenticated: same public surface, no quote access
reset role;
set local role authenticated;

select results_eq(
  $$select count(*)::int from public.products$$,
  array[8],
  'authenticated reads only published products'
);
select throws_ok(
  $$select * from public.quotes$$,
  '42501',
  null,
  'authenticated cannot read quotes'
);
select throws_ok(
  $$insert into public.quotes (full_name, email, service, budget, details)
    values ('Test Visitor', 'visitor@example.com', 'web-development', 'not-sure',
      'We need a dashboard for our team and customers.')$$,
  '42501',
  null,
  'authenticated cannot insert quotes'
);

-- service role: server-side access
reset role;
set local role service_role;

select results_eq(
  $$select count(*)::int from public.quotes where email = 'visitor@example.com'$$,
  array[1],
  'service role reads the submitted quote'
);
select results_eq(
  $$select count(*)::int from public.products$$,
  array[9],
  'service role reads all products'
);

select * from finish();
rollback;
