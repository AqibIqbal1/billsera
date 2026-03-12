"use client";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
        <p className="text-zinc-500 mt-1">
          Configure global options for Billsera.
        </p>
      </div>

      <div className="space-y-4">
        <div className="surface rounded-2xl border border-white/10 p-6 flex items-center justify-between">
          <div>
            <p className="font-medium text-zinc-100">Maintenance mode</p>
            <p className="text-sm text-zinc-500">
              Temporarily disable access for all non-admin users.
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-300 hover:bg-zinc-800">
            Off
          </button>
        </div>

        <div className="surface rounded-2xl border border-white/10 p-6">
          <p className="font-medium text-zinc-100 mb-1">Danger zone</p>
          <p className="text-sm text-zinc-500 mb-3">
            Coming soon: tools to manage billing and hard deletes.
          </p>
          <button className="px-4 py-2 rounded-xl border border-red-500/40 text-sm text-red-400 hover:bg-red-500/10">
            View options
          </button>
        </div>
      </div>
    </div>
  );
}

