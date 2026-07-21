"use client";

import { useState } from "react";
import Image from "next/image";
import { activityList } from "@/temp/activities";
import { tourCategoryNames } from "@/temp/tours";
import { PinIcon } from "../Icons";
import Rating from "./Rating";

const chips = ["All", ...tourCategoryNames] as const;

export default function ActivitiesExplorer() {
  const [cat, setCat] = useState<(typeof chips)[number]>("All");
  const list = activityList.filter((a) => cat === "All" || a.category === cat);

  return (
    <>
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((a) => (
          <article
            key={a.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-navy-700 shadow">
                {a.duration}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-sm font-bold leading-snug text-navy-800">
                {a.title}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                <PinIcon className="h-3.5 w-3.5" />
                {a.location}
              </p>
              <div className="mt-2">
                <Rating value={a.rating} />
              </div>

              <div className="mt-auto flex items-center justify-between pt-3">
                <p className="text-sm text-muted">
                  <span className="text-lg font-extrabold text-navy-800">
                    ${a.price}
                  </span>
                </p>
                <button className="rounded-full bg-navy-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-navy-600">
                  Book
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
