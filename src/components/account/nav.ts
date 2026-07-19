import {
  UserIcon,
  TicketIcon,
  HeartIcon,
  SlidersIcon,
} from "../Icons";

export const accountNav = [
  { label: "My Profile", href: "/account/profile", Icon: UserIcon },
  { label: "My Bookings", href: "/account/bookings", Icon: TicketIcon },
  { label: "Wishlist", href: "/account/wishlist", Icon: HeartIcon },
  { label: "Settings", href: "/account/settings", Icon: SlidersIcon },
] as const;
