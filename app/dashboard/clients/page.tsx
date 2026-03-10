"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Plus, Search, Mail, MoreHorizontal } from "lucide-react";
import { DataTable, type DataTableRow } from "@/components/data-table";

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

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="rounded-2xl bg-zinc-950 border border-white/[0.06] p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="search"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/60"
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: "client", header: "Client" },
          { key: "email", header: "Email" },
          { key: "invoices", header: "Invoices" },
          { key: "actions", header: "Actions", align: "right" },
        ]}
        rows={
          filtered.map<DataTableRow>((client) => ({
            id: client.id,
            cells: {
              client: (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/[0.06]">
                    <Users className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="font-medium text-zinc-100">
                    {client.name}
                  </span>
                </div>
              ),
              email: (
                <span className="flex items-center gap-1.5 text-zinc-400 text-sm">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </span>
              ),
              invoices: (
                <span className="text-zinc-400 text-sm">
                  {client.invoices} invoice
                  {client.invoices !== 1 ? "s" : ""}
                </span>
              ),
              actions: (
                <div className="inline-flex items-center gap-3">
                  <Link
                    href={`/dashboard/invoices/new?client=${client.id}`}
                    className="text-sm text-violet-400 hover:text-violet-300 font-medium"
                  >
                    New invoice
                  </Link>
                  <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          })) as DataTableRow[]
        }
        emptyMessage="No clients found. Add your first client to get started."
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
