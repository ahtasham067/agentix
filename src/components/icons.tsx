import type { SVGProps } from "react";
import type { IconName } from "@/content/types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Outline icons drawn on a 24px grid with a 1.7px stroke (style guide). */
const paths: Record<
  IconName | "plus" | "minus" | "chevron-down" | "menu" | "close",
  React.ReactNode
> = {
  bot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4.5V8M12 4.5a1 1 0 1 0 0-.01" />
      <path d="M2 13v2M22 13v2" />
      <circle cx="9" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  workflow: (
    <>
      <circle cx="5.5" cy="6" r="2.2" />
      <circle cx="18.5" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.7 6h8.6M6.6 8 10.9 16M17.4 8 13.1 16" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18" />
      <path d="m10 12.5-2 1.75 2 1.75M14 12.5l2 1.75-2 1.75" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4" />
      <path d="m13 5-2 14" />
    </>
  ),
  chat: <path d="M20 15.5a2 2 0 0 1-2 2H8l-4 3.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <path d="M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.9c1.6.7 2.7 2.3 3 4.6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  shield: <path d="M12 3.5 19 6v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6Z" />,
  zap: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M8.6 4.2 6.3 3.5A1.8 1.8 0 0 0 4 5.3C4.3 13 11 19.7 18.7 20a1.8 1.8 0 0 0 1.8-2.3l-.7-2.3a1.6 1.6 0 0 0-1.9-1.1l-2.6.7a12.4 12.4 0 0 1-5.3-5.3l.7-2.6a1.6 1.6 0 0 0-1.1-1.9Z" />
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  send: <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5Z" />,
  vault: (
    <>
      <rect x="3.5" y="4" width="17" height="15" rx="2.5" />
      <circle cx="12" cy="11.5" r="3" />
      <path d="M12 8.5V7M12 16v-1.5M7 19v1.5M17 19v1.5" />
    </>
  ),
  folder: (
    <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" />
  ),
  book: (
    <>
      <path d="M5 4.5h11a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3Z" />
      <path d="M5 16.5a3 3 0 0 1 3-3h11" />
    </>
  ),
  chart: <path d="M4 4v16h16M8 15l3.5-4 3 2.5L20 7" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  "chevron-down": <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
};

export type AnyIconName = keyof typeof paths;

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.7,
  ...props
}: IconProps & { name: AnyIconName }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
