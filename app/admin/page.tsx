"use client";

import {
  Users,
  Building2,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

const kpiCards = [
  {
    label: "Total users",
    value: "1,248",
    delta: "+4.2%",
    trend: "up" as const,
    caption: "vs last 30 days",
    icon: Users,
  },
  {
    label: "Active tenants",
    value: "67",
    delta: "+3",
    trend: "up" as const,
    caption: "signed in this week",
    icon: Building2,
  },
  {
    label: "Monthly recurring revenue",
    value: "$45,600",
    delta: "-2.1%",
    trend: "down" as const,
    caption: "churned 2 accounts",
    icon: CreditCard,
  },
];

const mockPlans = [
  { name: "Starter", tenants: 34, mr: "$8.2k" },
  { name: "Growth", tenants: 21, mr: "$23.4k" },
  { name: "Scale", tenants: 8, mr: "$14.0k" },
  { name: "Trial", tenants: 4, mr: "$0" },
];

const mockSecurity = [
  { label: "Admin accounts", value: "5" },
  { label: "2FA enabled", value: "3 / 5" },
  { label: "Last security review", value: "12 days ago" },
];

const mockRecentActivity = [
  {
    id: 1,
    time: "2 min ago",
    title: "New waitlist signup",
    meta: "alex@example.com • from marketing site",
    tag: "Waitlist",
  },
  {
    id: 2,
    time: "24 min ago",
    title: "Subscription upgraded",
    meta: "Acme Corp → Growth plan",
    tag: "Billing",
  },
  {
    id: 3,
    time: "1 hr ago",
    title: "User invited",
    meta: "finance@client.io • Super Admin",
    tag: "Users",
  },
  {
    id: 4,
    time: "Yesterday",
    title: "Failed login attempt",
    meta: "Unknown IP • 3 tries",
    tag: "Security",
  },
];

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Super admin overview
          </h1>
          <p className="text-zinc-500 mt-1 text-sm md:text-base">
            High‑level health of users, tenants, billing and security across Billsera.
          </p>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          const isUp = card.trend === "up";
          return (
            <div
              key={card.label}
              className="surface rounded-2xl border border-white/10 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {card.value}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                    isUp
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-red-500/10 text-red-300"
                  }`}
                >
                  {isUp ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {card.delta}
                </span>
                <span className="text-zinc-500">{card.caption}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plans & tenants */}
        <div className="lg:col-span-2 space-y-4">
          <div className="surface rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm md:text-base">
                    Tenants by plan
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Mock snapshot of where revenue comes from.
                  </p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-white/10">
              <div className="grid grid-cols-3 text-xs text-zinc-500 pb-2">
                <span>Plan</span>
                <span className="text-center">Tenants</span>
                <span className="text-right">MRR</span>
              </div>
              {mockPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="grid grid-cols-3 items-center py-2.5 text-sm"
                >
                  <span className="font-medium text-zinc-100">{plan.name}</span>
                  <span className="text-center text-zinc-300">
                    {plan.tenants}
                  </span>
                  <span className="text-right text-zinc-100">{plan.mr}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm md:text-base">
                    Recent platform activity
                  </h2>
                  <p className="text-xs text-zinc-500">
                    High‑signal events from the last 24 hours.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {mockRecentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-white/10 px-3 py-2.5"
                >
                  <div>
                    <p className="text-xs text-zinc-500">{item.time}</p>
                    <p className="text-sm font-medium text-zinc-100">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.meta}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-900 text-zinc-300">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & hygiene */}
        <div className="space-y-4">
          <div className="surface rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <h2 className="font-semibold text-white text-sm md:text-base">
                  Security snapshot
                </h2>
                <p className="text-xs text-zinc-500">
                  Mock overview of admin access and hygiene.
                </p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {mockSecurity.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-zinc-500">{row.label}</span>
                  <span className="font-medium text-zinc-100">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl border border-white/10 p-5 text-xs text-zinc-500">
            <p className="mb-1 font-medium text-zinc-300">
              Using mock data
            </p>
            <p>
              All metrics above are static placeholders. When your Express or
              Supabase admin APIs are ready, replace these mocks with live
              values from your database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
