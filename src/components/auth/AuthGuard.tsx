"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { PlaneIcon } from "../Icons";

function FullScreenLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy-50/40">
      <div className="flex flex-col items-center gap-4">
        <span className="relative grid h-14 w-14 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-navy-100 border-t-gold-500" />
          <PlaneIcon className="h-6 w-6 text-navy-500" strokeWidth={2} />
        </span>
        <p className="text-sm font-medium text-muted">Loading your account…</p>
      </div>
    </div>
  );
}

/**
 * Client-side route guard. Only renders children for a signed-in user; anyone
 * else is redirected to /login (with a ?next= back to where they were headed).
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, user, router, pathname]);

  // Still restoring the session, or redirecting an unauthenticated visitor.
  if (!ready || !user) return <FullScreenLoader />;

  return <>{children}</>;
}
