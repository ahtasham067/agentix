import { AppLink as Link } from "@/components/ui/AppLink";

export function PostCard({
  post,
  headingLevel = 2,
}: {
  post: { slug: string; title: string; description: string; publishedAt: string; minutes: number };
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="relative flex h-full flex-col rounded-card border border-line bg-secondary p-[28px] transition-colors hover:border-[rgb(244_241_238/0.28)]">
      <p className="text-[14px] text-muted">
        <time dateTime={post.publishedAt}>{date}</time> · {post.minutes} min read
      </p>
      <Heading className="mt-[12px] text-[23px] leading-[1.25] tracking-[-0.01em]">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-card after:content-[''] hover:underline"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="mt-[10px] text-[15.5px] leading-[1.6] text-muted">{post.description}</p>
    </article>
  );
}
