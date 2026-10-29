import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "Background", value: "#1B1D21", className: "bg-bg border border-line" },
  { name: "Secondary", value: "#2A2D33", className: "bg-secondary border border-line" },
  { name: "Primary", value: "#FF6B2C", className: "bg-primary text-on-primary" },
  { name: "Accent", value: "#FFC15E", className: "bg-accent text-on-primary" },
  { name: "Text", value: "#F4F1EE", className: "bg-text text-on-primary" },
];

/** Style guide for development only (images/agentix-08-style-guide.png). */
export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="pt-[84px] pb-[104px]">
      <div className="container-site pt-[46px]">
        <p className="text-[14px] text-muted">
          Design system / <span className="text-text">Forge Orange</span>
        </p>
        <h1 className="mt-[18px] text-[60px] leading-[1.05] tracking-[-0.03em]">
          Agentix style guide
        </h1>

        <h2 className="mt-[72px] text-[44px] tracking-[-0.02em]">Colors</h2>
        <ul className="m-0 mt-[32px] grid list-none gap-[16px] p-0 sm:grid-cols-5">
          {colors.map((c) => (
            <li
              key={c.name}
              className={`flex h-[150px] flex-col justify-end rounded-card p-[18px] ${c.className}`}
            >
              <span className="font-semibold">{c.name}</span>
              <span className="text-[13px]">{c.value}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-[72px] text-[44px] tracking-[-0.02em]">Typography</h2>
        <p className="mt-[24px] font-heading text-[70px] leading-[74px] font-bold tracking-[-0.035em]">
          Your repetitive work
        </p>
        <p className="mt-[16px] font-heading text-[44px] font-bold tracking-[-0.02em]">
          What we build for you
        </p>
        <p className="mt-[16px] font-heading text-[24px] font-bold">AI Agents</p>
        <p className="mt-[16px] max-w-[640px] text-[17px] leading-[1.55]">
          We build custom AI agents and n8n workflows for support, sales and operations.
        </p>

        <h2 className="mt-[72px] text-[44px] tracking-[-0.02em]">Buttons and chips</h2>
        <div className="mt-[32px] flex flex-wrap items-center gap-[14px]">
          <ButtonLink href="/design-system">Primary</ButtonLink>
          <ButtonLink href="/design-system" variant="secondary">
            Secondary
          </ButtonLink>
          <ButtonLink href="/design-system" size="sm">
            Small
          </ButtonLink>
          <Chip variant="featured">Selected</Chip>
          <Chip>Default</Chip>
          <Chip variant="filled">Tag</Chip>
        </div>

        <h2 className="mt-[72px] text-[44px] tracking-[-0.02em]">Cards and icons</h2>
        <div className="mt-[32px]">
          <FeatureCards
            features={[
              { icon: "bot", title: "Card title", text: "Short supporting text for the card." },
              {
                icon: "workflow",
                title: "Card title",
                text: "Short supporting text for the card.",
              },
              { icon: "browser", title: "Card title", text: "Short supporting text for the card." },
              { icon: "chat", title: "Card title", text: "Short supporting text for the card." },
            ]}
          />
        </div>
      </div>
      <div className="mt-[104px]">
        <CtaBand
          title="Call to action band"
          text="One bold orange block per page, used for the final call to action."
        />
      </div>
    </div>
  );
}
