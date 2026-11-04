import type { MetadataRoute } from "next";
import { pageSeo } from "@/content/seo";
import { services } from "@/content/services";
import { getPublishedProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo/schema";

/** Public, indexable URLs only. Draft content and noindex pages are left out. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublishedProducts();
  const staticPages = Object.values(pageSeo);

  return [
    ...staticPages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: new Date(p.lastModified),
      changeFrequency: "monthly" as const,
      priority: p.path === "/" ? 1 : p.path === "/privacy" || p.path === "/terms" ? 0.3 : 0.8,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: new Date(s.updated),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...products
      .filter((p) => p.indexable)
      .map((p) => ({
        url: absoluteUrl(`/products/${p.slug}`),
        lastModified: new Date(p.updatedAt ?? pageSeo.products.lastModified),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
