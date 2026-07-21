import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import ToursExplorer from "@/components/site/ToursExplorer";
import { heroImage } from "@/temp/home";

export const metadata: Metadata = {
  title: "Tours & Packages — TravelPerk",
  description:
    "Browse curated tour packages worldwide — beach escapes, adventures, cultural trips, luxury getaways and more.",
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Discover by Experience"
        title="Explore Our Tours"
        subtitle="From relaxing beach escapes to thrilling adventures — find the perfect tour handpicked by our travel experts."
        image={heroImage}
      />
      <section className="container-x py-12 sm:py-16">
        <ToursExplorer />
      </section>
    </>
  );
}
