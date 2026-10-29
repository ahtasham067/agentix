"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/content/site";
import { Logo } from "./Logo";

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  // The menu is open only for the page it was opened on, so it closes after navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-site flex h-[84px] items-center justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-[40px] p-0 pl-[2px]">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block text-[15px] leading-[22px] transition-colors hover:text-text ${
                      active ? "text-text" : "text-muted"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute top-[26px] left-1/2 h-[2px] w-[31px] -translate-x-1/2 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            Get a Quote
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-line text-text lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        hidden={!open}
        className="container-site rounded-card border border-line bg-secondary p-3 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="m-0 grid list-none gap-1 p-0">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-[10px] px-4 py-3 text-[16px] ${
                      active ? "bg-bg text-text" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 sm:hidden">
              <ButtonLink href="/contact" className="w-full">
                Get a Quote
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
