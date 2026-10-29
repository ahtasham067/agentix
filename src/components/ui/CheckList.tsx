import { Icon } from "@/components/icons";

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`m-0 grid list-none gap-[10px] p-0 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-[12px] text-[16px] leading-[24px]">
          <Icon name="check" size={16} strokeWidth={2.2} className="shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
