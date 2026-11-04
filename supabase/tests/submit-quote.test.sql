-- The atomic, rate-limited quote insert.
-- Run with: npm run db:test
begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(9);

select ok(
  not has_function_privilege('anon', 'public.submit_quote(text, text, text, text, text, text, text, text, integer, integer)', 'execute'),
  'anon cannot execute submit_quote'
);
select ok(
  not has_function_privilege('authenticated', 'public.submit_quote(text, text, text, text, text, text, text, text, integer, integer)', 'execute'),
  'authenticated cannot execute submit_quote'
);

set local role service_role;

select isnt(
  public.submit_quote('Rate Tester', 'rate@example.com', '', 'automation', 'one-time', 'not-sure',
    'We need a dashboard for our team and customers.', repeat('b', 64), 2, 10),
  null,
  'first quote from an IP is saved'
);
select isnt(
  public.submit_quote('Rate Tester', 'rate@example.com', '+92 302 5889452', 'automation', 'one-time',
    'not-sure', 'We need a dashboard for our team and customers.', repeat('b', 64), 2, 10),
  null,
  'second quote is saved'
);
select is(
  public.submit_quote('Rate Tester', 'rate@example.com', '', 'automation', 'one-time', 'not-sure',
    'We need a dashboard for our team and customers.', repeat('b', 64), 2, 10),
  null,
  'third quote inside the window is refused'
);
select throws_ok(
  $$select public.submit_quote('Rate Tester', 'rate@example.com', '', 'automation', 'one-time',
    'not-sure', 'We need a dashboard for our team and customers.', 'not-a-hash', 2, 10)$$,
  '22023',
  null,
  'a malformed IP hash is rejected'
);
select results_eq(
  $$select count(*)::int from public.quotes where email = 'rate@example.com' and whatsapp is null$$,
  array[1],
  'empty WhatsApp is stored as null'
);
select results_eq(
  $$select bool_and(not notified) from public.quotes where email = 'rate@example.com'$$,
  array[true],
  'a new quote is not notified yet'
);
update public.quotes set notified_at = now() where email = 'rate@example.com';
select results_eq(
  $$select bool_and(notified) from public.quotes where email = 'rate@example.com'$$,
  array[true],
  'notified is true once notified_at is set'
);

select * from finish();
rollback;
