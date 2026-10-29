import type { Step } from "@/content/types";

/** Numbered steps with an orange accent on the top rule. */
export function Steps({
  steps,
  columns = 4,
  headingLevel = 3,
}: {
  steps: Step[];
  columns?: 3 | 4;
  headingLevel?: 3 | 4;
}) {
  const Heading = `h${headingLevel}` as "h3" | "h4";
  return (
    <ol
      className={`m-0 grid list-none gap-x-[24px] gap-y-10 p-0 sm:grid-cols-2 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {steps.map((step, i) => (
        <li key={step.title} className="relative border-t-2 border-line pt-[24px]">
          <span
            aria-hidden="true"
            className="absolute -top-[2px] left-0 h-[2px] w-[56px] bg-primary"
          />
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[rgb(255_107_44/0.2)] text-[15px] leading-none font-semibold text-accent">
            {i + 1}
          </span>
          <Heading className="mt-[18px] text-[22px] leading-[1.25] tracking-[-0.01em]">
            {step.title}
          </Heading>
          <p className="mt-[7px] text-[15.6px] leading-[24px] text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
