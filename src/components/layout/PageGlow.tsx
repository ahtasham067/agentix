/** Warm radial glow behind the top of a page. Purely decorative. */
export function PageGlow({ variant = "right" }: { variant?: "right" | "center" }) {
  const position = variant === "center" ? "62% 30%" : "78% 30%";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 620px 520px at ${position}, rgb(255 107 44 / 0.2), rgb(255 107 44 / 0.06) 55%, transparent 80%)`,
      }}
    />
  );
}
