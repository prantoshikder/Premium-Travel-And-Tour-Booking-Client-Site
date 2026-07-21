/* /destinations — the places we sell, with the copy their landing pages need. */

import { img } from "./image";

export type Destination = {
  slug: string;
  name: string;
  country: string;
  image: string;
  tagline: string;
  /** Two paragraphs of unique, indexable copy for the landing page. */
  intro: string[];
  bestTime: string;
  currency: string;
  language: string;
  highlights: string[];
  /** Matched against tour/hotel/activity locations to build the listings. */
  match: string[];
};

export const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    image: img("1537996194471-e657df975ab4"),
    tagline: "Rice terraces, temples and surf breaks in one island",
    intro: [
      "Bali packs jungle valleys, volcanic ridges and a coastline of surf and swimming beaches into an island you can cross in a morning. Ubud is the base for rice-terrace walks, waterfalls and temple mornings, while Seminyak and Uluwatu trade that for sunset bars and reef breaks.",
      "Tours here run year-round and suit almost any budget: villa stays with private pools sit alongside family-run guesthouses, and most travellers pair a few days inland with a few on the coast.",
    ],
    bestTime: "April – October (dry season)",
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian, English widely spoken",
    highlights: [
      "Ubud rice terraces and monkey forest",
      "Uluwatu clifftop temple at sunset",
      "Nusa Penida day trip",
      "Mount Batur sunrise trek",
    ],
    match: ["Bali", "Indonesia", "Ubud"],
  },
  {
    slug: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    image: img("1531366936337-7c912a4589a7"),
    tagline: "Peaks, glacier trains and lakes the colour of glass",
    intro: [
      "The Swiss Alps are the easiest mountains in the world to travel: trains reach almost every valley, and cable cars carry you from lakeside towns to glacier viewpoints in under an hour. Interlaken sits between two lakes and works as the natural base.",
      "Summer brings hiking, paragliding and lake swimming; winter turns the same valleys into ski country. Either way the scenery does the heavy lifting — this is the trip travellers most often call the one worth saving for.",
    ],
    bestTime: "June – September for hiking, December – March for ski",
    currency: "Swiss Franc (CHF)",
    language: "German, French, Italian, English widely spoken",
    highlights: [
      "Jungfraujoch — the Top of Europe railway",
      "Paragliding over Interlaken",
      "Lake Brienz boat cruise",
      "Grindelwald First cliff walk",
    ],
    match: ["Switzerland", "Interlaken", "Alps"],
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    image: img("1570077188670-e3a8d69ac5ff"),
    tagline: "Whitewashed cliffs above a drowned volcano",
    intro: [
      "Santorini is the rim of a collapsed volcano, which is why the villages sit hundreds of metres above the sea and every terrace looks straight into the caldera. Oia gets the famous sunset; Fira has the nightlife and the cable car down to the old port.",
      "Most visitors stay three to five nights — enough for a catamaran cruise past the hot springs, a day on the red and black sand beaches, and a wine tasting among the island's low-trained vines.",
    ],
    bestTime: "May – June and September – October",
    currency: "Euro (EUR)",
    language: "Greek, English widely spoken",
    highlights: [
      "Oia sunset from the castle ruins",
      "Caldera catamaran cruise",
      "Akrotiri archaeological site",
      "Assyrtiko wine tasting",
    ],
    match: ["Santorini", "Greece"],
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "UAE",
    image: img("1512453979798-5ea266f8880c"),
    tagline: "Desert, skyline and shopping at full volume",
    intro: [
      "Dubai works as both a stopover and a full holiday. The city stacks the world's tallest tower, man-made islands and gold-souk alleys within half an hour of each other, and the beaches face calm Gulf water that stays warm most of the year.",
      "Head inland and the dunes start almost immediately — desert safaris with dinner under the stars are the single most booked activity here, and they pair well with a couple of days of resort time.",
    ],
    bestTime: "November – March",
    currency: "UAE Dirham (AED)",
    language: "Arabic, English widely spoken",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with BBQ dinner",
      "Dubai Marina dhow cruise",
      "Old Dubai souks and abra ride",
    ],
    match: ["Dubai", "UAE"],
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: img("1545569341-9eb8b30979d9"),
    tagline: "A thousand years of temples, gardens and tea houses",
    intro: [
      "Kyoto was Japan's capital for over a millennium and kept the temples, wooden machiya houses and gardens to prove it. Days here are walked rather than driven: Fushimi Inari's torii gates in the early morning, Arashiyama's bamboo grove, then Gion after dark.",
      "Spring cherry blossom and autumn maples draw the biggest crowds, but the shoulder months are quieter and just as photogenic — and the food, from kaiseki to street-side yakitori, is a reason to come on its own.",
    ],
    bestTime: "March – May and October – November",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    highlights: [
      "Fushimi Inari's torii gate path",
      "Arashiyama bamboo grove",
      "Kinkaku-ji, the Golden Pavilion",
      "Traditional tea ceremony in Gion",
    ],
    match: ["Kyoto", "Japan"],
  },
];

export const destinationBySlug = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const destinationSlugs = () => destinations.map((d) => d.slug);

/** True when a listing's location belongs to this destination. */
export const matchesDestination = (
  destination: Destination,
  location: string
) =>
  destination.match.some((needle) =>
    location.toLowerCase().includes(needle.toLowerCase())
  );
