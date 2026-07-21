"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Drawer from "../Drawer";
import {
  CheckIcon,
  ClockIcon,
  HeadsetIcon,
  PinIcon,
  ShieldIcon,
  UsersIcon,
} from "../Icons";
import { useDimension } from "@/hooks/useDimension";
import { refundPolicy } from "@/lib/myBookings";
import type { BookingStatus } from "@/temp/account";

export type BookingLike = {
  id: string;
  title: string;
  location: string;
  image: string;
  dates: string;
  guests: number;
  price: number;
  status: BookingStatus;
};

export type BookingMode = "details" | "manage";

const TAX_RATE = 0.14;

const INCLUDED = [
  "Accommodation for the full stay",
  "Airport transfers both ways",
  "Guided sightseeing",
  "Daily breakfast",
];

/**
 * One drawer, two jobs: read-only trip details, and the actions a traveller can
 * take on an upcoming trip. Mounted permanently so it animates open properly.
 */
export default function BookingDrawer({
  open,
  mode,
  booking,
  onClose,
  onRequestChange,
  onCancel,
}: {
  open: boolean;
  mode: BookingMode;
  booking: BookingLike | null;
  onClose: () => void;
  onRequestChange: (id: string, date: string, guests: number) => void;
  onCancel: (id: string) => void;
}) {
  const { isMobile } = useDimension();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side={isMobile ? "bottom" : "right"}
      size={isMobile ? "92vh" : "26rem"}
      ariaLabel={mode === "manage" ? "Manage booking" : "Booking details"}
      className={`flex flex-col ${isMobile ? "rounded-t-3xl" : ""}`}
    >
      {booking && (
        <BookingPanel
          key={`${booking.id}-${mode}`}
          booking={booking}
          mode={mode}
          onClose={onClose}
          onRequestChange={onRequestChange}
          onCancel={onCancel}
        />
      )}
    </Drawer>
  );
}

