import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { AI_CRAWLERS, PRIVATE_PATHS } from "@/lib/seo/crawlers";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
