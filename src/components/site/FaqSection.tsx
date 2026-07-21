import type { Faq } from "@/temp/faq";
import JsonLd from "../JsonLd";

/**
 * On-page FAQ + FAQPage schema.
 *
 * Built on <details>, so every answer is in the HTML and crawlable even before
 * JavaScript runs — collapsed content still counts, hidden-behind-JS does not.
 */
export default function FaqSection({
  title = "Frequently asked questions",
  intro,
  faqs,
}: {
  title?: string;
  intro?: string;
  faqs: Faq[];
}) {
  return (
    <section
      className="container-x py-12 sm:py-16"
      aria-labelledby="faq-heading"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="section-title text-2xl sm:text-3xl">
          {title}
        </h2>
        {intro && <p className="mt-2 text-sm text-muted">{intro}</p>}

        <div className="mt-6 divide-y divide-navy-50 overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft">
          {faqs.map((f, i) => (
            <details key={f.question} open={i === 0} className="group px-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-bold text-navy-800 marker:hidden">
                <h3 className="text-sm font-bold">{f.question}</h3>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-500 transition group-open:rotate-45 group-open:bg-navy-500 group-open:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    className="h-3 w-3"
                    aria-hidden
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-muted">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
