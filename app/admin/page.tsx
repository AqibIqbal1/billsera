"use client";

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Super Admin Overview
        </h1>
        <p className="text-zinc-500 mt-1">
          Manage users, permissions, and platform-wide settings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="surface rounded-2xl border border-white/10 p-6">
          <p className="text-sm text-zinc-500 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-white">1,248</p>
        </div>
        <div className="surface rounded-2xl border border-white/10 p-6">
          <p className="text-sm text-zinc-500 mb-1">Active Tenants</p>
          <p className="text-2xl font-bold text-white">67</p>
        </div>
        <div className="surface rounded-2xl border border-white/10 p-6">
          <p className="text-sm text-zinc-500 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-white">$45,600</p>
        </div>
      </div>

      <div className="surface rounded-2xl border border-white/10 p-8 text-zinc-500">
        Placeholder – integrate your Express admin APIs and metrics here.
      </div>
    </div>
  );
}
