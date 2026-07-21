"use client";

import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "../Icons";
import Select from "../shared/Select";
import { reviews, reviewTrips, type Review } from "@/temp/reviews";

type Sort = "recent" | "highest" | "lowest";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

export default function ReviewsList() {
  const [trip, setTrip] = useState<(typeof reviewTrips)[number]>("All");
  const [sort, setSort] = useState<Sort>("recent");

  const list = reviews
    .filter((r) => trip === "All" || r.trip === trip)
    .sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      return b.date.localeCompare(a.date);
    });

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist">
          {reviewTrips.map((t) => {
            const active = trip === t;
            const count =
              t === "All"
                ? reviews.length
                : reviews.filter((r) => r.trip === t).length;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                onClick={() => setTrip(t)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-navy-500 text-white shadow-sm"
                    : "border border-navy-100 bg-white text-navy-700 hover:bg-navy-50"
                }`}
              >
                {t}
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

        <Select<Sort>
          label="Sort by"
          value={sort}
          onChange={setSort}
          align="right"
          options={[
            { value: "recent", label: "Most recent", hint: "Newest first" },
            { value: "highest", label: "Highest rated", hint: "5 stars first" },
            { value: "lowest", label: "Lowest rated", hint: "Critical first" },
          ]}
        />
      </div>

      <p className="mb-4 text-sm text-muted">
        Showing{" "}
        <span className="font-semibold text-navy-800">{list.length}</span>{" "}
        {list.length === 1 ? "review" : "reviews"}
        {trip !== "All" && ` for ${trip.toLowerCase()}`}
      </p>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-navy-100 bg-white/60 py-14 text-center">
          <p className="text-sm font-semibold text-navy-800">No reviews yet</p>
          <p className="mt-1 text-sm text-muted">
            Nothing here for this category — try another one.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex flex-col rounded-2xl border border-navy-50 bg-white p-6 shadow-soft transition hover:shadow-card">
      <div className="flex items-center gap-3">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-400/50">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-navy-800">
            {review.name}
          </p>
          <p className="truncate text-xs text-muted">{review.country}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-bold text-navy-600">
          {review.trip}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="flex gap-0.5" aria-label={`${review.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "text-gold-500" : "text-navy-100"
              }`}
            />
          ))}
        </span>
        <span className="text-[11px] text-muted">
          {formatDate(review.date)}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-bold text-navy-800">{review.title}</h3>
      <blockquote className="mt-1 flex-1 text-sm leading-relaxed text-muted">
        “{review.text}”
      </blockquote>

      <p className="mt-4 border-t border-navy-50 pt-3 text-xs text-muted">
        Trip to{" "}
        <span className="font-semibold text-navy-700">
          {review.destination}
        </span>
      </p>
    </article>
  );
}
