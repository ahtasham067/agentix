/** Decorative workflow nodes ending in a check, used in the CTA band. */
export function CtaNodes({ className = "" }: { className?: string }) {
  const ring = "rgb(27 29 33 / 0.45)";
  return (
    <svg
      width="377"
      height="207"
      viewBox="0 0 377 207"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g stroke={ring} strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round">
        <path d="M66 86 154 53M66 120l88 33M214 53l75 34M214 153l75-34" />
      </g>
      <g stroke={ring} strokeWidth="2.5">
        <circle cx="36" cy="103" r="34.5" />
        <circle cx="184" cy="36" r="34.5" />
        <circle cx="184" cy="170" r="34.5" />
      </g>
      <circle cx="331" cy="103" r="45.5" fill="#452b23" />
      <path
        d="m318 104 9 9 17-17"
        stroke="var(--primary)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
