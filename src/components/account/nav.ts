import {
  UserIcon,
  TicketIcon,
  HeartIcon,
  SlidersIcon,
  ChartIcon,
} from "../Icons";

export const accountNav = [
  { label: "My Profile", href: "/account/profile", Icon: UserIcon },
  { label: "My Bookings", href: "/account/bookings", Icon: TicketIcon },
  { label: "Payments", href: "/account/payments", Icon: ChartIcon },
  { label: "Wishlist", href: "/account/wishlist", Icon: HeartIcon },
  { label: "Settings", href: "/account/settings", Icon: SlidersIcon },
] as const;
