import { getService, services } from "@/content/services";
import { ogContentType, ogSize, ogTitle, renderOgImage } from "@/lib/seo/og";

export const alt = "Agentix service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    title: service ? ogTitle(service.seo.title) : "Agentix service",
    label: service ? `Service · ${service.name}` : "Service",
  });
}
