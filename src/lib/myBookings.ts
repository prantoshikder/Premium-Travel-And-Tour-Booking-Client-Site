import type { BookingStatus } from "@/temp/account";

/**
 * Changes a traveller has made to their own bookings — cancellations and
 * pending change requests. Kept in localStorage until there's a backend.
 */
export type BookingChange = {
  status?: BookingStatus;
  /** Requested new departure date, awaiting confirmation. */
  requestedDate?: string;
  requestedGuests?: number;
  updatedAt: string;
};

export type BookingChanges = Record<string, BookingChange>;

const STORAGE_KEY = "tp_booking_changes";

export function loadChanges(): BookingChanges {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BookingChanges) : {};
  } catch {
    return {};
  }
}

export function saveChange(
  id: string,
  change: Omit<BookingChange, "updatedAt">
) {
  try {
    const all = loadChanges();
    const next: BookingChanges = {
      ...all,
      [id]: { ...all[id], ...change, updatedAt: new Date().toISOString() },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return loadChanges();
  }
}

/** Free cancellation up to 14 days out; 50% after that. */
export function refundPolicy(dates: string) {
  const start = new Date(dates.split("–")[0]?.trim() ?? dates);
  const days = Math.ceil((start.getTime() - Date.now()) / 86_400_000);
  if (Number.isNaN(days))
    return { label: "Refund calculated on request", full: false };
  if (days >= 14)
    return {
      label: `Free cancellation — ${days} days before departure`,
      full: true,
    };
  return { label: `Within 14 days of departure — 50% refund`, full: false };
}
