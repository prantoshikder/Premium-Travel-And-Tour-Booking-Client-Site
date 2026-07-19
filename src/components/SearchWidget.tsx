"use client";

import { useState } from "react";
import { PlaneIcon, HotelIcon, CompassIcon, CameraIcon, PassportIcon, SearchIcon } from "./Icons";

const tabs = [
  { id: "flights", label: "Flights", icon: PlaneIcon },
  { id: "hotels", label: "Hotels", icon: HotelIcon },
  { id: "tours", label: "Tours", icon: CompassIcon },
  { id: "activities", label: "Activities", icon: CameraIcon },
  { id: "visa", label: "Visa", icon: PassportIcon },
];

const tripTypes = ["One Way", "Round Trip", "Multi City"];

function Field({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 text-left">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="text-sm font-semibold text-navy-800">{value}</span>
      {sub && <span className="text-[11px] text-muted">{sub}</span>}
    </div>
  );
}

export default function SearchWidget() {
  const [active, setActive] = useState("flights");
  const [trip, setTrip] = useState("Round Trip");

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-3 shadow-[0_30px_80px_-30px_rgba(10,24,54,0.5)] sm:p-4">
      {/* Tabs */}
      <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-navy-50 px-1 pb-3">
        {tabs.map((t) => {
          const Ico = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition sm:px-4 ${
                isActive
                  ? "bg-navy-500 text-white shadow"
                  : "text-muted hover:bg-navy-50 hover:text-navy-600"
              }`}
            >
              <Ico className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Trip type radios */}
      <div className="flex flex-wrap items-center gap-5 px-3 pt-4">
        {tripTypes.map((tt) => (
          <label
            key={tt}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium text-navy-700"
          >
            <span
              onClick={() => setTrip(tt)}
              className={`grid h-4 w-4 place-items-center rounded-full border-2 transition ${
                trip === tt ? "border-gold-500" : "border-navy-200"
              }`}
            >
              {trip === tt && (
                <span className="h-2 w-2 rounded-full bg-gold-500" />
              )}
            </span>
            {tt}
          </label>
        ))}
      </div>

      {/* Fields */}
      <div className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-navy-50 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
        <div className="bg-white">
          <Field label="From" value="New York (NYC)" />
        </div>
        <div className="bg-white">
          <Field label="To" value="Paris (PAR)" />
        </div>
        <div className="bg-white">
          <Field label="Depart" value="24 May, 2025" />
        </div>
        <div className="bg-white">
          <Field label="Return" value="31 May, 2025" />
        </div>
        <div className="bg-white">
          <Field label="Passengers" value="1 Passenger" />
        </div>
        <div className="grid place-items-center bg-white p-2">
          <button className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-4 text-sm font-bold text-navy-800 transition hover:bg-gold-400">
            <SearchIcon className="h-4 w-4" strokeWidth={2.4} />
            <span className="whitespace-nowrap">
              Search {active === "flights" ? "Flights" : tabs.find((t) => t.id === active)?.label}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
