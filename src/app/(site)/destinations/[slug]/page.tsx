import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Rating from "@/components/site/Rating";
import { ArrowRightIcon, ClockIcon, PinIcon } from "@/components/Icons";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import {
  destinationBySlug,
  destinationSlugs,
  matchesDestination,
} from "@/temp/destinations";
import { tourList, tourSlug } from "@/temp/tours";
import { hotelList } from "@/temp/hotels";
import { activityList } from "@/temp/activities";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = destinationBySlug(slug);
  if (!d)
    return pageMetadata({
      title: "Destination not found",
      description: "",
      path: `/destinations/${slug}`,
      noIndex: true,
    });

  const tours = tourList.filter((t) => matchesDestination(d, t.location));
  const from = tours.length ? Math.min(...tours.map((t) => t.price)) : null;

  return pageMetadata({
    title: `${d.name} Travel Guide — Tours, Hotels & Things to Do`,
    description: `Plan your trip to ${d.name}, ${d.country}: ${tours.length} tour packages${
      from ? ` from $${from}` : ""
    }, handpicked hotels, top activities and the best time to visit.`,
    path: `/destinations/${slug}`,
    image: d.image,
    keywords: [
      `${d.name} travel guide`,
      `${d.name} tour packages`,
      `${d.name} hotels`,
      `things to do in ${d.name}`,
      `best time to visit ${d.name}`,
    ],
  });
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  const d = destinationBySlug(slug);
  if (!d) notFound();

  const tours = tourList.filter((t) => matchesDestination(d, t.location));
  const hotels = hotelList.filter((h) => matchesDestination(d, h.location));
  const activities = activityList.filter((a) =>
    matchesDestination(d, a.location)
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Destinations", path: "/destinations" },
            { name: d.name, path: `/destinations/${slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: `${d.name}, ${d.country}`,
            description: d.intro[0],
            image: d.image,
            url: absoluteUrl(`/destinations/${slug}`),
            touristType: ["Couples", "Families", "Solo travellers"],
            includesAttraction: d.highlights.map((h) => ({
              "@type": "TouristAttraction",
              name: h,
            })),
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-800">
        <Image
          src={d.image}
          alt={`${d.name}, ${d.country}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/90 via-navy-800/80 to-navy-900/90" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-navy-900/70 to-transparent" />

        <div className="container-x relative pt-32 pb-14 sm:pt-40 sm:pb-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
          >
            <Link href="/" className="transition hover:text-gold-400">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/destinations"
              className="transition hover:text-gold-400"
            >
              Destinations
            </Link>
            <span>/</span>
            <span className="text-white/90">{d.name}</span>
          </nav>

          <p className="text-xs font-bold tracking-[0.08em] text-gold-400 uppercase">
            {d.country}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {d.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/85">{d.tagline}</p>
        </div>
      </section>

      {/* Guide */}
      <section className="container-x grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <h2 className="section-title text-2xl">
            Why travellers choose {d.name}
          </h2>
          {d.intro.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-3 text-sm leading-relaxed text-navy-700"
            >
              {paragraph}
            </p>
          ))}

          <h3 className="mt-6 text-base font-bold text-navy-800">
            Don&apos;t miss
          </h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {d.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-xl border border-navy-50 bg-white p-3 text-sm text-navy-700 shadow-soft"
              >
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-2xl border border-navy-50 bg-white p-6 shadow-soft">
          <h2 className="text-sm font-extrabold tracking-wide text-navy-800 uppercase">
            Trip essentials
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold text-muted">
                Best time to visit
              </dt>
              <dd className="font-semibold text-navy-800">{d.bestTime}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted">Currency</dt>
              <dd className="font-semibold text-navy-800">{d.currency}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted">Language</dt>
              <dd className="font-semibold text-navy-800">{d.language}</dd>
            </div>
          </dl>
          <Link
            href="/contact"
            className="mt-5 flex w-full items-center justify-center rounded-full bg-gold-500 py-3 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400"
          >
            Plan my {d.name} trip
          </Link>
        </aside>
      </section>

      {/* Tours */}
      {tours.length > 0 && (
        <section className="container-x pb-12 sm:pb-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="section-title text-2xl">
              {d.name} tour packages ({tours.length})
            </h2>
            <Link
              href="/tours"
              className="flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition hover:text-gold-600"
            >
              All tours
              <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
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
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-navy-800">
                      {t.title}
                    </h3>
                    <Rating value={t.rating} />
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <ClockIcon className="h-4 w-4" />
                    {t.duration} · {t.reviews} reviews
                  </p>
                  <p className="mt-auto pt-4 text-sm text-muted">
                    from{" "}
                    <span className="text-xl font-extrabold text-navy-800">
                      ${t.price.toLocaleString()}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Stays */}
      {hotels.length > 0 && (
        <section className="container-x pb-12 sm:pb-16">
          <h2 className="section-title text-2xl">Where to stay in {d.name}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((h) => (
              <article
                key={h.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft"
              >
                <div className="relative aspect-16/10">
                  <Image
                    src={h.image}
                    alt={h.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-navy-800">
                      {h.name}
                    </h3>
                    <Rating value={h.rating} />
                  </div>
                  <p className="mt-1 text-xs text-muted">{h.location}</p>
                  <p className="mt-auto pt-4 text-sm text-muted">
                    <span className="text-xl font-extrabold text-navy-800">
                      ${h.pricePerNight}
                    </span>{" "}
                    / night
                  </p>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/hotels"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition hover:text-gold-600"
          >
            Browse all stays
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </section>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <section className="container-x pb-16">
          <h2 className="section-title text-2xl">Things to do in {d.name}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-navy-50 bg-white p-4 shadow-soft"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-navy-800">
                    {a.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {a.duration} · {a.category}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-extrabold text-navy-800">
                  ${a.price}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/activities"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition hover:text-gold-600"
          >
            All activities
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </section>
      )}
    </>
  );
}
