"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { packageBooking, saveBooking } from "@/lib/booking";
import PackageBookingDrawer, {
  type PackageDetails,
} from "./PackageBookingDrawer";

type Props = {
  reference: string;
  title: string;
  duration: string;
  price: number;
  image?: string;
  savedAmount?: number;
  label?: string;
  className?: string;
};

/**
 * Two-step booking, mirroring the flights flow: pick trip details first, then
 * pay. Skipping straight to checkout would ask for money before the traveller
 * has said when they're going or who's coming.
 */
export default function BookNowButton({
  reference,
  title,
  duration,
  price,
  image,
  savedAmount,
  label = "Book Now",
  className = "rounded-full bg-navy-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-navy-600",
}: Props) {
  const router = useRouter();
  const { user, ready } = useAuth();
  const [open, setOpen] = useState(false);

  const handleConfirm = (details: PackageDetails) => {
    saveBooking(
      packageBooking({
        reference,
        title,
        duration,
        price,
        image,
        savedAmount,
        ...details,
      })
    );
    // Signed in → pay. Otherwise sign in first and come straight back.
    router.push(
      user ? "/checkout" : `/login?next=${encodeURIComponent("/checkout")}`
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!ready}
        aria-label={`${label} — ${title}, from $${price}`}
        className={`${className} disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {label}
      </button>

      <PackageBookingDrawer
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={title}
        duration={duration}
        price={price}
        image={image}
        savedAmount={savedAmount}
        confirmLabel={user ? "Continue to payment" : "Sign in to pay"}
      />
    </>
  );
}
