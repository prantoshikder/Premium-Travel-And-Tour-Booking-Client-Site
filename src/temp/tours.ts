/* /tours — categories and the tour listings. */

import { slugify } from "@/lib/slug";
import { img } from "./image";

export const tourCategoryNames = [
  "Beach",
  "Adventure",
  "Cultural",
  "Family",
  "Luxury",
  "City",
] as const;


export type TourCategory = (typeof tourCategoryNames)[number];


export const tourList: {
  id: string;
  title: string;
  location: string;
  image: string;
  duration: string;
  category: TourCategory;
  rating: number;
  reviews: number;
  price: number;
  badge?: string;
}[] = [
  { id: "t1", title: "Santorini Sunset Cruise", location: "Santorini, Greece", image: img("1570077188670-e3a8d69ac5ff"), duration: "6 Days", category: "Beach", rating: 4.9, reviews: 328, price: 1899, badge: "Bestseller" },
  { id: "t2", title: "Bali Island Adventure", location: "Bali, Indonesia", image: img("1537996194471-e657df975ab4"), duration: "7 Days", category: "Beach", rating: 4.8, reviews: 512, price: 1299 },
  { id: "t3", title: "Swiss Alps Expedition", location: "Interlaken, Switzerland", image: img("1531366936337-7c912a4589a7"), duration: "8 Days", category: "Adventure", rating: 4.9, reviews: 274, price: 2100, badge: "Top rated" },
  { id: "t4", title: "Kyoto Heritage Walk", location: "Kyoto, Japan", image: img("1545569341-9eb8b30979d9"), duration: "5 Days", category: "Cultural", rating: 4.7, reviews: 198, price: 1450 },
  { id: "t5", title: "Dubai Luxury Getaway", location: "Dubai, UAE", image: img("1512453979798-5ea266f8880c"), duration: "5 Days", category: "Luxury", rating: 4.8, reviews: 421, price: 1750 },
  { id: "t6", title: "Thailand Family Fun", location: "Phuket, Thailand", image: img("1552465011-b4e21bf6e79a"), duration: "6 Days", category: "Family", rating: 4.6, reviews: 356, price: 999 },
  { id: "t7", title: "Canadian Rockies Trek", location: "Banff, Canada", image: img("1609825488888-3a766db05542"), duration: "9 Days", category: "Adventure", rating: 4.9, reviews: 143, price: 2350 },
  { id: "t8", title: "Singapore City Explorer", location: "Singapore", image: img("1525625293386-3f8f99389edd"), duration: "4 Days", category: "City", rating: 4.7, reviews: 289, price: 899 },
  { id: "t9", title: "Maldives Overwater Retreat", location: "Malé, Maldives", image: img("1514282401047-d79a71a590e8"), duration: "5 Days", category: "Luxury", rating: 5.0, reviews: 402, price: 2650, badge: "Bestseller" },
];

/** Detail-page URL for a tour, derived from its title so links stay readable. */
export const tourSlug = (title: string) => slugify(title);

export const tourBySlug = (slug: string) =>
  tourList.find((t) => tourSlug(t.title) === slug);

export const tourSlugs = () => tourList.map((t) => tourSlug(t.title));
