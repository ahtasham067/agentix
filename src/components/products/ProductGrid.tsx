import { matchesFilter, PRODUCT_FILTERS } from "@/lib/product-filters";
import type { Product } from "@/lib/product-model";
import { FeaturedProductCard, ProductCard, ProjectHereCard } from "./ProductCard";
import { ProductFilter } from "./ProductFilter";

type GridProduct = Pick<
  Product,
  "slug" | "name" | "summary" | "tags" | "stack" | "thumbnail" | "featured" | "category"
>;

/** Filter keys a product belongs to, used by the CSS filter. */
function matchKeys(product: GridProduct) {
  return PRODUCT_FILTERS.filter((f) => f.key !== "all" && matchesFilter(product, f.key))
    .map((f) => f.key)
    .join(" ");
}

/**
 * Product grid, rendered on the server. With `showFilters` a small client
 * component adds the filter chips; filtering only toggles visibility.
 */
export function ProductGrid({
  products,
  showFilters = false,
  headingLevel = 3,
}: {
  products: GridProduct[];
  showFilters?: boolean;
  headingLevel?: 2 | 3;
}) {
  const grid = (
    <ul className="m-0 grid list-none grid-cols-1 gap-[24px] p-0 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) =>
        product.featured ? (
          <li
            key={product.slug}
            className="md:col-span-2"
            data-product={product.slug}
            data-match={matchKeys(product)}
          >
            <FeaturedProductCard product={product} headingLevel={headingLevel} />
          </li>
        ) : (
          <li key={product.slug} data-product={product.slug} data-match={matchKeys(product)}>
            <ProductCard product={product} headingLevel={headingLevel} />
          </li>
        ),
      )}
      <li>
        <ProjectHereCard headingLevel={headingLevel} />
      </li>
    </ul>
  );

  return showFilters ? <ProductFilter total={products.length}>{grid}</ProductFilter> : grid;
}
