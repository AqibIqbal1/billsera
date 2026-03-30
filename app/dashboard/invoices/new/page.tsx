"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  FileText,
  User,
  Calendar,
  Receipt,
  ClipboardList,
} from "lucide-react";

type LineItem = { description: string; qty: number; rate: number };

const CURRENCIES = ["USD", "EUR", "GBP", "NGN"];

// Mock clients for selector – replace with API
const MOCK_CLIENTS = [
  { id: "1", name: "Acme Corp", email: "billing@acme.com" },
  { id: "2", name: "TechStart Inc", email: "finance@techstart.io" },
  { id: "3", name: "Design Co", email: "hello@designco.com" },
];

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 text-sm transition-colors";

const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";

const sectionBadge =
  "w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0";

function NewInvoiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientIdFromQuery = searchParams.get("client");

  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", qty: 1, rate: 0 },
  ]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [taxPercent, setTaxPercent] = useState(10);
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("Payment due within 30 days.");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill client from query or dropdown
  useEffect(() => {
    if (clientIdFromQuery && !clientName) {
      const c = MOCK_CLIENTS.find((x) => x.id === clientIdFromQuery);
      if (c) {
        setClientId(c.id);
        setClientName(c.name);
        setClientEmail(c.email);
      }
    }
  }, [clientIdFromQuery, clientName]);

  useEffect(() => {
    if (clientId) {
      const c = MOCK_CLIENTS.find((x) => x.id === clientId);
      if (c) {
        setClientName(c.name);
        setClientEmail(c.email);
      }
    }
  }, [clientId]);

  const addLine = () => {
    setItems([...items, { description: "", qty: 1, rate: 0 }]);
  };

  const removeLine = (i: number) => {
    if (items.length > 1) setItems(items.filter((_, idx) => idx !== i));
  };

  const updateLine = (
    i: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = (afterDiscount * taxPercent) / 100;
  const total = afterDiscount + taxAmount;

  async function handleSubmit(
    e: React.FormEvent | React.MouseEvent | undefined,
    asDraft: boolean
  ) {
    e?.preventDefault?.();
    setError(null);
    setSaving(true);
    try {
      // TODO: Call your Express API
      // await api.post('/invoices', { ...payload, status: asDraft ? 'draft' : 'pending' });
      await new Promise((r) => setTimeout(r, 600));
      router.push("/dashboard/invoices");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save invoice");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header */}
      <header className="mb-8">
        <Link
          href="/dashboard/invoices"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to invoices
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          New Invoice
        </h1>
        <p className="text-zinc-500 mt-1.5 text-sm md:text-base max-w-xl">
          Add client details, line items, and optional notes. Save as draft or create and send.
        </p>
      </header>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => handleSubmit(e, false)}
        className="space-y-8"
        id="invoice-form"
      >
        {/* Section 1 & 2: Bill to + Invoice details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <section className="surface rounded-2xl border border-white/10 p-6 lg:p-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className={sectionBadge}>
                <User className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-400/90 uppercase tracking-wider">Section 1</span>
                <h2 className="font-semibold text-white text-lg">Bill to</h2>
              </div>
            </div>

            <div>
              <label className={labelClass}>Client</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className={inputClass}
              >
                <option value="">New client</option>
                {MOCK_CLIENTS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Client name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                placeholder="Acme Corp"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Client email *</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                placeholder="billing@acme.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Address (optional)</label>
              <textarea
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="123 Main St, City, Country"
                rows={2}
                className={inputClass + " resize-none"}
              />
            </div>
          </section>

          <section className="surface rounded-2xl border border-white/10 p-6 lg:p-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className={sectionBadge}>
                <Calendar className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-400/90 uppercase tracking-wider">Section 2</span>
                <h2 className="font-semibold text-white text-lg">Invoice details</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Invoice #</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="Auto-generated"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={inputClass}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Issue date *</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Due date *</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Section 3: Line items */}
        <section className="surface rounded-2xl border border-white/10 p-6 lg:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={sectionBadge}>
                <Receipt className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-400/90 uppercase tracking-wider">Section 3</span>
                <h2 className="font-semibold text-white text-lg">Line items</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={addLine}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 text-sm font-medium transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add line
            </button>
          </div>

          <div className="overflow-x-auto -mx-1 px-1 rounded-xl border border-white/5">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-right py-3 px-2 w-20 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="text-right py-3 px-2 w-28 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="text-right py-3 px-2 w-28 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          updateLine(i, "description", e.target.value)
                        }
                        placeholder="Item or service"
                        className={inputClass + " min-w-[180px]"}
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        min={1}
                        value={item.qty || ""}
                        onChange={(e) =>
                          updateLine(i, "qty", parseInt(e.target.value) || 0)
                        }
                        className={inputClass + " w-20 text-right"}
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={item.rate || ""}
                        onChange={(e) =>
                          updateLine(i, "rate", parseFloat(e.target.value) || 0)
                        }
                        placeholder="0"
                        className={inputClass + " w-28 text-right"}
                      />
                    </td>
                    <td className="py-2 px-2 text-right font-medium text-zinc-300 tabular-nums">
                      {currency}{" "}
                      {(item.qty * item.rate).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2 pl-1">
                      <button
                        type="button"
                        onClick={() => removeLine(i)}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Remove line"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Discount & tax + Totals */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-zinc-500 whitespace-nowrap">Discount %</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={discountPercent}
                  onChange={(e) =>
                    setDiscountPercent(parseFloat(e.target.value) || 0)
                  }
                  className={"w-20 " + inputClass + " text-center py-2"}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-zinc-500 whitespace-nowrap">Tax %</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                  className={"w-20 " + inputClass + " text-center py-2"}
                />
              </div>
            </div>
            <div className="ml-auto w-full md:w-auto md:min-w-[280px] rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium text-white tabular-nums">
                  {currency} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Discount ({discountPercent}%)</span>
                  <span className="font-medium text-white tabular-nums">
                    – {currency} {discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Tax ({taxPercent}%)</span>
                <span className="font-medium text-white tabular-nums">
                  {currency} {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="font-semibold text-white">Total</span>
                <span className="font-bold text-lg text-white tabular-nums">
                  {currency} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Notes & terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <section className="surface rounded-2xl border border-white/10 p-6 lg:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className={sectionBadge}>
                <FileText className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-400/90 uppercase tracking-wider">Optional</span>
                <h2 className="font-semibold text-white text-lg">Notes</h2>
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thank you for your business..."
              rows={3}
              className={inputClass + " resize-none"}
            />
          </section>
          <section className="surface rounded-2xl border border-white/10 p-6 lg:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className={sectionBadge}>
                <ClipboardList className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <span className="text-xs font-medium text-violet-400/90 uppercase tracking-wider">Optional</span>
                <h2 className="font-semibold text-white text-lg">Terms</h2>
              </div>
            </div>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Payment terms..."
              rows={3}
              className={inputClass + " resize-none"}
            />
          </section>
        </div>

        {/* Actions – sticky feel with padding */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
          <button
            type="submit"
            form="invoice-form"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-400 disabled:opacity-60 transition-colors shadow-lg shadow-violet-500/20"
          >
            {saving ? "Saving…" : "Create invoice"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e, true);
            }}
            disabled={saving}
            className="px-6 py-3 rounded-xl surface border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 font-medium transition-colors disabled:opacity-60"
          >
            Save as draft
          </button>
          <Link
            href="/dashboard/invoices"
            className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 font-medium transition-colors inline-flex items-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function NewInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center text-zinc-500 text-sm">
          Loading…
        </div>
      }
    >
      <NewInvoiceForm />
    </Suspense>
  );
}
