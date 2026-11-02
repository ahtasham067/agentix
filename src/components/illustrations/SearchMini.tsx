/** Small search preview: a question, an AI answer and its cited sources. Decorative. */
export function SearchMini({
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
      className={`rounded-[12px] border border-line bg-bg p-[14px] pb-[15px] ${className}`}
    >
      <span className="flex gap-[5px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[6px] w-[6px] rounded-full bg-[rgb(244_241_238/0.3)]" />
        ))}
      </span>
      <p
        className={`mt-[10px] rounded-full border border-line px-[12px] py-[6px] text-muted ${lg ? "text-[13px]" : "text-[12px]"}`}
      >
        What does an AI agent do?
      </p>
      <div className="mt-[10px] rounded-[8px] border border-line px-[12px] py-[10px]">
        <p className={`font-semibold ${lg ? "text-[12px]" : "text-[11px]"} text-accent`}>
          AI answer
        </p>
        <span className="mt-[7px] block h-[6px] w-[92%] rounded-full bg-[rgb(244_241_238/0.18)]" />
        <span className="mt-[6px] block h-[6px] w-[78%] rounded-full bg-[rgb(244_241_238/0.18)]" />
        <span className="mt-[9px] flex gap-[6px]">
          <span className="rounded-full bg-[rgb(255_107_44/0.2)] px-[8px] py-[3px] text-[10.5px] text-accent">
            Source 1
          </span>
          <span className="rounded-full bg-[rgb(244_241_238/0.08)] px-[8px] py-[3px] text-[10.5px] text-muted">
            Source 2
          </span>
        </span>
      </div>
    </div>
  );
}
