"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, MoreHorizontal, FileText } from "lucide-react";

// Mock data – replace with API fetch
const invoice = {
  id: "INV-001",
  client: "Acme Corp",
  clientEmail: "billing@acme.com",
  status: "paid",
  dueDate: "2026-03-15",
  createdAt: "2026-03-08",
  items: [
    { description: "Consulting services", qty: 10, rate: 150 },
    { description: "Design work", qty: 5, rate: 200 },
  ],
  subtotal: 2500,
  tax: 250,
  total: 2750,
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to invoices
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">{id}</h1>
            <p className="text-zinc-500 text-sm">{invoice.client}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              invoice.status === "paid"
                ? "bg-emerald-500/20 text-emerald-400"
                : invoice.status === "pending"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-zinc-500/20 text-zinc-400"
            }`}
          >
            {invoice.status}
          </span>
          <button className="p-2.5 rounded-xl bg-violet-500 text-white hover:bg-violet-400 transition-colors">
            <Send className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-xl surface text-zinc-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="surface rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">Bill to</p>
            <p className="font-bold text-zinc-100">{invoice.client}</p>
            <p className="text-sm text-zinc-400">{invoice.clientEmail}</p>
          </div>
          <div className="text-sm text-zinc-500 space-y-1">
            <p>Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p>Created: {new Date(invoice.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 text-xs font-semibold text-zinc-500 uppercase">
                  Description
                </th>
                <th className="text-right py-3 text-xs font-semibold text-zinc-500 uppercase">
                  Qty
                </th>
                <th className="text-right py-3 text-xs font-semibold text-zinc-500 uppercase">
                  Rate
                </th>
                <th className="text-right py-3 text-xs font-semibold text-zinc-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-white/[0.06]">
                  <td className="py-4 text-zinc-100">{item.description}</td>
                  <td className="py-4 text-right text-zinc-400">{item.qty}</td>
                  <td className="py-4 text-right text-zinc-400">
                    ${item.rate.toLocaleString()}
                  </td>
                  <td className="py-4 text-right font-medium text-zinc-100">
                    ${(item.qty * item.rate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="text-zinc-100">
                ${invoice.subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Tax</span>
              <span className="text-zinc-100">
                ${invoice.tax.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-2 font-bold text-zinc-100">
              <span>Total</span>
              <span>${invoice.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
