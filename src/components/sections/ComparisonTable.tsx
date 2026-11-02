import type { ComparisonTable as Table } from "@/content/services";

/**
 * A comparison table (GEO: answer engines quote tables well). Scrolls inside
 * its own box on small screens, so the page never scrolls sideways.
 */
export function ComparisonTable({ table, id }: { table: Table; id: string }) {
  const [, ...headers] = table.columns;
  return (
    <div
      className="overflow-x-auto rounded-card border border-line"
      role="region"
      aria-labelledby={id}
      tabIndex={0}
    >
      <table
        className="w-full border-collapse text-left text-[15px] leading-[22px]"
        style={{ minWidth: `${Math.max(480, table.columns.length * 170)}px` }}
      >
        <thead>
          <tr className="border-b border-line bg-secondary">
            <td className="px-[18px] py-[14px]" />
            {headers.map((h) => (
              <th key={h} scope="col" className="px-[18px] py-[14px] font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map(([label, ...cells]) => (
            <tr key={label} className="border-b border-line align-top last:border-b-0">
              <th scope="row" className="px-[18px] py-[14px] font-semibold whitespace-nowrap">
                {label}
              </th>
              {cells.map((cell, i) => (
                <td key={headers[i]} className="px-[18px] py-[14px] text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
