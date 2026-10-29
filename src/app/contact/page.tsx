import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { ContactDetails, NextSteps } from "@/components/sections/ContactInfo";
import { FAQ } from "@/components/sections/FAQ";
import { SeoSection } from "@/components/sections/SeoSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppLink as Link } from "@/components/ui/AppLink";
import { CheckList } from "@/components/ui/CheckList";
import { contactFaq, nextSteps } from "@/content/contact";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
import { contactPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(pageSeo.contact);

const link = "text-accent underline underline-offset-[3px]";

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        title="Get a quote"
        titleClassName="md:leading-[63px]!"
        intro="Tell us what you want to build or automate. We reply with a plan and a timeline."
        introClassName="max-w-[640px] md:text-[19px]!"
      />

      <div className="container-site mt-[44px] grid items-start gap-[24px] lg:grid-cols-[723px_1fr] lg:gap-x-[40px]">
        <QuoteForm />
        <div className="grid gap-[24px]">
          <ContactDetails />
          <NextSteps steps={nextSteps} />
        </div>
      </div>

      <section
        aria-labelledby="faq-title"
        className="container-site mt-[104px] mb-[104px] grid gap-10 lg:grid-cols-[464px_1fr]"
      >
        <h2 id="faq-title" className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
          Before you write
        </h2>
        <FAQ items={contactFaq} />
      </section>

      <SeoSection
        id="include-title"
        title="What to include in your quote request"
        intro="A few details help us give you an accurate plan and price for AI automation or web development."
        className="mb-[104px]"
      >
        <CheckList
          items={[
            "What you want to build or automate, in your own words",
            "The tools you use today, such as WhatsApp, Gmail, Sheets or a CRM",
            "Roughly how many messages, bookings or users you expect",
            "When you would like it to go live",
          ]}
        />
        <p className="mt-[20px] max-w-[760px] text-[17px] leading-[1.6] text-muted">
          Not sure which service you need? Read about{" "}
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
      </SeoSection>

      <JsonLd data={contactPageSchema(pageSeo.contact)} />
    </>
  );
}
