const img = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Hotels", href: "/hotels" },
  { label: "Flights", href: "/flights" },
  { label: "Activities", href: "/activities" },
  { label: "Visa", href: "/visa" },
  { label: "Contact", href: "/contact" },
];

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

export const destinations = [
  { name: "Bali", country: "Indonesia", image: img("1537996194471-e657df975ab4") },
  { name: "Swiss Alps", country: "Switzerland", image: img("1531366936337-7c912a4589a7") },
  { name: "Santorini", country: "Greece", image: img("1570077188670-e3a8d69ac5ff") },
  { name: "Dubai", country: "UAE", image: img("1512453979798-5ea266f8880c") },
  { name: "Kyoto", country: "Japan", image: img("1545569341-9eb8b30979d9") },
];

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

export const footerColumns = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "FAQs", "Terms & Conditions"],
  },
  {
    title: "Services",
    links: ["Flights", "Hotels", "Tours", "Visa"],
  },
];

export const heroImage = img("1613395877344-13d4a8e0d49e", 1200, 900);
export const whyImage = img("1502920917128-1aa500764cbd", 700, 800);
export const airplaneImage = img("1436491865332-7a61a109cc05", 900, 500);
export const authImage = img("1507525428034-b723cf961d3e", 900, 1300);

export type BookingStatus = "upcoming" | "completed" | "cancelled";

export const bookings: {
  id: string;
  title: string;
  location: string;
  image: string;
  dates: string;
  guests: number;
  price: number;
  status: BookingStatus;
}[] = [
  {
    id: "TP-2048",
    title: "Santorini Escape",
    location: "Santorini, Greece",
    image: img("1570077188670-e3a8d69ac5ff"),
    dates: "24 – 31 Aug, 2026",
    guests: 2,
    price: 1899,
    status: "upcoming",
  },
  {
    id: "TP-1994",
    title: "Bali Beach Retreat",
    location: "Bali, Indonesia",
    image: img("1537996194471-e657df975ab4"),
    dates: "12 – 18 Sep, 2026",
    guests: 2,
    price: 1299,
    status: "upcoming",
  },
  {
    id: "TP-1820",
    title: "Kyoto Cultural Tour",
    location: "Kyoto, Japan",
    image: img("1545569341-9eb8b30979d9"),
    dates: "03 – 09 Mar, 2026",
    guests: 1,
    price: 1450,
    status: "completed",
  },
  {
    id: "TP-1710",
    title: "Swiss Alps Adventure",
    location: "Interlaken, Switzerland",
    image: img("1531366936337-7c912a4589a7"),
    dates: "15 – 21 Jan, 2026",
    guests: 3,
    price: 2100,
    status: "completed",
  },
  {
    id: "TP-1655",
    title: "Dubai City Break",
    location: "Dubai, UAE",
    image: img("1512453979798-5ea266f8880c"),
    dates: "08 – 12 Dec, 2025",
    guests: 2,
    price: 1150,
    status: "cancelled",
  },
];

export const authHighlights = [
  "Exclusive member-only deals on flights & hotels",
  "Save trips and manage bookings in one place",
  "24/7 priority travel support worldwide",
];

/* ------------------------------------------------------------------ */
/* Listing pages                                                       */
/* ------------------------------------------------------------------ */

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
  { id: "h1", name: "Azure Cliff Resort", location: "Santorini, Greece", image: img("1570077188670-e3a8d69ac5ff"), rating: 4.9, reviews: 1204, pricePerNight: 320, amenities: ["Free WiFi", "Infinity Pool", "Breakfast", "Sea View"], tag: "Luxury" },
  { id: "h2", name: "Bali Jungle Villas", location: "Ubud, Bali", image: img("1537996194471-e657df975ab4"), rating: 4.8, reviews: 986, pricePerNight: 180, amenities: ["Free WiFi", "Private Pool", "Spa", "Breakfast"] },
  { id: "h3", name: "Alpine Grand Chalet", location: "Interlaken, Switzerland", image: img("1531366936337-7c912a4589a7"), rating: 4.7, reviews: 742, pricePerNight: 260, amenities: ["Mountain View", "Fireplace", "Free WiFi", "Parking"] },
  { id: "h4", name: "Palm Desert Palace", location: "Dubai, UAE", image: img("1512453979798-5ea266f8880c"), rating: 4.9, reviews: 1533, pricePerNight: 410, amenities: ["Rooftop Pool", "Gym", "Free WiFi", "Airport Shuttle"], tag: "Popular" },
  { id: "h5", name: "Kyoto Zen Ryokan", location: "Kyoto, Japan", image: img("1545569341-9eb8b30979d9"), rating: 4.8, reviews: 634, pricePerNight: 220, amenities: ["Onsen", "Garden", "Breakfast", "Free WiFi"] },
  { id: "h6", name: "Marina Bay Suites", location: "Singapore", image: img("1525625293386-3f8f99389edd"), rating: 4.6, reviews: 878, pricePerNight: 290, amenities: ["City View", "Pool", "Gym", "Free WiFi"] },
];

