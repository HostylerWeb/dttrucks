import Link from "next/link";
import { cn } from "@/lib/utils";

export function DataTable({
  columns,
  rows,
  emptyMessage = "No records found.",
}: {
  columns: { key: string; label: string; className?: string }[];
  rows: {
    id: string;
    cells: Record<string, React.ReactNode>;
    href?: string;
  }[];
  emptyMessage?: string;
}) {
  const firstColumnKey = columns[0]?.key;

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-outline-variant bg-white p-8 text-center text-sm text-secondary shadow-industrial">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-white shadow-industrial">
      <table className="min-w-full divide-y divide-outline-variant">
        <thead className="bg-surface-container-low">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-secondary",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-surface-container-low/60">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn("px-4 py-3 text-sm text-on-surface", col.className)}
                >
                  {row.href && col.key === firstColumnKey ? (
                    <Link
                      href={row.href}
                      className="font-medium text-primary-container hover:underline"
                    >
                      {row.cells[col.key]}
                    </Link>
                  ) : (
                    row.cells[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
