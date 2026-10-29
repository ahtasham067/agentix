import { PageHero } from "@/components/layout/PageHero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { getPublishedProducts } from "@/lib/products";

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
        <h2 id="all-products" className="sr-only" data-seo-extra>
          All products
        </h2>
        <ProductGrid products={products} showFilters />
      </section>

      <TrustStrip className="mt-[104px]" />

      <div className="mt-[104px] mb-[104px]">
        <CtaBand
          title="Want something like these?"
          text="Tell us what you need. We will suggest the right approach and a price."
        />
      </div>
    </>
  );
}
