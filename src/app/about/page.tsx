import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { FounderCard } from "@/components/sections/FounderCard";
import { StatsBand } from "@/components/sections/StatsBand";
import { ToolsGrid } from "@/components/sections/ToolsGrid";
import { ButtonLink } from "@/components/ui/Button";
import { SeoSection } from "@/components/sections/SeoSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHead } from "@/components/ui/SectionHead";
import { aboutIntro, principles, story } from "@/content/about";
import { pageSeo } from "@/content/seo";
import { getPublishedProductCount } from "@/lib/products";
import { buildMetadata } from "@/lib/seo/metadata";
import { aboutPageSchema, founderPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(pageSeo.about);

const link = "text-accent underline underline-offset-[3px]";

export default async function AboutPage() {
  const productCount = await getPublishedProductCount();

  return (
    <>
      <PageHero
        innerClassName="pt-[42px]"
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        title={
          <>
            We build software <br className="hidden md:block" />
            that does the work.
          </>
        }
        titleClassName="md:text-[62px] md:leading-[65px]"
        intro={aboutIntro}
        introClassName="max-w-[530px] mt-[20px]! md:leading-[30px]!"
        aside={
          <div className="w-full self-center lg:w-[672px]">
            <FounderCard />
          </div>
        }
      >
        <div className="mt-[33px] flex flex-wrap gap-[14px]">
          <ButtonLink href="/contact">Get a Quote</ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            View Products
          </ButtonLink>
        </div>
      </PageHero>

      <div className="container-site mt-[104px]">
        <StatsBand productCount={productCount} />
      </div>

      <section
        aria-labelledby="story-title"
        className="container-site mt-[103px] grid items-center gap-8 lg:grid-cols-[672px_1fr] lg:gap-0"
      >
        <h2
          id="story-title"
          className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px] lg:translate-y-[2px]"
        >
          Our story
        </h2>
        <div className="grid gap-[17px]">
          {story.map((p) => (
            <p
              key={p}
              className="text-[17px] leading-[1.8] text-muted md:text-[18.2px] md:leading-[30.67px]"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-title" className="container-site mt-[106px]">
        <SectionHead id="how-title" title="How we work" />
        <div className="mt-[35px] [&_ul]:gap-[24px]">
          <FeatureCards features={principles} columns={3} />
        </div>
      </section>

      <section aria-labelledby="tools-title" className="container-site mt-[104px]">
        <SectionHead id="tools-title" title="Tools we build with" />
        <div className="mt-[35px]">
          <ToolsGrid />
        </div>
      </section>

      <SeoSection
        id="software-house-title"
        title="What Agentix does as a software house"
        className="mt-[104px]"
      >
        <div className="grid max-w-[880px] gap-[14px] text-[17px] leading-[1.6] text-muted">
          <p>
            Agentix is a small software house led by founder Ahtasham Naeem, a full-stack developer
            with more than 5 years of experience across fintech, e-commerce, education and
            healthcare and a BS in Computer Science from COMSATS University Islamabad. We build with
            Ruby on Rails, React, Next.js, Vue.js and Supabase, and we build AI agents and workflows
            with n8n, OpenAI, retrieval (RAG) and MCP.
          </p>
          <p>
            You work with the people who write the code. We agree the scope and price before we
            start, keep the stack simple so your system is easy to run, and stay available after
            launch for fixes and changes.
          </p>
          <p>
            See our{" "}
            <Link href="/services" className={link}>
              AI agent, n8n and web app development services
            </Link>
            , browse the{" "}
            <Link href="/products" className={link}>
              products we have built
            </Link>
            , or{" "}
            <Link href="/contact" className={link}>
              tell us about your project
            </Link>
            .
          </p>
        </div>
      </SeoSection>

      <JsonLd data={[aboutPageSchema(pageSeo.about), founderPageSchema()]} />

      <div className="mt-[103px] mb-[103px]">
        <CtaBand title="Let's work together" text="Tell us what you want to build or automate." />
      </div>
    </>
  );
}
