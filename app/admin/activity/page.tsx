import React from "react";
import { Clock, Filter, Search } from "lucide-react";
import { DataTable, type DataTableColumn, type DataTableRow } from "@/components/data-table";

const columns: DataTableColumn[] = [
  { key: "sno", header: "S.No", headerClassName: "w-16", cellClassName: "text-zinc-400" },
  { key: "event", header: "Event" },
  { key: "actor", header: "Actor" },
  { key: "context", header: "Context" },
  { key: "time", header: "Time", align: "right" },
  { key: "status", header: "Status", align: "right" },
];

const MOCK_LOGS: Array<{
  id: number;
  event: string;
  actor: string;
  context: string;
  time: string;
  status: "success" | "warning" | "error";
}> = [
  {
    id: 1,
    event: "New waitlist signup",
    actor: "Public site",
    context: "email: alex@example.com",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    event: "Subscription upgraded",
    actor: "Admin • Super Admin",
    context: "Acme Corp → Growth plan",
    time: "24 min ago",
    status: "success",
  },
  {
    id: 3,
    event: "User invited",
    actor: "Admin • Super Admin",
    context: "invite sent to finance@client.io",
    time: "1 hr ago",
    status: "warning",
  },
  {
    id: 4,
    event: "Failed login",
    actor: "Unknown",
    context: "IP 185.199.110.153",
    time: "3 hrs ago",
    status: "error",
  },
  {
    id: 5,
    event: "Waitlist exported",
    actor: "Admin • Super Admin",
    context: "CSV export (132 rows)",
    time: "Yesterday • 18:32",
    status: "success",
  },
];

function statusBadge(status: "success" | "warning" | "error") {
  const base =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium capitalize";
  if (status === "success") {
    return (
      <span className={`${base} bg-emerald-500/10 text-emerald-300 border border-emerald-500/20`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Success
      </span>
    );
  }
  if (status === "warning") {
    return (
      <span className={`${base} bg-amber-500/10 text-amber-300 border border-amber-500/20`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Warning
      </span>
    );
  }
  return (
    <span className={`${base} bg-red-500/10 text-red-300 border border-red-500/20`}>
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
      Error
    </span>
  );
}

export default function ActivityPage() {
  const rows: DataTableRow[] = MOCK_LOGS.map((log, idx) => ({
    id: log.id,
    cells: {
      sno: idx + 1,
      event: (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-zinc-100">{log.event}</span>
        </div>
      ),
      actor: <span className="text-zinc-400 text-sm">{log.actor}</span>,
      context: <span className="text-zinc-400 text-sm">{log.context}</span>,
      time: <span className="text-zinc-400 text-xs">{log.time}</span>,
      status: statusBadge(log.status),
    },
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Clock className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Activity logs</h1>
            <p className="text-zinc-500 text-sm mt-1">
              See recent changes across waitlist, subscriptions, and user management.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="search"
              placeholder="Search events or actors..."
              className="w-56 pl-9 pr-3 py-2 rounded-xl bg-zinc-950 border border-white/6 text-xs text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/50"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-white/6 text-xs text-zinc-300 hover:bg-white/5">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        emptyMessage="No activity recorded yet."
        footer={
          <div className="flex items-center justify-between w-full">
            <span>Showing {rows.length} events</span>
            <span className="text-zinc-500">
              Activity log is currently using sample data. Wire this up to Supabase when ready.
            </span>
          </div>
        }
      />
    </div>
  );
}

