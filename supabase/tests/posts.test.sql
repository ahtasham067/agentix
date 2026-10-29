-- Row Level Security for blog posts. Run with: npm run db:test
begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(8);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.posts'::regclass),
  'RLS is enabled on posts'
);
select ok(
  (select count(*) = 6 and bool_and(not published) from public.posts),
  'the seed holds 6 draft posts'
);

-- A published post for this test only (rolled back at the end).
update public.posts set published = true, published_at = now()
where slug = (select slug from public.posts order by slug limit 1);

set local role anon;

select results_eq(
  $$select count(*)::int from public.posts$$,
  array[1],
  'anon reads only the published post'
);
select is_empty(
  $$select 1 from public.posts where not published$$,
  'anon cannot read drafts'
);
select throws_ok(
  $$insert into public.posts (slug, title, seo_title, description, body)
    values ('hack', 'A hacked post title', 'A title that is long enough here', repeat('d', 130), repeat('b', 300))$$,
  '42501',
  null,
  'anon cannot insert posts'
);
select throws_ok($$update public.posts set title = 'Changed title'$$, '42501', null, 'anon cannot update posts');
select throws_ok($$delete from public.posts$$, '42501', null, 'anon cannot delete posts');

reset role;
select throws_ok(
  $$update public.posts set published = true, published_at = null where slug = (select slug from public.posts order by slug desc limit 1)$$,
  '23514',
  null,
  'a published post must have a publish date'
);

select * from finish();
rollback;
