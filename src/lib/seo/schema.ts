import type { BreadcrumbList, WithContext } from "schema-dts";
import { siteUrl } from "@/content/site";

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export function breadcrumbSchema(
  items: { name: string; href: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}
