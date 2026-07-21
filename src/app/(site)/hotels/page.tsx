import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import HotelsExplorer from "@/components/site/HotelsExplorer";
import { hotelHeroImage } from "@/temp/hotels";

export const metadata: Metadata = {
  title: "Hotels & Stays — TravelPerk",
  description:
    "Find handpicked hotels, resorts and villas worldwide with the best price guarantee and free cancellation.",
};

export default function HotelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Handpicked Stays"
        title="Hotels & Resorts"
        subtitle="Comfortable, safe and beautiful places to stay — from beachfront resorts to cozy mountain chalets."
        image={hotelHeroImage}
      />
      <section className="container-x py-12 sm:py-16">
        <HotelsExplorer />
      </section>
    </>
  );
}
