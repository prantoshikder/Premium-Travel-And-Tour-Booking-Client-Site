"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/temp/home";
import PageHeader from "@/components/account/PageHeader";
import { PinIcon, HeartIcon, ArrowRightIcon } from "@/components/Icons";

export default function WishlistPage() {
  const [items, setItems] = useState(destinations);

  const remove = (name: string) =>
    setItems((prev) => prev.filter((d) => d.name !== name));

  return (
    <>
      <PageHeader
        title="Wishlist"
        subtitle={`${items.length} saved ${items.length === 1 ? "place" : "places"} you're dreaming about.`}
      />

      {items.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-navy-100 bg-white py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-400">
            <HeartIcon className="h-7 w-7" />
          </span>
          <h3 className="mt-4 text-base font-bold text-navy-800">
            Your wishlist is empty
          </h3>
          <p className="mt-1 max-w-xs text-sm text-muted">
            Tap the heart on any destination to save it here for later.
          </p>
          <Link
            href="/"
            className="mt-5 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-800 transition hover:bg-gold-400"
          >
            Discover destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((d) => (
            <article
              key={d.name}
              className="group overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:shadow-card"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => remove(d.name)}
                  aria-label={`Remove ${d.name} from wishlist`}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-red-500 shadow transition hover:bg-white"
                >
                  <HeartIcon className="h-5 w-5" fill="currentColor" stroke="none" />
                </button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-base font-bold text-navy-800">{d.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                    <PinIcon className="h-3.5 w-3.5" />
                    {d.country}
                  </p>
                </div>
                <Link
                  href="/"
                  className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 text-navy-600 transition hover:bg-navy-500 hover:text-white"
                  aria-label={`Explore ${d.name}`}
                >
                  <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
