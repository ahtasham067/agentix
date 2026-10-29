/** Product grid skeleton while products load. */
export default function ProductsLoading() {
  return (
    <div className="pt-[84px]" role="status" aria-live="polite">
      <div className="container-site pt-[46px]">
        <span className="sr-only">Loading products…</span>
        <div
          aria-hidden="true"
          className="h-[60px] w-[min(620px,100%)] animate-pulse rounded-[12px] bg-secondary"
        />
        <ul
          aria-hidden="true"
          className="m-0 mt-[120px] grid list-none gap-[24px] p-0 md:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 6 }, (_, i) => (
            <li
              key={i}
              className="h-[423px] animate-pulse rounded-card border border-line bg-secondary"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
