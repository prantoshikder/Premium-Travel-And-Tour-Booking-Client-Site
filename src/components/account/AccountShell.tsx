"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "../auth/Avatar";
import Footer from "../Footer";
import { LogoutIcon } from "../Icons";
import Navbar from "../Navbar";
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
    <div className="flex min-h-screen flex-col bg-navy-50/40">
      {/* No hero here, so the site navbar renders with its solid backdrop. */}
      <Navbar />

      <div className="container-x grid flex-1 gap-6 pt-28 pb-10 sm:pt-32 lg:grid-cols-[260px_1fr] lg:gap-8">
        {/* Sidebar */}
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          {/* User card */}
          <div className="flex items-center gap-3 rounded-2xl border border-navy-50 bg-white p-3.5 shadow-soft sm:p-4">
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
              className="hidden shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 lg:mt-2 lg:flex lg:border-t lg:border-navy-50"
            >
              <LogoutIcon className="h-4.5 w-4.5" />
              <span className="whitespace-nowrap">Log out</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
