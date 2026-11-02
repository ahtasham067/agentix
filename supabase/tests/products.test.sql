-- Product rows: the 8 published projects and the JSON-LD schema kind.
-- Run with: npm run db:test
begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(5);

select is(
  (select count(*)::int from public.products where published),
  8,
  'eight products are published'
);
select is(
  (select schema_kind from public.products where slug = 'naeem-stationery-store'),
  'website',
  'Naeem Stationery is described as a website'
);
select is(
  (select count(*)::int from public.products where published and jsonb_array_length(screenshots) between 2 and 3),
  8,
  'every published product has 2 or 3 pictures'
);
select throws_ok(
  $$update public.products set schema_kind = 'game' where slug = 'clinidesk'$$,
  '23514',
  null,
  'unknown schema kinds are rejected'
);
select throws_ok(
  $$update public.products set thumbnail = 'unknown' where slug = 'clinidesk'$$,
  '23514',
  null,
  'unknown thumbnails are rejected'
);

select * from finish();
rollback;