export const flightList: {
  id: string;
  airline: string;
  logo: string; // emoji
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  price: number;
}[] = [
  { id: "f1", airline: "SkyJet Airways", logo: "✈️", from: "NYC", fromCity: "New York", to: "PAR", toCity: "Paris", depart: "08:30", arrive: "21:45", duration: "7h 15m", stops: "Non-stop", price: 540 },
  { id: "f2", airline: "AeroGlobe", logo: "🛩️", from: "NYC", fromCity: "New York", to: "PAR", toCity: "Paris", depart: "13:10", arrive: "05:30", duration: "9h 20m", stops: "1 Stop", price: 420 },
  { id: "f3", airline: "Blue Horizon", logo: "🛫", from: "NYC", fromCity: "New York", to: "PAR", toCity: "Paris", depart: "18:45", arrive: "08:05", duration: "7h 20m", stops: "Non-stop", price: 610 },
  { id: "f4", airline: "Nomad Air", logo: "✈️", from: "NYC", fromCity: "New York", to: "PAR", toCity: "Paris", depart: "22:00", arrive: "13:40", duration: "10h 40m", stops: "1 Stop", price: 385 },
  { id: "f5", airline: "Emerald Fly", logo: "🛬", from: "NYC", fromCity: "New York", to: "PAR", toCity: "Paris", depart: "06:15", arrive: "19:00", duration: "6h 45m", stops: "Non-stop", price: 720 },
];

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
  { id: "a1", title: "Sunset Catamaran Sail", location: "Santorini, Greece", image: img("1570077188670-e3a8d69ac5ff"), duration: "3 hours", category: "Beach", rating: 4.9, price: 89 },
  { id: "a2", title: "Ubud Rice Terrace Cycling", location: "Bali, Indonesia", image: img("1537996194471-e657df975ab4"), duration: "5 hours", category: "Adventure", rating: 4.7, price: 45 },
  { id: "a3", title: "Alpine Paragliding", location: "Interlaken, Switzerland", image: img("1531366936337-7c912a4589a7"), duration: "2 hours", category: "Adventure", rating: 4.9, price: 160 },
  { id: "a4", title: "Tea Ceremony Experience", location: "Kyoto, Japan", image: img("1545569341-9eb8b30979d9"), duration: "1.5 hours", category: "Cultural", rating: 4.8, price: 55 },
  { id: "a5", title: "Desert Safari & BBQ", location: "Dubai, UAE", image: img("1512453979798-5ea266f8880c"), duration: "6 hours", category: "Family", rating: 4.6, price: 75 },
  { id: "a6", title: "City Lights Night Tour", location: "Singapore", image: img("1525625293386-3f8f99389edd"), duration: "3 hours", category: "City", rating: 4.7, price: 60 },
  { id: "a7", title: "Phi Phi Island Hopping", location: "Phuket, Thailand", image: img("1552465011-b4e21bf6e79a"), duration: "8 hours", category: "Beach", rating: 4.8, price: 95 },
  { id: "a8", title: "Rockies Helicopter Ride", location: "Banff, Canada", image: img("1609825488888-3a766db05542"), duration: "1 hour", category: "Luxury", rating: 5.0, price: 240 },
];

export const visaSteps = [
  { title: "Choose Destination", text: "Pick the country you're travelling to and the visa type you need.", icon: "compass" },
  { title: "Submit Documents", text: "Upload your passport and required documents securely online.", icon: "passport" },
  { title: "We Process It", text: "Our experts review and submit your application to the embassy.", icon: "shield" },
  { title: "Get Approved", text: "Receive your approved visa straight to your inbox on time.", icon: "ticket" },
];

export const visaCountries: {
  country: string;
  flag: string;
  processing: string;
  price: number;
  type: string;
}[] = [
  { country: "United States", flag: "🇺🇸", processing: "10–15 days", price: 160, type: "Tourist B1/B2" },
  { country: "United Kingdom", flag: "🇬🇧", processing: "15–20 days", price: 140, type: "Standard Visitor" },
  { country: "Canada", flag: "🇨🇦", processing: "12–18 days", price: 130, type: "Visitor Visa" },
  { country: "Schengen (EU)", flag: "🇪🇺", processing: "10–14 days", price: 120, type: "Tourist Schengen" },
  { country: "Australia", flag: "🇦🇺", processing: "14–20 days", price: 150, type: "Visitor 600" },
  { country: "United Arab Emirates", flag: "🇦🇪", processing: "3–5 days", price: 100, type: "Tourist 30 days" },
  { country: "Japan", flag: "🇯🇵", processing: "5–8 days", price: 90, type: "Tourist Visa" },
  { country: "Singapore", flag: "🇸🇬", processing: "3–5 days", price: 80, type: "Tourist Visa" },
];

export const contactChannels = [
  { label: "Visit us", value: "123 Travel Ave, New York, NY 10001", icon: "pin" },
  { label: "Call us", value: "+1 (555) 000-1234", icon: "headset" },
  { label: "Email us", value: "hello@travelperk.com", icon: "ticket" },
  { label: "Working hours", value: "Mon – Sat, 9:00 AM – 8:00 PM", icon: "clock" },
];
