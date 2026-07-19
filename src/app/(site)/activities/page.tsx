import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import ActivitiesExplorer from "@/components/site/ActivitiesExplorer";
import { whyImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Activities & Experiences — TravelPerk",
  description:
    "Book unforgettable activities and experiences — from sunset cruises to mountain adventures, at the best prices.",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Things To Do"
        title="Activities & Experiences"
        subtitle="Make your trip memorable with handpicked tours, adventures and local experiences."
        image={whyImage}
      />
      <section className="container-x py-12 sm:py-16">
        <ActivitiesExplorer />
      </section>
    </>
  );
}
