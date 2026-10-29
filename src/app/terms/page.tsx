import { LegalPage } from "@/components/layout/LegalPage";
import { legalUpdated, terms } from "@/content/legal";

export default function TermsPage() {
  return <LegalPage title="Terms of use" href="/terms" updated={legalUpdated} sections={terms} />;
}
