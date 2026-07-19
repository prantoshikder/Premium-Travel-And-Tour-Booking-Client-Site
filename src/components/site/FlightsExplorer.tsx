"use client";

import { useState } from "react";
import { flightList } from "@/lib/data";
import { PlaneIcon } from "../Icons";

type Sort = "cheapest" | "fastest" | "earliest";

const toMinutes = (d: string) => {
  const h = /(\d+)h/.exec(d)?.[1] ?? "0";
  const m = /(\d+)m/.exec(d)?.[1] ?? "0";
  return Number(h) * 60 + Number(m);
};

export default function FlightsExplorer() {
  const [sort, setSort] = useState<Sort>("cheapest");

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
            className="flex flex-col gap-4 rounded-2xl border border-navy-50 bg-white p-5 shadow-soft transition hover:shadow-card sm:flex-row sm:items-center"
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
              <button className="rounded-full bg-gold-500 px-5 py-2 text-xs font-bold text-navy-800 transition hover:bg-gold-400">
                Select
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
