import type { Metadata } from "next";
import { ServiceLinks } from "@/components/sections/ServiceLinks";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { ContactDetails, NextSteps } from "@/components/sections/ContactInfo";
import { FAQ } from "@/components/sections/FAQ";
import { LastUpdated } from "@/components/sections/LastUpdated";
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
        intro="To get a quote for AI automation and web development, share a few details. They help us give you an accurate plan, timeline and price."
        className="mb-[104px]"
      >
        <CheckList
          items={[
            "What you want to build or automate, in your own words",
            "The tools you use today, such as WhatsApp, Gmail, Sheets or a CRM",
            "Roughly how many messages, bookings or users you expect",
            "When you would like it to go live",
            "Any links, screenshots or examples of what you like",
          ]}
        />
        <p className="mt-[20px] max-w-[760px] text-[17px] leading-[1.6] text-muted">
          You do not need a full specification. A few honest sentences are enough for a first reply,
          and we will ask about anything that is missing. Not sure which service you need? Read
          about <ServiceLinks />, or see{" "}
          <Link href="/products" className={link}>
            the products we have built
          </Link>
          .
        </p>
        <LastUpdated date={pageSeo.contact.lastModified} className="mt-[24px]" />
      </SeoSection>

      <JsonLd data={contactPageSchema(pageSeo.contact)} />
    </>
  );
}
