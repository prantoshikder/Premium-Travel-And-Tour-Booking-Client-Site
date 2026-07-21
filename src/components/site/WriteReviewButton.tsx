"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { StarIcon } from "../Icons";

/**
 * Sends the traveller to the only place a review can start: their completed
 * bookings. Signing in first if needed, then straight back there.
 */
export default function WriteReviewButton() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const destination = "/account/bookings";

  return (
    <button
      type="button"
      disabled={!ready}
      onClick={() =>
        router.push(
          user ? destination : `/login?next=${encodeURIComponent(destination)}`
        )
      }
      className="flex items-center gap-2 rounded-full bg-navy-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-navy-600 disabled:opacity-70"
    >
      <StarIcon className="h-4 w-4" />
      {user ? "Write a review" : "Sign in to review"}
    </button>
  );
}
