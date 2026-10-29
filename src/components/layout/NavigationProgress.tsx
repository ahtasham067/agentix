"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Loading state for page navigations: a thin orange bar at the top while the
 * next page loads. Pages render fully on the server, so no Suspense fallbacks
 * are needed in the HTML.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  // The path a navigation started from; the bar shows until the path changes.
  const [startedOn, setStartedOn] = useState<string | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname)
        return;
      setStartedOn(window.location.pathname);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const pending = startedOn !== null && startedOn === pathname;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-primary transition-transform duration-700 ease-out ${
        pending ? "scale-x-75" : "scale-x-0"
      }`}
    />
  );
}
