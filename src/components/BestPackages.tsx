import Image from "next/image";
import { packages } from "@/lib/data";
import { PlaneIcon, HotelIcon, CompassIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

const included = [
  { label: "Flights", icon: PlaneIcon },
  { label: "Hotel", icon: HotelIcon },
  { label: "Tours", icon: CompassIcon },
];

export default function BestPackages() {
  return (
    <section id="flights" className="container-x py-16 sm:py-20">
      <SectionHeading
        eyebrow="Handpicked for You"
        title="Best Travel Packages"
        subtitle="Choose from our most popular travel packages and make your trip unforgettable."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {packages.map((p) => (
          <article
            key={p.title}
            className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-extrabold text-navy-800 shadow">
                ${p.price}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-navy-800">{p.title}</h3>
              <p className="mt-1 text-xs text-muted">{p.duration}</p>

              <div className="mt-4 flex items-center gap-4 border-t border-navy-50 pt-4">
                {included.map((inc) => {
                  const Ico = inc.icon;
                  return (
                    <span
                      key={inc.label}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted"
                    >
                      <Ico className="h-4 w-4 text-navy-500" />
                      {inc.label}
                    </span>
                  );
                })}
              </div>

              <a
                href="#"
                className="mt-4 block rounded-full border border-navy-200 py-2.5 text-center text-xs font-semibold text-navy-700 transition hover:border-navy-500 hover:bg-navy-500 hover:text-white"
              >
                View Details
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
