import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — TravelPerk",
  description:
    "Reset your TravelPerk password. We'll send a verification code to your email or phone.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password?"
      subtitle="No worries — enter your email or phone and we'll send you a reset code."
      showSocial={false}
      footer={
        <>
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-navy-600 transition hover:text-gold-600"
          >
            Back to sign in
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
