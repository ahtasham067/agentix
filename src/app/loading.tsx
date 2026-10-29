/** Shown while a route streams in. Sized like a page hero to avoid layout shift. */
export default function Loading() {
  return (
    <div className="pt-[84px]" role="status" aria-live="polite">
      <div className="container-site pt-[46px]">
        <span className="sr-only">Loading…</span>
        <div aria-hidden="true" className="h-[14px] w-[140px] animate-pulse rounded bg-secondary" />
        <div
          aria-hidden="true"
          className="mt-[24px] h-[56px] w-[min(560px,100%)] animate-pulse rounded-[12px] bg-secondary"
        />
        <div
          aria-hidden="true"
          className="mt-[20px] h-[22px] w-[min(640px,100%)] animate-pulse rounded bg-secondary"
        />
      </div>
    </div>
  );
}
