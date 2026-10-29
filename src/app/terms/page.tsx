import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
import { legalUpdated, terms } from "@/content/legal";

export const metadata: Metadata = buildMetadata(pageSeo.terms);

export default function TermsPage() {
  return <LegalPage title="Terms of use" href="/terms" updated={legalUpdated} sections={terms} />;
}
