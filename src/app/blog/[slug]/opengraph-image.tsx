import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { ogContentType, ogSize, ogTitle, renderOgImage } from "@/lib/seo/og";

export const alt = "Agentix blog article";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__none" }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return renderOgImage({ title: post ? ogTitle(post.seoTitle) : "Agentix blog", label: "Blog" });
}
