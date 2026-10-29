import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { PostCard } from "@/components/blog/PostCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageGlow } from "@/components/layout/PageGlow";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppLink as Link } from "@/components/ui/AppLink";
import { serviceLinks } from "@/content/services";
import { extractToc, readingMinutes } from "@/lib/markdown";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPostingSchema } from "@/lib/seo/schema";

// Wait for the complete page (no streamed shell), so unknown or draft slugs return a real 404.
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  // Cache Components needs at least one entry; the placeholder renders the 404 page.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__none" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.body);
  const related = (await getPublishedPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);
  const published = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="relative pt-[84px]">
        <PageGlow />
        <div className="container-site relative pt-[46px]">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <div className="mt-[20px] max-w-[880px]">
            <h1 className="text-[36px] leading-[1.1] tracking-[-0.03em] md:text-[52px]">
              {post.title}
            </h1>
            <p className="mt-[16px] text-[18px] leading-[1.6] text-muted md:text-[19.5px]">
              {post.description}
            </p>
            <p className="mt-[16px] text-[15px] text-muted">
              By {post.authorName} · <time dateTime={post.publishedAt}>{published}</time> ·{" "}
              {readingMinutes(post.body)} min read
            </p>
          </div>
        </div>
      </section>

      <div className="container-site mt-[56px] grid gap-[40px] lg:grid-cols-[720px_1fr] lg:gap-[80px]">
        <article className="min-w-0 max-w-[720px]">
          <ArticleBody markdown={post.body} />
          {post.relatedServices.length > 0 && (
            <p className="mt-[40px] text-[17px] leading-[1.7] text-muted">
              Related services:{" "}
              {post.relatedServices.map((s, i) => (
                <span key={s}>
                  {i > 0 && " · "}
                  <Link
                    href={serviceLinks[s].href}
                    className="text-accent underline underline-offset-[3px]"
                  >
                    {serviceLinks[s].anchor}
                  </Link>
                </span>
              ))}
            </p>
          )}
          <AuthorBox name={post.authorName} />
        </article>
        <aside className="lg:sticky lg:top-[24px] lg:self-start">
          <TableOfContents entries={toc} />
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-site mt-[96px]">
          <h2
            id="related-title"
            className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]"
          >
            Related articles
          </h2>
          <ul className="m-0 mt-[34px] grid list-none gap-[24px] p-0 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard headingLevel={3} post={{ ...p, minutes: readingMinutes(p.body) }} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd data={blogPostingSchema({ ...post, author: post.authorName })} />

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Want this built for your business?"
          text="Tell us the job you want to automate. We reply with a plan and a timeline."
        />
      </div>
    </>
  );
}
