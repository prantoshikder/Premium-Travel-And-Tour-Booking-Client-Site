import type { Metadata } from "next";
import AuthGuard from "@/components/auth/AuthGuard";
import AccountShell from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "My Account — TravelPerk",
  robots: { index: false, follow: false },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AccountShell>{children}</AccountShell>
    </AuthGuard>
  );
}
