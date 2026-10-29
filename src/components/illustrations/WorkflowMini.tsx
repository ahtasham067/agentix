/** Small n8n run preview: five nodes, the second one active. */
export function WorkflowMini({
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
      className={`rounded-[12px] border border-line bg-bg ${
        lg ? "px-[24px] pt-[34px] pb-[8px]" : "p-[20px] pb-[14px]"
      } ${className}`}
    >
      <div className={`flex items-center ${lg ? "justify-between" : ""}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex items-center ${lg && i > 0 ? "flex-1 justify-end" : ""}`}>
            {i > 0 && (
              <span
                className={`border-t-2 border-dotted border-[rgb(255_193_94/0.7)] ${lg ? "mx-[3px] w-[13px]" : "w-[12px]"}`}
              />
            )}
            <span
              className={`flex items-center justify-center ${
                lg ? "h-[81px] w-[84px] rounded-[14px]" : "h-[50px] w-[50px] rounded-[10px]"
              } ${i === 1 ? "border-2 border-primary" : "border border-[rgb(244_241_238/0.18)]"}`}
            >
              <span
                className={`rounded-full ${lg ? "h-[18px] w-[18px]" : "h-[12px] w-[12px]"} ${
                  i === 1 ? "bg-primary" : "bg-accent"
                }`}
              />
            </span>
          </div>
        ))}
      </div>
      <p
        className={`text-muted ${lg ? "mt-[32px] text-[13px] leading-[18px]" : "mt-[24px] text-[12.5px] leading-[18px]"}`}
      >
        Runs every 15 minutes · 0 failed this week
      </p>
    </div>
  );
}
