import { ChipList } from "@/components/ui/Chip";
import { TOOL_GROUPS } from "@/content/tools";

export function ToolsGrid() {
  return (
    <ul className="m-0 grid list-none gap-[24px] p-0 md:grid-cols-3">
      {TOOL_GROUPS.map((group) => (
        <li
          key={group.title}
          className="rounded-card border border-line bg-secondary p-[28px] pb-[28px]"
        >
          <h3 className="text-[20.4px] leading-[25px] font-semibold">{group.title}</h3>
          <ChipList
            items={group.tools}
            className="mt-[16px] gap-[8px]"
            label={`${group.title} tools`}
            visualMask
          />
        </li>
      ))}
    </ul>
  );
}
