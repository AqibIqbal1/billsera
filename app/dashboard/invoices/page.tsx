"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { DataTable, type DataTableRow } from "@/components/data-table";

// Mock data – replace with API
const invoices = [
  { id: "INV-001", client: "Acme Corp", amount: 4500, status: "paid", date: "2026-03-08" },
  { id: "INV-002", client: "TechStart Inc", amount: 2100, status: "pending", date: "2026-03-09" },
  { id: "INV-003", client: "Design Co", amount: 890, status: "paid", date: "2026-03-05" },
  { id: "INV-004", client: "Consulting LLC", amount: 5200, status: "overdue", date: "2026-02-28" },
  { id: "INV-005", client: "Studio X", amount: 1200, status: "draft", date: "2026-03-10" },
];

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-amber-500/20 text-amber-400",
  overdue: "bg-red-500/20 text-red-400",
  draft: "bg-zinc-500/20 text-zinc-400",
};

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const filtered = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header row like Students page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Invoices
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage all your invoices, payments, and statuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.12] bg-zinc-950 text-sm text-zinc-200 hover:bg-zinc-900 transition-colors">
            Export
          </button>
          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Invoice
          </Link>
        </div>
      </div>

      {/* Filters & search row */}
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="search"
              placeholder="Search invoices or clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/60"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-black border border-white/[0.08] text-xs sm:text-sm text-zinc-300 min-w-[130px]">
            <span>Status: All</span>
            <span className="text-zinc-500 text-lg leading-none">▾</span>
          </button>
          <button className="inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-black border border-white/[0.08] text-xs sm:text-sm text-zinc-300 min-w-[130px]">
            <span>Period: This month</span>
            <span className="text-zinc-500 text-lg leading-none">▾</span>
          </button>
        </div>
      </div>

      {/* Table card using shared DataTable */}
      <DataTable
        columns={[
          { key: "sno", header: "S.No"},
          { key: "invoice", header: "Invoice" },
          { key: "client", header: "Client" },
          { key: "amount", header: "Amount" },
          { key: "status", header: "Status" },
          { key: "date", header: "Date" },
          { key: "actions", header: "Actions", align: "right" },
        ]}
        rows={
          filtered.map<DataTableRow>((inv, index) => ({
            id: inv.id,
            cells: {
              sno: (
                <span className="text-zinc-500 tabular-nums">{index + 1}</span>
              ),
              invoice: (
                <Link
                  href={`/dashboard/invoices/${inv.id}`}
                  className="flex flex-col group"
                >
                  <span className="font-medium text-zinc-100 group-hover:text-violet-400 transition-colors">
                    {inv.id}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    #{inv.id.slice(-3)}
                  </span>
                </Link>
              ),
              client: (
                <span className="text-sm text-zinc-400">{inv.client}</span>
              ),
              amount: (
                <span className="font-medium text-zinc-100">
                  ${inv.amount.toLocaleString()}
                </span>
              ),
              status: (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium capitalize ${
                    statusStyles[inv.status] || ""
                  }`}
                >
                  {inv.status}
                </span>
              ),
              date: (
                <span className="text-zinc-400 text-sm">
                  {new Date(inv.date).toLocaleDateString()}
                </span>
              ),
              actions: (
                <Link
                  href={`/dashboard/invoices/${inv.id}`}
                  className="text-sm font-medium text-violet-400 hover:text-violet-300"
                >
                  View
                </Link>
              ),
            },
          })) as DataTableRow[]
        }
        emptyMessage={
          <>
            No invoices found.{" "}
            <Link
              href="/dashboard/invoices/new"
              className="text-violet-400 hover:text-violet-300"
            >
              Create your first invoice
            </Link>
          </>
        }
        footer={
          <>
            <span>
              Page 1 of 1 · {filtered.length} item
              {filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-900">
                Prev
              </button>
              <button className="px-2 py-1 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-900">
                Next
              </button>
            </div>
          </>
        }
      />
    </div>
  );
}
