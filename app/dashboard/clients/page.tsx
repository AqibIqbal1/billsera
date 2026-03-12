"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { DataTable, type DataTableRow } from "@/components/data-table";

const PAGE_SIZE = 10;

// Mock data – replace with API
const clients = [
  { id: "1", name: "Acme Corp", email: "billing@acme.com", invoices: 5 },
  { id: "2", name: "TechStart Inc", email: "finance@techstart.io", invoices: 3 },
  { id: "3", name: "Design Co", email: "hello@designco.com", invoices: 8 },
  { id: "4", name: "Consulting LLC", email: "accounts@consulting.com", invoices: 2 },
  { id: "5", name: "Studio X", email: "pay@studiox.com", invoices: 1 },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Clients
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage your clients and their invoices.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-400 transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="rounded-2xl bg-zinc-950 border border-white/6 p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="search"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-white/8 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/60"
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: "sno", header: "S.No" },
          { key: "client", header: "Client" },
          { key: "email", header: "Email" },
          { key: "invoices", header: "Invoices" },
          { key: "actions", header: "Actions", align: "right" },
        ]}
        rows={
          paginated.map<DataTableRow>((client, index) => ({
            id: client.id,
            cells: {
              sno: (
                <span className="text-zinc-500 tabular-nums">{start + index + 1}</span>
              ),
              client: (
                <span className="font-medium text-zinc-100">{client.name}</span>
              ),
              email: (
                <span className="text-sm text-zinc-400">{client.email}</span>
              ),
              invoices: (
                <span className="text-sm text-zinc-400">
                  {client.invoices} invoice
                  {client.invoices !== 1 ? "s" : ""}
                </span>
              ),
              actions: (
                <Link
                  href={`/dashboard/invoices/new?client=${client.id}`}
                  className="text-sm font-medium text-violet-400 hover:text-violet-300"
                >
                  New invoice
                </Link>
              ),
            },
          })) as DataTableRow[]
        }
        emptyMessage="No clients found. Add your first client to get started."
        footer={
          filtered.length > 0 ? (
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
          ) : undefined
        }
      />
    </div>
  );
}
