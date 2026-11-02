import { IconTile } from "@/components/ui/IconTile";
import { contact, whatsappUrl } from "@/content/site";
import type { Step } from "@/content/types";

export function ContactDetails() {
  const rows = [
    {
      icon: "mail" as const,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: "phone" as const,
      label: "WhatsApp",
      value: contact.phoneDisplay,
      href: whatsappUrl,
    },
    { icon: "clock" as const, label: "Reply time", value: "Within one working day" },
  ];
  return (
    <ul className="m-0 list-none rounded-card border border-line bg-secondary px-[31px] pt-[31px] pb-[29px]">
      {rows.map((row, i) => (
        <li
          key={row.label}
          className={`flex items-center gap-[14px] ${i > 0 ? "h-[83px] border-t border-line" : "h-[81px]"}`}
        >
          <IconTile name={row.icon} size={46} iconSize={22} />
          <span>
            <span className="block text-[13px] leading-[17px] text-muted">{row.label}</span>
            {row.href ? (
              <a
                href={row.href}
                className="block font-heading text-[17.3px] leading-[22px] font-semibold hover:underline"
                {...(row.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {row.value}
              </a>
            ) : (
              <span className="block font-heading text-[17.3px] leading-[22px] font-semibold">
                {row.value}
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function NextSteps({ steps }: { steps: Step[] }) {
  return (
    <section
      aria-labelledby="next-title"
      className="rounded-card border border-line bg-secondary px-[31px] pt-[30px] pb-[30px]"
    >
      <h2 id="next-title" className="text-[22px] leading-[28px] tracking-[-0.01em]">
        What happens next
      </h2>
      <ol className="m-0 mt-[16px] list-none p-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={`flex h-[77px] items-center gap-[16px] ${i > 0 ? "border-t border-line" : ""}`}
          >
            <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[rgb(255_107_44/0.2)] text-[15px] font-semibold text-accent">
              {i + 1}
            </span>
            <span>
              <h3 className="text-[17px] leading-[22px] font-semibold">{step.title}</h3>
              <p className="mt-[2px] text-[12.95px] leading-[19px] text-muted">{step.text}</p>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
