"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

type LineItem = { description: string; qty: number; rate: number };

export default function NewInvoicePage() {
  const router = useRouter();
  const [client, setClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", qty: 1, rate: 0 },
  ]);

  const addLine = () => {
    setItems([...items, { description: "", qty: 1, rate: 0 }]);
  };

  const removeLine = (i: number) => {
    if (items.length > 1) setItems(items.filter((_, idx) => idx !== i));
  };

  const updateLine = (i: number, field: keyof LineItem, value: string | number) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Call your Express API to create invoice
    // await api.post('/invoices', { client, clientEmail, dueDate, items, total });
    router.push("/dashboard/invoices");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to invoices
      </Link>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
          New Invoice
        </h1>
        <p className="text-zinc-500 mt-1">
          Create and send an invoice to your client
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="surface rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-zinc-100 mb-4">Client</h2>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Client name
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
              placeholder="Acme Corp"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Client email
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              placeholder="billing@acme.com"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">
              Due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-100 outline-none focus:border-violet-500/50"
            />
          </div>
        </div>

        <div className="surface rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-zinc-100">Line items</h2>
            <button
              type="button"
              onClick={addLine}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-violet-400 hover:bg-violet-500/20 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add line
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              <div className="col-span-6">Description</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-2">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-center">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateLine(i, "description", e.target.value)
                  }
                  placeholder="Consulting services"
                  className="col-span-6 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/50 text-sm"
                />
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    updateLine(i, "qty", parseInt(e.target.value) || 0)
                  }
                  className="col-span-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-100 outline-none focus:border-violet-500/50 text-sm"
                />
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={item.rate || ""}
                  onChange={(e) =>
                    updateLine(i, "rate", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="col-span-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-500/50 text-sm"
                />
                <div className="col-span-2 text-right font-medium text-zinc-400">
                  ${(item.qty * item.rate).toLocaleString()}
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(i)}
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-2 text-right">
            <div className="flex justify-end gap-8">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-medium text-zinc-100 w-24">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-end gap-8">
              <span className="text-zinc-500">Tax (10%)</span>
              <span className="font-medium text-zinc-100 w-24">
                ${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-end gap-8 pt-2">
              <span className="font-bold text-zinc-100">Total</span>
              <span className="font-bold text-xl text-zinc-100 w-24">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/invoices"
            className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-violet-500 text-white font-bold hover:bg-violet-400 transition-colors"
          >
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
