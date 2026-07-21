import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import FindTour from "@/components/FindTour";
import ExclusiveDeals from "@/components/ExclusiveDeals";
import Newsletter from "@/components/Newsletter";
import HeroStats from "@/components/HeroStats";
import BestPackages from "@/components/BestPackages";
import ExperienceStats from "@/components/ExperienceStats";
import WhyTravel from "@/components/WhyTravel";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  // The root layout's title template doesn't apply to its own segment, so the
  // brand is spelled out here. Keyword-led, ~55 chars — Google shows it whole.
  title: "Book Cheap Flights, Hotels & Tour Packages | TravelPerk",
  description:
    "Compare cheap flights, handpicked hotels, guided tours and activities worldwide. Best-price guarantee, free cancellation and 24/7 travel support.",
  path: "/",
  keywords: [
    "online travel booking",
    "cheap flights",
    "hotel deals",
    "tour packages",
    "holiday deals",
    "visa assistance",
  ],
});

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <PopularDestinations />
        <FindTour />
        <ExclusiveDeals />
        <Newsletter />
        <HeroStats />
        <BestPackages />
        <ExperienceStats />
        <WhyTravel />
        <Testimonials />
        <CtaBanner />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
