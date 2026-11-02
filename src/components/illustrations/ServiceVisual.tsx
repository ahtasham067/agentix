import type { ServiceVisual as Visual } from "@/content/services";
import { ChatBubbles } from "./ChatBubbles";
import { SearchMini } from "./SearchMini";
import { StatsMini } from "./StatsMini";
import { WorkflowMini } from "./WorkflowMini";

/** Illustration card shown next to each service on /services. Decorative. */
export function ServiceVisual({ visual }: { visual: Visual }) {
  if (visual === "support-chat") {
    return (
      <div aria-hidden="true" className="rounded-card border border-line bg-secondary p-[30px]">
        <ChatBubbles
          className="gap-[11px]"
          bubbles={[
            { text: "Do you have a slot on Friday?", tone: "incoming" },
            { text: "Yes, 11:00 am or 3:30 pm. Which suits you?", tone: "outgoing" },
            { text: "3:30 pm", tone: "incoming" },
            { text: "Booked. See you Friday at 3:30 pm.", tone: "note" },
          ]}
        />
      </div>
    );
  }
  if (visual === "workflow") {
    return (
      <div
        aria-hidden="true"
        className="grid gap-[15px] rounded-card border border-line bg-secondary p-[30px]"
      >
        <WorkflowMini size="lg" />
        <WorkflowMini size="lg" />
      </div>
    );
  }
  if (visual === "search") {
    return (
      <div
        aria-hidden="true"
        className="grid gap-[15px] rounded-card border border-line bg-secondary p-[30px]"
      >
        <SearchMini size="lg" />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="grid gap-[15px] rounded-card border border-line bg-secondary p-[30px]"
    >
      <StatsMini size="lg" />
      <StatsMini size="lg" />
    </div>
  );
}
