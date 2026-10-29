/** Small n8n run preview: five nodes, the second one active. */
export function WorkflowMini({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-[12px] border border-line bg-bg p-[20px] pb-[14px] ${className}`}
    >
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center">
            {i > 0 && (
              <span className="w-[12px] border-t-2 border-dotted border-[rgb(255_193_94/0.7)]" />
            )}
            <span
              className={`flex h-[50px] w-[50px] items-center justify-center rounded-[10px] ${
                i === 1 ? "border-2 border-primary" : "border border-[rgb(244_241_238/0.18)]"
              }`}
            >
              <span
                className={`h-[12px] w-[12px] rounded-full ${i === 1 ? "bg-primary" : "bg-accent"}`}
              />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-[24px] text-[12.5px] leading-[18px] text-muted">
        Runs every 15 minutes · 0 failed this week
      </p>
    </div>
  );
}
