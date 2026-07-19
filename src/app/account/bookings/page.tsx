"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookings, type BookingStatus } from "@/lib/data";
import PageHeader from "@/components/account/PageHeader";
import { PinIcon, TicketIcon } from "@/components/Icons";

const filters: { key: BookingStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const statusStyles: Record<BookingStatus, string> = {
  upcoming: "bg-teal-500/15 text-teal-700",
  completed: "bg-navy-500/10 text-navy-600",
  cancelled: "bg-red-500/10 text-red-500",
};

export default function BookingsPage() {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const list = bookings.filter((b) => filter === "all" || b.status === filter);

  return (
    <>
      <PageHeader
        title="My Bookings"
        subtitle="Track your upcoming trips and revisit past adventures."
      />

      {/* Filter tabs */}
      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto">
        {filters.map((f) => {
          const active = filter === f.key;
          const count =
            f.key === "all"
              ? bookings.length
              : bookings.filter((b) => b.status === f.key).length;
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

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {list.map((b) => (
            <article
              key={b.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:shadow-card sm:flex-row"
            >
              <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-56">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 224px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-navy-800">{b.title}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                      <PinIcon className="h-4 w-4" />
                      {b.location}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[b.status]}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-navy-700">
                  <span>
                    <span className="text-muted">Dates:</span> {b.dates}
                  </span>
                  <span>
                    <span className="text-muted">Guests:</span> {b.guests}
                  </span>
                  <span>
                    <span className="text-muted">Booking:</span> #{b.id}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <p className="text-xl font-extrabold text-navy-800">
                    ${b.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-navy-200 px-4 py-2 text-xs font-semibold text-navy-700 transition hover:bg-navy-50">
                      View details
                    </button>
                    {b.status === "upcoming" && (
                      <button className="rounded-full bg-navy-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-600">
                        Manage
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-navy-100 bg-white py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-400">
        <TicketIcon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-base font-bold text-navy-800">No bookings here</h3>
      <p className="mt-1 max-w-xs text-sm text-muted">
        You don&apos;t have any trips in this category yet. Time to plan your next
        adventure!
      </p>
      <Link
        href="/"
        className="mt-5 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-800 transition hover:bg-gold-400"
      >
        Explore trips
      </Link>
    </div>
  );
}
