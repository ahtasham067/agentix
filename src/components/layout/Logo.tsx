import Link from "next/link";

/** Agentix mark: an orange tile with a compass-style "A". */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true" focusable="false">
      <rect width="34" height="34" rx="8" fill="var(--primary)" />
      <g
        fill="none"
        stroke="var(--on-primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="17" cy="10.2" r="2.1" />
        <path d="M15.9 12.1 11 25.2M18.1 12.1 23 25.2" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex w-fit items-center gap-[11px] ${className}`}>
      <LogoMark />
      <span className="font-heading text-[24px] leading-none font-bold tracking-[-0.01em]">
        Agentix
      </span>
      <span className="sr-only">home</span>
    </Link>
  );
}
