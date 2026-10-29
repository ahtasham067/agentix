import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppLink as Link } from "@/components/ui/AppLink";
import { pageSeo } from "@/content/seo";
import { readingMinutes } from "@/lib/markdown";
import { getPublishedPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(pageSeo.blog);

const link = "text-accent underline underline-offset-[3px]";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
        title="AI agents and automation blog"
        intro="Practical guides on AI agents, n8n workflows, WhatsApp booking bots and the web apps around them."
      />

      <section aria-labelledby="posts-title" className="container-site mt-[56px]">
        <h2 id="posts-title" className="sr-only">
          Articles
        </h2>
        {posts.length > 0 ? (
          <ul className="m-0 grid list-none gap-[24px] p-0 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard headingLevel={3} post={{ ...post, minutes: readingMinutes(post.body) }} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-[720px] rounded-card border border-line bg-secondary p-[32px]">
            <p className="text-[18px] leading-[1.6]">
              Our first articles are being reviewed and will appear here soon.
            </p>
            <p className="mt-[12px] text-[17px] leading-[1.6] text-muted">
              Until then, read about our{" "}
              <Link href="/services/ai-agents" className={link}>
                custom AI agent development
              </Link>
              ,{" "}
              <Link href="/services/n8n-automation" className={link}>
                n8n automation services
              </Link>{" "}
              and{" "}
              <Link href="/services/web-apps" className={link}>
                Next.js web app development
              </Link>
              , or see{" "}
              <Link href="/products" className={link}>
                the products we have built
              </Link>
              .
            </p>
          </div>
        )}
      </section>

      <JsonLd data={blogSchema(posts)} />

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Have a task you want to automate?"
          text="Tell us about it. We reply with a plan and a timeline."
        />
      </div>
    </>
  );
}
