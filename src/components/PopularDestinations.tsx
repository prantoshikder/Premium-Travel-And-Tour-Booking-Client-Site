import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/temp/home";
import { PinIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function PopularDestinations() {
  return (
    <section className="container-x py-16 sm:py-20">
      <SectionHeading
        eyebrow="Popular Destinations"
        title="Top Places Around the World"
        subtitle="Handpicked destinations loved by travelers. Where will your next adventure take you?"
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {destinations.map((d, i) => (
          <a
            key={d.name}
            href="#"
            className={`group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card ${
              i === 4 ? "hidden sm:block" : ""
            }`}
          >
            <Image
              src={d.image}
              alt={d.name}
              fill
              sizes="(max-width: 640px) 50vw, 20vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <h3 className="text-base font-bold">{d.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
                <PinIcon className="h-3.5 w-3.5" />
                {d.country}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/tours"
          className="rounded-full border border-navy-200 bg-white px-7 py-3 text-sm font-semibold text-navy-700 transition hover:border-navy-500 hover:bg-navy-500 hover:text-white"
        >
          View All Destinations
        </Link>
      </div>
    </section>
  );
}
