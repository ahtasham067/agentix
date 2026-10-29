import { AppLink as Link } from "@/components/ui/AppLink";
import { notFound } from "next/navigation";
import { ClinideskDashboard } from "@/components/illustrations/ClinideskDashboard";
import { ProductThumb } from "@/components/illustrations/ProductThumbs";
import { CalendarScreen, PatientHistoryScreen } from "@/components/illustrations/Screens";
import { WindowFrame } from "@/components/illustrations/WindowFrame";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FactsStrip } from "@/components/sections/FactsStrip";
import { FAQ } from "@/components/sections/FAQ";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { SeoSection } from "@/components/sections/SeoSection";
import { Steps } from "@/components/sections/Steps";
import { ButtonLink } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { serviceLinks } from "@/content/services";
import type { Product } from "@/lib/product-model";
import { getProductBySlug, getPublishedProducts } from "@/lib/products";

// Wait for the complete page (no streamed shell), so unknown slugs return a real 404.
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const products = await getPublishedProducts();
  return products.map((p) => ({ slug: p.slug }));
}

function HeroVisual({ product }: { product: Product }) {
  if (product.thumbnail === "clinidesk") {
    return <ClinideskDashboard className="window-glow" />;
  }
  return (
    <WindowFrame title={`${product.name} · Preview`} className="window-glow">
      <div className="flex h-[294px] items-center justify-center bg-brown">
        <ProductThumb thumbnail={product.thumbnail} />
      </div>
    </WindowFrame>
  );
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getPublishedProducts();
  const related = product.relatedProjects
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3);
  const services = product.relatedServices.map((s) => serviceLinks[s]);
  const featureColumns = product.features.length % 3 === 0 ? 3 : 4;

  return (
    <>
      <PageHero
        innerClassName="pt-[42px]"
        eyebrow={<ChipList items={product.tags} variant="filled" className="mt-[17px] gap-[8px]" />}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
        title={product.name}
        titleClassName="md:text-[64px] mt-[12px]! md:leading-[69px]!"
        aside={
          <div className="relative w-full lg:mt-[5px] lg:w-[672px]">
            <HeroVisual product={product} />
          </div>
        }
      >
        {product.tagline && (
          <p className="mt-[14px] text-[20px] leading-[28px] md:text-[21.5px]">{product.tagline}</p>
        )}
        <p className="mt-[16px] max-w-[500px] text-[18px] leading-[1.55] text-muted md:text-[19.5px] md:leading-[30px]">
          {product.description}
        </p>
        <div className="mt-[34px] flex flex-wrap gap-[14px]">
          {product.websiteUrl ? (
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex h-[52px] items-center rounded-[12px] bg-primary px-[29px] text-[16px] font-semibold text-on-primary hover:bg-[#ff7d45]"
            >
              Visit {new URL(product.websiteUrl).host}
            </a>
          ) : null}
          <ButtonLink href="/contact" variant={product.websiteUrl ? "secondary" : "primary"}>
            Get a Quote
          </ButtonLink>
        </div>
      </PageHero>

      {product.facts.length > 0 && (
        <div className="container-site mt-[48px]">
          <FactsStrip facts={product.facts} />
        </div>
      )}

      {product.features.length > 0 && (
        <section aria-labelledby="features-title" className="container-site mt-[104px]">
          <SectionHead
            id="features-title"
            title="What it does"
            intro={`The parts of ${product.name} that ${product.audience ? "people" : "users"} use every day.`}
          />
          <div className="mt-[36px]">
            <FeatureCards features={product.features} columns={featureColumns} />
          </div>
        </section>
      )}

      {product.steps.length > 0 && (
        <section aria-labelledby="steps-title" className="container-site mt-[104px]">
          <SectionHead id="steps-title" title="How it works" />
          <div className="mt-[36px]">
            <Steps steps={product.steps} columns={3} />
          </div>
        </section>
      )}

      {product.screens.length > 0 && (
        <section aria-labelledby="screens-title" className="container-site mt-[104px]">
          <SectionHead id="screens-title" title="Screens" />
          <div className="mt-[34px] grid gap-[24px] md:grid-cols-2">
            {product.screens.includes("calendar") && <CalendarScreen />}
            {product.screens.includes("patient-history") && <PatientHistoryScreen />}
          </div>
        </section>
      )}

      {product.builtWith.length > 0 && (
        <section aria-labelledby="built-title" className="container-site mt-[104px]">
          <SectionHead id="built-title" title="Built with" />
          <ChipList items={product.builtWith} className="mt-[36px] gap-[10px]" />
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="more-title" className="container-site mt-[104px]">
          <SectionHead
            id="more-title"
            title="More products"
            link={{ href: "/products", label: "See all products" }}
          />
          <ul className="m-0 mt-[34px] grid list-none gap-[24px] p-0 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.sections.length > 0 && (
        <SeoSection id="details-title" title={product.sections[0].heading} className="mt-[104px]">
          {product.sections.map((section, i) => (
            <div key={section.heading} className={i > 0 ? "mt-10" : ""}>
              {i > 0 && (
                <h3 className="text-[24px] leading-[1.25] tracking-[-0.01em]">{section.heading}</h3>
              )}
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-[12px] max-w-[760px] text-[17px] leading-[1.6] text-muted">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ChipList items={section.bullets} className="mt-[16px] gap-[10px]" />
              )}
            </div>
          ))}
          <p className="mt-10 max-w-[760px] text-[17px] leading-[1.6] text-muted">
            {product.name} is part of our{" "}
            {services.map((s, i) => (
              <span key={s.href}>
                {i > 0 && (i === services.length - 1 ? " and " : ", ")}
                <Link
                  href={s.href}
                  className="text-accent underline underline-offset-[3px] hover:text-text"
                >
                  {s.anchor}
                </Link>
              </span>
            ))}{" "}
            work. Want something similar?{" "}
            <Link
              href="/contact"
              className="text-accent underline underline-offset-[3px] hover:text-text"
            >
              Get a quote for your project
            </Link>
            .
          </p>
        </SeoSection>
      )}

      {product.faqs.length > 0 && (
        <SeoSection id="product-faq-title" title={`${product.name} FAQ`} className="mt-[104px]">
          <div className="max-w-[880px]">
            <FAQ items={product.faqs} defaultOpen={0} />
          </div>
        </SeoSection>
      )}

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title={
            product.thumbnail === "clinidesk"
              ? "Need a system like CliniDesk?"
              : `Need something like ${product.name}?`
          }
          text={
            product.thumbnail === "clinidesk"
              ? "We can build an appointment or booking agent for your business."
              : "Tell us what you need. We will suggest the right approach and a price."
          }
        />
      </div>
    </>
  );
}
