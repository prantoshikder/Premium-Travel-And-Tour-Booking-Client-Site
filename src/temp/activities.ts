/* /activities — bookable experiences. */

import { img } from "./image";
import type { TourCategory } from "./tours";

export const activityList: {
  id: string;
  title: string;
  location: string;
  image: string;
  duration: string;
  category: TourCategory;
  rating: number;
  price: number;
}[] = [
  {
    id: "a1",
    title: "Sunset Catamaran Sail",
    location: "Santorini, Greece",
    image: img("1570077188670-e3a8d69ac5ff"),
    duration: "3 hours",
    category: "Beach",
    rating: 4.9,
    price: 89,
  },
  {
    id: "a2",
    title: "Ubud Rice Terrace Cycling",
    location: "Bali, Indonesia",
    image: img("1537996194471-e657df975ab4"),
    duration: "5 hours",
    category: "Adventure",
    rating: 4.7,
    price: 45,
  },
  {
    id: "a3",
    title: "Alpine Paragliding",
    location: "Interlaken, Switzerland",
    image: img("1531366936337-7c912a4589a7"),
    duration: "2 hours",
    category: "Adventure",
    rating: 4.9,
    price: 160,
  },
  {
    id: "a4",
    title: "Tea Ceremony Experience",
    location: "Kyoto, Japan",
    image: img("1545569341-9eb8b30979d9"),
    duration: "1.5 hours",
    category: "Cultural",
    rating: 4.8,
    price: 55,
  },
  {
    id: "a5",
    title: "Desert Safari & BBQ",
    location: "Dubai, UAE",
    image: img("1512453979798-5ea266f8880c"),
    duration: "6 hours",
    category: "Family",
    rating: 4.6,
    price: 75,
  },
  {
    id: "a6",
    title: "City Lights Night Tour",
    location: "Singapore",
    image: img("1525625293386-3f8f99389edd"),
    duration: "3 hours",
    category: "City",
    rating: 4.7,
    price: 60,
  },
  {
    id: "a7",
    title: "Phi Phi Island Hopping",
    location: "Phuket, Thailand",
    image: img("1552465011-b4e21bf6e79a"),
    duration: "8 hours",
    category: "Beach",
    rating: 4.8,
    price: 95,
  },
  {
    id: "a8",
    title: "Rockies Helicopter Ride",
    location: "Banff, Canada",
    image: img("1609825488888-3a766db05542"),
    duration: "1 hour",
    category: "Luxury",
    rating: 5.0,
    price: 240,
  },
];
