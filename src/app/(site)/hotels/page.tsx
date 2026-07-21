import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, itemListSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/site/FaqSection";
import { hotelFaqs } from "@/temp/faq";
import PageHero from "@/components/site/PageHero";
import HotelsExplorer from "@/components/site/HotelsExplorer";
import { hotelHeroImage, hotelList } from "@/temp/hotels";

export const metadata: Metadata = pageMetadata({
  title: "Hotels & Stays",
  description:
    "Find handpicked hotels, resorts and villas worldwide with the best price guarantee and free cancellation.",
  path: "/hotels",
  keywords: ["hotel booking", "cheap hotels", "resorts", "villas", "free cancellation hotels"],
});

export default function HotelsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Hotels", path: "/hotels" }]), itemListSchema("Hotels and stays", hotelList.map((h) => ({ name: h.name, url: "/hotels", image: h.image, price: h.pricePerNight, rating: h.rating, reviews: h.reviews })))]} />

      <PageHero
        eyebrow="Handpicked Stays"
        title="Hotels & Resorts"
        subtitle="Comfortable, safe and beautiful places to stay — from beachfront resorts to cozy mountain chalets."
        image={hotelHeroImage}
      />
      <section className="container-x py-12 sm:py-16">
        <HotelsExplorer />
      </section>
      <FaqSection title="Booking a hotel with TravelPerk" faqs={hotelFaqs} />
    </>
  );
}
