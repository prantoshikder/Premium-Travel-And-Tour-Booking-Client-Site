"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { payments, type PaymentStatus } from "@/temp/account";
import PageHeader from "@/components/account/PageHeader";
import { ChartIcon, SearchIcon, TicketIcon } from "@/components/Icons";

const filters: { key: PaymentStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "refunded", label: "Refunded" },
  { key: "failed", label: "Failed" },
];

const statusStyles: Record<PaymentStatus, string> = {
  paid: "bg-teal-500/15 text-teal-700",
  pending: "bg-gold-500/20 text-gold-600",
  refunded: "bg-navy-500/10 text-navy-600",
  failed: "bg-red-500/10 text-red-500",
};

const money = (n: number) => `$${n.toLocaleString()}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function PaymentsPage() {
  const [filter, setFilter] = useState<PaymentStatus | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const list = payments.filter((p) => {
    const matchesStatus = filter === "all" || p.status === filter;
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.bookingId.toLowerCase().includes(q) ||
      p.method.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const totals = useMemo(() => {
    const sum = (s: PaymentStatus) =>
      payments.filter((p) => p.status === s).reduce((t, p) => t + p.amount, 0);
    return { paid: sum("paid"), pending: sum("pending"), refunded: sum("refunded") };
  }, []);

  return (
    <>
      <PageHeader
        title="Payment History"
        subtitle="Every charge, refund and invoice tied to your trips."
      />

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Total paid" value={money(totals.paid)} tone="teal" />
        <Stat label="Pending" value={money(totals.pending)} tone="gold" />
        <Stat label="Refunded" value={money(totals.refunded)} tone="navy" />
      </div>

      {/* Filters + search */}
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {filters.map((f) => {
            const active = filter === f.key;
            const count =
              f.key === "all"
                ? payments.length
                : payments.filter((p) => p.status === f.key).length;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-navy-500 text-white shadow-sm"
                    : "border border-navy-100 bg-white text-navy-700 hover:bg-navy-50"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 text-xs ${
                    active ? "bg-white/20" : "bg-navy-50 text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="group relative w-full shrink-0 lg:w-64">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within:text-navy-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trip, ID or method"
            aria-label="Search payments"
            className="w-full rounded-full border border-navy-100 bg-white py-2.5 pl-11 pr-4 text-sm font-medium text-navy-800 shadow-soft outline-none transition-all placeholder:font-normal placeholder:text-muted hover:border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-500/10 [&::-webkit-search-cancel-button]:hidden"
          />
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft lg:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-navy-50 bg-navy-50/50 text-[11px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3 font-bold">Date</th>
                  <th className="px-5 py-3 font-bold">Description</th>
                  <th className="px-5 py-3 font-bold">Method</th>
                  <th className="px-5 py-3 text-right font-bold">Amount</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 text-right font-bold">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {list.map((p) => (
                  <tr key={p.id} className="transition hover:bg-navy-50/40">
                    <td className="whitespace-nowrap px-5 py-4 text-navy-700">
                      {formatDate(p.date)}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-navy-800">{p.title}</p>
                      <Link
                        href="/account/bookings"
                        className="text-xs text-muted transition hover:text-navy-600"
                      >
                        {p.id} · Booking #{p.bookingId}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2">
                        <span
                          className={`grid h-7 w-9 shrink-0 place-items-center rounded-md text-[10px] font-extrabold ${p.badgeClass}`}
                        >
                          {p.badge}
                        </span>
                        <span className="text-navy-700">
                          <span className="block font-semibold">{p.method}</span>
                          <span className="block text-xs text-muted">
                            {p.account}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td
                      className={`whitespace-nowrap px-5 py-4 text-right font-extrabold ${
                        p.status === "refunded" ? "text-navy-400" : "text-navy-800"
                      }`}
                    >
                      {p.status === "refunded" ? `− ${money(p.amount)}` : money(p.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      {p.status === "failed" ? (
                        <span className="text-xs text-muted">—</span>
                      ) : (
                        <button className="rounded-full border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:bg-navy-50">
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 lg:hidden">
            {list.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl border border-navy-50 bg-white p-4 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-navy-800">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      {formatDate(p.date)} · #{p.bookingId}
                    </p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 border-t border-navy-50 pt-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={`grid h-7 w-9 shrink-0 place-items-center rounded-md text-[10px] font-extrabold ${p.badgeClass}`}
                    >
                      {p.badge}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-navy-700">
                        {p.method}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {p.account}
                      </span>
                    </span>
                  </span>
                  <p
                    className={`shrink-0 text-lg font-extrabold ${
                      p.status === "refunded" ? "text-navy-400" : "text-navy-800"
                    }`}
                  >
                    {p.status === "refunded" ? `− ${money(p.amount)}` : money(p.amount)}
                  </p>
                </div>

                {p.status !== "failed" && (
                  <button className="mt-3 w-full rounded-full border border-navy-200 px-4 py-2 text-xs font-semibold text-navy-700 transition hover:bg-navy-50">
                    Download invoice · {p.invoice}
                  </button>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "teal" | "gold" | "navy";
}) {
  const tones = {
    teal: "bg-teal-500/10 text-teal-600",
    gold: "bg-gold-500/15 text-gold-600",
    navy: "bg-navy-500/10 text-navy-600",
  };
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-navy-50 bg-white p-4 shadow-soft">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>
        <ChartIcon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted">{label}</p>
        <p className="truncate text-xl font-extrabold text-navy-800">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-navy-100 bg-white py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-400">
        <TicketIcon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-base font-bold text-navy-800">
        No payments found
      </h3>
      <p className="mt-1 max-w-xs text-sm text-muted">
        Try a different filter or search term — your charges will show up here.
      </p>
    </div>
  );
}
