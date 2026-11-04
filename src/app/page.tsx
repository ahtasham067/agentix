import type { Metadata } from "next";
import { ServiceLinks } from "@/components/sections/ServiceLinks";
import { HeroWorkflow } from "@/components/illustrations/HeroWorkflow";
import { PageGlow } from "@/components/layout/PageGlow";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQ } from "@/components/sections/FAQ";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PageUpdated } from "@/components/sections/LastUpdated";
import { Pricing } from "@/components/sections/Pricing";
import { SeoSection } from "@/components/sections/SeoSection";
import { ServiceBento } from "@/components/sections/ServiceBento";
import { StatsBand } from "@/components/sections/StatsBand";
import { Steps } from "@/components/sections/Steps";
import { ToolsGrid } from "@/components/sections/ToolsGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { AppLink as Link } from "@/components/ui/AppLink";
import { homeFaq, homeUseCases, howWeWork } from "@/content/home";
import { pageSeo } from "@/content/seo";
import { getPublishedProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(pageSeo.home);

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
          <p
            data-visual-mask=""
            className="mx-auto mt-[16px] max-w-[630px] text-center text-[18px] leading-[1.55] text-muted md:text-[19.5px] md:leading-[31px]"
          >
            We build custom AI agents, chatbots, automation workflows and web apps for support,
            sales and operations.
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
          intro="AI agents, automation, web development and SEO from one team."
          link={{ href: "/services", label: "All services" }}
          className="[&_p]:mt-[12px]!"
        />
        <div className="mt-[35px]">
          <ServiceBento />
        </div>
      </section>

      <Pricing className="mt-[104px]" />

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

      <SeoSection
        id="use-cases-title"
        title={homeUseCases.heading}
        intro={homeUseCases.intro}
        className="mt-[104px]"
      >
        <FeatureCards features={homeUseCases.items} />
        <p className="mt-[28px] max-w-[760px] text-[17px] leading-[1.6] text-muted">
          Explore our <ServiceLinks />, or read{" "}
          <Link href="/about" className="text-accent underline underline-offset-[3px]">
            how Agentix works
          </Link>
          .
        </p>
      </SeoSection>

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

      <PageUpdated date={pageSeo.home.lastModified} />

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Have a task you want to automate?"
          text="Tell us about it. We reply with a plan and a timeline."
        />
      </div>
    </>
  );
}
