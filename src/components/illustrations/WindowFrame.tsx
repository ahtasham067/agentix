/** App-window chrome: traffic dots, a title and an optional status badge. */
export function WindowFrame({
  title,
  badge,
  children,
  className = "",
  label,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  /** Accessible description of the illustration. */
  label?: string;
}) {
  return (
    <figure
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`m-0 overflow-hidden rounded-card border border-line bg-secondary ${className}`}
    >
      <div className="flex h-[50px] items-center justify-between border-b border-line pr-[18px] pl-[18px]">
        <div className="flex items-center">
          <span className="flex gap-[8px]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[10px] w-[10px] rounded-full bg-[rgb(244_241_238/0.22)]" />
            ))}
          </span>
          <span className="ml-[18px] text-[13px] leading-none font-medium">{title}</span>
        </div>
        {badge && <StatusBadge>{badge}</StatusBadge>}
      </div>
      {children}
    </figure>
  );
}

export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-[23px] items-center gap-[7px] rounded-full bg-[rgb(255_193_94/0.18)] px-[11px] text-[12px] leading-none font-semibold text-accent">
      <span className="h-[6px] w-[6px] rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
