import Link from "next/link";
import { tourCategories } from "@/lib/data";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function FindTour() {
  return (
    <section id="tours" className="container-x py-16 sm:py-20">
      <SectionHeading
        eyebrow="Discover by Experience"
        title="Find Your Perfect Tour"
        subtitle="From relaxing getaways to thrilling adventures, we have the perfect tour for you."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tourCategories.map((c) => (
          <Link
            key={c.title}
            href="/tours"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-navy-50 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1.5 hover:shadow-card"
          >
            <span
              className="grid h-14 w-14 place-items-center rounded-2xl transition group-hover:scale-110"
              style={{ backgroundColor: `${c.color}1a`, color: c.color }}
            >
              <Icon name={c.icon} className="h-6 w-6" />
            </span>
            <h3 className="text-sm font-bold text-navy-800">{c.title}</h3>
            <p className="text-xs leading-relaxed text-muted">{c.text}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/tours"
          className="rounded-full border border-navy-200 bg-white px-7 py-3 text-sm font-semibold text-navy-700 transition hover:border-navy-500 hover:bg-navy-500 hover:text-white"
        >
          Explore All Tours
        </Link>
      </div>
    </section>
  );
}
