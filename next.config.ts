import type { NextConfig } from "next";

/**
 * Headers every response should carry. A full Content-Security-Policy is
 * deliberately left out: Next's inline bootstrap scripts need a nonce, which
 * only makes sense once there's middleware generating one per request.
 */
const securityHeaders = [
  // Stop browsers guessing a file's type — blocks a class of XSS.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No one may embed the site — the modern, authoritative rule. Unlike
  // X-Frame-Options this also covers <object>, <embed> and nested frames.
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  // Same intent for browsers that predate frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  // Send the origin only, and nothing at all when leaving HTTPS.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // We use none of these APIs, so switch them off.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
  // Force HTTPS for a year, including subdomains. Ignored on plain HTTP.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
    // AVIF first — roughly 20–30% smaller than WebP for photos.
    formats: ["image/avif", "image/webp"],
    // Optimised remote images stay cached for a week instead of 60s.
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  // Don't advertise the framework version.
  poweredByHeader: false,
  // Trailing slashes create duplicate URLs, which is bad for SEO.
  trailingSlash: false,
  // Keep the build honest: a type error should fail it, not ship.
  // (Next 16 dropped the `eslint` option — linting runs via `yarn lint`.)
  typescript: { ignoreBuildErrors: false },
  // Production source maps leak source and slow the build.
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // The hero clip and social image never change without a new filename.
        source: "/:file(hero.webm|hero.mp4|hero-poster.jpg|og.jpg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:file(sitemap.xml|robots.txt)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },

  async redirects() {
    return [
      // Singular paths people (and old links) often guess.
      {
        source: "/destination/:slug",
        destination: "/destinations/:slug",
        permanent: true,
      },
      { source: "/tour/:slug", destination: "/tours/:slug", permanent: true },
      { source: "/hotel/:slug", destination: "/hotels", permanent: true },
    ];
  },
};

export default nextConfig;
