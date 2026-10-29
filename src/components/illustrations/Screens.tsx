const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/** Block heights per day: [row 1, row 2]; "o" marks booked (orange) blocks. */
const blocks: [number, boolean][][] = [
  [
    [70, true],
    [40, false],
  ],
  [
    [40, false],
    [78, true],
  ],
  [
    [90, false],
    [52, false],
  ],
  [
    [57, true],
    [30, false],
  ],
  [
    [34, false],
    [66, false],
  ],
];

function ScreenCard({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      role="img"
      aria-label={label}
      className="m-0 h-full rounded-card border border-line bg-secondary px-[30px] pt-[30px] pb-[30px]"
    >
      <figcaption className="text-[15px] leading-[20px] font-semibold">{title}</figcaption>
      {children}
    </figure>
  );
}

export function CalendarScreen() {
  return (
    <ScreenCard
      title="Calendar view"
      label="CliniDesk calendar view: a week of appointments from Monday to Friday, with booked slots highlighted."
    >
      <div className="mt-[14px] grid grid-cols-5 gap-x-[8px]">
        {days.map((day, i) => (
          <div key={day} className="flex flex-col">
            <span className="text-center text-[12.5px] leading-[16px] text-muted">{day}</span>
            {blocks[i].map(([height, booked], row) => (
              <span
                key={row}
                className={`block rounded-[8px] ${
                  booked ? "bg-primary" : "border border-[rgb(255_107_44/0.22)] bg-brown"
                } ${row === 0 ? "mt-[10px]" : ""}`}
                style={{
                  height,
                  marginTop: row === 1 ? 98 - blocks[i][0][0] : undefined,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </ScreenCard>
  );
}

const visits = [
  { date: "12 Oct", visit: "General check-up" },
  { date: "28 Sep", visit: "Follow-up" },
  { date: "03 Sep", visit: "New patient visit" },
  { date: "14 Aug", visit: "Lab review" },
];

export function PatientHistoryScreen() {
  return (
    <ScreenCard
      title="Patient history"
      label="CliniDesk patient history: four past visits with Dr. Khan, from a lab review in August to a general check-up in October."
    >
      <ul className="m-0 mt-[5px] list-none p-0">
        {visits.map((v, i) => (
          <li
            key={v.date}
            className={`flex h-[36px] items-center gap-[12px] text-[14px] ${i > 0 ? "border-t border-line" : ""}`}
          >
            <span className="w-[43px] font-mono text-[12px] text-muted">{v.date}</span>
            <span>
              {v.visit} <span className="text-muted">Dr. Khan</span>
            </span>
          </li>
        ))}
      </ul>
    </ScreenCard>
  );
}
