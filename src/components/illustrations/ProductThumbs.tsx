import type { ThumbnailKey } from "@/content/types";

/** Small stylized product previews used on product cards. Decorative. */

function Panel({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`rounded-[12px] border border-line bg-secondary ${className}`}>{children}</div>
  );
}

function Bar({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={`block h-[6px] rounded-full ${className}`} style={style} />;
}

export function ClinideskThumb({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex w-[265px] flex-col">
        <p className="flex h-[32px] items-center self-start rounded-[10px] border border-line bg-secondary px-[12px] text-[11.5px]">
          I need an appointment
        </p>
        <p className="mt-[8px] flex h-[32px] items-center self-end rounded-[10px] bg-primary px-[13px] text-[11.5px] text-on-primary">
          Tomorrow, 5:00 pm is open
        </p>
        <div className="mt-[13px] flex h-[72px] items-center rounded-[11px] border border-line bg-secondary pr-[12px] pl-[14px]">
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-semibold text-on-primary">
            K
          </span>
          <span className="ml-[10px] min-w-0 flex-1">
            <span className="block text-[13px] leading-[17px] font-semibold">
              Dr. Khan, 5:00 pm
            </span>
            <span className="mt-[1px] block text-[12px] leading-[17px] text-muted">
              General check-up
            </span>
          </span>
          <span className="flex h-[23px] items-center rounded-full border border-primary px-[10px] text-[11.5px] font-semibold text-accent">
            Booked
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full max-w-[374px] flex-col">
      <p className="flex h-[44px] items-center self-start rounded-[12px] border border-line bg-secondary px-[18px] text-[16px]">
        I need an appointment
      </p>
      <p className="mt-[13px] flex h-[42px] items-center self-end rounded-[12px] bg-primary px-[18px] text-[16px] text-on-primary">
        Tomorrow, 5:00 pm is open
      </p>
      <div className="mt-[21px] flex h-[100px] items-center rounded-card border border-line bg-secondary pr-[17px] pl-[19px]">
        <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-accent text-[16px] font-semibold text-on-primary">
          K
        </span>
        <span className="ml-[14px] min-w-0 flex-1">
          <span className="block text-[17px] leading-[22px] font-semibold">Dr. Khan, 5:00 pm</span>
          <span className="mt-[3px] block text-[16px] leading-[22px] text-muted">
            General check-up
          </span>
        </span>
        <span className="flex h-[32px] items-center rounded-full border-[1.5px] border-primary px-[11px] text-[15px] font-semibold text-accent">
          Booked
        </span>
      </div>
    </div>
  );
}

export function NexaThumb() {
  return (
    <div className="relative h-[164px] w-[236px]">
      <span className="absolute top-0 left-[61px] h-[114px] w-[114px] rounded-full border border-[rgb(244_241_238/0.25)]" />
      <span className="absolute top-[16px] left-[77px] h-[82px] w-[82px] rounded-full bg-[rgb(255_107_44/0.3)]" />
      <span className="absolute top-[30px] left-[91px] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-primary">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="var(--on-primary)">
          <path d="M13 0c1 7 6 12 13 13-7 1-12 6-13 13-1-7-6-12-13-13 7-1 12-6 13-13Z" />
        </svg>
      </span>
      <span className="absolute top-[30px] left-[178px] h-[8px] w-[8px] rounded-full bg-accent" />
      <span className="absolute top-[86px] left-[52px] h-[7px] w-[7px] rounded-full bg-accent" />
      <span className="absolute top-[128px] left-0 flex h-[35px] w-[236px] items-center justify-between rounded-full border border-line bg-secondary pr-[8px] pl-[17px] text-[12px] text-muted">
        Ask Nexa anything
        <span className="h-[20px] w-[20px] rounded-full bg-accent" />
      </span>
    </div>
  );
}

export function AutobuffyThumb() {
  const items = [
    { price: "$48", icon: "ring" },
    { price: "$129", icon: "box" },
    { price: "$22", icon: "shock" },
  ];
  return (
    <div className="w-[266px]">
      <div className="flex h-[25px] items-center rounded-full border border-line bg-secondary px-[14px] text-[11px] text-muted">
        Search parts
      </div>
      <div className="mt-[9px] grid grid-cols-3 gap-[7px]">
        {items.map((item) => (
          <Panel key={item.price} className="flex h-[128px] flex-col px-[10px] pt-[10px] pb-[8px]">
            <span className="flex h-[48px] items-center justify-center">
              {item.icon === "ring" && (
                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-[5px] border-primary">
                  <span className="h-[13px] w-[13px] rounded-full bg-accent" />
                </span>
              )}
              {item.icon === "box" && (
                <span className="flex h-[42px] w-[44px] flex-col items-center justify-center gap-[6px] rounded-[7px] bg-[#e35f28]">
                  <span className="h-[5px] w-[28px] rounded-full bg-[#9c3f1a]" />
                  <span className="h-[5px] w-[28px] rounded-full bg-[#9c3f1a]" />
                </span>
              )}
              {item.icon === "shock" && (
                <span className="flex flex-col items-center">
                  <span className="h-[36px] w-[14px] rounded-t-[5px] bg-accent" />
                  <span className="h-[8px] w-[30px] rounded-[3px] bg-primary" />
                </span>
              )}
            </span>
            <span className="mt-[10px] text-[13px] leading-[16px] font-bold">{item.price}</span>
            <span className="mt-auto flex h-[22px] items-center justify-center rounded-[5px] bg-primary text-[10px] font-semibold text-on-primary">
              Add
            </span>
          </Panel>
        ))}
      </div>
    </div>
  );
}

export function MeyambThumb() {
  return (
    <div className="w-[264px]">
      <div className="flex gap-[11px]">
        <div className="h-[83px] w-[159px] rounded-[10px] bg-primary px-[14px] pt-[12px] text-on-primary">
          <p className="text-[11px] leading-[14px]">Balance</p>
          <p className="mt-[5px] font-heading text-[19px] leading-[22px] font-bold">$12,480.50</p>
          <span className="mt-[9px] block h-[6px] w-[49px] rounded-full bg-[rgb(27_29_33/0.25)]" />
        </div>
        <Panel className="flex h-[83px] flex-1 items-center justify-center">
          <svg width="76" height="40" viewBox="0 0 76 40" fill="none">
            <path
              d="M2 37 17 25l12 7L48 6l22 8"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Panel>
      </div>
      {[
        { dot: "bg-accent", amount: "-$42.10", tone: "text-text" },
        { dot: "bg-primary", amount: "+$1,200", tone: "text-accent" },
      ].map((row) => (
        <Panel key={row.amount} className="mt-[9px] flex h-[28px] items-center gap-[8px] px-[11px]">
          <span className={`h-[13px] w-[13px] rounded-full ${row.dot}`} />
          <Bar className="w-[82px] bg-[rgb(244_241_238/0.3)]" />
          <span className={`ml-auto text-[11px] font-semibold ${row.tone}`}>{row.amount}</span>
        </Panel>
      ))}
    </div>
  );
}

export function ResearchBuddyThumb() {
  const rows = [
    { title: 136, meta: 100 },
    { title: 117, meta: 90 },
    { title: 99, meta: 81 },
  ];
  return (
    <Panel className="flex h-[163px] w-[272px] overflow-hidden">
      <div className="flex w-[75px] flex-col gap-[19px] border-r border-line px-[11px] pt-[17px]">
        <Bar className="h-[7px] w-[47px] bg-primary" />
        <Bar className="h-[7px] w-[40px] bg-[rgb(244_241_238/0.25)]" />
        <Bar className="h-[7px] w-[52px] bg-[rgb(244_241_238/0.25)]" />
      </div>
      <div className="flex-1 px-[12px] pt-[13px]">
        {rows.map((row) => (
          <div key={row.title} className="mb-[7px] flex flex-col items-start">
            <Bar className="h-[8px] bg-[rgb(244_241_238/0.85)]" style={{ width: row.title }} />
            <Bar
              className="mt-[6px] h-[7px] bg-[rgb(244_241_238/0.25)]"
              style={{ width: row.meta }}
            />
            <span className="mt-[5px] inline-flex h-[14px] items-center rounded-full border border-primary px-[7px] text-[8px] leading-none text-accent">
              APA
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function UphexThumb() {
  const hex = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
  const cell = (cls: string, label?: string, border?: string) => (
    <span className={`absolute h-[80px] w-[70px] ${border ?? ""}`} style={{ clipPath: hex }}>
      <span
        className={`absolute inset-[2px] flex items-center justify-center text-[13px] font-bold text-on-primary ${cls}`}
        style={{ clipPath: hex }}
      >
        {label}
      </span>
    </span>
  );
  return (
    <div className="relative h-[142px] w-[176px] translate-x-[8px] translate-y-[4px]">
      <span className="absolute top-0 left-0">{cell("bg-primary", "Up", "bg-primary")}</span>
      <span className="absolute top-0 left-[70px]">
        {cell("bg-secondary", undefined, "bg-primary")}
      </span>
      <span className="absolute top-[61px] left-[35px]">
        {cell("bg-accent", "Hex", "bg-accent")}
      </span>
      <span className="absolute top-[61px] left-[105px]">
        {cell("bg-secondary", undefined, "bg-[rgb(244_241_238/0.2)]")}
      </span>
    </div>
  );
}

export function NizameThumb() {
  const rows = [
    { label: "Present", tone: "border-accent text-accent" },
    { label: "Present", tone: "border-accent text-accent" },
    { label: "Absent", tone: "border-primary text-primary" },
  ];
  return (
    <Panel className="h-[164px] w-[272px] px-[14px] pt-[13px]">
      <p className="text-[11px] leading-[14px] text-muted">Attendance today</p>
      <p className="font-heading text-[19px] leading-[24px] font-bold">94%</p>
      <ul className="m-0 mt-[14px] grid list-none gap-[11px] p-0">
        {rows.map((row, i) => (
          <li key={i} className="flex h-[20px] items-center gap-[9px]">
            <span className="h-[15px] w-[15px] rounded-full bg-[rgb(244_241_238/0.35)]" />
            <Bar className="h-[7px] w-[90px] bg-[rgb(244_241_238/0.75)]" />
            <span
              className={`ml-auto inline-flex h-[20px] items-center rounded-full border px-[11px] text-[10.5px] font-semibold ${row.tone}`}
            >
              {row.label}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** Shop preview: three product tiles with a price bar and a cart button. */
export function StationeryThumb() {
  return (
    <Panel className="h-[164px] w-[272px] px-[14px] pt-[13px]">
      <p className="text-[11px] leading-[14px] text-muted">Stationery</p>
      <ul className="m-0 mt-[12px] grid list-none grid-cols-3 gap-[9px] p-0">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex flex-col gap-[7px]">
            <span className="block h-[56px] rounded-[8px] bg-[rgb(244_241_238/0.12)]" />
            <Bar className="h-[6px] w-[48px] bg-[rgb(244_241_238/0.75)]" />
            <Bar className="h-[6px] w-[30px] bg-primary" />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** Picks the preview for a product. */
export function ProductThumb({ thumbnail }: { thumbnail: ThumbnailKey }) {
  switch (thumbnail) {
    case "clinidesk":
      return <ClinideskThumb compact />;
    case "nexa-ai":
      return <NexaThumb />;
    case "autobuffy":
      return <AutobuffyThumb />;
    case "meyamb":
      return <MeyambThumb />;
    case "research-buddy":
      return <ResearchBuddyThumb />;
    case "uphex":
      return <UphexThumb />;
    case "nizame-taleem":
      return <NizameThumb />;
    case "naeem-stationery-store":
      return <StationeryThumb />;
  }
}
