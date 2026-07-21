import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, itemListSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/site/FaqSection";
import { tourFaqs } from "@/temp/faq";
import { tourList } from "@/temp/tours";
import PageHero from "@/components/site/PageHero";
import ToursExplorer from "@/components/site/ToursExplorer";
import { heroImage } from "@/temp/home";

export const metadata: Metadata = pageMetadata({
  title: "Tours & Packages",
  description:
    "Browse curated tour packages worldwide — beach escapes, adventures, cultural trips, luxury getaways and more.",
  path: "/tours",
  keywords: [
    "tour packages",
    "holiday packages",
    "guided tours",
    "beach holidays",
    "adventure travel",
  ],
});

export default function ToursPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Tours", path: "/tours" }]),
          itemListSchema(
            "Tour packages",
            tourList.map((t) => ({
              name: t.title,
              url: "/tours",
              image: t.image,
              price: t.price,
              rating: t.rating,
              reviews: t.reviews,
            }))
          ),
        ]}
      />

      <PageHero
        eyebrow="Discover by Experience"
        title="Explore Our Tours"
        subtitle="From relaxing beach escapes to thrilling adventures — find the perfect tour handpicked by our travel experts."
        image={heroImage}
      />
      <section className="container-x py-12 sm:py-16">
        <ToursExplorer />
      </section>
      <FaqSection title="Planning a tour with TravelPerk" faqs={tourFaqs} />
    </>
  );
}
