-- Row Level Security for the posts table. The blog is removed and the seed holds
-- no posts, so this test inserts its own rows. Run with: npm run db:test
begin;
create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(8);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.posts'::regclass),
  'RLS is enabled on posts'
);
select is_empty(
  $$select 1 from public.posts$$,
  'the seed holds no posts'
);

-- One draft and one published post for this test only (rolled back at the end).
insert into public.posts (slug, title, seo_title, description, body, published, published_at)
values
  ('test-draft', 'A draft post title', 'A draft post title long enough', repeat('d', 130), repeat('b', 300), false, null),
  ('test-live', 'A published post title', 'A published post title long enough', repeat('d', 130), repeat('b', 300), true, now());

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
  $$update public.posts set published = true, published_at = null where slug = 'test-draft'$$,
  '23514',
  null,
  'a published post must have a publish date'
);

select * from finish();
rollback;
