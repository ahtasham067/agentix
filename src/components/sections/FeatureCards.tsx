import { IconTile } from "@/components/ui/IconTile";
import type { Feature } from "@/content/types";

/** Grid of icon cards (What it does, What an agent can do, etc.). */
export function FeatureCards({ features, columns = 4 }: { features: Feature[]; columns?: 3 | 4 }) {
  return (
    <ul
      className={`m-0 grid list-none gap-[20px] p-0 sm:grid-cols-2 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {features.map((f) => (
        <li
          key={f.title}
          className="rounded-card border border-line bg-secondary p-[28px] pb-[26px]"
        >
          <IconTile name={f.icon} size={48} iconSize={20} />
          <h3 className="mt-[19px] text-[21px] leading-[26px] tracking-[-0.01em]">{f.title}</h3>
          <p className="mt-[10px] text-[15px] leading-[24px] text-muted">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}
