/**
 * Renders a JSON-LD block. Server component, so the markup ships in the HTML
 * where crawlers read it — no hydration cost.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
