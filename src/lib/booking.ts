/** A flight selection parked in storage while the user signs in / pays. */
export type PendingBooking = {
  flightId: string;
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
  baseFare: number; // per passenger
  seatFee: number; // total seat upgrades
  taxes: number;
  total: number;
};

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
    return raw ? (JSON.parse(raw) as PendingBooking) : null;
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
