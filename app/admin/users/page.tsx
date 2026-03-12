"use client";

import { DataTable, type DataTableRow } from "@/components/data-table";

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Sarah Lee", email: "sarah@example.com", role: "user" },
  { id: "3", name: "Alex Kim", email: "alex@example.com", role: "owner" },
];

export default function AdminUsersPage() {
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
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role" },
        ]}
        rows={
          users.map<DataTableRow>((user) => ({
            id: user.id,
            cells: {
              name: <span className="font-medium text-zinc-100">{user.name}</span>,
              email: (
                <span className="text-sm text-zinc-400">{user.email}</span>
              ),
              role: (
                <span className="text-xs uppercase tracking-wide text-zinc-400">
                  {user.role}
                </span>
              ),
            },
          })) as DataTableRow[]
        }
        emptyMessage="No users found."
      />
    </div>
  );
}

