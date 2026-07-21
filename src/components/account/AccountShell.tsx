"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "../auth/Avatar";
import { ArrowRightIcon, LogoutIcon, PlaneIcon } from "../Icons";
import { accountNav } from "./nav";

export default function AccountShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-navy-50/40">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-navy-50 bg-white/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-navy-800">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-500 text-navy-800">
              <PlaneIcon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              travel<span className="text-gold-600">perk</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
          >
            Back to site
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </div>
      </header>

      <div className="container-x grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {/* User card */}
          <div className="flex items-center gap-3 rounded-2xl border border-navy-50 bg-white p-4 shadow-soft">
            <Avatar user={user} className="h-12 w-12 text-sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy-800">
                {user.name}
              </p>
              <p className="truncate text-xs text-muted">{user.contact}</p>
            </div>
          </div>

          {/* Nav — vertical on desktop, horizontal scroll on mobile */}
          <nav className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {accountNav.map(({ label, href, Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-navy-500 text-white shadow-sm"
                      : "text-navy-700 hover:bg-white"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 lg:mt-2 lg:border-t lg:border-navy-50"
            >
              <LogoutIcon className="h-4.5 w-4.5" />
              <span className="whitespace-nowrap">Log out</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
