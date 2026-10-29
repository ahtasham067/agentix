/**
 * A section added for search (not in the approved designs). It is marked with
 * data-seo-extra so visual-regression tests can hide it.
 */
export function SeoSection({
  id,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} data-seo-extra className={`container-site ${className}`}>
      <h2
        id={id}
        className="max-w-[880px] text-[30px] leading-[1.15] tracking-[-0.02em] md:text-[36px]"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-[14px] max-w-[760px] text-[17px] leading-[1.6] text-muted">{intro}</p>
      )}
      {children && <div className="mt-[28px]">{children}</div>}
    </section>
  );
}
