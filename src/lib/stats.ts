export interface Stat {
  value: string;
  label: string;
}

/**
 * Site stats. 20+, 5+ and 3 are fixed facts from the brief; the product count
 * is the number of published products in the database.
 * TODO: confirm "20+ projects delivered" — the owner's CV says 12+.
 */
export function getStats(productCount: number): Stat[] {
  return [
    { value: "20+", label: "projects delivered" },
    { value: "5+", label: "years of experience" },
    { value: String(productCount), label: "products in our portfolio" },
    { value: "3", label: "core services" },
  ];
}
