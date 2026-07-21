import Image from "next/image";
import { testimonials } from "@/temp/home";
import { StarIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="bg-navy-50/60 py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="What Travelers Say"
          title="Trusted by Thousands"
          subtitle="Real stories from happy travelers who explored the world with us."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold-400/40">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <figcaption>
                  <p className="text-sm font-bold text-navy-800">{t.name}</p>
                  <p className="text-xs text-muted">{t.country}</p>
                </figcaption>
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-700">
                “{t.text}”
              </blockquote>

              <div className="mt-4 flex gap-0.5 text-gold-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="rounded-full border border-navy-200 bg-white px-7 py-3 text-sm font-semibold text-navy-700 transition hover:border-navy-500 hover:bg-navy-500 hover:text-white"
          >
            Read More Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
