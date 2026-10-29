import Link from "next/link";
import type { ComponentProps } from "react";

export type ButtonVariant = "primary" | "secondary" | "dark" | "outline-dark";
export type ButtonSize = "sm" | "md";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-[#ff7d45]",
  secondary: "border border-[rgb(244_241_238/0.3)] text-text hover:border-[rgb(244_241_238/0.55)]",
  dark: "bg-bg text-text hover:bg-[#2a2d33]",
  "outline-dark":
    "border border-[rgb(27_29_33/0.45)] text-on-primary hover:bg-[rgb(27_29_33/0.06)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-[44px] px-[22px] text-[15px]",
  md: "h-[52px] px-[29px] text-[16px]",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return `inline-flex items-center justify-center whitespace-nowrap rounded-[12px] font-semibold leading-none transition-colors ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
