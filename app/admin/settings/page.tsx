"use client";

import { useState } from "react";
import { Shield, Wrench, Bell, Globe2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Settings
        </h1>
        <p className="text-zinc-500 mt-1 text-sm md:text-base">
          Configure global options for the Billsera admin and workspace security.
        </p>
      </div>

      {/* General */}
      <section className="surface rounded-2xl border border-white/10 p-6 md:p-7 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Globe2 className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white text-lg">General</h2>
            <p className="text-xs text-zinc-500">
              High‑level controls that affect all tenants.
            </p>
          </div>
        </div>

        <div className="mt-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-medium text-zinc-100">Maintenance mode</p>
              <p className="text-sm text-zinc-500">
                Temporarily disable access for all non‑admin users. Useful for migrations or incidents.
              </p>
            </div>
            <button
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                maintenance
                  ? "bg-red-500/10 border-red-500/60 text-red-300"
                  : "bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800"
              }`}
              onClick={() => setMaintenance((v) => !v)}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  maintenance ? "bg-red-400" : "bg-emerald-400"
                }`}
              />
              {maintenance ? "On (live traffic blocked)" : "Off"}
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-white/10">
            <div>
              <p className="font-medium text-zinc-100">Default timezone</p>
              <p className="text-sm text-zinc-500">
                Controls how times are displayed across the admin dashboards.
              </p>
            </div>
            <select className="w-full md:w-60 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-100 outline-none focus:border-violet-500/50">
              <option>UTC</option>
              <option>GMT</option>
              <option>Europe/London</option>
              <option>America/New_York</option>
              <option>Africa/Lagos</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="surface rounded-2xl border border-white/10 p-6 md:p-7 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Bell className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white text-lg">Notifications</h2>
            <p className="text-xs text-zinc-500">
              Control which events send email alerts to admins.
            </p>
          </div>
        </div>

        <div className="mt-2 space-y-4">
          <label className="flex items-start justify-between gap-3 cursor-pointer">
            <div>
              <p className="font-medium text-zinc-100">
                Waitlist &amp; signup alerts
              </p>
              <p className="text-sm text-zinc-500">
                Send an email when someone joins the waitlist or completes onboarding.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEmailAlerts((v) => !v)}
              className={`ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                emailAlerts
                  ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-300"
                  : "bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {emailAlerts ? "Enabled" : "Disabled"}
            </button>
          </label>

          <label className="flex items-start justify-between gap-3 cursor-pointer">
            <div>
              <p className="font-medium text-zinc-100">Billing changes</p>
              <p className="text-sm text-zinc-500">
                Notify admins when a subscription is created, upgraded, downgraded, or cancelled.
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-zinc-400">
              Always on
            </span>
          </label>
        </div>
      </section>

      {/* Security / danger zone */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface rounded-2xl border border-white/10 p-6 md:p-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">Security</h2>
              <p className="text-xs text-zinc-500">
                Keep your admin workspace safe.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <label className="flex items-start justify-between gap-3 cursor-pointer">
              <div>
                <p className="font-medium text-zinc-100">Login alerts</p>
                <p className="text-sm text-zinc-500">
                  Email the primary admin when a new device signs in.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLoginAlerts((v) => !v)}
                className={`ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  loginAlerts
                    ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-300"
                    : "bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {loginAlerts ? "Enabled" : "Disabled"}
              </button>
            </label>

            <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs text-amber-200">
              These toggles are UI‑only for now. Wire them to your API or Supabase config when ready.
            </div>
          </div>
        </div>

        <div className="surface rounded-2xl border border-white/10 p-6 md:p-7 flex flex-col justify-between">
          <div>
            <p className="font-semibold text-red-400 mb-1.5">Danger zone</p>
            <p className="text-sm text-zinc-500 mb-3">
              Coming soon: tools to pause billing, archive tenants, and perform hard deletes.
            </p>
          </div>
          <button
            type="button"
            className="self-start px-4 py-2 rounded-xl border border-red-500/60 text-sm text-red-400 hover:bg-red-500/10"
          >
            View planned actions
          </button>
        </div>
      </section>
    </div>
  );
}
