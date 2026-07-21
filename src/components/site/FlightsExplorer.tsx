"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { flightList } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { saveBooking } from "@/lib/booking";
import { useDimension } from "@/hooks/useDimension";
import { CheckIcon, ClockIcon, PlaneIcon } from "../Icons";
import Drawer from "../Drawer";
import SeatMap, { seatExtra } from "./SeatMap";

type Sort = "cheapest" | "fastest" | "earliest";
type Flight = (typeof flightList)[number];

const TAXES_RATE = 0.14;

const toMinutes = (d: string) => {
  const h = /(\d+)h/.exec(d)?.[1] ?? "0";
  const m = /(\d+)m/.exec(d)?.[1] ?? "0";
  return Number(h) * 60 + Number(m);
};

export default function FlightsExplorer() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const { isMobile } = useDimension();
  const [sort, setSort] = useState<Sort>("cheapest");
  const [selected, setSelected] = useState<Flight | null>(null);
  const [seats, setSeats] = useState<string[]>([]);

  // Fares scale with the number of seats; each seat may carry a cabin upgrade.
  const passengers = Math.max(1, seats.length);
  const baseFare = selected ? selected.price * passengers : 0;
  const seatFee = seats.reduce((sum, s) => sum + seatExtra(s), 0);
  const taxes = Math.round(baseFare * TAXES_RATE);
  const total = baseFare + seatFee + taxes;

  const openFlight = (f: Flight) => {
    setSelected(f);
    setSeats([]);
  };

  const toggleSeat = (seat: string) =>
    setSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );

  /** Park the selection, then send the user to sign in or straight to payment. */
  const handleConfirm = () => {
    if (!selected || seats.length === 0) return;

    saveBooking({
      flightId: selected.id,
      airline: selected.airline,
      logo: selected.logo,
      from: selected.from,
      to: selected.to,
      fromCity: selected.fromCity,
      toCity: selected.toCity,
      depart: selected.depart,
      arrive: selected.arrive,
      duration: selected.duration,
      stops: selected.stops,
      seats: [...seats].sort(),
      baseFare: selected.price,
      seatFee,
      taxes,
      total,
    });

    router.push(
      user ? "/checkout" : `/login?next=${encodeURIComponent("/checkout")}`
    );
  };

  const list = [...flightList].sort((a, b) => {
    if (sort === "fastest") return toMinutes(a.duration) - toMinutes(b.duration);
    if (sort === "earliest") return a.depart.localeCompare(b.depart);
    return a.price - b.price;
  });

  const sorts: { key: Sort; label: string }[] = [
    { key: "cheapest", label: "Cheapest" },
    { key: "fastest", label: "Fastest" },
    { key: "earliest", label: "Earliest" },
  ];

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="font-semibold text-navy-800">{list.length}</span> flights
          · New York → Paris
        </p>
        <div className="flex gap-2">
          {sorts.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                sort === s.key
                  ? "bg-navy-500 text-white shadow-sm"
                  : "border border-navy-100 bg-white text-navy-700 hover:bg-navy-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {list.map((f) => (
          <article
            key={f.id}
            className={`flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-soft transition hover:shadow-card sm:flex-row sm:items-center ${
              selected?.id === f.id
                ? "border-navy-500 ring-4 ring-navy-500/10"
                : "border-navy-50"
            }`}
          >
            {/* Airline */}
            <div className="flex items-center gap-3 sm:w-44">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-xl">
                {f.logo}
              </span>
              <div>
                <p className="text-sm font-bold text-navy-800">{f.airline}</p>
                <p className="text-xs text-muted">{f.id.toUpperCase()}</p>
              </div>
            </div>

            {/* Route */}
            <div className="flex flex-1 items-center justify-between gap-2">
              <div className="text-center">
                <p className="text-lg font-extrabold text-navy-800">{f.depart}</p>
                <p className="text-xs text-muted">{f.from}</p>
              </div>
              <div className="flex flex-1 flex-col items-center px-2">
                <span className="text-[11px] text-muted">{f.duration}</span>
                <div className="my-1 flex w-full items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy-300" />
                  <span className="h-px flex-1 bg-navy-100" />
                  <PlaneIcon className="h-3.5 w-3.5 text-navy-400" />
                  <span className="h-px flex-1 bg-navy-100" />
                  <span className="h-1.5 w-1.5 rounded-full bg-navy-300" />
                </div>
                <span className="text-[11px] font-medium text-teal-600">
                  {f.stops}
                </span>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-navy-800">{f.arrive}</p>
                <p className="text-xs text-muted">{f.to}</p>
              </div>
            </div>

            {/* Price + action */}
            <div className="flex items-center justify-between gap-3 border-t border-navy-50 pt-4 sm:w-40 sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <p className="text-xl font-extrabold text-navy-800">${f.price}</p>
              <button
                onClick={() => openFlight(f)}
                aria-label={`Select ${f.airline} flight at ${f.depart} for $${f.price}`}
                className="rounded-full bg-gold-500 px-5 py-2 text-xs font-bold text-navy-800 transition hover:bg-gold-400"
              >
                Select
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Selection details */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        // A side panel needs width phones don't have — slide up instead.
        side={isMobile ? "bottom" : "right"}
        size={isMobile ? "92vh" : "26rem"}
        ariaLabel="Flight details"
        className={`flex flex-col ${isMobile ? "rounded-t-3xl" : ""}`}
      >
        {selected && (
          <>
            <div className="flex items-start justify-between gap-3 border-b border-navy-50 p-6">
              <div>
                <p className="eyebrow">Your selection</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy-800">
                  {selected.fromCity} → {selected.toCity}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-600 transition hover:bg-navy-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-xl">
                  {selected.logo}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-800">
                    {selected.airline}
                  </p>
                  <p className="text-xs text-muted">
                    {selected.id.toUpperCase()} · Economy
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-navy-50 bg-navy-50/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-extrabold text-navy-800">
                      {selected.depart}
                    </p>
                    <p className="text-xs text-muted">{selected.from}</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center px-3">
                    <span className="flex items-center gap-1 text-[11px] text-muted">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {selected.duration}
                    </span>
                    <div className="my-1 flex w-full items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-navy-300" />
                      <span className="h-px flex-1 bg-navy-100" />
                      <PlaneIcon className="h-3.5 w-3.5 text-navy-400" />
                      <span className="h-px flex-1 bg-navy-100" />
                      <span className="h-1.5 w-1.5 rounded-full bg-navy-300" />
                    </div>
                    <span className="text-[11px] font-medium text-teal-600">
                      {selected.stops}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-navy-800">
                      {selected.arrive}
                    </p>
                    <p className="text-xs text-muted">{selected.to}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-bold text-navy-800">
                  Choose your seats
                </p>
                <p className="mb-3 text-xs text-muted">
                  Tap a seat to add a passenger.
                </p>
                <SeatMap
                  flightId={selected.id}
                  selected={seats}
                  onToggle={toggleSeat}
                />
              </div>

              {seats.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {[...seats].sort().map((s) => (
                    <span
                      key={s}
                      className="flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-1 text-xs font-bold text-navy-700"
                    >
                      <CheckIcon className="h-3 w-3 text-navy-500" />
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <p className="mb-2 text-sm font-bold text-navy-800">
                  Price breakdown
                </p>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between text-navy-700">
                    <dt>
                      Base fare · {passengers}{" "}
                      {passengers > 1 ? "passengers" : "passenger"}
                    </dt>
                    <dd className="font-semibold">${baseFare}</dd>
                  </div>
                  <div className="flex justify-between text-navy-700">
                    <dt>Seat upgrades</dt>
                    <dd className="font-semibold">${seatFee}</dd>
                  </div>
                  <div className="flex justify-between text-navy-700">
                    <dt>Taxes & fees</dt>
                    <dd className="font-semibold">${taxes}</dd>
                  </div>
                  <div className="flex justify-between border-t border-navy-50 pt-2 text-navy-800">
                    <dt className="font-bold">Total</dt>
                    <dd className="text-lg font-extrabold">${total}</dd>
                  </div>
                </dl>
              </div>

              <ul className="space-y-1.5 text-xs text-muted">
                <li>· Free cancellation within 24 hours</li>
                <li>· 1 carry-on + 1 checked bag included</li>
                <li>· Instant e-ticket confirmation</li>
              </ul>
            </div>

            <div className="border-t border-navy-50 p-6">
              <button
                onClick={handleConfirm}
                disabled={!ready || seats.length === 0}
                className="w-full rounded-full bg-navy-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-200"
              >
                {seats.length === 0
                  ? "Select a seat to continue"
                  : `Confirm & pay · $${total}`}
              </button>
              {seats.length > 0 && !user && ready && (
                <p className="mt-2 text-center text-[11px] text-muted">
                  You&apos;ll be asked to sign in before payment.
                </p>
              )}
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}
