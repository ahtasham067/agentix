import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { PageGlow } from "./PageGlow";

/** Top of an inner page: glow, breadcrumbs, h1 and intro, plus optional aside. */
export function PageHero({
  crumbs,
  title,
  intro,
  children,
  aside,
  eyebrow,
  className = "",
  innerClassName = "pt-[46px]",
  titleClassName = "",
  introClassName = "max-w-[690px]",
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  /** Shown between the breadcrumbs and the title (for example tags). */
  eyebrow?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  titleClassName?: string;
  introClassName?: string;
}) {
  return (
    <section className={`relative pt-[84px] ${className}`}>
      <PageGlow />
      <div className={`container-site relative ${innerClassName}`}>
        <div
          className={
            aside ? "grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-[16px]" : undefined
          }
        >
          <div>
            <Breadcrumbs items={crumbs} />
            {eyebrow}
            <h1
              className={`mt-[18px] text-[40px] leading-[1.08] tracking-[-0.03em] md:text-[60px] md:leading-[63px] ${titleClassName}`}
            >
              {title}
            </h1>
            {intro && (
              <p
                className={`mt-[16px] text-[18px] leading-[1.55] text-muted md:text-[19.5px] md:leading-[31px] ${introClassName}`}
              >
                {intro}
              </p>
            )}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
