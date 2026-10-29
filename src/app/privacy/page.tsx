import { LegalPage } from "@/components/layout/LegalPage";
import { legalUpdated, privacy } from "@/content/legal";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" href="/privacy" updated={legalUpdated} sections={privacy} />
  );
}
