import type { Metadata } from "next";
import Link from "next/link";
import { PageGlow } from "@/components/layout/PageGlow";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/services/ai-agents", label: "Custom AI agent development" },
  { href: "/services/n8n-automation", label: "n8n automation services" },
  { href: "/services/web-apps", label: "Next.js web app development" },
  { href: "/products", label: "AI agents and web apps we have built" },
  { href: "/about", label: "About Agentix" },
];

export default function NotFound() {
  return (
    <section className="relative pt-[84px]">
      <PageGlow />
      <div className="container-site relative pt-[80px] pb-[120px]">
        <p className="font-heading text-[18px] font-bold text-primary">404</p>
        <h1 className="mt-[12px] text-[40px] leading-[1.08] tracking-[-0.03em] md:text-[60px]">
          This page does not exist.
        </h1>
        <p className="mt-[16px] max-w-[560px] text-[18px] leading-[1.55] text-muted">
          The link may be old or mistyped. These pages are a good place to start.
        </p>
        <ul className="m-0 mt-[32px] grid max-w-[560px] list-none gap-[10px] p-0">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-[17px] text-accent hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-[36px] flex flex-wrap gap-[14px]">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get a Quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
