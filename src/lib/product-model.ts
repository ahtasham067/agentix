import { z } from "zod";
import type { Database } from "@/lib/supabase/database.types";
import {
  PRODUCT_CATEGORIES,
  SERVICE_SLUGS,
  THUMBNAILS,
  type Project,
  type ServiceSlug,
} from "@/content/types";

/** A product as the site uses it. Same shape as the content source. */
export type Product = Project;

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];

const icon = z.enum([
  "bot",
  "workflow",
  "browser",
  "chat",
  "calendar",
  "clock",
  "users",
  "search",
  "shield",
  "zap",
  "mail",
  "phone",
  "card",
  "send",
  "vault",
  "folder",
  "book",
  "chart",
  "check",
  "code",
]);

const rowSchema = z.object({
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  description: z.string(),
  answer: z.string(),
  tagline: z.string().nullable(),
  tags: z.array(z.string()),
  stack: z.string(),
  category: z.enum(PRODUCT_CATEGORIES),
  thumbnail: z.enum(THUMBNAILS),
  website_url: z.string().nullable(),
  role: z.string().nullable(),
  audience: z.string().nullable(),
  client_work: z.boolean(),
  facts: z.array(z.object({ label: z.string(), value: z.string() })),
  features: z.array(z.object({ icon, title: z.string(), text: z.string() })),
  steps: z.array(z.object({ title: z.string(), text: z.string() })),
  sections: z.array(
    z.object({
      heading: z.string(),
      paragraphs: z.array(z.string()),
      bullets: z.array(z.string()).optional(),
    }),
  ),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  screenshots: z.array(
    z.object({
      src: z.string().startsWith("/projects/"),
      alt: z.string().min(1),
      caption: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      blurDataURL: z.string().startsWith("data:image/"),
    }),
  ),
  screens: z.array(z.enum(["calendar", "patient-history"])),
  built_with: z.array(z.string()),
  related_services: z.array(z.enum(SERVICE_SLUGS)),
  related_projects: z.array(z.string()),
  seo_title: z.string(),
  seo_description: z.string(),
  primary_keyword: z.string(),
  indexable: z.boolean(),
  featured: z.boolean(),
  sort_order: z.number(),
  published: z.boolean(),
  updated_at: z.string(),
});

/** Validates a database row and maps it to the site's product shape. */
export function rowToProduct(row: ProductRow): Product {
  const r = rowSchema.parse(row);
  return {
    slug: r.slug,
    name: r.name,
    summary: r.summary,
    description: r.description,
    answer: r.answer,
    tagline: r.tagline ?? undefined,
    tags: r.tags,
    stack: r.stack,
    category: r.category,
    thumbnail: r.thumbnail,
    websiteUrl: r.website_url ?? undefined,
    role: r.role ?? undefined,
    audience: r.audience ?? undefined,
    clientWork: r.client_work,
    facts: r.facts,
    features: r.features,
    steps: r.steps,
    sections: r.sections,
    faqs: r.faqs,
    screenshots: r.screenshots,
    screens: r.screens,
    builtWith: r.built_with,
    relatedServices: r.related_services,
    relatedProjects: r.related_projects,
    seo: { title: r.seo_title, description: r.seo_description, keyword: r.primary_keyword },
    indexable: r.indexable,
    featured: r.featured,
    sortOrder: r.sort_order,
    published: r.published,
    updatedAt: r.updated_at,
  };
}

export { matchesFilter, PRODUCT_FILTERS, type ProductFilter } from "./product-filters";

/** Products that belong on a service page: the ones that list the service. */
export function matchesService(product: Product, service: ServiceSlug) {
  return product.relatedServices.includes(service);
}
