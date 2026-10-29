import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

export interface FaqItem {
  question: string;
  answer: string;
  /** Added for SEO; hidden in visual-regression tests. */
  extra?: boolean;
}

/**
 * Accordion built on native <details name>: no JavaScript, keyboard and screen
 * reader support from the browser, one answer open at a time, and every answer
 * stays in the HTML (indexable and findable with Ctrl+F).
 */
export function FAQ({
  items,
  name = "faq",
  defaultOpen = 0,
  headingLevel = 3,
  schema = true,
}: {
  items: FaqItem[];
  /** Groups the items into one exclusive accordion. Unique per page. */
  name?: string;
  defaultOpen?: number | null;
  headingLevel?: 3 | 4;
  /** Emit FAQPage JSON-LD built from exactly these items. */
  schema?: boolean;
}) {
  const Heading = `h${headingLevel}` as "h3" | "h4";

  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <details
          key={item.question}
          name={name}
          open={i === defaultOpen}
          className="group border-b border-line"
          data-seo-extra={item.extra || undefined}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[24px] [&::-webkit-details-marker]:hidden">
            <Heading className="m-0 font-heading text-[19.6px] leading-[24px] font-semibold">
              {item.question}
            </Heading>
            <Icon
              name="plus"
              size={16}
              strokeWidth={2.2}
              className="shrink-0 text-accent group-open:hidden"
            />
            <Icon
              name="minus"
              size={16}
              strokeWidth={2.2}
              className="hidden shrink-0 text-primary group-open:block"
            />
          </summary>
          <div className="-mt-[13px] max-w-[620px] pb-[22px] text-[16.2px] leading-[27px] text-muted">
            {item.answer}
          </div>
        </details>
      ))}
      {schema && <JsonLd data={faqSchema(items)} />}
    </div>
  );
}
