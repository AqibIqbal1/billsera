"use client";

import { useState, useEffect } from "react";
import { DataTable, type DataTableRow } from "@/components/data-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

const subscriptions = [
  {
    id: "sub_001",
    tenant: "Acme Corp",
    plan: "Pro",
    status: "active",
    renewsAt: "2026-04-10",
    mrr: 79,
  },
  {
    id: "sub_002",
    tenant: "TechStart Inc",
    plan: "Starter",
    status: "past_due",
    renewsAt: "2026-03-28",
    mrr: 39,
  },
  {
    id: "sub_003",
    tenant: "Design Co",
    plan: "Pro",
    status: "canceled",
    renewsAt: "2026-02-01",
    mrr: 0,
  },
  {
    id: "sub_004",
    tenant: "Consulting LLC",
    plan: "Enterprise",
    status: "active",
    renewsAt: "2026-03-18",
    mrr: 199,
  },
];

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  past_due: "bg-amber-500/20 text-amber-400",
  canceled: "bg-red-500/20 text-red-400",
};

export default function AdminSubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = subscriptions.filter(
    (s) =>
      s.tenant.toLowerCase().includes(search.toLowerCase()) ||
      s.plan.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const rows: DataTableRow[] = paginated.map((sub, index) => ({
    id: sub.id,
    cells: {
      sno: (
        <span className="text-zinc-500 tabular-nums">{start + index + 1}</span>
      ),
      name: (
        <span className="font-medium text-zinc-100">{sub.tenant}</span>
      ),
      plan: (
        <span className="text-sm font-medium text-zinc-100">{sub.plan}</span>
      ),
      revenue: (
        <span className="text-sm text-zinc-100 font-medium">
          ${sub.mrr}/mo
        </span>
      ),
      status: (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium capitalize ${statusStyles[sub.status] || "bg-zinc-700 text-zinc-200"
            }`}
        >
          {sub.status.replace("_", " ")}
        </span>
      ),
      renewsAt: (
        <span className="text-sm text-zinc-400">
          {new Date(sub.renewsAt).toLocaleDateString()}
        </span>
      ),
    },
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Subscriptions
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage plans, statuses, and billing for all tenants.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-950 border border-white/6 p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              type="search"
              placeholder="Search by company, plan, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-black border border-white/10 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/60"
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: "sno", header: "S.No" },
          { key: "name", header: "Name" },
          { key: "plan", header: "Plan" },
          { key: "revenue", header: "Revenue" },
          { key: "status", header: "Status" },
          { key: "renewsAt", header: "Renews At" },
        ]}
        rows={rows}
        emptyMessage="No subscriptions found."
        footer={
          filtered.length > 0 && (
            <>
              <span className="text-zinc-500">
                Page {currentPage} of {totalPages} · {filtered.length} item
                {filtered.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent text-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )
        }
      />
    </div>
  );
}

