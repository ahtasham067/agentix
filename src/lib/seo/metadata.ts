import type { Metadata } from "next";
import { SITE_NAME } from "@/content/site";
import { absoluteUrl } from "./schema";

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Page metadata with an absolute title, canonical URL, Open Graph and Twitter
 * card. Open Graph images come from each route's opengraph-image file.
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large" },
  };
}
