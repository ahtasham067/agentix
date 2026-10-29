import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQ } from "@/components/sections/FAQ";
import { SeoSection } from "@/components/sections/SeoSection";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppLink as Link } from "@/components/ui/AppLink";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Steps } from "@/components/sections/Steps";
import { SectionHead } from "@/components/ui/SectionHead";
import { faq } from "@/content/faq";
import { howWeWork } from "@/content/home";
import { pageSeo } from "@/content/seo";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(pageSeo.services);

const link = "text-accent underline underline-offset-[3px]";

const fits = [
  {
    icon: "chat" as const,
    problem: "Customers wait for replies",
    text: "Questions, bookings and follow-ups pile up. An AI agent answers in seconds and books in your tools.",
    href: "/services/ai-agents",
    anchor: "Custom AI agent development",
  },
  {
    icon: "workflow" as const,
    problem: "Your team copies data between apps",
    text: "The same steps repeat every day. An n8n workflow runs them for you and alerts you if something fails.",
    href: "/services/n8n-automation",
    anchor: "n8n automation services",
  },
  {
    icon: "browser" as const,
    problem: "You need a dashboard or a portal",
    text: "Spreadsheets no longer cope. A web app gives your team and customers one secure place to work.",
    href: "/services/web-apps",
    anchor: "Next.js web app development",
  },
];

const servicesFaq = [faq.whatIsAgent, faq.whichTools, faq.howLong, faq.customWebApps];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        title={
          <>
            What we can build for your <br className="hidden md:block" />
            business
          </>
        }
        titleClassName="md:leading-[63px]!"
        intro="Three services that work together: smart agents, connected workflows and the web apps around them."
      />

      <div className="container-site mt-[96px] grid gap-[96px]">
        {services.map((service, i) => (
          <ServiceRow key={service.slug} service={service} reverse={i % 2 === 1} />
        ))}
      </div>

      <section aria-labelledby="how-title" className="container-site mt-[104px]">
        <SectionHead
          id="how-title"
          title="How we work"
          intro="A simple path from idea to a working system."
        />
        <div className="mt-[36px]">
          <Steps steps={howWeWork} />
        </div>
      </section>

      <SeoSection
        id="together-title"
        title="How our AI agent, n8n and web app services work together"
        className="mt-[104px]"
      >
        <div className="grid max-w-[880px] gap-[14px] text-[17px] leading-[1.6] text-muted">
          <p>
            Most projects use more than one of our AI agent development, n8n automation and web app
            development services. The agent talks to people, the workflow moves data between your
            tools, and the web app gives your team a place to see and control it all.
          </p>
          <p>
            CliniDesk is a good example. Patients book on WhatsApp with an AI agent, an n8n workflow
            checks each doctor&apos;s availability, and a Next.js dashboard shows every appointment.
            Read the{" "}
            <Link href="/products/clinidesk" className={link}>
              CliniDesk WhatsApp booking system
            </Link>{" "}
            case to see how the parts fit.
          </p>
        </div>
      </SeoSection>

      <SeoSection id="fit-title" title="Which service fits your problem" className="mt-[96px]">
        <ul className="m-0 grid list-none gap-[20px] p-0 md:grid-cols-3">
          {fits.map((fit) => (
            <Card as="li" key={fit.href} className="p-[28px]">
              <IconTile name={fit.icon} size={48} iconSize={20} />
              <h3 className="mt-[19px] text-[21.5px] leading-[26px] tracking-[-0.01em]">
                {fit.problem}
              </h3>
              <p className="mt-[10px] text-[15.5px] leading-[24px] text-muted">{fit.text}</p>
              <Link
                href={fit.href}
                className={`mt-[14px] inline-block text-[15px] font-semibold ${link}`}
              >
                {fit.anchor}
              </Link>
            </Card>
          ))}
        </ul>
      </SeoSection>

      <section
        aria-labelledby="faq-title"
        className="container-site mt-[104px] grid gap-10 lg:grid-cols-[464px_1fr]"
      >
        <h2 id="faq-title" className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
          Common questions
        </h2>
        <FAQ items={servicesFaq} />
      </section>

      <JsonLd
        data={services.map((s) =>
          serviceSchema({
            name: s.anchor.charAt(0).toUpperCase() + s.anchor.slice(1),
            serviceType: s.seo.keyword,
            description: s.seo.description,
            path: `/services/${s.slug}`,
          }),
        )}
      />

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Not sure which service you need?"
          text="Describe the problem. We will tell you what fits best."
        />
      </div>
    </>
  );
}
