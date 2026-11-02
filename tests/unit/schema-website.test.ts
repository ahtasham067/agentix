import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { productSchema } from "@/lib/seo/schema";

const naeem = projects.find((p) => p.slug === "naeem-stationery-store")!;

describe("website project schema", () => {
  it("describes Naeem Stationery as a WebPage about its website", () => {
    const schema = productSchema(naeem) as unknown as Record<string, unknown>;
    expect(schema["@type"]).toBe("WebPage");
    expect(schema.about).toEqual({
      "@type": "WebSite",
      name: "Naeem Stationery & General Store",
      url: "https://naeemshop.online",
    });
  });

  it("claims no ratings, reviews, offers or prices", () => {
    const json = JSON.stringify(productSchema(naeem));
    for (const key of ["aggregateRating", "review", "offers", "price", "SoftwareApplication"]) {
      expect(json).not.toContain(key);
    }
  });

  it("keeps apps as SoftwareApplication", () => {
    const clinidesk = projects.find((p) => p.slug === "clinidesk")!;
    expect((productSchema(clinidesk) as unknown as Record<string, unknown>)["@type"]).toBe(
      "SoftwareApplication",
    );
  });
});
