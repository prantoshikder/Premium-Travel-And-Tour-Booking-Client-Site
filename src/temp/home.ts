/* Landing page — hero, destinations, deals, packages, testimonials, blog. */

import { img } from "./image";

export const heroFeatures = [
  {
    title: "Best Price Guarantee",
    text: "Get the best deals for your trips",
    icon: "tag",
  },
  {
    title: "24/7 Customer Support",
    text: "We're here to help you anytime",
    icon: "headset",
  },
  {
    title: "Easy & Secure Booking",
    text: "Book with confidence in minutes",
    icon: "shield",
  },
  {
    title: "Trusted by Millions",
    text: "Join thousands of happy travelers",
    icon: "heart",
  },
];


/** Moved to ./destinations — re-exported so older imports keep working. */
export { destinations } from "./destinations";


export const tourCategories = [
  {
    title: "Beach Holidays",
    text: "Relax on the world's most beautiful beaches",
    icon: "beach",
    color: "#0ea5e9",
  },
  {
    title: "Adventure",
    text: "Thrilling activities and exploration",
    icon: "mountain",
    color: "#f59e0b",
  },
  {
    title: "Cultural Tours",
    text: "Explore history, heritage & more",
    icon: "landmark",
    color: "#22c55e",
  },
  {
    title: "Family Friendly",
    text: "Trips designed for unforgettable moments",
    icon: "family",
    color: "#eab308",
  },
  {
    title: "Luxury Escapes",
    text: "Indulge in comfort and luxury",
    icon: "crown",
    color: "#ec4899",
  },
];


export const deals = [
  {
    title: "Maldives Escape",
    duration: "4 Days / 3 Nights",
    price: 499,
    oldPrice: 799,
    save: "30%",
    image: img("1514282401047-d79a71a590e8"),
  },
  {
    title: "Europe Delight",
    duration: "8 Days / 7 Nights",
    price: 899,
    oldPrice: 1199,
    save: "25%",
    image: img("1499856871958-5b9627545d1a"),
  },
  {
    title: "Dubai Adventure",
    duration: "5 Days / 4 Nights",
    price: 599,
    oldPrice: 799,
    save: "20%",
    image: img("1518684079-3c830dcef090"),
  },
];


export const heroStats = [
  { value: "500K+", label: "Happy Travelers", icon: "users" },
  { value: "150+", label: "Top Destinations", icon: "pin" },
  { value: "24/7", label: "Support", icon: "headset" },
  { value: "100%", label: "Secure Booking", icon: "shield" },
];


export const packages = [
  {
    title: "Thailand Getaway",
    duration: "5 Days / 4 Nights",
    price: 699,
    image: img("1552465011-b4e21bf6e79a"),
  },
  {
    title: "Canada Explorer",
    duration: "7 Days / 6 Nights",
    price: 999,
    image: img("1609825488888-3a766db05542"),
  },
  {
    title: "Singapore City Tour",
    duration: "4 Days / 3 Nights",
    price: 799,
    image: img("1525625293386-3f8f99389edd"),
  },
];


export const experienceStats = [
  { value: "10+", label: "Years of Experience", icon: "chart" },
  { value: "1M+", label: "Trips Booked", icon: "ticket" },
  { value: "200+", label: "Travel Experts", icon: "team" },
  { value: "24/7", label: "Assistance", icon: "clock" },
];


export const whyFeatures = [
  {
    title: "Best Price Guarantee",
    text: "Get the best deals always",
    icon: "tag",
  },
  {
    title: "Handpicked Hotels",
    text: "Comfortable stays worldwide",
    icon: "bed",
  },
  {
    title: "Safe & Secure Booking",
    text: "Your safety is our priority",
    icon: "shield",
  },
  {
    title: "Customizable Tours",
    text: "Travel your way, your time",
    icon: "sliders",
  },
];


export const testimonials = [
  {
    name: "Sarah Johnson",
    country: "United States",
    text: "The trip to Bali was amazing! Everything was perfectly organized and stress-free.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
  },
  {
    name: "Michael Brown",
    country: "Canada",
    text: "Excellent service and great prices. I will definitely book again!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
  },
  {
    name: "Emma Davis",
    country: "Australia",
    text: "Our family trip to Europe was unforgettable. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
  },
];


export const blogPosts = [
  {
    title: "Top 10 Beaches You Must Visit in 2025",
    date: "May 12, 2025",
    image: img("1507525428034-b723cf961d3e"),
  },
  {
    title: "How to Pack Smart for Any Trip",
    date: "May 10, 2025",
    image: img("1553531384-cc64ac80f931"),
  },
  {
    title: "Best Budget Destinations for 2025",
    date: "May 8, 2025",
    image: img("1476514525535-07fb3b4ae5f1"),
  },
];


/** First frame of public/hero.webm, so the still and the clip match. */
export const heroImage = "/hero-poster.jpg";


export const whyImage = img("1502920917128-1aa500764cbd", 700, 800);
