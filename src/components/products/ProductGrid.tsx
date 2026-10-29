"use client";

import { useState } from "react";
import {
  matchesFilter,
  PRODUCT_FILTERS,
  type Product,
  type ProductFilter,
} from "@/lib/product-model";
import { FeaturedProductCard, ProductCard, ProjectHereCard } from "./ProductCard";

type GridProduct = Pick<
  Product,
  "slug" | "name" | "summary" | "tags" | "stack" | "thumbnail" | "featured" | "category"
>;

/**
 * Product grid. All cards render on the server; the optional filter chips only
 * hide cards on the client, so every card and link is in the HTML.
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
  const [filter, setFilter] = useState<ProductFilter>("all");
  const visible = products.filter((p) => matchesFilter(p, filter));

  return (
    <div>
      {showFilters && (
        <div
          role="group"
          aria-label="Filter products"
          className="mb-[42px] flex flex-wrap gap-[10px]"
        >
          {PRODUCT_FILTERS.map((f) => {
            const selected = filter === f.key;
            const label = f.key === "all" ? `All ${products.length}` : f.label;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f.key)}
                className={`h-[40px] cursor-pointer rounded-full px-[20px] text-[15px] leading-none font-medium transition-colors ${
                  selected
                    ? "bg-primary text-on-primary"
                    : "border border-line text-text/90 hover:border-[rgb(244_241_238/0.35)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
      <ul className="m-0 grid list-none gap-[24px] p-0 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) =>
          product.featured ? (
            <li key={product.slug} className="md:col-span-2" data-product={product.slug}>
              <FeaturedProductCard product={product} headingLevel={headingLevel} />
            </li>
          ) : (
            <li key={product.slug} data-product={product.slug}>
              <ProductCard product={product} headingLevel={headingLevel} />
            </li>
          ),
        )}
        <li>
          <ProjectHereCard headingLevel={headingLevel} />
        </li>
      </ul>
      {visible.length === 0 && (
        <p className="mt-6 text-muted" role="status">
          No products in this category yet.
        </p>
      )}
    </div>
  );
}
