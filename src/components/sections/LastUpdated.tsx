const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-11-02" -> "2 November 2026", without time-zone surprises. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Visible "Last updated" line. Uses the same date as the sitemap lastmod. */
export function LastUpdated({ date, className = "" }: { date: string; className?: string }) {
  return (
    <p className={`text-[14px] leading-[20px] text-muted ${className}`} data-last-updated>
      Last updated <time dateTime={date.slice(0, 10)}>{formatDate(date)}</time>
    </p>
  );
}
