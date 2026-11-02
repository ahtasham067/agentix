import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { matchesFilter, matchesService, rowToProduct, type ProductRow } from "@/lib/product-model";

function toRow(p: (typeof projects)[number]): ProductRow {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    slug: p.slug,
    name: p.name,
    summary: p.summary,
    description: p.description,
    answer: p.answer,
    tagline: p.tagline ?? null,
    tags: p.tags,
    stack: p.stack,
    category: p.category,
    thumbnail: p.thumbnail,
    website_url: p.websiteUrl ?? null,
    role: p.role ?? null,
    audience: p.audience ?? null,
    client_work: p.clientWork,
    facts: p.facts,
    features: p.features,
    steps: p.steps,
    sections: p.sections,
    faqs: p.faqs,
    screenshots: p.screenshots,
    screens: p.screens,
    built_with: p.builtWith,
    related_services: p.relatedServices,
    related_projects: p.relatedProjects,
    seo_title: p.seo.title,
    seo_description: p.seo.description,
    primary_keyword: p.seo.keyword,
    indexable: p.indexable,
    schema_kind: p.schemaKind,
    featured: p.featured,
    sort_order: p.sortOrder,
    published: p.published,
    created_at: "2026-10-29T00:00:00Z",
    updated_at: "2026-10-29T00:00:00Z",
  } as unknown as ProductRow;
}

describe("rowToProduct", () => {
  it.each(projects.map((p) => [p.slug, p] as const))("round-trips %s", (_, p) => {
    expect(rowToProduct(toRow(p))).toEqual({ ...p, updatedAt: "2026-10-29T00:00:00Z" });
  });

  it("rejects rows with unknown categories", () => {
    const row = { ...toRow(projects[0]), category: "crypto" } as ProductRow;
    expect(() => rowToProduct(row)).toThrow();
  });
});

describe("matchesFilter", () => {
  const count = (filter: Parameters<typeof matchesFilter>[1]) =>
    projects.filter((p) => matchesFilter(p, filter)).map((p) => p.slug);

  it("returns every product for All", () => {
    expect(count("all")).toHaveLength(7);
  });

  it("splits AI agents and web apps by category", () => {
    expect(count("ai-agents")).toEqual(["clinidesk", "nexa-ai"]);
    expect(count("web-apps")).toEqual([
      "autobuffy",
      "meyamb",
      "research-buddy",
      "uphex",
      "nizame-taleem",
    ]);
  });

  it("treats n8n-powered products as automation", () => {
    expect(count("automation")).toEqual(["clinidesk"]);
  });
});

describe("matchesService", () => {
  const on = (service: Parameters<typeof matchesService>[1]) =>
    projects.filter((p) => matchesService(p, service)).map((p) => p.slug);

  it("lists the products that name the service", () => {
    expect(on("chatbots-ai-agents")).toEqual(["clinidesk", "nexa-ai"]);
    expect(on("automation")).toEqual(["clinidesk"]);
    expect(on("web-development")).toEqual(
      expect.arrayContaining(["clinidesk", "autobuffy", "meyamb", "research-buddy"]),
    );
    expect(on("seo-geo")).toEqual([]);
  });

  it("uses only relatedServices, not the product category", () => {
    const product = { ...projects[0], category: "ai-agents" as const, relatedServices: [] };
    expect(matchesService(product, "chatbots-ai-agents")).toBe(false);
  });
});
