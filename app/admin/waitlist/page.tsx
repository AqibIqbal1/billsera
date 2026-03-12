"use client";

import { useEffect, useState } from "react";
import { DataTable, type DataTableRow } from "@/components/data-table";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

type WaitlistEntry = {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
};

export default function AdminWaitlistPage() {
  const [list, setList] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  async function fetchWaitlist() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to load waitlist");
      setList(data.list ?? []);
      setPage(1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load waitlist");
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedList = list.slice(start, start + PAGE_SIZE);

  const rows: DataTableRow[] = paginatedList.map((entry, index) => ({
    id: entry.id,
    cells: {
      sno: (
        <span className="text-zinc-500 tabular-nums">
          {start + index + 1}
        </span>
      ),
      email: (
        <span className="font-medium text-zinc-100">{entry.email}</span>
      ),
      source: (
        <span className="text-sm text-zinc-400 capitalize">
          {entry.source || "—"}
        </span>
      ),
      joined: (
        <span className="text-sm text-zinc-500">
          {entry.created_at
            ? new Date(entry.created_at).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "—"}
        </span>
      ),
    },
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Waitlist
          </h1>
          <p className="text-zinc-500 mt-1">
            People who signed up from the landing page or waitlist page.
          </p>
        </div>
        <button
          onClick={fetchWaitlist}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm font-medium text-zinc-300 hover:bg-zinc-800 disabled:opacity-60 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <DataTable
        columns={[
          { key: "sno", header: "S.No", align: "left" },
          { key: "email", header: "Email" },
          { key: "source", header: "Source" },
          { key: "joined", header: "Joined" },
        ]}
        rows={rows}
        emptyMessage={
          loading ? (
            <span className="text-zinc-500">Loading…</span>
          ) : (
            "No waitlist entries yet."
          )
        }
        footer={
          list.length > 0 && (
            <>
              <span className="text-zinc-500">
                Page {currentPage} of {totalPages} · {list.length} item
                {list.length !== 1 ? "s" : ""}
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
