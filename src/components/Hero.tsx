import { heroFeatures, heroImage } from "@/temp/home";
import Link from "next/link";
import HeroBackground from "./HeroBackground";
import { Icon } from "./Icons";
import SearchWidget from "./SearchWidget";

export default function Hero() {
  return (
    <section id="home" data-hero className="relative">
      {/* Hero visual */}
      <div className="relative overflow-hidden">
        <HeroBackground
          image={heroImage}
          alt="Aerial view of a rugged coastline where cliffs meet a sandy beach and breaking waves"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/85 via-navy-800/55 to-navy-800/20" />
        <div className="absolute inset-0 bg-linear-to-r from-navy-900/70 to-transparent" />

        <div className="container-x relative pt-32 pb-44 sm:pt-44 sm:pb-52">
          <div className="max-w-xl animate-fade-up">
            <h1 className="text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white min-[400px]:text-4xl sm:text-6xl">
              Explore More,
              <br />
              <span className="text-gold-400">Travel</span> Better
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
              Discover amazing places with exclusive deals on flights, hotels,
              and tour packages.
            </p>
            <Link
              href="/tours"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 text-sm font-bold text-navy-800 shadow-lg transition hover:bg-gold-400 hover:shadow-xl"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      {/* Search widget overlapping */}
      <div className="container-x relative z-20 -mt-28 sm:-mt-32">
        <SearchWidget />
      </div>

      {/* Feature strip — one card, hairline dividers like the search widget */}
      <div className="container-x mt-10">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-navy-50 bg-navy-50 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {heroFeatures.map((f) => (
            <div
              key={f.title}
              className="group flex items-start gap-3 bg-white p-5 transition-colors duration-200 hover:bg-navy-50/50"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-500 transition-colors duration-200 group-hover:bg-gold-500 group-hover:text-navy-800">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-navy-800">{f.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
