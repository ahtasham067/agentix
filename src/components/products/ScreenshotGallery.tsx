"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Screenshot } from "@/content/types";

/**
 * Real product screenshots in rounded frames, each opening a larger view.
 *
 * Every thumbnail is a link to the full picture, so it still works without
 * JavaScript; with JavaScript it opens a native modal <dialog> instead, which
 * traps focus, closes on Escape or the visible Close button, and hands focus
 * back to the thumbnail that opened it.
 *
 * At lg the frames are a fixed 268px plus a 30px caption line: the same 298px
 * as the designed "Screens" panels, so nothing below the section moves.
 */
export function ScreenshotGallery({
  name,
  screenshots,
}: {
  name: string;
  screenshots: Screenshot[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const shot = active === null ? null : screenshots[active];

  function open(index: number, link: HTMLAnchorElement) {
    opener.current = link;
    setActive(index);
    dialog.current?.showModal();
  }

  function onClose() {
    setActive(null);
    opener.current?.focus();
  }

  const columns = screenshots.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <>
      <ul className={`m-0 mt-[34px] grid list-none gap-[24px] p-0 ${columns}`} data-visual-mask="">
        {screenshots.map((s, i) => (
          <li key={s.src}>
            <figure className="m-0">
              <a
                href={s.src}
                onClick={(e) => {
                  e.preventDefault();
                  open(i, e.currentTarget);
                }}
                className="relative block aspect-[2/1] overflow-hidden rounded-card border border-line bg-brown transition-colors hover:border-[rgb(244_241_238/0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:aspect-auto lg:h-[268px]"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 411px, (min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={s.blurDataURL}
                  loading="lazy"
                  className="object-contain"
                />
                <span className="sr-only">Open a larger view</span>
              </a>
              <figcaption className="mt-[10px] text-[14px] leading-[20px] text-muted lg:truncate">
                {s.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={onClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        aria-labelledby="screenshot-dialog-title"
        className="m-auto w-[min(1400px,94vw)] max-w-none overflow-hidden rounded-card border border-line bg-secondary p-0 text-text backdrop:bg-[rgb(0_0_0/0.82)]"
      >
        <div className="flex items-center justify-between gap-[16px] border-b border-line px-[20px] py-[12px]">
          <p id="screenshot-dialog-title" className="m-0 text-[15px] leading-[22px] font-semibold">
            {shot ? `${name}: ${shot.caption}` : name}
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="inline-flex h-[40px] shrink-0 items-center gap-[8px] rounded-[10px] border border-line px-[14px] text-[14px] font-semibold hover:border-[rgb(244_241_238/0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
            Close
          </button>
        </div>
        {shot && (
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="94vw"
            className="block h-auto max-h-[80vh] w-full bg-brown object-contain"
          />
        )}
      </dialog>
    </>
  );
}
