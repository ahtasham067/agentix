import Image from "next/image";
import type { Screenshot } from "@/content/types";

/**
 * Real product screenshots (files in public/images/projects/). Renders nothing
 * until the owner supplies pictures, so no project shows a guessed image.
 */
export function ScreenshotGallery({
  name,
  screenshots,
}: {
  name: string;
  screenshots: Screenshot[];
}) {
  if (screenshots.length === 0) return null;
  return (
    <section aria-labelledby="screenshots-title" className="container-site mt-[104px]">
      <h2
        id="screenshots-title"
        className="text-[34px] leading-[1.1] tracking-[-0.02em] md:text-[44px]"
      >
        {name} screenshots
      </h2>
      <ul className="m-0 mt-[34px] grid list-none gap-[24px] p-0 md:grid-cols-2">
        {screenshots.map((shot) => (
          <li
            key={shot.src}
            className="overflow-hidden rounded-card border border-line bg-secondary"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
