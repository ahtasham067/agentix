import { getProductBySlug, getPublishedProducts } from "@/lib/products";
import { ogContentType, ogSize, ogTitle, renderOgImage } from "@/lib/seo/og";

export const alt = "Agentix product";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const products = await getPublishedProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return renderOgImage({
    title: product ? ogTitle(product.seo.title) : "Agentix product",
    label: product ? `Product · ${product.name}` : "Product",
  });
}
