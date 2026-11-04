import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";

describe("project content", () => {
  it("has 8 published projects with unique slugs", () => {
    const published = projects.filter((p) => p.published);
    expect(published).toHaveLength(8);
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

  it.each(projects.map((p) => [p.slug, p] as const))(
    "%s opens with a 40 to 60 word answer",
    (_, p) => {
      const words = p.answer.split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(40);
      expect(words).toBeLessThanOrEqual(60);
      expect(p.answer.startsWith(p.name)).toBe(true);
    },
  );

  it("indexes every project now that each has confirmed details", () => {
    expect(projects.filter((p) => !p.indexable).map((p) => p.slug)).toEqual([]);
  });

  it.each(projects.map((p) => [p.slug, p] as const))("%s states the founder's role", (_, p) => {
    expect(p.role?.trim()).toBeTruthy();
    expect(p.role!.length).toBeLessThanOrEqual(90);
  });

  it("uses the roles the owner confirmed", () => {
    const role = (slug: string) => projects.find((p) => p.slug === slug)!.role;
    expect(role("nexa-ai")).toBe("Full-stack developer");
    expect(role("uphex")).toBe("Full-stack developer, mainly the Ruby on Rails back end");
    expect(role("meyamb")).toBe("Security analyst and developer");
    expect(role("nizame-taleem")).toBe("Full-stack developer");
  });

  it("names Ant Design, not Bootstrap, for Nizame-Taleem", () => {
    const json = JSON.stringify(projects.find((p) => p.slug === "nizame-taleem"));
    expect(json).toContain("Ant Design");
    expect(json).not.toContain("Bootstrap");
  });

  it("calls Nexa AI a personal project, never a university project", () => {
    const json = JSON.stringify(projects.find((p) => p.slug === "nexa-ai")).toLowerCase();
    expect(json).toContain("personal project");
    for (const word of ["university", "fyp", "final year", "prototype"])
      expect(json).not.toContain(word);
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
