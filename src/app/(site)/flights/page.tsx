import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/site/FaqSection";
import { flightFaqs } from "@/temp/faq";
import PageHero from "@/components/site/PageHero";
import FlightsExplorer from "@/components/site/FlightsExplorer";
import SearchWidget from "@/components/SearchWidget";
import { airplaneImage } from "@/temp/flights";

export const metadata: Metadata = pageMetadata({
  title: "Cheap Flights",
  description:
    "Search and compare cheap flights to destinations worldwide. Best price guarantee on every booking.",
  path: "/flights",
  keywords: ["cheap flights", "flight booking", "compare airfares", "international flights"],
});

export default function FlightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Flights", path: "/flights" }])} />

      <PageHero
        eyebrow="Fly Smarter"
        title="Find Cheap Flights"
        subtitle="Compare hundreds of flights and grab the best fare for your next journey."
        image={airplaneImage}
      />

      {/* Search widget overlapping the hero */}
      <div className="container-x relative z-20 -mt-8 sm:-mt-10">
        <SearchWidget />
      </div>

      <section className="container-x py-12 sm:py-16">
        <FlightsExplorer />
      </section>
      <FaqSection title="Booking flights with TravelPerk" faqs={flightFaqs} />
    </>
  );
}
