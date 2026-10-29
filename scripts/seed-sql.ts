import { projects } from "../src/content/projects";
import type { Project } from "../src/content/types";
import { loadPosts } from "./posts";

const HEADER = `-- GENERATED FILE. Do not edit by hand.
-- Source: src/content/projects/*.ts and src/content/posts/*.md (posts start as drafts).
-- Regenerate with: npm run db:seed:gen
`;

function text(value: string | undefined | null): string {
  if (value === undefined || value === null) return "null";
  return `'${value.replaceAll("'", "''")}'`;
}

function textArray(values: string[]): string {
  if (values.length === 0) return "'{}'::text[]";
  return `array[${values.map(text).join(", ")}]::text[]`;
}

function json(value: unknown): string {
  return `${text(JSON.stringify(value))}::jsonb`;
}

function bool(value: boolean): string {
  return value ? "true" : "false";
}

const PRODUCT_COLUMNS = [
  "slug",
  "name",
  "summary",
  "description",
  "tagline",
  "tags",
  "stack",
  "category",
  "thumbnail",
  "website_url",
  "role",
  "audience",
  "client_work",
  "facts",
  "features",
  "steps",
  "sections",
  "faqs",
  "screenshots",
  "screens",
  "built_with",
  "related_services",
  "related_projects",
  "seo_title",
  "seo_description",
  "primary_keyword",
  "indexable",
  "featured",
  "sort_order",
  "published",
];

function productValues(p: Project): string {
  const values = [
    text(p.slug),
    text(p.name),
    text(p.summary),
    text(p.description),
    text(p.tagline),
    textArray(p.tags),
    text(p.stack),
    text(p.category),
    text(p.thumbnail),
    text(p.websiteUrl),
    text(p.role),
    text(p.audience),
    bool(p.clientWork),
    json(p.facts),
    json(p.features),
    json(p.steps),
    json(p.sections),
    json(p.faqs),
    json(p.screenshots),
    textArray(p.screens),
    textArray(p.builtWith),
    textArray(p.relatedServices),
    textArray(p.relatedProjects),
    text(p.seo.title),
    text(p.seo.description),
    text(p.seo.keyword),
    bool(p.indexable),
    bool(p.featured),
    String(p.sortOrder),
    bool(p.published),
  ];
  return `  (\n    ${values.join(",\n    ")}\n  )`;
}

/** Unpublished row used by database and e2e tests to prove drafts stay hidden. */
const testDraft: Project = {
  slug: "internal-draft",
  name: "Internal Draft",
  summary: "Unpublished test row. It must never appear on the site.",
  description: "Unpublished test row. It must never appear on the site.",
  tags: ["Test"],
  stack: "Test",
  category: "web-apps",
  thumbnail: "uphex",
  clientWork: false,
  facts: [],
  features: [],
  steps: [],
  sections: [],
  faqs: [],
  screenshots: [],
  screens: [],
  builtWith: [],
  relatedServices: [],
  relatedProjects: [],
  seo: {
    keyword: "internal draft",
    title: "Internal Draft Product For Tests | Agentix",
    description:
      "Unpublished test row used by the database and end-to-end tests to prove that draft products are never visible to anonymous visitors.",
  },
  indexable: false,
  featured: false,
  sortOrder: 99,
  published: false,
};

function postValues(): string {
  return loadPosts()
    .map((p) =>
      [
        text(p.slug),
        text(p.title),
        text(p.seoTitle),
        text(p.description),
        text(p.body),
        textArray(p.relatedServices),
        "false",
      ].join(",\n    "),
    )
    .map((v) => `  (\n    ${v}\n  )`)
    .join(",\n");
}

export function buildSeedSql(): string {
  const rows = [...projects, testDraft].map(productValues).join(",\n");
  return `${HEADER}
insert into public.products (
  ${PRODUCT_COLUMNS.join(",\n  ")}
) values
${rows};

-- Blog posts are drafts. Publish one by setting published = true and published_at = now().
insert into public.posts (slug, title, seo_title, description, body, related_services, published) values
${postValues()};
`;
}
