import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";

describe("project content", () => {
  it("has 7 published projects with unique slugs", () => {
    const published = projects.filter((p) => p.published);
    expect(published).toHaveLength(7);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("has exactly one featured project: CliniDesk", () => {
    expect(projects.filter((p) => p.featured).map((p) => p.slug)).toEqual(["clinidesk"]);
  });

  it.each(projects.map((p) => [p.slug, p] as const))("%s has valid SEO fields", (_, p) => {
    expect(p.seo.title.length).toBeGreaterThanOrEqual(30);
    expect(p.seo.title.length).toBeLessThanOrEqual(60);
    expect(p.seo.title.endsWith("| Agentix")).toBe(true);
    expect(p.seo.description.length).toBeGreaterThanOrEqual(120);
    expect(p.seo.description.length).toBeLessThanOrEqual(155);
  });

  it.each(projects.map((p) => [p.slug, p] as const))(
    "%s only links to projects that exist",
    (_, p) => {
      const slugs = new Set(projects.map((x) => x.slug));
      for (const related of p.relatedProjects) {
        expect(slugs.has(related)).toBe(true);
        expect(related).not.toBe(p.slug);
      }
    },
  );

  it("keeps projects without real details out of the index", () => {
    const hidden = projects.filter((p) => !p.indexable).map((p) => p.slug);
    expect(hidden.sort()).toEqual(["nexa-ai", "uphex"]);
  });

  it("gives every indexable project a keyword-led FAQ and sections", () => {
    for (const p of projects.filter((x) => x.indexable)) {
      expect(p.faqs.length).toBeGreaterThanOrEqual(4);
      expect(p.sections.length).toBeGreaterThanOrEqual(2);
      const normalize = (s: string) => s.toLowerCase().replaceAll("&", "and");
      expect(normalize(p.seo.title)).toContain(normalize(p.seo.keyword));
    }
  });
});
