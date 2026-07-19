import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import { Icon } from "@/components/Icons";
import { visaSteps, visaCountries, heroImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Visa Assistance — TravelPerk",
  description:
    "Fast, hassle-free visa assistance for popular destinations. Transparent pricing and expert support.",
};

export default function VisaPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel Made Easy"
        title="Visa Assistance"
        subtitle="Skip the paperwork stress. Our experts handle your visa application from start to approval."
        image={heroImage}
      />

      {/* How it works */}
      <section className="container-x py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Simple Process</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-800 sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Get your visa in four easy steps — no long queues, no confusion.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visaSteps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-navy-50 bg-white p-6 shadow-soft"
            >
              <span className="absolute right-5 top-4 text-4xl font-extrabold text-navy-50">
                {i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-500/10 text-navy-500">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-navy-800">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="bg-navy-50/60 py-12 sm:py-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Popular Destinations</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-800 sm:text-3xl">
              Visas We Process
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visaCountries.map((c) => (
              <div
                key={c.country}
                className="flex flex-col rounded-2xl border border-navy-50 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <h3 className="text-sm font-bold text-navy-800">{c.country}</h3>
                    <p className="text-xs text-muted">{c.type}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-navy-50 pt-3 text-xs">
                  <span className="text-muted">
                    Processing
                    <span className="mt-0.5 block font-semibold text-navy-700">
                      {c.processing}
                    </span>
                  </span>
                  <span className="text-right text-muted">
                    From
                    <span className="mt-0.5 block text-base font-extrabold text-navy-800">
                      ${c.price}
                    </span>
                  </span>
                </div>
                <button className="mt-4 rounded-full bg-navy-500 py-2 text-xs font-semibold text-white transition hover:bg-navy-600">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
