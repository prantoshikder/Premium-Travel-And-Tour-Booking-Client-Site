"use client";

import { useState } from "react";
import Drawer from "../Drawer";
import { CheckIcon, StarIcon } from "../Icons";
import { useDimension } from "@/hooks/useDimension";
import { MIN_REVIEW_LENGTH, type MyReview } from "@/lib/reviews";

const RATING_LABELS = [
  "",
  "Poor — would not book again",
  "Below expectations",
  "Fine, but had issues",
  "Good — would recommend",
  "Excellent — everything worked",
];

type Booking = { id: string; title: string; location: string; dates: string };

/**
 * Stays mounted for the life of the page — a drawer that mounts already-open
 * has no starting frame to animate from, which is what made it snap open.
 * `booking` is null while closed; the form inside is keyed so each booking
 * starts fresh.
 */
export default function ReviewFormDrawer({
  open,
  onClose,
  onSubmit,
  booking,
  existing,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: MyReview) => void;
  booking: Booking | null;
  existing?: MyReview;
}) {
  const { isMobile } = useDimension();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side={isMobile ? "bottom" : "right"}
      size={isMobile ? "92vh" : "26rem"}
      ariaLabel="Write a review"
      className={`flex flex-col ${isMobile ? "rounded-t-3xl" : ""}`}
    >
      {booking && (
        <ReviewForm
          key={booking.id}
          booking={booking}
          existing={existing}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </Drawer>
  );
}

function ReviewForm({
  booking,
  existing,
  onClose,
  onSubmit,
}: {
  booking: Booking;
  existing?: MyReview;
  onClose: () => void;
  onSubmit: (review: MyReview) => void;
}) {
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [text, setText] = useState(existing?.text ?? "");
  const [recommend, setRecommend] = useState(existing?.recommend ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const shown = hovered || rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!rating) next.rating = "Pick a star rating";
    if (title.trim().length < 4) next.title = "Add a short headline";
    if (text.trim().length < MIN_REVIEW_LENGTH)
      next.text = `Write at least ${MIN_REVIEW_LENGTH} characters so it helps other travellers`;

    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({
      bookingId: booking.id,
      rating,
      title: title.trim(),
      text: text.trim(),
      recommend,
      createdAt: new Date().toISOString(),
    });
    setDone(true);
  };

  const close = () => {
    setDone(false);
    onClose();
  };

  return (
    <>
      <div className="flex items-start justify-between gap-3 border-b border-navy-50 p-6">
        <div className="min-w-0">
          <p className="eyebrow">Verified booking</p>
          <h3 className="mt-1 truncate text-xl font-extrabold text-navy-800">
            {existing ? "Edit your review" : "Write a review"}
          </h3>
          <p className="mt-1 truncate text-xs text-muted">
            {booking.title} · {booking.dates}
          </p>
        </div>
        <button
          onClick={close}
          aria-label="Close"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-600 transition hover:bg-navy-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {done ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-teal-500/10 text-teal-600">
            <CheckIcon className="h-7 w-7" />
          </span>
          <h4 className="text-lg font-extrabold text-navy-800">
            Thanks for the review
          </h4>
          <p className="text-sm text-muted">
            It goes live once our team checks it — usually within a day.
          </p>
          <button
            onClick={close}
            className="mt-2 rounded-full bg-navy-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-navy-600"
          >
            Done
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col"
          noValidate
        >
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* Rating */}
            <div>
              <p className="mb-2 text-sm font-bold text-navy-800">
                How was your trip?
              </p>
              <div
                className="flex items-center gap-1"
                role="radiogroup"
                aria-label="Star rating"
                onMouseLeave={() => setHovered(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={rating === star}
                    aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
                    onMouseEnter={() => setHovered(star)}
                    onFocus={() => setHovered(star)}
                    onBlur={() => setHovered(0)}
                    onClick={() => {
                      setRating(star);
                      setErrors((p) => ({ ...p, rating: "" }));
                    }}
                    className="rounded p-0.5 transition hover:scale-110"
                  >
                    <StarIcon
                      className={`h-8 w-8 transition-colors ${
                        star <= shown ? "text-gold-500" : "text-navy-100"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p
                className={`mt-1 text-xs ${
                  errors.rating ? "text-red-500" : "text-muted"
                }`}
                role={errors.rating ? "alert" : undefined}
              >
                {errors.rating || RATING_LABELS[shown] || "Tap a star to rate"}
              </p>
            </div>

            {/* Headline */}
            <div>
              <label
                htmlFor="review-title"
                className="mb-1.5 block text-sm font-bold text-navy-800"
              >
                Headline
              </label>
              <input
                id="review-title"
                value={title}
                maxLength={70}
                placeholder="Sum it up in a few words"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((p) => ({ ...p, title: "" }));
                }}
                aria-invalid={!!errors.title}
                className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-navy-800 transition outline-none placeholder:text-muted/60 focus:ring-4 ${
                  errors.title
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                    : "border-navy-100 focus:border-navy-500 focus:ring-navy-500/10"
                }`}
              />
              <p className="mt-1 flex justify-between text-[11px]">
                <span className={errors.title ? "text-red-500" : "text-muted"}>
                  {errors.title || "Shown as the review title"}
                </span>
                <span className="text-muted">{title.length}/70</span>
              </p>
            </div>

            {/* Body */}
            <div>
              <label
                htmlFor="review-text"
                className="mb-1.5 block text-sm font-bold text-navy-800"
              >
                Your review
              </label>
              <textarea
                id="review-text"
                rows={6}
                value={text}
                maxLength={1000}
                placeholder="What worked, what didn't, and what the next traveller should know…"
                onChange={(e) => {
                  setText(e.target.value);
                  setErrors((p) => ({ ...p, text: "" }));
                }}
                aria-invalid={!!errors.text}
                className={`w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm text-navy-800 transition outline-none placeholder:text-muted/60 focus:ring-4 ${
                  errors.text
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                    : "border-navy-100 focus:border-navy-500 focus:ring-navy-500/10"
                }`}
              />
              <p className="mt-1 flex justify-between text-[11px]">
                <span className={errors.text ? "text-red-500" : "text-muted"}>
                  {errors.text || `At least ${MIN_REVIEW_LENGTH} characters`}
                </span>
                <span className="text-muted">{text.length}/1000</span>
              </p>
            </div>

            {/* Recommend */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-navy-100 bg-white p-3">
              <input
                type="checkbox"
                checked={recommend}
                onChange={(e) => setRecommend(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-navy-200 accent-navy-500"
              />
              <span>
                <span className="block text-sm font-semibold text-navy-800">
                  I&apos;d recommend this trip
                </span>
                <span className="block text-[11px] text-muted">
                  Shown as a badge on your review.
                </span>
              </span>
            </label>

            <p className="rounded-xl bg-navy-50/60 px-4 py-3 text-[11px] text-muted">
              Reviews are tied to this booking, so other travellers know they
              are genuine. Your name and country are shown; contact details
              never are.
            </p>
          </div>

          <div className="border-t border-navy-50 p-6">
            <button
              type="submit"
              className="w-full rounded-full bg-navy-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-600"
            >
              {existing ? "Update review" : "Submit review"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
