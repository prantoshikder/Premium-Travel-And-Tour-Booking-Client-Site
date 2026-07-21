/* /reviews — traveller reviews shown on the home page and the reviews page. */

const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=100&h=100&q=80`;

export type Review = {
  id: string;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  /** ISO date — formatted in the UI. */
  date: string;
  /** What they booked, used for the filter chips. */
  trip: "Tours" | "Hotels" | "Flights" | "Activities" | "Visa";
  destination: string;
  title: string;
  text: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Sarah Johnson",
    country: "United States",
    avatar: avatar("1494790108377-be9c29b29330"),
    rating: 5,
    date: "2026-06-14",
    trip: "Tours",
    destination: "Bali, Indonesia",
    title: "Perfectly organised from start to finish",
    text: "The trip to Bali was amazing! Everything was perfectly organized and stress-free — transfers were waiting at every stop and our guide in Ubud knew exactly which temples to visit before the crowds arrived.",
  },
  {
    id: "r2",
    name: "Michael Brown",
    country: "Canada",
    avatar: avatar("1500648767791-00dcc994a43e"),
    rating: 5,
    date: "2026-05-28",
    trip: "Flights",
    destination: "Paris, France",
    title: "Excellent service and great prices",
    text: "Excellent service and great prices. I will definitely book again! The fare was $180 cheaper than anywhere else I checked and the seat selection was straightforward.",
  },
  {
    id: "r3",
    name: "Emma Davis",
    country: "Australia",
    avatar: avatar("1438761681033-6461ffad8d80"),
    rating: 5,
    date: "2026-05-02",
    trip: "Tours",
    destination: "Europe",
    title: "Unforgettable family trip",
    text: "Our family trip to Europe was unforgettable. Highly recommended! The itinerary had enough slack for two kids and the hotels were all central, so we never spent an hour on transport.",
  },
  {
    id: "r4",
    name: "Rafiq Hasan",
    country: "Bangladesh",
    avatar: avatar("1507003211169-0a1dd7228f2d"),
    rating: 5,
    date: "2026-04-19",
    trip: "Visa",
    destination: "United Kingdom",
    title: "Visa approved without any stress",
    text: "The visa team checked every document twice and prepared me for the interview. Approved in 12 working days, and they answered my questions on WhatsApp late at night.",
  },
  {
    id: "r5",
    name: "Lena Fischer",
    country: "Germany",
    avatar: avatar("1534528741775-53994a69daeb"),
    rating: 4,
    date: "2026-04-03",
    trip: "Hotels",
    destination: "Santorini, Greece",
    title: "Beautiful room, tiny wait at check-in",
    text: "The caldera view was exactly as pictured and the free cancellation gave me confidence to book early. Half a star off only because check-in took 30 minutes.",
  },
  {
    id: "r6",
    name: "Daniel Okafor",
    country: "Nigeria",
    avatar: avatar("1506794778202-cad84cf45f1d"),
    rating: 5,
    date: "2026-03-21",
    trip: "Activities",
    destination: "Dubai, UAE",
    title: "Desert safari was the highlight",
    text: "Booked the safari two days before travelling and still got a pickup from our hotel. Dune drive, camels, dinner under the stars — worth every dollar.",
  },
  {
    id: "r7",
    name: "Yuki Tanaka",
    country: "Japan",
    avatar: avatar("1517841905240-472988babdf9"),
    rating: 5,
    date: "2026-03-08",
    trip: "Tours",
    destination: "Swiss Alps, Switzerland",
    title: "The Jungfrau day was worth the flight",
    text: "Trains, cable cars and hotel were all in one booking, so I never queued for a ticket. The guide adjusted the hiking day when the weather turned.",
  },
  {
    id: "r8",
    name: "Priya Nair",
    country: "India",
    avatar: avatar("1531123897727-8f129e1688ce"),
    rating: 4,
    date: "2026-02-25",
    trip: "Hotels",
    destination: "Maldives",
    title: "Overwater villa, honest pricing",
    text: "No surprise resort fees at check-out, which is rare. The transfer seaplane timing was tight but the support line sorted it within minutes.",
  },
  {
    id: "r9",
    name: "Carlos Mendes",
    country: "Brazil",
    avatar: avatar("1519085360753-af0119f7cbe7"),
    rating: 5,
    date: "2026-02-11",
    trip: "Flights",
    destination: "Tokyo, Japan",
    title: "Rebooked me during a strike",
    text: "My connection was cancelled the night before departure. Support found an alternative routing before I had even finished reading the airline's email.",
  },
  {
    id: "r10",
    name: "Aisha Rahman",
    country: "United Arab Emirates",
    avatar: avatar("1544005313-94ddf0286df2"),
    rating: 5,
    date: "2026-01-30",
    trip: "Tours",
    destination: "Kyoto, Japan",
    title: "Kyoto in cherry blossom season",
    text: "They warned me which days would be busiest and moved Fushimi Inari to an early morning. Best travel advice I have had from a booking site.",
  },
  {
    id: "r11",
    name: "Tom Whitfield",
    country: "United Kingdom",
    avatar: avatar("1472099645785-5658abf4ff4e"),
    rating: 4,
    date: "2026-01-16",
    trip: "Activities",
    destination: "Interlaken, Switzerland",
    title: "Paragliding booked in two minutes",
    text: "Simple checkout and instant confirmation. Would have liked a few more afternoon slots, but the morning flight was spectacular.",
  },
  {
    id: "r12",
    name: "Sofia Rossi",
    country: "Italy",
    avatar: avatar("1489424731084-a5d8b219a5bb"),
    rating: 5,
    date: "2025-12-29",
    trip: "Hotels",
    destination: "Phuket, Thailand",
    title: "Great value over New Year",
    text: "Prices everywhere else doubled for the holidays. This booking held the original rate and the hotel upgraded us to a pool view on arrival.",
  },
];

export const reviewStats = () => {
  const total = reviews.length;
  const sum = reviews.reduce((t, r) => t + r.rating, 0);
  const average = Math.round((sum / total) * 10) / 10;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));
  return { total, average, distribution };
};

export const reviewTrips = [
  "All",
  "Tours",
  "Hotels",
  "Flights",
  "Activities",
  "Visa",
] as const;
