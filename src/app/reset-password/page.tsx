import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — TravelPerk",
  description: "Enter your verification code and set a new password for your TravelPerk account.",
};

export default function ResetPasswordPage() {
  return (
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
  );
}
