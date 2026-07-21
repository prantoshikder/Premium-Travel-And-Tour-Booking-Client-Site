"use client";

import { hotelList } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import { PinIcon } from "../Icons";
import SortSelect from "../shared/SortSelect";
import Rating from "./Rating";

type Sort = "recommended" | "price-asc" | "rating";

export default function HotelsExplorer() {
  const [sort, setSort] = useState<Sort>("recommended");

  const list = [...hotelList].sort((a, b) => {
    if (sort === "price-asc") return a.pricePerNight - b.pricePerNight;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="font-semibold text-navy-800">{list.length}</span>{" "}
          stays available
        </p>
        <SortSelect<Sort>
          value={sort}
          onChange={setSort}
          options={[
            {
              value: "recommended",
              label: "Recommended",
              hint: "Our best picks for you",
            },
            {
              value: "price-asc",
              label: "Price: Low to High",
              hint: "Cheapest stays first",
            },
            {
              value: "rating",
              label: "Top Rated",
              hint: "Highest guest score",
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((h) => (
          <article
            key={h.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative aspect-16/10 overflow-hidden">
              <Image
                src={h.image}
                alt={h.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {h.tag && (
                <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-800 shadow">
                  {h.tag}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-navy-800">{h.name}</h3>
                <Rating value={h.rating} />
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                <PinIcon className="h-3.5 w-3.5" />
                {h.location}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {h.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-md bg-navy-50 px-2 py-1 text-[11px] font-medium text-navy-600"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between border-t border-navy-50 pt-4">
                <p className="text-sm text-muted">
                  <span className="text-xl font-extrabold text-navy-800">
                    ${h.pricePerNight}
                  </span>{" "}
                  / night
                </p>
                <button className="rounded-full bg-navy-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-navy-600">
                  View Deal
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
