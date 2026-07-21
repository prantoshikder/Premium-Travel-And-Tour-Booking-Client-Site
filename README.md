# TravelPerk — Premium Travel & Tour Booking

A production-shaped travel booking front end: search flights, hotels, tours,
activities and visa services, pick seats or trip details, pay, then manage
everything from an account area.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and
**Tailwind CSS v4**. There is no backend yet — content lives in `src/temp/` and
session/booking state in `localStorage`, so every flow is fully clickable.

---

## Quick start

```bash
yarn install
yarn dev          # http://localhost:3000
```

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `yarn dev`          | Dev server (Turbopack)                      |
| `yarn build`        | Production build                            |
| `yarn start`        | Serve the production build                  |
| `yarn typecheck`    | `tsc --noEmit`                              |
| `yarn lint`         | ESLint                                      |
| `yarn lint:fix`     | ESLint with autofix                         |
| `yarn format`       | Prettier write (sorts Tailwind classes too) |
| `yarn format:check` | Prettier check                              |
| `yarn check`        | typecheck + lint + format check             |

Set `NEXT_PUBLIC_SITE_URL` in production — canonical URLs, the sitemap, robots
and social cards are all built from it.

---

## Pages

### Marketing site — `src/app/(site)/`

| Route                  | What's on it                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- |
| `/`                    | Video hero, multi-tab search, destinations, deals, packages, reviews         |
| `/tours`               | Category chips + search, tour grid                                           |
| `/tours/[slug]`        | Full tour page: about, inclusions, booking card, related tours, FAQ          |
| `/destinations`        | All destinations with tour counts and "from" prices                          |
| `/destinations/[slug]` | Destination guide: intro, highlights, essentials, tours, stays, things to do |
| `/hotels`              | Stay listings with a custom sort dropdown                                    |
| `/flights`             | Flight results → seat map → checkout                                         |
| `/activities`          | Bookable experiences                                                         |
| `/visa`                | Visa steps and per-country pricing                                           |
| `/reviews`             | Rating summary, filters, sort, verified traveller reviews                    |
| `/contact`             | Contact channels and form                                                    |
| `/checkout`            | Contact details → payment method → pay (auth-guarded)                        |

### Account — `src/app/account/` (all auth-guarded)

`/account/profile` · `/account/bookings` · `/account/payments` ·
`/account/wishlist` · `/account/settings`

### Auth (guest-only)

`/login` · `/register` · `/forgot-password` · `/reset-password`

---

## The flows that actually work

**Flight booking** — pick a flight → seat map opens in a drawer (business /
extra-legroom / economy pricing, stable "taken" seats per flight) → confirm →
signed-out users go to `/login?next=/checkout` and come straight back → pay.

**Package booking** — "Book Now" on a deal, package or tour opens a trip-details
drawer first (departure date, adults / children / rooms, optional add-ons, live
price) — never straight to payment — then the same login check and checkout.

**Checkout** — contact step, then a payment method grouped by type:

