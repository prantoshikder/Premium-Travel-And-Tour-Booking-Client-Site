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

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
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
      <Footer />
    </main>
  );
}
