import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, itemListSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/site/FaqSection";
import { activityFaqs } from "@/temp/faq";
import { activityList } from "@/temp/activities";
import PageHero from "@/components/site/PageHero";
import ActivitiesExplorer from "@/components/site/ActivitiesExplorer";
import { whyImage } from "@/temp/home";

export const metadata: Metadata = pageMetadata({
  title: "Activities & Experiences",
  description:
    "Book unforgettable activities and experiences — from sunset cruises to mountain adventures, at the best prices.",
  path: "/activities",
  keywords: ["things to do", "tours and activities", "day trips", "excursions"],
});

export default function ActivitiesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Activities", path: "/activities" }]),
          itemListSchema(
            "Activities and experiences",
            activityList.map((a) => ({
              name: a.title,
              url: "/activities",
              image: a.image,
              price: a.price,
              rating: a.rating,
            }))
          ),
        ]}
      />

      <PageHero
        eyebrow="Things To Do"
        title="Activities & Experiences"
        subtitle="Make your trip memorable with handpicked tours, adventures and local experiences."
        image={whyImage}
      />
      <section className="container-x py-12 sm:py-16">
        <ActivitiesExplorer />
      </section>
      <FaqSection
        title="Booking activities with TravelPerk"
        faqs={activityFaqs}
      />
    </>
  );
}
