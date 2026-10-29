import type { Fact } from "@/content/types";

export function FactsStrip({ facts }: { facts: Fact[] }) {
  return (
    <dl className="m-0 grid overflow-hidden rounded-card border border-line bg-secondary sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact, i) => (
        <div
          key={fact.label}
          className={`flex flex-col px-[26px] pt-[20px] pb-[21px] ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${
            i % 2 === 1 ? "sm:border-l sm:border-line" : ""
          } ${i > 1 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:border-line" : ""}`}
        >
          <dt className="text-[13px] leading-[18px] text-muted">{fact.label}</dt>
          <dd className="m-0 mt-[6px] font-heading text-[17px] leading-[22px] font-semibold">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
