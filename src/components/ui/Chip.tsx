export type ChipVariant = "outline" | "filled" | "featured";

const variants: Record<ChipVariant, string> = {
  outline: "h-[35px] border border-line px-[16px] text-[14px] text-text/85",
  filled: "h-[26px] bg-[rgb(244_241_238/0.08)] px-[12px] text-[13px] text-text/80",
  featured: "h-[25px] bg-primary px-[11px] text-[12px] font-semibold text-on-primary",
};

export function Chip({
  children,
  variant = "outline",
  className = "",
}: {
  children: React.ReactNode;
  variant?: ChipVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full leading-none whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ChipList({
  items,
  variant = "outline",
  className = "",
  label,
  visualMask = false,
}: {
  items: readonly string[];
  variant?: ChipVariant;
  className?: string;
  label?: string;
  /** Marks a list that differs from the design on purpose, so the visual test masks it. */
  visualMask?: boolean;
}) {
  return (
    <ul
      aria-label={label}
      data-visual-mask={visualMask ? "" : undefined}
      className={`m-0 flex list-none flex-wrap p-0 ${className}`}
    >
      {items.map((item) => (
        <li key={item}>
          <Chip variant={variant}>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
