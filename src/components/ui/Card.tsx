export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
}) {
  return (
    <Tag className={`rounded-card border border-line bg-secondary ${className}`}>{children}</Tag>
  );
}
