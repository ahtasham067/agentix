"use client";

import { useState } from "react";
import { PRODUCT_FILTERS, type ProductFilter as Filter } from "@/lib/product-filters";

/**
 * Filter chips for the server-rendered product grid. It only sets
 * data-filter; CSS hides cards whose data-match does not include it.
 */
export function ProductFilter({ total, children }: { total: number; children: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");
  return (
    <div data-filter={filter}>
      <div
        role="group"
        aria-label="Filter products"
        className="mb-[44px] flex flex-wrap gap-[10px]"
      >
        {PRODUCT_FILTERS.map((f) => {
          const selected = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f.key)}
              className={`h-[41px] cursor-pointer rounded-full px-[21px] text-[15px] leading-none transition-colors ${
                selected
                  ? "bg-primary font-medium text-on-primary"
                  : "border border-line text-[rgb(244_241_238/0.8)] hover:border-[rgb(244_241_238/0.35)]"
              }`}
            >
              {f.key === "all" ? `All ${total}` : f.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}
