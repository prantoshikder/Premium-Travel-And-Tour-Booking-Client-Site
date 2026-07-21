"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
        <p className="text-sm font-medium text-muted">Taking you back…</p>
      </div>
    </div>
  );
}

/**
 * The mirror of AuthGuard: sign-in, register and password pages make no sense
 * for someone already signed in, so send them on instead. Honours `?next=` so
 * a half-finished flow (booking → login) still lands where it meant to.
 */
export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <RedirectIfSignedIn>{children}</RedirectIfSignedIn>
    </Suspense>
  );
}

function RedirectIfSignedIn({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const next = params.get("next");
  const destination = next?.startsWith("/") ? next : "/";

  useEffect(() => {
    if (ready && user) router.replace(destination);
  }, [ready, user, router, destination]);

  // Still restoring the session, or redirecting a signed-in visitor.
  if (!ready || user) return <FullScreenLoader />;

  return <>{children}</>;
}
