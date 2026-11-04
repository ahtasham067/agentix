import { AppLink as Link } from "@/components/ui/AppLink";
import { EXPERIENCE, founder, social } from "@/content/site";

const link = "text-accent underline underline-offset-[3px] hover:text-text";

/**
 * Who wrote or built this (E-E-A-T and GEO): the founder's real experience and
 * profiles. Used on service pages and project pages.
 */
export function AuthorBox({
  name = founder.name,
  title = "About the author",
  id = "author-title",
  className = "mt-[56px]",
}: {
  name?: string;
  title?: string;
  id?: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={id}
      data-seo-extra
      className={`flex gap-[20px] rounded-card border border-line bg-secondary p-[28px] ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-primary font-heading text-[22px] font-bold text-on-primary"
      >
        {founder.initials}
      </span>
      <div>
        <h2 id={id} className="text-[20px] leading-[1.3]">
          {title}
        </h2>
        <p className="mt-[6px] text-[16px] leading-[1.6] text-muted">
          {name} is the founder of Agentix and a full-stack developer with {EXPERIENCE.years} years
          of experience and {EXPERIENCE.projects} projects delivered, building AI agents, automation
          and web apps with n8n, Make.com, Next.js, React and Ruby on Rails.{" "}
          <Link href="/about" className={link}>
            More about Agentix
          </Link>
          {" · "}
          <a href={social.linkedin} rel="me noopener noreferrer" target="_blank" className={link}>
            LinkedIn
          </a>
          {" · "}
          <a href={social.github} rel="me noopener noreferrer" target="_blank" className={link}>
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