- **Cards** — brand-aware number formatting, Luhn checksum, expiry validation, live brand badge
- **Mobile banking (Bangladesh)** — bKash, Nagad, Rocket, Upay: account number only, PIN/OTP are never collected here (they belong on the provider's page)
- **International wallets** — PayPal, Wise, Alipay, Apple Pay, Google Pay
- **Bank transfer** — holder, bank, account, SWIFT

**Reviews** — only completed bookings can be reviewed. My Bookings → "Write a
review" opens a star-rating form (headline, minimum length, recommend toggle);
the review then shows on the booking card and can be edited.

**Manage a booking** — "View details" shows the itinerary, price breakdown and a
downloadable voucher; "Manage" allows a date/traveller change request, or
cancellation with the real refund policy shown first.

---

## Project structure

```
src/
├── app/
│   ├── (site)/        marketing + booking pages (Navbar + Footer layout)
│   ├── account/       account area behind AuthGuard
│   ├── login|register|forgot-password|reset-password
│   ├── layout.tsx     fonts, metadata, JSON-LD, AuthProvider
│   ├── sitemap.ts · robots.ts · manifest.ts
│   └── globals.css    Tailwind v4 theme tokens + base rules
├── components/
│   ├── shared/        Select (the project's one dropdown), SortSelect
│   ├── site/          explorers, drawers, checkout, FAQ, reviews
│   ├── account/       account shell, nav, page header
│   ├── auth/          AuthGuard, GuestGuard, forms, avatar, user menu
│   └── *.tsx          landing sections, Navbar, Footer, Drawer, Icons
├── hooks/             useDimension, usePrefersReducedMotion
├── lib/               auth, booking, payments, reviews, seo, validation, slug
└── temp/              all static data, one file per page
```

**`src/temp/`** holds every piece of static content, split by page —
`home.ts`, `tours.ts`, `hotels.ts`, `flights.ts`, `activities.ts`, `visa.ts`,
`destinations.ts`, `reviews.ts`, `faq.ts`, `account.ts`, `contact.ts`,
`layout.ts`. Swapping in a real API means touching these files only.

---

## Conventions worth knowing

**One dropdown component.** `components/shared/Select.tsx` replaces every native
`<select>`: three variants (pill / field / ghost), full keyboard support,
`combobox` + `listbox` ARIA, optional hint lines and lead icons.

**Drawers stay mounted.** A drawer that mounts already-open has no starting
frame to animate from, so panels render permanently and only toggle `open`.
On phones they slide up from the bottom instead of in from the side
(`useDimension`).

**Content in `temp/`, state in `lib/`.** `lib/booking.ts` (pending booking),
`lib/reviews.ts` (my reviews) and `lib/myBookings.ts` (cancellations, change
requests) each wrap `localStorage` behind small functions — one place to swap
for API calls later.

**Money rules are defined once.** Tax rate, child rate and add-on pricing live in
`lib/booking.ts`, so a drawer total and a checkout total can never disagree.

**Styling.** Tailwind v4 with theme tokens in `globals.css` (`navy-*`, `gold-*`,
`teal-*`, `--shadow-soft`, `--shadow-card`). Prefer responsive utilities over JS;
`useDimension` is for behaviour CSS can't express.

---

## SEO

- Per-page metadata through `pageMetadata()` in `lib/seo.ts` — title, description, canonical, keywords, Open Graph and Twitter cards
- Private routes (account, checkout, auth) are `noindex, nofollow`
- `sitemap.xml` (static pages plus every tour and destination), `robots.txt`, web manifest
- **JSON-LD**: TravelAgency + WebSite with SearchAction site-wide; BreadcrumbList and ItemList on listings; Product + AggregateRating on tour pages; TouristDestination on destination pages; FAQPage on the five money pages; Review + AggregateRating on `/reviews`
- FAQs are built on `<details>`, so answers ship in the HTML and stay crawlable
- One `<main>` landmark per page, descriptive `alt` text, semantic headings

---

## Accessibility & UX

- Focus-visible rings, `aria-*` on every custom control, `role="alert"` on errors
- Keyboard support in the dropdown, star rating, seat map, tabs and steppers
- Inline validation, with the first invalid field focused on submit
- `prefers-reduced-motion` respected — the hero video holds on its poster frame
- Buttons get `cursor: pointer` (and `not-allowed` when disabled) from one base rule in `globals.css`

---

## Security & performance headers

Set in `next.config.ts`, applied to every response:

`Content-Security-Policy: frame-ancestors 'none'` (plus `X-Frame-Options: DENY`)
· `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin`
· `Permissions-Policy` (camera, microphone, payment off) · `Strict-Transport-Security`
· `X-Powered-By` removed.

Also configured: AVIF/WebP images with a 7-day optimisation cache, immutable
caching for the hero video and social image, and permanent redirects from
singular paths (`/tour/:slug` → `/tours/:slug`).

A full script-level CSP is intentionally left out — it needs nonce-generating
middleware to work with Next's inline bootstrap script.

---

## Known gaps

- **No backend.** Auth, bookings, payments and reviews are simulated in `localStorage`; nothing is charged and no email is sent.
- **Hotels and activities have no detail pages** — only tours and destinations do.
- **`blogPosts` data exists but there is no `/blog` route.**
- **The hero clip is WebM only** (~6.6 MB). Older Safari falls back to the poster image; drop in `public/hero.mp4` and it will be used automatically.
- **Listing pages ignore the search widget's query params** — the widget pushes them, the pages don't read them yet.
