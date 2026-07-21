import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import { Icon } from "@/components/Icons";
import { contactChannels } from "@/temp/contact";
import { airplaneImage } from "@/temp/flights";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the TravelPerk team. We're here to help you plan the perfect trip, 24/7.",
  path: "/contact",
  keywords: ["contact travel agency", "travel support", "customer service"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />

      <PageHero
        eyebrow="We're Here To Help"
        title="Get In Touch"
        subtitle="Questions about a booking or planning something special? Our travel experts are ready to help."
        image={airplaneImage}
      />

      <section className="container-x grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_1.4fr]">
        {/* Contact info */}
        <div className="space-y-4">
          {contactChannels.map((c) => (
            <div
              key={c.label}
              className="flex items-start gap-4 rounded-2xl border border-navy-50 bg-white p-5 shadow-soft"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-600">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {c.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-navy-800">
                  {c.value}
                </p>
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-2xl border border-navy-50 shadow-soft">
            <iframe
              title="Our location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.96%2C40.74&layer=mapnik"
              className="h-48 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </section>
    </>
  );
}
