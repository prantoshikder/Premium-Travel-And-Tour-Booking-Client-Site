/**
 * Reviews a traveller has written, kept in localStorage until there's a backend.
 * Only completed bookings can be reviewed, which is what makes them "verified".
 */
export type MyReview = {
  bookingId: string;
  title: string;
  rating: number;
  text: string;
  recommend: boolean;
  /** ISO timestamp, set when the review is submitted. */
  createdAt: string;
};

const STORAGE_KEY = "tp_my_reviews";

export function loadReviews(): MyReview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MyReview[]) : [];
  } catch {
    return [];
  }
}

export function saveReview(review: MyReview) {
  try {
    const others = loadReviews().filter(
      (r) => r.bookingId !== review.bookingId
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify([review, ...others]));
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

export const reviewFor = (bookingId: string, reviews: MyReview[]) =>
  reviews.find((r) => r.bookingId === bookingId);

/** Long enough to be useful to the next traveller. */
export const MIN_REVIEW_LENGTH = 40;
