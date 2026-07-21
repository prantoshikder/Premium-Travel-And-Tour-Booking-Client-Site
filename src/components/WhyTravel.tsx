import Image from "next/image";
import { whyFeatures, whyImage } from "@/temp/home";
import { Icon } from "./Icons";

export default function WhyTravel() {
  return (
    <section id="activities" className="container-x py-16 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left content */}
        <div>
          <p className="eyebrow">Why Travel With Us</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-800 sm:text-4xl">
            We Make Travel Easy & Memorable
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Our mission is to make your travel experience smooth, affordable,
            and unforgettable.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {whyFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-500/12 text-teal-600">
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

        {/* Right image collage */}
        <div className="relative">
          <div className="absolute -right-4 -top-6 h-40 w-40 rounded-full bg-gold-400/40 blur-2xl" />
          <div className="absolute -left-6 bottom-0 h-32 w-32 rounded-full bg-teal-500/20 blur-2xl" />
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] shadow-card">
            <Image
              src={whyImage}
              alt="Happy traveler with backpack"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <span className="absolute right-6 top-8 h-16 w-16 animate-floaty rounded-2xl bg-gold-500/90 shadow-lg" />
        </div>
      </div>
    </section>
  );
}
