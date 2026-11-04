import { describe, expect, it } from "vitest";
import { aboutIntro } from "@/content/about";
import { pageSeo } from "@/content/seo";
import { SITE_DESCRIPTION } from "@/content/site";

describe("copy names web development with the other services", () => {
  it("in the site description, the About intro and the services meta description", () => {
    expect(SITE_DESCRIPTION.toLowerCase()).toContain("web development");
    expect(aboutIntro.toLowerCase()).toContain("web development");
    expect(pageSeo.services.description.toLowerCase()).toContain("web development");
    for (const p of Object.values(pageSeo)) {
      expect(p.title.length, p.path).toBeLessThanOrEqual(60);
      expect(p.description.length, p.path).toBeGreaterThanOrEqual(120);
      expect(p.description.length, p.path).toBeLessThanOrEqual(155);
    }
  });
});
