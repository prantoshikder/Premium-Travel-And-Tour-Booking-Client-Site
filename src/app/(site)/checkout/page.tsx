import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AuthGuard from "@/components/auth/AuthGuard";
import CheckoutClient from "@/components/site/CheckoutClient";

export const metadata: Metadata = pageMetadata({
  title: "Checkout",
  description: "Review your booking and complete payment securely.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <section className="container-x pt-28 pb-16 sm:pt-32">
        <p className="eyebrow">Almost there</p>
        <h1 className="section-title mt-1 text-3xl sm:text-4xl">Checkout</h1>
        <p className="mt-2 mb-8 text-sm text-muted">
          Review your flight and choose a payment method to confirm.
        </p>
        <CheckoutClient />
      </section>
    </AuthGuard>
  );
}
