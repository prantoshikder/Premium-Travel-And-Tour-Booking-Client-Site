/* /account — bookings and payment history. */

import { img } from "./image";

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


export type PaymentStatus = "paid" | "pending" | "refunded" | "failed";


export const payments: {
  id: string;
  bookingId: string;
  title: string;
  /** ISO date — formatted in the UI so the locale decides how it reads. */
  date: string;
  method: string;
  /** Card last four, wallet number tail, or bank reference. */
  account: string;
  badge: string;
  badgeClass: string;
  amount: number;
  status: PaymentStatus;
  invoice: string;
}[] = [
  {
    id: "PAY-90412",
    bookingId: "TP-2048",
    title: "Santorini Escape",
    date: "2026-06-18",
    method: "Visa",
    account: "•••• 4242",
    badge: "VISA",
    badgeClass: "bg-navy-500 text-white",
    amount: 1899,
    status: "paid",
    invoice: "INV-2026-0412",
  },
  {
    id: "PAY-90388",
    bookingId: "TP-1994",
    title: "Bali Beach Retreat",
    date: "2026-05-30",
    method: "bKash",
    account: "01712 ••• 456",
    badge: "bK",
    badgeClass: "bg-[#e2136e] text-white",
    amount: 1299,
    status: "paid",
    invoice: "INV-2026-0388",
  },
  {
    id: "PAY-90310",
    bookingId: "TP-2048",
    title: "Seat upgrade · 2 seats",
    date: "2026-05-12",
    method: "PayPal",
    account: "dd@gmail.com",
    badge: "PP",
    badgeClass: "bg-[#003087] text-white",
    amount: 240,
    status: "pending",
    invoice: "INV-2026-0310",
  },
  {
    id: "PAY-90154",
    bookingId: "TP-1820",
    title: "Kyoto Cultural Tour",
    date: "2026-02-02",
    method: "Mastercard",
    account: "•••• 8891",
    badge: "MC",
    badgeClass: "bg-gold-600 text-white",
    amount: 1450,
    status: "paid",
    invoice: "INV-2026-0154",
  },
  {
    id: "PAY-89970",
    bookingId: "TP-1710",
    title: "Swiss Alps Adventure",
    date: "2025-12-20",
    method: "Bank transfer",
    account: "BRAC •••• 3312",
    badge: "BT",
    badgeClass: "bg-teal-500 text-white",
    amount: 2100,
    status: "paid",
    invoice: "INV-2025-9970",
  },
  {
    id: "PAY-89820",
    bookingId: "TP-1655",
    title: "Dubai City Break",
    date: "2025-11-14",
    method: "Visa",
    account: "•••• 4242",
    badge: "VISA",
    badgeClass: "bg-navy-500 text-white",
    amount: 1150,
    status: "refunded",
    invoice: "INV-2025-9820",
  },
  {
    id: "PAY-89744",
    bookingId: "TP-1655",
    title: "Dubai City Break · first attempt",
    date: "2025-11-13",
    method: "Nagad",
    account: "01988 ••• 210",
    badge: "Ng",
    badgeClass: "bg-[#ec1c24] text-white",
    amount: 1150,
    status: "failed",
    invoice: "—",
  },
];
