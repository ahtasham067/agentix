import { ChipList } from "@/components/ui/Chip";
import { founder } from "@/content/site";

export function FounderCard() {
  return (
    <figure className="m-0 flex items-center gap-[26px] rounded-card border border-line bg-secondary px-[36px] py-[38px]">
      <span
        aria-hidden="true"
        className="flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-full bg-primary font-heading text-[32px] font-bold text-on-primary"
      >
        {founder.initials}
      </span>
      <figcaption>
        <p className="font-heading text-[26px] leading-[32px] font-bold tracking-[-0.01em]">
          {founder.name}
        </p>
        <p className="mt-[2px] text-[17px] leading-[26px] text-muted">{founder.role}</p>
        <ChipList items={founder.skills} label="Main skills" className="mt-[12px] gap-[10px]" />
      </figcaption>
    </figure>
  );
}
