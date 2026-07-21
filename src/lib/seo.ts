import type { Metadata } from "next";

/**
 * One place for everything search engines and social cards read.
 * Set NEXT_PUBLIC_SITE_URL in production — canonical URLs, OG images and the
 * sitemap are all built from it.
 */
export const site = {
  name: "TravelPerk",
  tagline: "Explore More, Travel Better",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelperk.com").replace(
    /\/$/,
    ""
  ),
  description:
    "Book flights, hotels, tours and activities worldwide with exclusive deals, a best-price guarantee and 24/7 support.",
  locale: "en_US",
  twitter: "@travelperk",
  logo: "/icon.svg",
  ogImage: "/og.jpg",
  contact: {
    email: "hello@travelperk.com",
    phone: "+1-555-000-1234",
    street: "123 Travel Ave",
    city: "New York",
    region: "NY",
    postalCode: "10001",
    country: "US",
  },
  social: [
    "https://facebook.com/travelperk",
    "https://instagram.com/travelperk",
    "https://twitter.com/travelperk",
  ],
} as const;

export const absoluteUrl = (path = "/") =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, used for the canonical URL. */
  path: string;
  /** Overrides the default social card. */
  image?: string;
  keywords?: string[];
  /** Private pages (account, checkout, auth) — keep them out of the index. */
  noIndex?: boolean;
  type?: "website" | "article";
};

/** Builds a full, canonical-tagged metadata object for one page. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
  noIndex = false,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = [
    { url: image ?? site.ogImage, width: 1200, height: 630, alt: title },
  ];
  // Titles that already carry the brand (the home page) shouldn't get it twice.
  const socialTitle = title.includes(site.name)
    ? title
    : `${title} | ${site.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: socialTitle,
      description,
      locale: site.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitter,
      title: socialTitle,
      description,
      images,
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}

/* ----------------------------------------------------------- structured data */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  url: site.url,
  logo: absoluteUrl(site.logo),
  image: absoluteUrl(site.ogImage),
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.street,
    addressLocality: site.contact.city,
    addressRegion: site.contact.region,
    postalCode: site.contact.postalCode,
    addressCountry: site.contact.country,
  },
  sameAs: [...site.social],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.contact.phone,
    contactType: "customer service",
    availableLanguage: ["English", "Bengali"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": absoluteUrl("/#organization") },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: absoluteUrl("/tours?destination={search_term_string}"),
    },
    "query-input": "required name=search_term_string",
  },
};

/** Home › Tours style trail, so Google can render breadcrumbs in results. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** A listing page's products, so results can show prices and ratings. */
export function itemListSchema(
  name: string,
  items: {
    name: string;
    url?: string;
    image?: string;
    price?: number;
    rating?: number;
    reviews?: number;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: item.name,
        ...(item.image ? { image: item.image } : {}),
        ...(item.url ? { url: absoluteUrl(item.url) } : {}),
        ...(item.price
          ? {
              offers: {
                "@type": "Offer",
                price: item.price,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
        ...(item.rating && item.reviews
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: item.rating,
                reviewCount: item.reviews,
              },
            }
          : {}),
      },
    })),
  };
}
