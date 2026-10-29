/** Warm radial glow behind the top right of every page. Purely decorative. */
export function PageGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] overflow-hidden"
      style={{
        background:
          "radial-gradient(530px 345px at calc(50% + 360px) 180px, rgb(255 107 44 / 0.185), rgb(255 107 44 / 0) 100%)",
      }}
    />
  );
}
