import { pageSeo } from "@/content/seo";
import { ogContentType, ogSize, ogTitle, renderOgImage } from "@/lib/seo/og";

export const alt = pageSeo.home.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: ogTitle(pageSeo.home.title), label: pageSeo.home.ogLabel });
}
