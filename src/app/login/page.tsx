import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — TravelPerk",
  description:
    "Sign in to your TravelPerk account with your email or phone number to manage bookings and unlock exclusive deals.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue planning your next adventure."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-navy-600 transition hover:text-gold-600"
          >
            Create one
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
