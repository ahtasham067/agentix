import { WindowFrame } from "./WindowFrame";

const nodes = [
  { title: "Trigger", text: "New WhatsApp lead" },
  { title: "AI agent", text: "Qualify and reply", active: true },
  { title: "CRM", text: "Create contact" },
  { title: "Slack", text: "Notify sales" },
];

const log = [
  { time: "09:41", text: "New lead from WhatsApp", note: "“Need a chatbot for my clinic”" },
  { time: "09:41", text: "Agent qualified the lead", note: "budget fits" },
  { time: "09:42", text: "Reply sent in 8 seconds" },
  { time: "09:42", text: "Contact added to CRM" },
  { time: "09:42", text: "Sales team notified on Slack" },
];

export function WorkflowNode({
  title,
  text,
  active,
  compact = false,
}: {
  title: string;
  text: string;
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 flex-col justify-center rounded-[12px] bg-bg ${
        compact ? "h-[72px] w-[116px] pl-[12px]" : "h-[85px] w-[134px] pl-[15px]"
      } ${active ? "border-2 border-primary" : "border border-[rgb(244_241_238/0.2)]"}`}
    >
      <span
        className={`flex items-center font-semibold ${compact ? "gap-[8px] text-[13px] leading-[16px]" : "gap-[10px] text-[15px] leading-[18px]"}`}
      >
        <span
          className={`h-[12px] w-[12px] rounded-full ${active ? "bg-primary" : "bg-accent"}`}
          aria-hidden="true"
        />
        {title}
      </span>
      <span
        className={`whitespace-nowrap text-muted ${compact ? "mt-[10px] text-[11.5px] leading-[14px]" : "mt-[12px] text-[13.5px] leading-[16px]"}`}
      >
        {text}
      </span>
    </div>
  );
}

export function NodeConnector({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`relative flex shrink-0 items-center ${compact ? "w-[29px]" : "w-[31px]"}`}
      aria-hidden="true"
    >
      <span className="h-0 w-full border-t-2 border-dotted border-[rgb(255_107_44/0.75)]" />
      <span className="absolute left-1/2 h-[8px] w-[8px] -translate-x-1/2 rounded-full bg-primary" />
    </span>
  );
}

/** "Lead follow-up agent" window: workflow canvas plus run log. */
export function HeroWorkflow({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Stacked layout for half-width columns. */
  compact?: boolean;
}) {
  return (
    <WindowFrame
      title="Lead follow-up agent"
      badge="Running"
      className={className}
      label="Example AI agent workflow: a new WhatsApp lead is qualified by the AI agent, added to the CRM and the sales team is notified on Slack."
    >
      <div className={compact ? "grid" : "grid lg:grid-cols-[684px_1fr]"}>
        <div
          className={`dot-grid flex overflow-x-auto ${
            compact
              ? "h-[138px] items-start border-b border-line px-[25px] pt-[38px]"
              : "items-start px-[26px] pt-[41px] pb-[41px] lg:border-r lg:border-line"
          }`}
        >
          {nodes.map((node, i) => (
            <div key={node.title} className="flex items-stretch">
              {i > 0 && <NodeConnector compact={compact} />}
              <WorkflowNode {...node} compact={compact} />
            </div>
          ))}
        </div>
        <ol
          className={`m-0 list-none px-[20px] ${compact ? "pt-[6px] pb-[10px]" : "pt-[5px] pb-[10px]"}`}
        >
          {log.map((row, i) => (
            <li
              key={row.text}
              className={`flex h-[36px] items-center gap-[12px] text-[14px] leading-none ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <span className="w-[37px] shrink-0 font-mono text-[12px] text-muted">{row.time}</span>
              <span className="truncate">
                {row.text}
                {row.note && <span className="text-muted"> {row.note}</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </WindowFrame>
  );
}
