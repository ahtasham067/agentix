import { Icon, type AnyIconName } from "@/components/icons";

/** Rounded tile with an amber outline icon, used on cards. */
export function IconTile({
  name,
  size = 52,
  iconSize = 22,
  className = "",
}: {
  name: AnyIconName;
  size?: number;
  iconSize?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[10px] bg-[rgb(255_107_44/0.2)] text-accent ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={iconSize} />
    </span>
  );
}
