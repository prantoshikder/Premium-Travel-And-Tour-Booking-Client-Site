"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookings, type BookingStatus } from "@/temp/account";
import PageHeader from "@/components/account/PageHeader";
import { PinIcon, StarIcon, TicketIcon } from "@/components/Icons";
import ReviewFormDrawer from "@/components/site/ReviewFormDrawer";
import { loadReviews, reviewFor, saveReview, type MyReview } from "@/lib/reviews";
import BookingDrawer, { type BookingMode } from "@/components/site/BookingDrawer";
import { loadChanges, saveChange, type BookingChanges } from "@/lib/myBookings";

const filters: { key: BookingStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const statusStyles: Record<BookingStatus, string> = {
  upcoming: "bg-teal-500/15 text-teal-700",
  completed: "bg-navy-500/10 text-navy-600",
  cancelled: "bg-red-500/10 text-red-500",
};

export default function BookingsPage() {
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  // `reviewing` keeps the drawer mounted through its slide-out; `reviewOpen`
  // drives the animation. Mounting a drawer already-open skips the transition.
  const [reviewing, setReviewing] = useState<(typeof bookings)[number] | null>(
    null
  );
  const [reviewOpen, setReviewOpen] = useState(false);
  const [changes, setChanges] = useState<BookingChanges>({});
  const [viewing, setViewing] = useState<(typeof bookings)[number] | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [mode, setMode] = useState<BookingMode>("details");

  // A traveller's own cancellations and change requests override the defaults.
  const merged = bookings.map((b) => ({
    ...b,
    status: changes[b.id]?.status ?? b.status,
  }));
  const list = merged.filter((b) => filter === "all" || b.status === filter);

  // Reviews live in localStorage until there's a backend.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMyReviews(loadReviews());
    setChanges(loadChanges());
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const openBooking = (
    booking: (typeof bookings)[number],
    next: BookingMode
  ) => {
    setViewing(booking);
    setMode(next);
    setViewOpen(true);
  };

  const closeBooking = () => {
    setViewOpen(false);
    // Unmount only once the panel has slid away.
    window.setTimeout(() => setViewing(null), 320);
  };

  const handleRequestChange = (id: string, date: string, guests: number) =>
    setChanges(saveChange(id, { requestedDate: date || undefined, requestedGuests: guests }));

  const handleCancel = (id: string) =>
    setChanges(saveChange(id, { status: "cancelled" }));

  const openReview = (booking: (typeof bookings)[number]) => {
    setReviewing(booking);
    setReviewOpen(true);
  };

  const closeReview = () => {
    setReviewOpen(false);
    // Unmount only once the panel has slid away (Drawer animates for 300ms).
    window.setTimeout(() => setReviewing(null), 320);
  };

  const handleSubmit = (review: MyReview) => {
    saveReview(review);
    setMyReviews((prev) => [review, ...prev.filter((r) => r.bookingId !== review.bookingId)]);
  };

  return (
    <>
      <PageHeader
        title="My Bookings"
        subtitle="Track your upcoming trips and revisit past adventures."
      />

      {/* Filter tabs */}
      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto">
        {filters.map((f) => {
          const active = filter === f.key;
          const count =
            f.key === "all"
              ? bookings.length
              : bookings.filter((b) => b.status === f.key).length;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-navy-500 text-white shadow-sm"
                  : "border border-navy-100 bg-white text-navy-700 hover:bg-navy-50"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  active ? "bg-white/20" : "bg-navy-50 text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {list.map((b) => (
            <article
              key={b.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft transition hover:shadow-card sm:flex-row"
            >
              <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-56">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 224px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-navy-800 sm:text-lg">
                      {b.title}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                      <PinIcon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{b.location}</span>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[b.status]}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-navy-700">
                  <span>
                    <span className="text-muted">Dates:</span> {b.dates}
                  </span>
                  <span>
                    <span className="text-muted">Guests:</span> {b.guests}
                  </span>
                  <span>
                    <span className="text-muted">Booking:</span> #{b.id}
                  </span>
                </div>

                {changes[b.id]?.requestedDate && b.status !== "cancelled" && (
                  <p className="mt-3 rounded-lg bg-gold-500/15 px-3 py-2 text-xs font-medium text-gold-600">
                    Change requested to{" "}
                    {new Date(changes[b.id].requestedDate as string).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}{" "}
                    · awaiting confirmation
                  </p>
                )}

                {(() => {
                  const mine = reviewFor(b.id, myReviews);
                  if (!mine) return null;
                  return (
                    <div className="mt-4 rounded-xl bg-navy-50/50 p-3">
                      <div className="flex items-center gap-2">
                        <span className="flex gap-0.5" aria-label={`${mine.rating} out of 5`}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < mine.rating ? "text-gold-500" : "text-navy-200"
                              }`}
                            />
                          ))}
                        </span>
                        <p className="text-xs font-bold text-navy-800">
                          {mine.title}
                        </p>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted">
                        {mine.text}
                      </p>
                    </div>
                  );
                })()}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                  <p className="text-xl font-extrabold text-navy-800">
                    ${b.price.toLocaleString()}
                  </p>
                  <div className="flex flex-1 gap-2 sm:flex-none">
                    <button
                      onClick={() => openBooking(b, "details")}
                      className="flex-1 rounded-full border border-navy-200 px-4 py-2 text-xs font-semibold text-navy-700 transition hover:bg-navy-50 sm:flex-none"
                    >
                      View details
                    </button>
                    {b.status === "upcoming" && (
                      <button
                        onClick={() => openBooking(b, "manage")}
                        className="flex-1 rounded-full bg-navy-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-600 sm:flex-none"
                      >
                        Manage
                      </button>
                    )}
                    {b.status === "completed" && (
                      <button
                        onClick={() => openReview(b)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-xs font-bold text-navy-800 transition hover:bg-gold-400 sm:flex-none"
                      >
                        <StarIcon className="h-3.5 w-3.5" />
                        {reviewFor(b.id, myReviews) ? "Edit review" : "Write a review"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <BookingDrawer
        open={viewOpen}
        mode={mode}
        booking={viewing}
        onClose={closeBooking}
        onRequestChange={handleRequestChange}
        onCancel={handleCancel}
      />

      <ReviewFormDrawer
        open={reviewOpen}
        onClose={closeReview}
        onSubmit={handleSubmit}
        booking={reviewing}
        existing={reviewing ? reviewFor(reviewing.id, myReviews) : undefined}
      />
    </>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-navy-100 bg-white py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-400">
        <TicketIcon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-base font-bold text-navy-800">No bookings here</h3>
      <p className="mt-1 max-w-xs text-sm text-muted">
        You don&apos;t have any trips in this category yet. Time to plan your next
        adventure!
      </p>
      <Link
        href="/"
        className="mt-5 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-800 transition hover:bg-gold-400"
      >
        Explore trips
      </Link>
    </div>
  );
}
