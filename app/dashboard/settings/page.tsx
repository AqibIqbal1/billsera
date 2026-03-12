"use client";

import { useState } from "react";
import { Globe2, Receipt, Bell } from "lucide-react";
import currenciesJson from "@/data/currencies.json";

type Currency = { code: string; label: string };
const CURRENCIES = currenciesJson as Currency[];
const DUE_TERMS = ["Due on receipt", "Net 7", "Net 14", "Net 30"];

export default function DashboardSettingsPage() {
  const [currency, setCurrency] = useState("USD");
  const [dueTerm, setDueTerm] = useState("Net 14");
  const [taxPercent, setTaxPercent] = useState(10);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderDaysBefore, setReminderDaysBefore] = useState(2);
  const [reminderDaysAfter, setReminderDaysAfter] = useState(3);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencyQuery, setCurrencyQuery] = useState("");

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const filteredCurrencies = CURRENCIES.filter((c) => {
    const q = currencyQuery.toLowerCase();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.label.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Settings
        </h1>
        <p className="text-zinc-500 mt-1 text-sm md:text-base">
          Personalise how your invoices behave and how amounts are displayed in Billsera.
        </p>
      </div>

      {/* Billing & currency */}
      <section className="relative z-20 surface rounded-2xl border border-white/10 p-6 md:p-7 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Globe2 className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white text-lg">Currency & locale</h2>
            <p className="text-xs text-zinc-500">
              Choose your primary currency and how invoice dates are calculated.
            </p>
          </div>
        </div>

        <div className="mt-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-medium text-zinc-100">Default currency</p>
              <p className="text-sm text-zinc-500">
                Used on new invoices and client totals. You can override per invoice if needed.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <button
                type="button"
                onClick={() => setCurrencyOpen((open) => !open)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-100 text-left outline-none focus:border-violet-500/50"
              >
                <span>
                  {selectedCurrency.code} — {selectedCurrency.label}
                </span>
                <span className="text-xs text-zinc-500">Change</span>
              </button>
              {currencyOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => {
                      setCurrencyOpen(false);
                      setCurrencyQuery("");
                    }}
                  />
                  <div className="absolute left-0 top-full mt-2 z-40 w-full rounded-2xl bg-zinc-950 border border-white/10 shadow-xl">
                    <div className="p-2 border-b border-white/10">
                      <input
                        autoFocus
                        type="search"
                        value={currencyQuery}
                        onChange={(e) => setCurrencyQuery(e.target.value)}
                        placeholder="Search currency..."
                        className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/50"
                      />
                    </div>
                    <div className="max-h-64 overflow-y-auto py-1 text-sm">
                      {filteredCurrencies.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCurrency(c.code);
                            setCurrencyOpen(false);
                            setCurrencyQuery("");
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-white/5 ${
                            c.code === currency ? "text-violet-300" : "text-zinc-200"
                          }`}
                        >
                          <span>
                            {c.code} — {c.label}
                          </span>
                          {c.code === currency && (
                            <span className="text-[10px] uppercase tracking-wide text-violet-400">
                              Selected
                            </span>
                          )}
                        </button>
                      ))}
                      {filteredCurrencies.length === 0 && (
                        <div className="px-3 py-3 text-xs text-zinc-500">
                          No currencies match &ldquo;{currencyQuery}&rdquo;.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3 border-t border-white/10">
            <div>
              <p className="font-medium text-zinc-100">Default due terms</p>
              <p className="text-sm text-zinc-500">
                Controls the initial due date when you create an invoice.
              </p>
            </div>
            <select
              value={dueTerm}
              onChange={(e) => setDueTerm(e.target.value)}
              className="w-full md:w-56 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
            >
              {DUE_TERMS.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Invoices */}
      <section className="surface rounded-2xl border border-white/10 p-6 md:p-7 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Receipt className="w-4 h-4 text-violet-400" />
          </div>
        <div>
            <h2 className="font-semibold text-white text-lg">Invoice defaults</h2>
            <p className="text-xs text-zinc-500">
              Fine‑tune how new invoices are pre‑filled.
            </p>
          </div>
        </div>

        <div className="mt-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-medium text-zinc-100">Default tax percentage</p>
              <p className="text-sm text-zinc-500">
                Applied to the subtotal on new invoices. You can set this to 0% if you don&apos;t charge tax.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={taxPercent}
                onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-100 text-right outline-none focus:border-violet-500/50"
              />
              <span className="text-sm text-zinc-400">%</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-zinc-500">
            These settings are UI‑only for now. When you connect your API or Supabase, persist them per user or workspace.
          </div>
        </div>
      </section>

      {/* Reminders */}
      <section className="surface rounded-2xl border border-white/10 p-6 md:p-7 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Bell className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white text-lg">Invoice reminders</h2>
            <p className="text-xs text-zinc-500">
              Configure smart reminders for upcoming and overdue invoices.
            </p>
          </div>
        </div>

        <div className="mt-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-medium text-zinc-100">Enable reminders</p>
              <p className="text-sm text-zinc-500">
                When enabled, Billsera can email your clients before and after due dates.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRemindersEnabled((v) => !v)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                remindersEnabled
                  ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-300"
                  : "bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {remindersEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-zinc-100 text-sm">
                  Days before due
                </p>
                <p className="text-xs text-zinc-500">
                  Send a friendly reminder before invoices are due.
                </p>
              </div>
              <input
                type="number"
                min={0}
                max={30}
                value={reminderDaysBefore}
                onChange={(e) =>
                  setReminderDaysBefore(parseInt(e.target.value) || 0)
                }
                className="w-20 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-100 text-right outline-none focus:border-violet-500/50"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-zinc-100 text-sm">
                  Days after due
                </p>
                <p className="text-xs text-zinc-500">
                  Follow up on overdue invoices automatically.
                </p>
              </div>
              <input
                type="number"
                min={0}
                max={60}
                value={reminderDaysAfter}
                onChange={(e) =>
                  setReminderDaysAfter(parseInt(e.target.value) || 0)
                }
                className="w-20 px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-zinc-100 text-right outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

