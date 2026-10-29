import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQ } from "@/components/sections/FAQ";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { Steps } from "@/components/sections/Steps";
import { SectionHead } from "@/components/ui/SectionHead";
import { faq } from "@/content/faq";
import { howWeWork } from "@/content/home";
import { services } from "@/content/services";

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

      <section
        aria-labelledby="faq-title"
        className="container-site mt-[104px] grid gap-10 lg:grid-cols-[464px_1fr]"
      >
        <h2 id="faq-title" className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
          Common questions
        </h2>
        <FAQ items={servicesFaq} />
      </section>

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Not sure which service you need?"
          text="Describe the problem. We will tell you what fits best."
        />
      </div>
    </>
  );
}
