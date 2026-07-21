import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Rating from "@/components/site/Rating";
import FaqSection from "@/components/site/FaqSection";
import BookNowButton from "@/components/site/BookNowButton";
import {
  ClockIcon,
  PinIcon,
  UsersIcon,
  ShieldIcon,
  CheckIcon,
} from "@/components/Icons";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { tourBySlug, tourList, tourSlug, tourSlugs } from "@/temp/tours";
import { tourFaqs } from "@/temp/faq";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every tour at build time — static HTML is what crawlers like. */
export function generateStaticParams() {
  return tourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = tourBySlug(slug);
  if (!tour)
    return pageMetadata({
      title: "Tour not found",
      description: "",
      path: `/tours/${slug}`,
      noIndex: true,
    });

  return pageMetadata({
    title: `${tour.title} — ${tour.duration} in ${tour.location}`,
    description: `Book the ${tour.title}: ${tour.duration} in ${tour.location} from $${tour.price}. Rated ${tour.rating}/5 by ${tour.reviews} travellers, with free cancellation and 24/7 support.`,
    path: `/tours/${slug}`,
    image: tour.image,
    keywords: [
      tour.title,
      `${tour.location} tour`,
      `${tour.category.toLowerCase()} holiday`,
      `${tour.location} travel package`,
    ],
  });
}

const included = [
  "Accommodation for the full stay",
  "Airport transfers both ways",
  "Guided sightseeing with a local expert",
  "Daily breakfast",
  "24/7 on-trip support",
];

export default async function TourDetailPage({ params }: Params) {
  const { slug } = await params;
  const tour = tourBySlug(slug);
  if (!tour) notFound();

  const related = tourList
    .filter((t) => t.id !== tour.id && t.category === tour.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Tours", path: "/tours" },
            { name: tour.title, path: `/tours/${slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: tour.title,
            image: tour.image,
            description: `${tour.duration} ${tour.category.toLowerCase()} tour in ${tour.location}.`,
            brand: { "@type": "Brand", name: "TravelPerk" },
            offers: {
              "@type": "Offer",
              price: tour.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: absoluteUrl(`/tours/${slug}`),
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: tour.rating,
              reviewCount: tour.reviews,
            },
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-800">
        <Image
          src={tour.image}
          alt={`${tour.title} in ${tour.location}`}
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
            <Link href="/tours" className="transition hover:text-gold-400">
              Tours
            </Link>
            <span>/</span>
            <span className="text-white/90">{tour.title}</span>
          </nav>

          <p className="text-xs font-bold tracking-[0.08em] text-gold-400 uppercase">
            {tour.category} tour
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {tour.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-1.5">
              <PinIcon className="h-4 w-4" />
              {tour.location}
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              {tour.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <UsersIcon className="h-4 w-4" />
              {tour.reviews} travellers booked
            </span>
            <Rating value={tour.rating} />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-x grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-8">
          <div>
            <h2 className="section-title text-2xl">About this tour</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-700">
              Spend {tour.duration.toLowerCase()} exploring {tour.location} on a{" "}
              {tour.category.toLowerCase()} itinerary put together by our local
              travel experts. {tour.reviews} travellers have booked it and rated
              it {tour.rating} out of 5, making it one of our most-loved{" "}
              {tour.category.toLowerCase()} escapes.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-navy-700">
              Prices start at ${tour.price.toLocaleString()} per person and
              include stays, transfers and guided sightseeing. Dates are
              flexible year-round, and every booking comes with free
              cancellation for the first 24 hours plus round-the-clock support
              while you travel.
            </p>
          </div>

          <div>
            <h2 className="section-title text-2xl">What&apos;s included</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-navy-50 bg-white p-3 text-sm text-navy-700 shadow-soft"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="section-title text-2xl">
                More {tour.category.toLowerCase()} tours
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/tours/${tourSlug(r.title)}`}
                    className="group overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="relative aspect-16/10">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-navy-800">
                        {r.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted">
                        {r.duration} · from ${r.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking card */}
        <aside className="h-fit rounded-2xl border border-navy-50 bg-white p-6 shadow-soft lg:sticky lg:top-28">
          <p className="text-sm text-muted">from</p>
          <p className="text-3xl font-extrabold text-navy-800">
            ${tour.price.toLocaleString()}
            <span className="ml-1 text-sm font-medium text-muted">
              / person
            </span>
          </p>

          <dl className="mt-4 space-y-2 border-t border-navy-50 pt-4 text-sm">
            <div className="flex justify-between text-navy-700">
              <dt className="text-muted">Duration</dt>
              <dd className="font-semibold">{tour.duration}</dd>
            </div>
            <div className="flex justify-between text-navy-700">
              <dt className="text-muted">Destination</dt>
              <dd className="font-semibold">{tour.location}</dd>
            </div>
            <div className="flex justify-between text-navy-700">
              <dt className="text-muted">Experience</dt>
              <dd className="font-semibold">{tour.category}</dd>
            </div>
            <div className="flex justify-between text-navy-700">
              <dt className="text-muted">Rating</dt>
              <dd className="font-semibold">
                {tour.rating} / 5 · {tour.reviews} reviews
              </dd>
            </div>
          </dl>

          <BookNowButton
            reference={`TOUR-${tour.id.toUpperCase()}`}
            title={tour.title}
            duration={tour.duration}
            price={tour.price}
            image={tour.image}
            label="Book this tour"
            className="mt-5 flex w-full items-center justify-center rounded-full bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400"
          />
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
            <ShieldIcon className="h-3.5 w-3.5 text-teal-600" />
            Free cancellation within 24 hours
          </p>
        </aside>
      </section>

      <FaqSection
        title={`${tour.title} — good to know`}
        intro="The questions travellers ask us most before booking a tour."
        faqs={tourFaqs}
      />
    </>
  );
}
