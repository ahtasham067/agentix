import type { TocEntry } from "@/lib/markdown";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null;
  return (
    <nav
      aria-label="On this page"
      className="rounded-card border border-line bg-secondary p-[24px]"
    >
      <p className="text-[13px] font-semibold tracking-[0.06em] text-muted uppercase">
        On this page
      </p>
      <ol className="m-0 mt-[12px] grid list-none gap-[8px] p-0 text-[15px] leading-[1.45]">
        {entries.map((e) => (
          <li key={e.id} className={e.depth === 3 ? "pl-[14px]" : undefined}>
            <a href={`#${e.id}`} className="text-[rgb(244_241_238/0.82)] hover:text-accent">
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
