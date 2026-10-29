const stats = [
  { label: "Orders", value: "1,248" },
  { label: "Revenue", value: "$18.4k" },
  { label: "Uptime", value: "99.9%" },
];

/** Small dashboard preview with three stat tiles. */
export function StatsMini({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const lg = size === "lg";
  return (
    <div
      aria-hidden="true"
      className={`rounded-[12px] border border-line bg-bg ${lg ? "p-[14px] pt-[13px] pb-[15px]" : "p-[14px] pb-[15px]"} ${className}`}
    >
      <span className="flex gap-[5px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[6px] w-[6px] rounded-full bg-[rgb(244_241_238/0.3)]" />
        ))}
      </span>
      <div className={`grid grid-cols-3 gap-[10px] ${lg ? "mt-[11px]" : "mt-[9px]"}`}>
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-[8px] border border-line ${lg ? "px-[12px] pt-[9px] pb-[9px]" : "px-[12px] pt-[9px] pb-[10px]"}`}
          >
            <p className={`leading-[14px] text-muted ${lg ? "text-[12px]" : "text-[11px]"}`}>
              {s.label}
            </p>
            <p
              className={`mt-[4px] font-heading font-bold ${lg ? "text-[18px] leading-[20px]" : "text-[17px] leading-[20px]"}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
