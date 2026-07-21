/** What every booking carries, whatever the traveller picked. */
type BookingBase = {
  reference: string;
  title: string;
  /** One-line context: "4 Days / 3 Nights", "New York → Paris". */
  subtitle: string;
  image?: string;
  baseFare: number; // per passenger / per package
  seatFee: number; // seat or add-on upgrades
  taxes: number;
  total: number;
};

export type FlightBooking = BookingBase & {
  kind: "flight";
  airline: string;
  logo: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  seats: string[];
};

/** Deals, tour packages — anything sold as a single bundle. */
export type PackageBooking = BookingBase & {
  kind: "package";
  duration: string;
  /** ISO departure date the traveller picked. */
  date: string;
  adults: number;
  children: number;
  /** Total travellers, kept for the summary rows. */
  guests: number;
  rooms: number;
  addOns: { name: string; price: number }[];
  savedAmount?: number;
};

/** A selection parked in storage while the traveller signs in / pays. */
export type PendingBooking = FlightBooking | PackageBooking;

const STORAGE_KEY = "tp_pending_booking";

export function saveBooking(booking: PendingBooking) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

export function loadBooking(): PendingBooking | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PendingBooking>;
    // Older entries predate `kind` and were always flights.
    if (!parsed.kind) return { ...parsed, kind: "flight" } as PendingBooking;
    return parsed as PendingBooking;
  } catch {
    return null;
  }
}

export function clearBooking() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

const TAXES_RATE = 0.14;

/** Children travel at 60% of the adult rate — one rule, used everywhere. */
export const CHILD_RATE = 0.6;

/** Same tax and add-on rules everywhere, so checkout totals always reconcile. */
export function packageBooking({
  reference,
  title,
  duration,
  image,
  price,
  date,
  adults = 1,
  children = 0,
  rooms = 1,
  addOns = [],
  savedAmount,
}: {
  reference: string;
  title: string;
  duration: string;
  image?: string;
  price: number;
  date: string;
  adults?: number;
  children?: number;
  rooms?: number;
  addOns?: { name: string; price: number }[];
  savedAmount?: number;
}): PackageBooking {
  const guests = adults + children;
  const baseFare = price * adults + price * CHILD_RATE * children;
  const addOnTotal = addOns.reduce((sum, a) => sum + a.price * guests, 0);
  const taxes = Math.round((baseFare + addOnTotal) * TAXES_RATE);

  return {
    kind: "package",
    reference,
    title,
    subtitle: `${duration} · ${guests} ${guests > 1 ? "travellers" : "traveller"}`,
    image,
    duration,
    date,
    adults,
    children,
    guests,
    rooms,
    addOns,
    savedAmount,
    baseFare: Math.round(baseFare),
    seatFee: addOnTotal,
    taxes,
    total: Math.round(baseFare) + addOnTotal + taxes,
  };
}
