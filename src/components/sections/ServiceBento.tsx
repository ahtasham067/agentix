import { AppLink as Link } from "@/components/ui/AppLink";
import { ChatBubbles } from "@/components/illustrations/ChatBubbles";
import { SearchMini } from "@/components/illustrations/SearchMini";
import { StatsMini } from "@/components/illustrations/StatsMini";
import { WorkflowMini } from "@/components/illustrations/WorkflowMini";
import { IconTile } from "@/components/ui/IconTile";
import { serviceLinks } from "@/content/services";

const {
  "chatbots-ai-agents": agents,
  automation,
  "web-development": web,
  "seo-geo": seo,
} = serviceLinks;

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="after:absolute after:inset-0 after:rounded-card after:content-[''] hover:underline"
    >
      {children}
    </Link>
  );
}

/** "What we build for you": the four services as a bento grid (the fourth is not in the design). */
export function ServiceBento() {
  return (
    <ul className="m-0 grid list-none gap-[20px] p-0 lg:grid-cols-[522px_1fr] lg:grid-rows-[240px_240px]">
      <li className="relative flex flex-col rounded-card border border-line bg-secondary p-[30px] pb-[30px] lg:row-span-2">
        <IconTile name="bot" />
        <h3 className="mt-[20px] text-[24.4px] leading-[29px] tracking-[-0.01em]">
          <CardLink href={agents.href}>{agents.name}</CardLink>
        </h3>
        <p className="mt-[10px] max-w-[440px] text-[16px] leading-[1.55] text-muted">
          Agents that answer customers, book appointments and follow up, around the clock.
        </p>
        <ChatBubbles
          className="mt-auto gap-[10px] pt-10"
          bubbles={[
            { text: "Can I book a visit for Tuesday?", tone: "incoming" },
            { text: "Booked for Tuesday, 4:30 pm.", tone: "outgoing" },
            { text: "Reminder will be sent on WhatsApp.", tone: "note" },
          ]}
        />
      </li>
      <li className="relative flex flex-col gap-8 rounded-card border border-line bg-secondary p-[30px] md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="md:max-w-[300px]">
          <IconTile name="workflow" />
          <h3 className="mt-[20px] text-[24.4px] leading-[29px] tracking-[-0.01em]">
            <CardLink href={automation.href}>{automation.name}</CardLink>
          </h3>
          <p className="mt-[10px] text-[16px] leading-[1.55] text-muted">
            Connect your apps and remove manual steps.
          </p>
        </div>
        <WorkflowMini className="md:w-[342px]" />
      </li>
      <li className="relative flex flex-col gap-8 rounded-card border border-line bg-secondary p-[30px] md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="md:max-w-[300px]">
          <IconTile name="browser" />
          <h3 className="mt-[20px] text-[24.4px] leading-[29px] tracking-[-0.01em]">
            <CardLink href={web.href}>{web.name}</CardLink>
          </h3>
          <p className="mt-[10px] text-[16px] leading-[1.55] text-muted">
            Fast Next.js apps with a Supabase backend.
          </p>
        </div>
        <StatsMini className="md:w-[342px]" />
      </li>
      <li
        data-seo-extra
        className="relative flex flex-col gap-8 rounded-card border border-line bg-secondary p-[30px] md:flex-row md:items-center md:justify-between md:gap-0 lg:col-span-2"
      >
        <div className="md:max-w-[460px]">
          <IconTile name="search" />
          <h3 className="mt-[20px] text-[24.4px] leading-[29px] tracking-[-0.01em]">
            <CardLink href={seo.href}>{seo.name}</CardLink>
          </h3>
          <p className="mt-[10px] text-[16px] leading-[1.55] text-muted">
            Get found on Google and cited by ChatGPT, Perplexity and Gemini.
          </p>
        </div>
        <SearchMini className="md:w-[342px]" />
      </li>
    </ul>
  );
}
