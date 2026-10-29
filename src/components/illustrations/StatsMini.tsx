const stats = [
  { label: "Orders", value: "1,248" },
  { label: "Revenue", value: "$18.4k" },
  { label: "Uptime", value: "99.9%" },
];

/** Small dashboard preview with three stat tiles. */
export function StatsMini({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-[12px] border border-line bg-bg p-[14px] pb-[15px] ${className}`}
    >
      <span className="flex gap-[5px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[6px] w-[6px] rounded-full bg-[rgb(244_241_238/0.3)]" />
        ))}
      </span>
      <div className="mt-[9px] grid grid-cols-3 gap-[10px]">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-[8px] border border-line px-[12px] pt-[9px] pb-[10px]"
          >
            <p className="text-[11px] leading-[14px] text-muted">{s.label}</p>
            <p className="mt-[4px] font-heading text-[17px] leading-[20px] font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
