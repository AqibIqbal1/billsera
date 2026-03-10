"use client";

import Link from "next/link";
import {
  FileText,
  DollarSign,
  Plus,
  UserPlus,
} from "lucide-react";

// Mock data
const kpis = [
  { label: "Total Revenue", value: "$12,450", icon: DollarSign },
  { label: "Pending", value: "$3,200", icon: FileText },
  { label: "Paid This Month", value: "$9,250", icon: DollarSign },
  { label: "Invoices", value: "24", icon: FileText },
];

const revenueData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 19000 },
  { month: "Mar", value: 28000 },
  { month: "Apr", value: 22000 },
  { month: "May", value: 35000 },
  { month: "Jun", value: 42000 },
];

const weeklyData = [
  { day: "Mon", value: 92 },
  { day: "Tue", value: 88 },
  { day: "Wed", value: 95 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 98 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));
const maxWeekly = 100;

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-zinc-500 mt-1">
            Welcome back! Here&apos;s an overview of your invoicing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors text-sm border border-white/[0.06]"
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </Link>
          <Link
            href="/dashboard/clients"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors text-sm border border-white/[0.06]"
          >
            <UserPlus className="w-4 h-4" />
            Add Client
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl bg-zinc-900 border border-white/[0.06] p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-zinc-500">
                {kpi.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trends - Line chart */}
        <div className="lg:col-span-2 rounded-2xl bg-zinc-900 border border-white/[0.06] p-6">
          <h2 className="font-bold text-white mb-1">Revenue Trends</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Monthly revenue over the past 6 months
          </p>
          <div className="h-64 flex items-end gap-2">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-full pr-2 text-xs text-zinc-500">
              <span>60000</span>
              <span>45000</span>
              <span>30000</span>
              <span>15000</span>
              <span>0</span>
            </div>
            {/* Chart area */}
            <div className="flex-1 relative h-full">
              <svg
                viewBox="0 0 400 200"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path
                  d={`M 0 200 ${revenueData
                    .map(
                      (d, i) =>
                        `L ${(i / (revenueData.length - 1)) * 400} ${200 - (d.value / maxRevenue) * 180}`
                    )
                    .join(" ")} L 400 200 Z`}
                  fill="url(#lineGradient)"
                />
                {/* Line */}
                <path
                  d={`M ${revenueData
                    .map(
                      (d, i) =>
                        `${(i / (revenueData.length - 1)) * 400},${200 - (d.value / maxRevenue) * 180}`
                    )
                    .join(" L ")}`}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points */}
                {revenueData.map((d, i) => (
                  <circle
                    key={d.month}
                    cx={(i / (revenueData.length - 1)) * 400}
                    cy={200 - (d.value / maxRevenue) * 180}
                    r="4"
                    fill="#8b5cf6"
                  />
                ))}
              </svg>
            </div>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-white/[0.06]">
            {revenueData.map((d) => (
              <span key={d.month} className="text-xs text-zinc-500">
                {d.month}
              </span>
            ))}
          </div>
        </div>

        {/* Payment rate - Bar chart */}
        <div className="rounded-2xl bg-zinc-900 border border-white/[0.06] p-6">
          <h2 className="font-bold text-white mb-1">Payment Rate</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Invoices paid this week (%)
          </p>
          <div className="flex gap-2 h-48 items-end">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full min-h-[4px] rounded-t-lg bg-zinc-700 transition-all hover:bg-violet-500/50"
                  style={{ height: `${(d.value / maxWeekly) * 100}%` }}
                />
                <span className="text-xs text-zinc-500">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-zinc-500">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
