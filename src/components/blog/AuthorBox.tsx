import { AppLink as Link } from "@/components/ui/AppLink";
import { founder } from "@/content/site";

export function AuthorBox({ name }: { name: string }) {
  return (
    <section
      aria-labelledby="author-title"
      className="mt-[56px] flex gap-[20px] rounded-card border border-line bg-secondary p-[28px]"
    >
      <span
        aria-hidden="true"
        className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-primary font-heading text-[22px] font-bold text-on-primary"
      >
        {founder.initials}
      </span>
      <div>
        <h2 id="author-title" className="text-[20px] leading-[1.3]">
          About the author
        </h2>
        <p className="mt-[6px] text-[16px] leading-[1.6] text-muted">
          {name} is the founder of Agentix and a full-stack developer with more than 5 years of
          experience in Ruby on Rails, React and Next.js. He now builds AI agents and n8n automation
          for businesses.{" "}
          <Link href="/about" className="text-accent underline underline-offset-[3px]">
            More about Agentix
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
