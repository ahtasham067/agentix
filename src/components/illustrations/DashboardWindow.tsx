import { StatsMini } from "./StatsMini";
import { WindowFrame } from "./WindowFrame";

/** "Admin dashboard" window used on the web apps service page. */
export function DashboardWindow({ className = "" }: { className?: string }) {
  return (
    <WindowFrame
      title="Admin dashboard"
      badge="Live"
      className={className}
      label="Example admin dashboard showing orders, revenue and uptime."
    >
      <div className="grid gap-[15px] p-[22px]">
        <StatsMini size="lg" />
        <StatsMini size="lg" />
      </div>
    </WindowFrame>
  );
}
