-- A short, direct answer that opens each product page (40 to 60 words), so
-- search and AI answer engines can quote what the product is in one passage.

alter table public.products
  add column answer text not null default ''
    check (char_length(answer) <= 600);

comment on column public.products.answer is
  'Answer-first summary shown at the top of the product page (40 to 60 words).';
