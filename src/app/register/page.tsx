import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account — TravelPerk",
  description:
    "Create your free TravelPerk account with your email or phone number and start booking trips with exclusive deals.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join TravelPerk and unlock exclusive travel deals today."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-navy-600 transition hover:text-gold-600"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
