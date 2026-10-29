import { ChatBubbles } from "./ChatBubbles";
import { WindowFrame } from "./WindowFrame";

const appointments = [
  { time: "10:00", name: "Ali Raza", type: "Check-up", status: "Confirmed" },
  { time: "10:30", name: "Sara Khan", type: "Follow-up", status: "Confirmed" },
  { time: "11:15", name: "Hamza Iqbal", type: "New patient", status: "Pending" },
  { time: "12:00", name: "Ayesha Noor", type: "Check-up", status: "Confirmed" },
];

export function StatusPill({ status }: { status: string }) {
  const confirmed = status !== "Pending";
  return (
    <span
      className={`inline-flex h-[22px] items-center rounded-full border px-[11px] text-[12px] leading-none font-medium ${
        confirmed ? "border-primary text-accent" : "border-[rgb(244_241_238/0.25)] text-muted"
      }`}
    >
      {status}
    </span>
  );
}

/** CliniDesk doctor dashboard next to the patient's WhatsApp chat. */
export function ClinideskDashboard({ className = "" }: { className?: string }) {
  return (
    <WindowFrame
      title="CliniDesk · Doctor dashboard"
      badge="Live"
      className={className}
      label="CliniDesk doctor dashboard with four appointments today, next to a WhatsApp chat where a patient books a 5:00 pm slot."
    >
      <div className="grid sm:grid-cols-[372px_1fr]">
        <div className="px-[20px] pt-[17px] pb-[20px] sm:border-r sm:border-line">
          <p className="text-[15px] leading-[20px] font-semibold">Today, 4 appointments</p>
          <ul className="m-0 mt-[3px] list-none p-0">
            {appointments.map((a, i) => (
              <li
                key={a.time}
                className={`flex h-[42px] items-center gap-[12px] text-[14px] ${i > 0 ? "border-t border-line" : ""}`}
              >
                <span className="w-[36px] font-mono text-[12px] text-muted">{a.time}</span>
                <span className="flex-1 truncate">
                  {a.name} <span className="text-muted">{a.type}</span>
                </span>
                <StatusPill status={a.status} />
              </li>
            ))}
          </ul>
        </div>
        <ChatBubbles
          className="gap-[11px] px-[20px] pt-[18px] pb-[18px]"
          bubbleClassName="max-w-[211px]"
          bubbles={[
            { text: "Hi, can I see the doctor tomorrow?", tone: "incoming" },
            { text: "Yes. 5:00 pm is open. Shall I book it?", tone: "outgoing" },
            { text: "Yes please", tone: "incoming" },
            { text: "Booked: Dr. Khan, tomorrow 5:00 pm.", tone: "note" },
          ]}
        />
      </div>
    </WindowFrame>
  );
}
