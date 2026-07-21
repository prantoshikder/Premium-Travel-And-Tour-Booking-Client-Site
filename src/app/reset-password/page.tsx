import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import GuestGuard from "@/components/auth/GuestGuard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = pageMetadata({
  title: "Reset Password",
  description: "Choose a new password for your TravelPerk account.",
  path: "/reset-password",
  noIndex: true,
});

export default function ResetPasswordPage() {
  return (
    <GuestGuard>
      <AuthShell
        title="Reset your password"
        subtitle="Enter the code we sent you and choose a new password."
        showSocial={false}
        footer={
          <>
            Didn&apos;t request this?{" "}
            <Link
              href="/login"
              className="font-semibold text-navy-600 transition hover:text-gold-600"
            >
              Back to sign in
            </Link>
          </>
        }
      >
        <ResetPasswordForm />
      </AuthShell>
    </GuestGuard>
  );
}
