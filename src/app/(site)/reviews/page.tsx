import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/site/PageHero";
import ReviewsList from "@/components/site/ReviewsList";
import WriteReviewButton from "@/components/site/WriteReviewButton";
import { StarIcon } from "@/components/Icons";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { heroImage } from "@/temp/home";
import { reviews, reviewStats } from "@/temp/reviews";

const { total, average, distribution } = reviewStats();

export const metadata: Metadata = pageMetadata({
  title: "Traveller Reviews",
  description: `Read ${total} verified reviews from TravelPerk travellers — rated ${average}/5 across tours, hotels, flights, activities and visa services.`,
  path: "/reviews",
  keywords: [
    "TravelPerk reviews",
    "travel agency reviews",
    "verified traveller reviews",
    "tour package reviews",
  ],
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Reviews", path: "/reviews" }]),
          {
            "@context": "https://schema.org",
            // Same @id as the site-wide node, so the ratings attach to the brand.
            "@type": "TravelAgency",
            "@id": absoluteUrl("/#organization"),
            name: "TravelPerk",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: average,
              reviewCount: total,
              bestRating: 5,
              worstRating: 1,
            },
            review: reviews.map((r) => ({
              "@type": "Review",
              name: r.title,
              reviewBody: r.text,
              datePublished: r.date,
              author: { "@type": "Person", name: r.name },
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: 5,
                worstRating: 1,
              },
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="What travellers say"
        title="Traveller Reviews"
        subtitle={`${total} verified reviews from people who booked and travelled with us.`}
        image={heroImage}
      />

      <section className="container-x py-12 sm:py-16">
        {/* Rating summary */}
        <div className="mb-8 grid gap-6 rounded-2xl border border-navy-50 bg-white p-6 shadow-soft sm:grid-cols-[auto_1fr] sm:gap-10">
          <div className="text-center sm:text-left">
            <p className="text-5xl font-extrabold text-navy-800">{average}</p>
            <span
              className="mt-1 flex justify-center gap-0.5 sm:justify-start"
              aria-label={`Average rating ${average} out of 5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(average) ? "text-gold-500" : "text-navy-100"
                  }`}
                />
              ))}
            </span>
            <p className="mt-1 text-xs text-muted">{total} verified reviews</p>
          </div>

          <dl className="space-y-1.5">
            {distribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <dt className="w-10 shrink-0 text-muted">{stars} star</dt>
                <dd className="flex flex-1 items-center gap-3">
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-navy-50">
                    <span
                      className="block h-full rounded-full bg-gold-500"
                      style={{ width: `${total ? (count / total) * 100 : 0}%` }}
                    />
                  </span>
                  <span className="w-4 shrink-0 text-right font-semibold text-navy-700">
                    {count}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ReviewsList />

        <div className="mt-10 rounded-2xl border border-navy-50 bg-white p-6 text-center shadow-soft">
          <h2 className="text-lg font-extrabold text-navy-800">
            Travelled with us?
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted">
            Reviews are only published for completed bookings. Open your trips,
            pick a finished one and rate it — it takes a minute.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <WriteReviewButton />
            <Link
              href="/tours"
              className="rounded-full border border-navy-200 bg-white px-6 py-2.5 text-sm font-semibold text-navy-700 transition hover:border-navy-500 hover:bg-navy-500 hover:text-white"
            >
              Browse tours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
