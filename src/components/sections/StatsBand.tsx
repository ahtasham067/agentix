import { getStats } from "@/lib/stats";

/** "Agentix in numbers". The product count comes from the published products. */
export function StatsBand({ productCount }: { productCount: number }) {
  const stats = getStats(productCount);
  return (
    <dl className="m-0 grid grid-cols-2 overflow-hidden rounded-card border border-line bg-secondary lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col-reverse px-[34px] pt-[40px] pb-[40px] ${
            i > 0 ? "lg:border-l lg:border-line" : ""
          } ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
        >
          <dt className="mt-[10px] text-[16px] leading-[24px] text-muted">{stat.label}</dt>
          <dd className="m-0 font-heading text-[56px] leading-[1] font-bold tracking-[-0.02em] text-primary">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
