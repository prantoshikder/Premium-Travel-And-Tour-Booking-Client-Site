import Image from "next/image";
import { airplaneImage } from "@/temp/flights";
import { ArrowRightIcon } from "./Icons";

export default function CtaBanner() {
  return (
    <section id="visa" className="container-x py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-10 sm:px-12 sm:py-14">
        <Image
          src={airplaneImage}
          alt="Airplane taking off"
          fill
          sizes="100vw"
          className="object-cover object-right opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-600/80 to-transparent" />

        <div className="relative max-w-lg">
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Ready to Take Off?
          </h2>
          <p className="mt-3 text-base text-white/90">
            Let&apos;s Make Your Dream Trip Happen Today!
          </p>
          <a
            href="#"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-800 shadow-lg transition hover:bg-gold-400 hover:shadow-xl"
          >
            Book Your Trip Now
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}
