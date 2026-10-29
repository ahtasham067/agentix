"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";

export interface FaqItem {
  question: string;
  answer: string;
  /** Added for SEO; hidden in visual-regression tests. */
  extra?: boolean;
}

/**
 * Accordion. Every answer stays in the DOM (hidden="until-found"), so it is
 * indexable and findable with Ctrl+F; only the first is open by default.
 */
export function FAQ({
  items,
  defaultOpen = 0,
  headingLevel = 3,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
  headingLevel?: 3 | 4;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  // Open an answer when the browser's find-in-page matches its hidden text.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const onMatch = (event: Event) => {
      const index = Number((event.target as HTMLElement).dataset.index);
      if (!Number.isNaN(index)) setOpen(index);
    };
    list.addEventListener("beforematch", onMatch);
    return () => list.removeEventListener("beforematch", onMatch);
  }, []);
  const Heading = `h${headingLevel}` as "h3" | "h4";

  return (
    <div ref={listRef} className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div
            key={item.question}
            className="border-b border-line"
            data-seo-extra={item.extra || undefined}
          >
            <Heading className="m-0 font-heading text-[19.6px] leading-[24px] font-semibold">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-[24px] text-left"
              >
                <span>{item.question}</span>
                <Icon
                  name={isOpen ? "minus" : "plus"}
                  size={16}
                  strokeWidth={2.2}
                  className={`shrink-0 ${isOpen ? "text-primary" : "text-accent"}`}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={isOpen ? undefined : ("until-found" as unknown as boolean)}
              data-index={i}
              className="-mt-[13px] max-w-[620px] pb-[22px] text-[16.2px] leading-[27px] text-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
