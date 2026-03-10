import React from "react";

type Align = "left" | "right" | "center";

export type DataTableColumn = {
  key: string;
  header: string;
  align?: Align;
  headerClassName?: string;
  cellClassName?: string;
};

export type DataTableRow = {
  id: string | number;
  cells: Record<string, React.ReactNode>;
};

export type DataTableProps = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  emptyMessage?: React.ReactNode;
  footer?: React.ReactNode;
};

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function DataTable({ columns, rows, emptyMessage, footer }: DataTableProps) {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-zinc-950">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "py-3.5 px-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.08em]",
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                        ? "text-center"
                        : "text-left",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 px-6 text-center text-zinc-500 text-sm"
                >
                  {emptyMessage || "No data"}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/[0.04] hover:bg-zinc-900 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "py-3.5 px-4 align-middle",
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                            ? "text-center"
                            : "text-left",
                        col.cellClassName
                      )}
                    >
                      {row.cells[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {footer && (
        <div className="flex items-center justify-between px-6 py-3 text-xs text-zinc-500 border-t border-white/[0.06]">
          {footer}
        </div>
      )}
    </div>
  );
}

