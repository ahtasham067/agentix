import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { SeoSection } from "@/components/sections/SeoSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { AppLink as Link } from "@/components/ui/AppLink";
import { pageSeo } from "@/content/seo";
import { getPublishedProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(pageSeo.products);

const link = "text-accent underline underline-offset-[3px]";

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
        title="Products we have built"
        intro="AI agents and web apps, built by the Agentix team for real use."
      />

      <section aria-labelledby="all-products" className="container-site mt-[33px]">
        <h2 id="all-products" className="sr-only">
          All products
        </h2>
        <ProductGrid products={products} showFilters />
      </section>

      <TrustStrip className="mt-[104px]" />

      <SeoSection
        id="portfolio-title"
        title="A portfolio of AI agents and web apps"
        className="mt-[104px]"
      >
        <div className="grid max-w-[880px] gap-[14px] text-[17px] leading-[1.6] text-muted">
          <p>
            Our software products portfolio covers two kinds of work. AI agents talk to customers
            and take action in your tools, like{" "}
            <Link href="/products/clinidesk" className={link}>
              CliniDesk, a WhatsApp doctor appointment system
            </Link>
            . Web apps give a team one place to run its work, like the{" "}
            <Link href="/products/nizame-taleem" className={link}>
              Nizame-Taleem school management system
            </Link>{" "}
            or the{" "}
            <Link href="/products/research-buddy" className={link}>
              Research Buddy citation manager
            </Link>
            .
          </p>
          <p>
            Some of these are our own products and some are client projects. Each product page
            explains what the product does, how it is built and what our role was.
          </p>
          <p>
            Newer work runs on Next.js, Supabase and n8n. Larger back ends use Ruby on Rails with
            React or Vue.js. Looking for something similar? See our{" "}
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
            , or{" "}
            <Link href="/contact" className={link}>
              get a quote for your project
            </Link>
            .
          </p>
        </div>
      </SeoSection>

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Want something like these?"
          text="Tell us what you need. We will suggest the right approach and a price."
        />
      </div>
    </>
  );
}
