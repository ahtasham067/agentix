import { ChipList } from "@/components/ui/Chip";
import { TRUST_STRIP_TOOLS } from "@/content/tools";

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`container-site ${className}`}>
      <div className="flex flex-col gap-5 border-y border-line pt-[25px] pb-[23px] lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-heading text-[20px] leading-[22px] font-bold">
            20+ projects delivered
          </p>
          <p className="mt-[4px] text-[14px] leading-[18px] text-muted">
            5+ years building web apps and automation
          </p>
        </div>
        <ChipList
          items={TRUST_STRIP_TOOLS}
          label="Tools we use"
          className="gap-[10px]"
          visualMask
        />
      </div>
    </div>
  );
}
