import { AppLink as Link } from "@/components/ui/AppLink";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardWindow } from "@/components/illustrations/DashboardWindow";
import { HeroWorkflow } from "@/components/illustrations/HeroWorkflow";
import { ServiceVisual } from "@/components/illustrations/ServiceVisual";
import { SupportChat } from "@/components/illustrations/SupportChat";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { AuthorBox } from "@/components/sections/AuthorBox";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { SeoSection } from "@/components/sections/SeoSection";
import { Steps } from "@/components/sections/Steps";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { ChipList } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";
import { getPricingGroup } from "@/content/pricing";
import { getService, serviceLinks, services, type Service } from "@/content/services";
import { matchesService } from "@/lib/product-model";
import { getPublishedProducts } from "@/lib/products";

// Wait for the complete page (no streamed shell), so unknown slugs return a real 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({ ...service.seo, path: `/services/${service.slug}` });
}

function HeroVisual({ service }: { service: Service }) {
  if (service.hero.visual === "support-chat") return <SupportChat className="window-glow" />;
  if (service.hero.visual === "workflow") return <HeroWorkflow compact className="window-glow" />;
  if (service.hero.visual === "search") return <ServiceVisual visual="search" />;
  return <DashboardWindow className="window-glow" />;
}

function OutcomeVisual({ service }: { service: Service }) {
  if (service.outcomeVisual === "hero-workflow") {
    return <HeroWorkflow compact className="window-glow" />;
  }
  return <ServiceVisual visual={service.hero.visual} />;
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const products = (await getPublishedProducts())
    .filter((p) => matchesService(p, service.slug))
    .slice(0, 4);
  const others = services.filter((s) => s.slug !== service.slug);
  const pricing = getPricingGroup(service.slug);
  const quote = `/contact?service=${service.slug}#quote`;

  return (
    <>
      <PageHero
        innerClassName="pt-[42px]"
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        title={service.hero.title}
        titleClassName="mt-[19px]! max-w-[600px] md:text-[62px] md:leading-[63.5px]!"
        intro={service.hero.intro}
        introClassName="max-w-[490px] mt-[22px]!"
        aside={
          <div className="relative w-full lg:mt-[22px] lg:w-[672px]">
            <HeroVisual service={service} />
          </div>
        }
      >
        <div className="mt-[32px] flex flex-wrap gap-[14px]">
          <ButtonLink href={quote}>Get a Quote</ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            View Products
          </ButtonLink>
        </div>
      </PageHero>

      <AnswerFirst answer={service.answer} updated={service.updated} className="mt-[64px]" />

      <section aria-labelledby="can-do-title" className="container-site mt-[104px]">
        <SectionHead
          id="can-do-title"
          title={service.capabilitiesTitle}
          intro={service.capabilitiesIntro}
        />
        <div className="mt-[35px]">
          <FeatureCards features={service.capabilities} />
        </div>
      </section>

      <section
        aria-labelledby="get-title"
        className="container-site mt-[104px] grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-x-[64px]"
      >
        <div>
          <h2
            id="get-title"
            className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]"
          >
            What you get
          </h2>
          <CheckList
            items={service.outcomes}
            className="mt-[29px] gap-[14.67px] [&_li]:text-[16.8px]"
          />
          <ButtonLink href={quote} className="mt-[35px]">
            Get a Quote
          </ButtonLink>
        </div>
        <div className="relative">
          <OutcomeVisual service={service} />
        </div>
      </section>

      {products.length > 0 && (
        <section aria-labelledby="built-title" className="container-site mt-[104px]">
          <SectionHead
            id="built-title"
            title={service.productsTitle}
            link={{ href: "/products", label: "See all products" }}
          />
          <ul className="m-0 mt-[35px] grid list-none gap-[24px] p-0 md:grid-cols-2">
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="connects-title" className="container-site mt-[105px]">
        <SectionHead id="connects-title" title="Connects with" />
        <ChipList
          items={service.connects}
          label={`Tools for ${service.name.toLowerCase()}`}
          className="mt-[36px] gap-[10px]"
        />
      </section>

      {pricing && (
        <Pricing
          groups={[pricing]}
          title={`${pricing.title} pricing`}
          intro={pricing.message}
          className="mt-[104px]"
        />
      )}

      <SeoSection id="who-title" title={service.whoFor.heading} className="mt-[104px]">
        {service.whoFor.paragraphs.map((p) => (
          <p
            key={p}
            className="mt-[12px] max-w-[760px] text-[17px] leading-[1.6] text-muted first:mt-0"
          >
            {p}
          </p>
        ))}
      </SeoSection>

      <SeoSection
        id="use-cases-title"
        title={service.useCases.heading}
        intro={service.useCases.intro}
        className="mt-[96px]"
      >
        <FeatureCards features={service.useCases.items} />
      </SeoSection>

      <SeoSection
        id="compare-title"
        title={service.comparison.heading}
        intro={service.comparison.intro}
        className="mt-[96px]"
      >
        <ComparisonTable table={service.comparison} id="compare-title" />
      </SeoSection>

      <SeoSection id="tools-title" title={service.tools.heading} className="mt-[96px]">
        {service.tools.paragraphs.map((p) => (
          <p
            key={p}
            className="mt-[12px] max-w-[760px] text-[17px] leading-[1.6] text-muted first:mt-0"
          >
            {p}
          </p>
        ))}
        <p className="mt-[12px] max-w-[760px] text-[17px] leading-[1.6] text-muted">
          See how this fits with our{" "}
          {others.map((s, i) => (
            <span key={s.slug}>
              {i > 0 && (i === others.length - 1 ? " and " : ", ")}
              <Link
                href={serviceLinks[s.slug].href}
                className="text-accent underline underline-offset-[3px] hover:text-text"
              >
                {serviceLinks[s.slug].anchor}
              </Link>
            </span>
          ))}
          , browse the{" "}
          <Link
            href="/products"
            className="text-accent underline underline-offset-[3px] hover:text-text"
          >
            AI agents and web apps we have built
          </Link>
          , or{" "}
          <Link
            href={quote}
            className="text-accent underline underline-offset-[3px] hover:text-text"
          >
            ask for a quote
          </Link>
          .
        </p>
      </SeoSection>

      <SeoSection id="process-title" title={service.process.heading} className="mt-[96px]">
        <Steps steps={service.process.steps} />
      </SeoSection>

      <section
        aria-labelledby="faq-title"
        className="container-site mt-[102px] grid gap-10 lg:grid-cols-[464px_1fr]"
      >
        <h2 id="faq-title" className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
          {service.faqTitle}
        </h2>
        <FAQ items={service.faqs} />
      </section>

      <div className="container-site">
        <AuthorBox title="Who builds this" id="builder-title" className="mt-[96px]" />
      </div>

      <JsonLd
        data={serviceSchema({
          name: service.name,
          serviceType: service.seo.keyword,
          description: service.seo.description,
          path: `/services/${service.slug}`,
          pricing,
        })}
      />

      <div className="mt-[104px] mb-[104px]">
        <CtaBand title={service.cta.title} text={service.cta.text} />
      </div>
    </>
  );
}
