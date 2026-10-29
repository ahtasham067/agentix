import Link from "next/link";

/** Section title (h2), optional intro line and optional right-aligned link. */
export function SectionHead({
  title,
  intro,
  link,
  id,
  className = "",
}: {
  title: string;
  intro?: string;
  link?: { href: string; label: string };
  id?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-3 ${className}`}>
      <div>
        <h2 id={id} className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
          {title}
        </h2>
        {intro && <p className="mt-[11px] text-[17px] leading-[1.55] text-muted">{intro}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="pb-[2px] text-[16px] leading-[24px] font-semibold text-accent hover:underline"
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}
