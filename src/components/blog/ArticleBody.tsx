import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AppLink } from "@/components/ui/AppLink";
import { slugify } from "@/lib/markdown";

function textOf(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children && typeof children === "object" && "props" in children) {
    return textOf((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

const link = "text-accent underline underline-offset-[3px] hover:text-text";

const components: Components = {
  h2: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-[48px] scroll-mt-[100px] text-[28px] leading-[1.2] tracking-[-0.02em] md:text-[32px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugify(textOf(children))}
      className="mt-[32px] scroll-mt-[100px] text-[21.5px] leading-[1.3] tracking-[-0.01em]"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-[16px] text-[17px] leading-[1.75] text-[rgb(244_241_238/0.82)]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-[16px] grid list-disc gap-[8px] pl-[22px] text-[17px] leading-[1.7] text-[rgb(244_241_238/0.82)] marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-[16px] grid list-decimal gap-[8px] pl-[24px] text-[17px] leading-[1.7] text-[rgb(244_241_238/0.82)] marker:text-accent">
      {children}
    </ol>
  ),
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <AppLink href={href} className={link}>
        {children}
      </AppLink>
    ) : (
      <a href={href} className={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  table: ({ children }) => (
    <div
      role="region"
      aria-label="Comparison table"
      tabIndex={0}
      className="mt-[24px] overflow-x-auto rounded-card border border-line"
    >
      <table className="w-full border-collapse text-left text-[15px] leading-[1.5]">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th scope="col" className="border-b border-line bg-secondary px-[16px] py-[12px] font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line px-[16px] py-[12px] text-[rgb(244_241_238/0.82)]">
      {children}
    </td>
  ),
};

/** Renders post Markdown to React elements (no raw HTML is allowed through). */
export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
