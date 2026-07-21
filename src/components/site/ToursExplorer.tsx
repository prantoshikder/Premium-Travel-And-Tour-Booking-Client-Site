"use client";

import { tourCategoryNames, tourList, tourSlug } from "@/temp/tours";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ClockIcon, PinIcon, SearchIcon } from "../Icons";
import Rating from "./Rating";

const chips = ["All", ...tourCategoryNames] as const;

export default function ToursExplorer() {
  const [cat, setCat] = useState<(typeof chips)[number]>("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const list = tourList.filter((t) => {
    const matchesCat = cat === "All" || t.category === cat;
    const matchesQuery =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <>
      {/* Filter chips + search */}
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
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

        <div className="group relative w-full shrink-0 lg:w-72">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within:text-navy-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tours or destinations"
            aria-label="Search tours"
            className="w-full rounded-full border border-navy-100 bg-white py-2.5 pl-11 pr-10 text-sm font-medium text-navy-800 shadow-soft outline-none transition-all placeholder:font-normal placeholder:text-muted hover:border-navy-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-500/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-navy-50 text-navy-600 transition hover:bg-navy-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                className="h-3 w-3"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <p className="mb-5 text-sm text-muted">
        Showing{" "}
        <span className="font-semibold text-navy-800">{list.length}</span> tours
        {q && (
          <>
            {" "}
            for <span className="font-semibold text-navy-800">“{query}”</span>
          </>
        )}
      </p>

      {list.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy-100 bg-white/60 py-14 text-center">
          <p className="text-sm font-semibold text-navy-800">No tours found</p>
          <p className="mt-1 text-sm text-muted">
            Try a different keyword or category.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <Link
            key={t.id}
            href={`/tours/${tourSlug(t.title)}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative aspect-16/10 overflow-hidden">
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
                <span className="rounded-full bg-navy-500 px-5 py-2 text-xs font-semibold text-white transition group-hover:bg-navy-600">
                  View details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
