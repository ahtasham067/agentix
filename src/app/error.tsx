"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-[84px]">
      <div className="container-site pt-[80px] pb-[120px]">
        <h1 className="text-[40px] leading-[1.08] tracking-[-0.03em] md:text-[56px]">
          Something went wrong.
        </h1>
        <p className="mt-[16px] max-w-[560px] text-[18px] leading-[1.55] text-muted">
          Please try again. If it keeps happening, email us and we will look into it.
        </p>
        <div className="mt-[32px] flex flex-wrap gap-[14px]">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-[52px] cursor-pointer items-center rounded-[12px] bg-primary px-[29px] text-[16px] font-semibold text-on-primary"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-[52px] items-center rounded-[12px] border border-[rgb(244_241_238/0.3)] px-[29px] text-[16px] font-semibold"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
