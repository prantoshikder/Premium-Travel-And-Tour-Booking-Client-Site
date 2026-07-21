import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import FlightsExplorer from "@/components/site/FlightsExplorer";
import SearchWidget from "@/components/SearchWidget";
import { airplaneImage } from "@/temp/flights";

export const metadata: Metadata = {
  title: "Flights — TravelPerk",
  description:
    "Search and compare cheap flights to destinations worldwide. Best price guarantee on every booking.",
};

export default function FlightsPage() {
  return (
    <>
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
    </>
  );
}
