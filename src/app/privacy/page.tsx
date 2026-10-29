import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageSeo } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";
import { legalUpdated, privacy } from "@/content/legal";

export const metadata: Metadata = buildMetadata(pageSeo.privacy);

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" href="/privacy" updated={legalUpdated} sections={privacy} />
  );
}
