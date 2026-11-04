import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { productSchema } from "@/lib/seo/schema";

const naeem = projects.find((p) => p.slug === "naeem-stationery-store")!;

describe("website project schema", () => {
  it("describes Naeem Stationery as a WebPage about its website", () => {
    const schema = productSchema(naeem) as unknown as Record<string, unknown>;
    expect(schema["@type"]).toBe("WebPage");
    expect(schema.about).toMatchObject({
      "@type": "WebSite",
      name: "Naeem Stationery & General Store",
      url: "https://naeemshop.online",
      creator: { "@type": "Role", roleName: naeem.role },
    });
  });

  it("claims no ratings, reviews, offers or prices", () => {
    const json = JSON.stringify(productSchema(naeem));
    for (const key of ["aggregateRating", "review", "offers", "price", "SoftwareApplication"]) {
      expect(json).not.toContain(key);
    }
  });

  it("names the founder's role as a schema.org Role on every kind of project", () => {
    const role = (slug: string, kind: string, property: string) => {
      const p = projects.find((x) => x.slug === slug)!;
      const schema = productSchema(p) as unknown as Record<string, Record<string, unknown>>;
      expect(schema["@type"]).toBe(kind);
      const value = schema[property];
      expect(value).toMatchObject({ "@type": "Role", roleName: p.role });
      expect(value[property]).toMatchObject({ "@type": "Person", name: "Ahtasham Naeem" });
    };
    role("nexa-ai", "SoftwareApplication", "author");
    role("meyamb", "CreativeWork", "contributor");
    role("uphex", "CreativeWork", "contributor");
  });

  it("keeps apps as SoftwareApplication", () => {
    const clinidesk = projects.find((p) => p.slug === "clinidesk")!;
    expect((productSchema(clinidesk) as unknown as Record<string, unknown>)["@type"]).toBe(
      "SoftwareApplication",
    );
  });
});
