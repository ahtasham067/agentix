import { HeroWorkflow } from "@/components/illustrations/HeroWorkflow";
import { PageGlow } from "@/components/layout/PageGlow";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQ } from "@/components/sections/FAQ";
import { ServiceBento } from "@/components/sections/ServiceBento";
import { StatsBand } from "@/components/sections/StatsBand";
import { Steps } from "@/components/sections/Steps";
import { ToolsGrid } from "@/components/sections/ToolsGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { homeFaq, howWeWork } from "@/content/home";
import { getPublishedProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getPublishedProducts();

  return (
    <>
      <section className="relative pt-[84px]">
        <PageGlow />
        <div className="container-site relative">
          <h1 className="mx-auto mt-[47px] max-w-[760px] text-center text-[44px] leading-[1.05] tracking-[-0.035em] md:text-[70px] md:leading-[74px]">
            Your repetitive work, <br className="hidden md:block" />
            handled by AI agents.
          </h1>
          <p className="mx-auto mt-[16px] max-w-[630px] text-center text-[18px] leading-[1.55] text-muted md:text-[19.5px] md:leading-[31px]">
            We build custom AI agents and n8n workflows for support, sales and operations.
          </p>
          <div className="mt-[32px] flex flex-wrap justify-center gap-[14px]">
            <ButtonLink href="/products">View Products</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Our Services
            </ButtonLink>
          </div>
          <div className="mt-[48px]">
            <HeroWorkflow className="window-glow" />
          </div>
        </div>
      </section>

      <TrustStrip className="mt-[56px]" />

      <section aria-labelledby="build-title" className="container-site mt-[104px]">
        <SectionHead
          id="build-title"
          title="What we build for you"
          intro="Three ways we put AI to work in your business."
          link={{ href: "/services", label: "All services" }}
          className="[&_p]:mt-[12px]!"
        />
        <div className="mt-[35px]">
          <ServiceBento />
        </div>
      </section>

      <section aria-labelledby="products-title" className="container-site mt-[104px]">
        <SectionHead
          id="products-title"
          title="Our products"
          intro="Everything we have built, from AI agents to full web apps."
          link={{ href: "/products", label: "See all products" }}
        />
        <div className="mt-[37px]">
          <ProductGrid products={products} />
        </div>
      </section>

      <section aria-labelledby="numbers-title" className="container-site mt-[103px]">
        <SectionHead id="numbers-title" title="Agentix in numbers" />
        <div className="mt-[36px]">
          <StatsBand productCount={products.length} />
        </div>
      </section>

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

      <section aria-labelledby="tools-title" className="container-site mt-[104px]">
        <SectionHead id="tools-title" title="Tools we build with" />
        <div className="mt-[35px]">
          <ToolsGrid />
        </div>
      </section>

      <section
        aria-labelledby="faq-title"
        className="container-site mt-[102px] grid gap-10 lg:grid-cols-[464px_1fr]"
      >
        <div>
          <h2
            id="faq-title"
            className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]"
          >
            Questions, answered
          </h2>
          <p className="mt-[14px] text-[17.2px] leading-[26.35px] text-muted">
            Can&apos;t find yours? Send us a message and we will reply.
          </p>
          <ButtonLink href="/contact" variant="secondary" size="sm" className="mt-[26px]">
            Contact us
          </ButtonLink>
        </div>
        <FAQ items={homeFaq} />
      </section>

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Have a task you want to automate?"
          text="Tell us about it. We reply with a plan and a timeline."
        />
      </div>
    </>
  );
}
