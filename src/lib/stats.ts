export interface Stat {
  value: string;
  label: string;
}

import { services } from "@/content/services";
import { EXPERIENCE } from "@/content/site";

/**
 * Site stats. Projects and years are confirmed facts; the product count is the
 * number of published products in the database, and the service count comes
 * from the services list.
 */
export function getStats(productCount: number): Stat[] {
  return [
    { value: EXPERIENCE.projects, label: "projects delivered" },
    { value: EXPERIENCE.years, label: "years of experience" },
    { value: String(productCount), label: "products in our portfolio" },
    { value: String(services.length), label: "core services" },
  ];
}
