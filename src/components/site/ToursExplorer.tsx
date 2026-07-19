"use client";

import { useState } from "react";
import Image from "next/image";
import { tourList, tourCategoryNames } from "@/lib/data";
import { PinIcon, ClockIcon } from "../Icons";
import Rating from "./Rating";

const chips = ["All", ...tourCategoryNames] as const;

export default function ToursExplorer() {
  const [cat, setCat] = useState<(typeof chips)[number]>("All");
  const list = tourList.filter((t) => cat === "All" || t.category === cat);

  return (
    <>
      {/* Filter chips */}
      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              cat === c
                ? "bg-navy-500 text-white shadow-sm"
                : "border border-navy-100 bg-white text-navy-700 hover:bg-navy-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mb-5 text-sm text-muted">
        Showing <span className="font-semibold text-navy-800">{list.length}</span>{" "}
        tours
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <article
            key={t.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={t.image}
                alt={t.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-navy-700 shadow">
                {t.category}
              </span>
              {t.badge && (
                <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-800 shadow">
                  {t.badge}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-navy-800">{t.title}</h3>
                <Rating value={t.rating} />
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                <PinIcon className="h-3.5 w-3.5" />
                {t.location}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <ClockIcon className="h-4 w-4" />
                {t.duration} · {t.reviews} reviews
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-navy-50 pt-4">
                <p className="text-sm text-muted">
                  from{" "}
                  <span className="text-xl font-extrabold text-navy-800">
                    ${t.price.toLocaleString()}
                  </span>
                </p>
                <button className="rounded-full bg-navy-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-navy-600">
                  Book Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
