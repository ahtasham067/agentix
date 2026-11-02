import { LastUpdated } from "./LastUpdated";

/**
 * The direct answer that opens a service or project page (GEO): 40 to 60
 * words, before the first h2. Added below the designed hero, so it is marked
 * data-seo-extra for the visual tests.
 */
export function AnswerFirst({
  answer,
  updated,
  label = "In short",
  className = "",
}: {
  answer: string;
  updated?: string;
  label?: string;
  className?: string;
}) {
  return (
    <section aria-label={label} data-seo-extra className={`container-site ${className}`}>
      <div className="max-w-[880px] border-l-2 border-primary pl-[20px]">
        <p className="text-[18px] leading-[1.6] text-text" data-answer>
          {answer}
        </p>
        {updated && <LastUpdated date={updated} className="mt-[10px]" />}
      </div>
    </section>
  );
}