function BookingPanel({
  booking,
  mode,
  onClose,
  onRequestChange,
  onCancel,
}: {
  booking: BookingLike;
  mode: BookingMode;
  onClose: () => void;
  onRequestChange: (id: string, date: string, guests: number) => void;
  onCancel: (id: string) => void;
}) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(booking.guests);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [sent, setSent] = useState(false);

  const taxes = Math.round(booking.price * TAX_RATE);
  const base = booking.price - taxes;
  const policy = refundPolicy(booking.dates);
  const changed = date !== "" || guests !== booking.guests;

  /** A voucher the traveller can keep — built client-side, no backend needed. */
  const downloadVoucher = () => {
    const lines = [
      "TRAVELPERK BOOKING VOUCHER",
      "==========================",
      `Booking reference : ${booking.id}`,
      `Trip              : ${booking.title}`,
      `Destination       : ${booking.location}`,
      `Travel dates      : ${booking.dates}`,
      `Travellers        : ${booking.guests}`,
      `Status            : ${booking.status}`,
      `Total paid        : $${booking.price.toLocaleString()}`,
      "",
      "Included: " + INCLUDED.join(", "),
      "Support: hello@travelperk.com · +1 (555) 000-1234",
    ].join("\n");

    const url = URL.createObjectURL(new Blob([lines], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `travelperk-${booking.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex items-start justify-between gap-3 border-b border-navy-50 p-6">
        <div className="min-w-0">
          <p className="eyebrow">
            {mode === "manage" ? "Manage booking" : "Booking details"}
          </p>
          <h3 className="mt-1 truncate text-xl font-extrabold text-navy-800">
            {booking.title}
          </h3>
          <p className="mt-1 truncate text-xs text-muted">#{booking.id}</p>
        </div>
        <button
          onClick={onClose}
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

      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl">
          <Image
            src={booking.image}
            alt={booking.title}
            fill
            sizes="(max-width: 640px) 100vw, 26rem"
            className="object-cover"
          />
        </div>

        <dl className="space-y-2 text-sm">
          <Row icon={<PinIcon className="h-4 w-4" />} label="Destination">
            {booking.location}
          </Row>
          <Row icon={<ClockIcon className="h-4 w-4" />} label="Travel dates">
            {booking.dates}
          </Row>
          <Row icon={<UsersIcon className="h-4 w-4" />} label="Travellers">
            {booking.guests} {booking.guests > 1 ? "guests" : "guest"}
          </Row>
        </dl>

        {mode === "details" ? (
          <>
            <div>
              <p className="mb-2 text-sm font-bold text-navy-800">
                Price breakdown
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-navy-700">
                  <dt>Package</dt>
                  <dd className="font-semibold">${base.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between text-navy-700">
                  <dt>Taxes &amp; fees</dt>
                  <dd className="font-semibold">${taxes.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between border-t border-navy-50 pt-2 text-navy-800">
                  <dt className="font-bold">Total paid</dt>
                  <dd className="text-lg font-extrabold">
                    ${booking.price.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="mb-2 text-sm font-bold text-navy-800">
                What&apos;s included
              </p>
              <ul className="space-y-1.5">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-navy-700"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl bg-navy-50/60 px-4 py-3 text-xs text-navy-700 transition hover:bg-navy-50"
            >
              <HeadsetIcon className="h-4 w-4 text-navy-500" />
              Need help with this trip? Talk to our team — 24/7.
            </Link>
          </>
        ) : (
          <>
            {/* Change request */}
            <div>
              <p className="mb-1 text-sm font-bold text-navy-800">
                Change your trip
              </p>
              <p className="mb-3 text-xs text-muted">
                One free date change per booking. We confirm within 24 hours.
              </p>

              <label
                htmlFor="new-date"
                className="mb-1.5 block text-xs font-semibold text-navy-700"
              >
                New departure date
              </label>
              <input
                id="new-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 outline-none transition focus:border-navy-500 focus:ring-4 focus:ring-navy-500/10"
              />

              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-navy-100 bg-white p-3">
                <span className="text-sm font-semibold text-navy-800">
                  Travellers
                </span>
                <span className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Remove one traveller"
                    disabled={guests <= 1}
                    onClick={() => setGuests((g) => g - 1)}
                    className="grid h-7 w-7 place-items-center rounded-full border border-navy-200 text-sm font-bold text-navy-700 transition hover:border-navy-500 disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-navy-800">
                    {guests}
                  </span>
                  <button
                    type="button"
                    aria-label="Add one traveller"
                    disabled={guests >= 12}
                    onClick={() => setGuests((g) => g + 1)}
                    className="grid h-7 w-7 place-items-center rounded-full border border-navy-200 text-sm font-bold text-navy-700 transition hover:border-navy-500 disabled:opacity-40"
                  >
                    +
                  </button>
                </span>
              </div>

              {sent && (
                <p className="mt-3 flex items-center gap-2 rounded-xl bg-teal-500/10 px-4 py-3 text-sm font-semibold text-teal-600">
                  <CheckIcon className="h-4 w-4" />
                  Request sent — we&apos;ll email you within 24 hours.
                </p>
              )}
            </div>

            {/* Cancellation */}
            <div className="rounded-2xl border border-red-200 bg-red-50/40 p-4">
              <p className="text-sm font-bold text-red-600">Cancel this trip</p>
              <p className="mt-1 flex items-start gap-1.5 text-xs text-navy-700">
                <ShieldIcon className="mt-px h-3.5 w-3.5 shrink-0 text-teal-600" />
                {policy.label}
              </p>

              {confirmCancel ? (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-navy-800">
                    Cancel booking #{booking.id}? This can&apos;t be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onCancel(booking.id);
                        onClose();
                      }}
                      className="flex-1 rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600"
                    >
                      Yes, cancel it
                    </button>
                    <button
                      onClick={() => setConfirmCancel(false)}
                      className="flex-1 rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-semibold text-navy-700 transition hover:bg-navy-50"
                    >
                      Keep booking
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmCancel(true)}
                  className="mt-3 rounded-full border border-red-300 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Cancel booking
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="border-t border-navy-50 p-6">
        {mode === "details" ? (
          <button
            onClick={downloadVoucher}
            className="w-full rounded-full bg-navy-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-600"
          >
            Download voucher
          </button>
        ) : (
          <button
            disabled={!changed || sent}
            onClick={() => {
              onRequestChange(booking.id, date, guests);
              setSent(true);
            }}
            className="w-full rounded-full bg-navy-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-600 disabled:cursor-not-allowed disabled:bg-navy-200"
          >
            {sent ? "Request sent" : "Request change"}
          </button>
        )}
      </div>
    </>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="flex items-center gap-2 text-muted">
        <span className="text-navy-500">{icon}</span>
        {label}
      </dt>
      <dd className="text-right font-semibold text-navy-800">{children}</dd>
    </div>
  );
}
