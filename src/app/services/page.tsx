import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQ } from "@/components/sections/FAQ";
import { PageUpdated } from "@/components/sections/LastUpdated";
import { Pricing } from "@/components/sections/Pricing";
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
import { getPricingGroup, pricingGroups, pricingSentence } from "@/content/pricing";
import { serviceLinks, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(pageSeo.services);

const link = "text-accent underline underline-offset-[3px]";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const fits = [
  {
    icon: "chat" as const,
    problem: "Customers wait for replies",
    text: "Questions, bookings and follow-ups pile up. A chatbot or AI agent answers in seconds and books in your tools.",
    service: serviceLinks["chatbots-ai-agents"],
  },
  {
    icon: "workflow" as const,
    problem: "Your team copies data between apps",
    text: "The same steps repeat every day. An n8n, Make.com or Zapier workflow runs them and alerts you if something fails.",
    service: serviceLinks.automation,
  },
  {
    icon: "browser" as const,
    problem: "You need a website or a portal",
    text: "Spreadsheets no longer cope, or you have no site of your own. A custom website or web app fixes both.",
    service: serviceLinks["web-development"],
  },
  {
    icon: "search" as const,
    problem: "Customers cannot find you",
    text: "You do not show up on Google or in ChatGPT answers. SEO and GEO make your site easy to find and cite.",
    service: serviceLinks["seo-geo"],
  },
];

const servicesFaq = [
  faq.whatIsAgent,
  faq.whichTools,
  faq.howLong,
  faq.customWebApps,
  faq.websiteCost,
  faq.chatbotCost,
];

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
        intro="Four services that work together: smart agents, connected workflows, web apps and search."
      />

      <div className="container-site mt-[96px] grid gap-[96px]">
        {services.map((service, i) => (
          <ServiceRow key={service.slug} service={service} reverse={i % 2 === 1} extra={i >= 3} />
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

      <Pricing className="mt-[104px]" />

      <SeoSection
        id="together-title"
        title="How do our chatbot, automation, web and SEO services work together?"
        intro="Our AI chatbot, automation, web and SEO services are designed to fit together, so one team owns the whole system."
        className="mt-[104px]"
      >
        <div className="grid max-w-[880px] gap-[14px] text-[17px] leading-[1.6] text-muted">
          <p>
            Most projects use more than one of our services. The chatbot or AI agent talks to
            people, the automation moves data between your tools, the website or web app gives your
            team a place to see and control it all, and SEO and GEO make sure customers can find you
            on Google and in AI answers.
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
          <p>
            You do not have to start with all four. Many clients begin with one workflow or one
            agent for a single job, see it working with real data, and then add the next piece. We
            build each part so it can grow without being rewritten.
          </p>
          <h3 className="mt-[14px] text-[24px] leading-[1.25] tracking-[-0.01em] text-text">
            What every project includes
          </h3>
          <p>
            A written scope and price before work starts. Regular check-ins while we build, with
            something you can try early. Testing with your real tools and data. Deployment on
            infrastructure you control, simple notes on how it works, and support after launch for
            fixes and changes.
          </p>
          <h3 className="mt-[14px] text-[24px] leading-[1.25] tracking-[-0.01em] text-text">
            How much do our services cost?
          </h3>
          <p>
            {pricingGroups.map((g) => pricingSentence(g)).join(" ")} Automation and SEO and GEO work
            are quoted on their scope: how many workflows or pages are involved and which tools need
            to be connected. Send us a short description through the quote form and we reply with a
            plan, a timeline and a clear price. If the scope changes, we agree the change and its
            price with you before we build it.
          </p>
          <h3 className="mt-[14px] text-[24px] leading-[1.25] tracking-[-0.01em] text-text">
            Who do we build for?
          </h3>
          <p>
            Our work so far has covered clinics, online stores, cross-border fintech, schools and
            researchers. The common thread is a team that repeats the same steps every day and wants
            software to take them over, without hiring a large agency.
          </p>
        </div>
      </SeoSection>

      <SeoSection id="fit-title" title="Which service fits your problem?" className="mt-[96px]">
        <ul className="m-0 grid list-none gap-[20px] p-0 md:grid-cols-2 lg:grid-cols-4">
          {fits.map((fit) => (
            <Card as="li" key={fit.service.href} className="p-[28px]">
              <IconTile name={fit.icon} size={48} iconSize={20} />
              <h3 className="mt-[19px] text-[21.5px] leading-[26px] tracking-[-0.01em]">
                {fit.problem}
              </h3>
              <p className="mt-[10px] text-[15.5px] leading-[24px] text-muted">{fit.text}</p>
              <Link
                href={fit.service.href}
                className={`mt-[14px] inline-flex min-h-[24px] items-center text-[15px] font-semibold ${link}`}
              >
                {capitalize(fit.service.anchor)}
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

      <PageUpdated date={pageSeo.services.lastModified} />

      <JsonLd
        data={services.map((s) =>
          serviceSchema({
            name: s.name,
            serviceType: s.seo.keyword,
            description: s.seo.description,
            path: `/services/${s.slug}`,
            pricing: getPricingGroup(s.slug),
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
