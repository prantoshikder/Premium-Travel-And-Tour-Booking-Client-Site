import Image from "next/image";
import { deals } from "@/temp/home";
import SectionHeading from "./SectionHeading";
import BookNowButton from "./site/BookNowButton";
import { slugify } from "@/lib/slug";

export default function ExclusiveDeals() {
  return (
    <section id="hotels" className="bg-navy-50/60 py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Special Offers"
          title="Exclusive Deals Just For You"
          subtitle="Grab the best travel deals and save more on your dream vacations."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {deals.map((d) => (
            <article
              key={d.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-800 shadow">
                  Save {d.save}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-navy-800">{d.title}</h3>
                <p className="mt-1 text-xs text-muted">{d.duration}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-navy-800">
                      ${d.price}
                    </span>
                    <span className="text-sm text-muted line-through">
                      ${d.oldPrice}
                    </span>
                  </div>
                  <BookNowButton
                    reference={`DEAL-${slugify(d.title).toUpperCase()}`}
                    title={d.title}
                    duration={d.duration}
                    price={d.price}
                    image={d.image}
                    savedAmount={d.oldPrice - d.price}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
