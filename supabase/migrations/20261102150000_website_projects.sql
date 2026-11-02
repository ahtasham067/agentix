-- Business websites (such as a shop's own site) are described as a WebPage
-- about a WebSite in JSON-LD, not as a SoftwareApplication.
alter table public.products
  add column schema_kind text not null default 'software'
    check (schema_kind in ('software', 'website'));

comment on column public.products.schema_kind is
  'JSON-LD type for the product page: software (SoftwareApplication) or website (WebPage about a WebSite).';

-- Allow the fallback preview for the Naeem Stationery project.
alter table public.products drop constraint products_thumbnail_check;
alter table public.products add constraint products_thumbnail_check check (
  thumbnail in (
    'clinidesk', 'nexa-ai', 'autobuffy', 'meyamb', 'research-buddy', 'uphex', 'nizame-taleem',
    'naeem-stationery-store'
  )
);
