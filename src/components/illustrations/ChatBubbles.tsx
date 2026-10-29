export type BubbleTone = "incoming" | "outgoing" | "note";

export interface Bubble {
  text: string;
  tone: BubbleTone;
}

const tones: Record<BubbleTone, string> = {
  incoming: "self-start bg-[rgb(244_241_238/0.1)] text-text",
  outgoing: "self-end bg-primary text-on-primary",
  note: "self-end border border-[rgb(255_107_44/0.35)] bg-brown text-text",
};

/** A short chat transcript drawn with HTML, so the text stays crisp. */
export function ChatBubbles({
  bubbles,
  className = "",
  bubbleClassName = "",
}: {
  bubbles: Bubble[];
  className?: string;
  bubbleClassName?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {bubbles.map((b) => (
        <p
          key={b.text}
          className={`max-w-[85%] rounded-[10px] px-[15px] py-[11px] text-[14px] leading-[19px] ${tones[b.tone]} ${bubbleClassName}`}
        >
          {b.text}
        </p>
      ))}
    </div>
  );
}
