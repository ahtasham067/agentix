import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardWindow } from "@/components/illustrations/DashboardWindow";
import { HeroWorkflow } from "@/components/illustrations/HeroWorkflow";
import { ServiceVisual } from "@/components/illustrations/ServiceVisual";
import { SupportChat } from "@/components/illustrations/SupportChat";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQ } from "@/components/sections/FAQ";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { SeoSection } from "@/components/sections/SeoSection";
import { Steps } from "@/components/sections/Steps";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { ChipList } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { getService, serviceLinks, services, type Service } from "@/content/services";
import { matchesService } from "@/lib/product-model";
import { getPublishedProducts } from "@/lib/products";

// Blocking render: unknown slugs return a real 404 and pages ship complete HTML.
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function HeroVisual({ service }: { service: Service }) {
  if (service.hero.visual === "support-chat") return <SupportChat className="relative" />;
  if (service.hero.visual === "workflow") return <HeroWorkflow compact className="relative" />;
  return <DashboardWindow className="relative" />;
}

function OutcomeVisual({ service }: { service: Service }) {
  if (service.slug === "ai-agents") return <HeroWorkflow compact className="relative" />;
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
        titleClassName="max-w-[600px] md:text-[62px]"
        intro={service.hero.intro}
        introClassName="max-w-[490px] mt-[22px]!"
        aside={
          <div className="relative w-full lg:mt-[22px] lg:w-[672px]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[30px] top-[45%] bottom-[-30px] rounded-[40px] bg-[rgb(255_107_44/0.35)] blur-[60px]"
            />
            <HeroVisual service={service} />
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

      <section aria-labelledby="can-do-title" className="container-site mt-[104px]">
        <SectionHead
          id="can-do-title"
          title={service.capabilitiesTitle}
          intro={service.capabilitiesIntro}
        />
        <div className="mt-[36px]">
          <FeatureCards features={service.capabilities} />
        </div>
      </section>

      <section
        aria-labelledby="get-title"
        className="container-site mt-[105px] grid items-center gap-10 lg:grid-cols-2 lg:gap-x-[64px]"
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
            className="mt-[26px] gap-[14.67px] [&_li]:text-[16.8px]"
          />
          <ButtonLink href="/contact" className="mt-[35px]">
            Get a Quote
          </ButtonLink>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-[30px] top-[55%] bottom-[-30px] rounded-[40px] bg-[rgb(255_107_44/0.3)] blur-[60px]"
          />
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
          <ul className="m-0 mt-[34px] grid list-none gap-[24px] p-0 md:grid-cols-2">
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="connects-title" className="container-site mt-[104px]">
        <SectionHead id="connects-title" title="Connects with" />
        <ChipList items={service.connects} className="mt-[36px] gap-[10px]" />
      </section>

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
              {i > 0 && " and "}
              <Link href={serviceLinks[s.slug].href} className="text-accent hover:underline">
                {serviceLinks[s.slug].anchor}
              </Link>
            </span>
          ))}
          , or browse the{" "}
          <Link href="/products" className="text-accent hover:underline">
            AI agents and web apps we have built
          </Link>
          .
        </p>
      </SeoSection>

      <SeoSection id="process-title" title={service.process.heading} className="mt-[96px]">
        <Steps steps={service.process.steps} />
      </SeoSection>

      <section
        aria-labelledby="faq-title"
        className="container-site mt-[105px] grid gap-10 lg:grid-cols-[464px_1fr]"
      >
        <h2 id="faq-title" className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
          {service.faqTitle}
        </h2>
        <FAQ items={service.faqs} />
      </section>

      <div className="mt-[104px] mb-[104px]">
        <CtaBand title={service.cta.title} text={service.cta.text} />
      </div>
    </>
  );
}
