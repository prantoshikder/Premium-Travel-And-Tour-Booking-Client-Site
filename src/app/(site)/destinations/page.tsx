import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/site/PageHero";
import { ArrowRightIcon, PinIcon } from "@/components/Icons";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { destinations } from "@/temp/destinations";
import { heroImage } from "@/temp/home";
import { tourList } from "@/temp/tours";
import { matchesDestination } from "@/temp/destinations";

export const metadata: Metadata = pageMetadata({
  title: "Travel Destinations",
  description:
    "Explore our handpicked destinations — Bali, the Swiss Alps, Santorini, Dubai and Kyoto — with tours, stays and activities for each.",
  path: "/destinations",
  keywords: [
    "travel destinations",
    "best places to visit",
    "holiday destinations",
    "top travel spots",
  ],
});

export default function DestinationsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Destinations", path: "/destinations" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Popular travel destinations",
            numberOfItems: destinations.length,
            itemListElement: destinations.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/destinations/${d.slug}`),
              name: `${d.name}, ${d.country}`,
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Where to next"
        title="Travel Destinations"
        subtitle="Handpicked places our travellers love — each with its own tours, stays and things to do."
        image={heroImage}
      />

      <section className="container-x py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => {
            const tours = tourList.filter((t) => matchesDestination(d, t.location));
            const from = tours.length
              ? Math.min(...tours.map((t) => t.price))
              : null;

            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={`${d.name}, ${d.country}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-900/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h2 className="text-lg font-bold">{d.name}</h2>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-white/85">
                      <PinIcon className="h-3.5 w-3.5" />
                      {d.country}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed text-muted">{d.tagline}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <p className="text-sm text-muted">
                      {tours.length} {tours.length === 1 ? "tour" : "tours"}
                      {from !== null && (
                        <>
                          {" · from "}
                          <span className="font-extrabold text-navy-800">
                            ${from.toLocaleString()}
                          </span>
                        </>
                      )}
                    </p>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 text-navy-600 transition group-hover:bg-navy-500 group-hover:text-white">
                      <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
