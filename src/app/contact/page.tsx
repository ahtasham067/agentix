import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { ContactDetails, NextSteps } from "@/components/sections/ContactInfo";
import { FAQ } from "@/components/sections/FAQ";
import { contactFaq, nextSteps } from "@/content/contact";

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        title="Get a quote"
        intro="Tell us what you want to build or automate. We reply with a plan and a timeline."
        introClassName="max-w-[640px]"
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
        className="container-site mt-[105px] mb-[105px] grid gap-10 lg:grid-cols-[464px_1fr]"
      >
        <h2 id="faq-title" className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[46px]">
          Before you write
        </h2>
        <FAQ items={contactFaq} />
      </section>
    </>
  );
}
