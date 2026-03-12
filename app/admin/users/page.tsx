"use client";

import { useState } from "react";
import { DataTable, type DataTableRow } from "@/components/data-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Sarah Lee", email: "sarah@example.com", role: "user" },
  { id: "3", name: "Alex Kim", email: "alex@example.com", role: "owner" },
];

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = users.slice(start, start + PAGE_SIZE);

  const rows: DataTableRow[] = paginated.map((user, index) => ({
    id: user.id,
    cells: {
      sno: <span className="text-zinc-500 tabular-nums">{start + index + 1}</span>,
      name: <span className="font-medium text-zinc-100">{user.name}</span>,
      email: <span className="text-sm text-zinc-400">{user.email}</span>,
      role: (
        <span className="text-xs uppercase tracking-wide text-zinc-400">
          {user.role}
        </span>
      ),
    },
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Users</h1>
          <p className="text-zinc-500 mt-1">
            View and manage all users across the platform.
          </p>
        </div>
      </div>

      <DataTable
        columns={[
          {
            key: "sno",
            header: "S.No",
            headerClassName: "w-16",
            cellClassName: "text-zinc-400",
          },
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role" },
        ]}
        rows={rows}
        emptyMessage="No users found."
        footer={
          users.length > 0 && (
            <>
              <span className="text-zinc-500">
                Page {currentPage} of {totalPages} · {users.length} user
                {users.length !== 1 ? "s" : ""}
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

