import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { tourSlugs } from "@/temp/tours";
import { destinationSlugs } from "@/temp/destinations";

/** Public routes only — account, checkout and auth pages are noindex. */
const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/destinations", priority: 0.9, changeFrequency: "weekly" },
  { path: "/tours", priority: 0.9, changeFrequency: "daily" },
  { path: "/hotels", priority: 0.9, changeFrequency: "daily" },
  { path: "/flights", priority: 0.9, changeFrequency: "daily" },
  { path: "/activities", priority: 0.8, changeFrequency: "weekly" },
  { path: "/visa", priority: 0.7, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));

  // One entry per tour detail page — the deepest keyword surface we have.
  const tourRoutes: MetadataRoute.Sitemap = tourSlugs().map((slug) => ({
    url: absoluteUrl(`/tours/${slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinationSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/destinations/${slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...destinationRoutes, ...tourRoutes];
}
