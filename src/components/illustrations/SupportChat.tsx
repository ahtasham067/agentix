import { ChatBubbles } from "./ChatBubbles";
import { WindowFrame } from "./WindowFrame";

/** "Support agent" window: a customer chat handled by an AI agent. */
export function SupportChat({ className = "" }: { className?: string }) {
  return (
    <WindowFrame
      title="Support agent"
      badge="Online"
      className={className}
      label="Support agent chat: the AI agent answers an order question and hands an address change to the team."
    >
      <ChatBubbles
        className="gap-[11px] px-[22px] pt-[22px] pb-[22px]"
        bubbles={[
          { text: "Where is my order?", tone: "incoming" },
          { text: "Your order shipped yesterday and arrives Friday.", tone: "outgoing" },
          { text: "Can I change the address?", tone: "incoming" },
          { text: "I have passed this to our team. They will confirm shortly.", tone: "note" },
        ]}
      />
    </WindowFrame>
  );
}
