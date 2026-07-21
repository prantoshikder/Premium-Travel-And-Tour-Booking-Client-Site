/* /hotels — stay listings and the page hero image. */

import { img } from "./image";

export const hotelList: {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  amenities: string[];
  tag?: string;
}[] = [
  {
    id: "h1",
    name: "Azure Cliff Resort",
    location: "Santorini, Greece",
    image: img("1570077188670-e3a8d69ac5ff"),
    rating: 4.9,
    reviews: 1204,
    pricePerNight: 320,
    amenities: ["Free WiFi", "Infinity Pool", "Breakfast", "Sea View"],
    tag: "Luxury",
  },
  {
    id: "h2",
    name: "Bali Jungle Villas",
    location: "Ubud, Bali",
    image: img("1537996194471-e657df975ab4"),
    rating: 4.8,
    reviews: 986,
    pricePerNight: 180,
    amenities: ["Free WiFi", "Private Pool", "Spa", "Breakfast"],
  },
  {
    id: "h3",
    name: "Alpine Grand Chalet",
    location: "Interlaken, Switzerland",
    image: img("1531366936337-7c912a4589a7"),
    rating: 4.7,
    reviews: 742,
    pricePerNight: 260,
    amenities: ["Mountain View", "Fireplace", "Free WiFi", "Parking"],
  },
  {
    id: "h4",
    name: "Palm Desert Palace",
    location: "Dubai, UAE",
    image: img("1512453979798-5ea266f8880c"),
    rating: 4.9,
    reviews: 1533,
    pricePerNight: 410,
    amenities: ["Rooftop Pool", "Gym", "Free WiFi", "Airport Shuttle"],
    tag: "Popular",
  },
  {
    id: "h5",
    name: "Kyoto Zen Ryokan",
    location: "Kyoto, Japan",
    image: img("1545569341-9eb8b30979d9"),
    rating: 4.8,
    reviews: 634,
    pricePerNight: 220,
    amenities: ["Onsen", "Garden", "Breakfast", "Free WiFi"],
  },
  {
    id: "h6",
    name: "Marina Bay Suites",
    location: "Singapore",
    image: img("1525625293386-3f8f99389edd"),
    rating: 4.6,
    reviews: 878,
    pricePerNight: 290,
    amenities: ["City View", "Pool", "Gym", "Free WiFi"],
  },
];

export const hotelHeroImage = img("1566073771259-6a8506099945", 1400, 800);
