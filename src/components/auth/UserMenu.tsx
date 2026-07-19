"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import Avatar from "./Avatar";
import {
  UserIcon,
  TicketIcon,
  HeartIcon,
  SlidersIcon,
  LogoutIcon,
  ChevronDownIcon,
} from "../Icons";

const menuItems = [
  { label: "My Profile", href: "/account/profile", Icon: UserIcon },
  { label: "My Bookings", href: "/account/bookings", Icon: TicketIcon },
  { label: "Wishlist", href: "/account/wishlist", Icon: HeartIcon },
  { label: "Settings", href: "/account/settings", Icon: SlidersIcon },
];

export default function UserMenu({ dark = true }: { dark?: boolean }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition ${
          dark ? "hover:bg-white/10" : "hover:bg-navy-50"
        }`}
      >
        <Avatar user={user} className="h-9 w-9 text-xs" />
        <span
          className={`hidden text-sm font-semibold sm:block ${
            dark ? "text-white" : "text-navy-800"
          }`}
        >
          {user.name.split(" ")[0]}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""} ${
            dark ? "text-white/70" : "text-muted"
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        role="menu"
        className={`absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-[0_20px_60px_-20px_rgba(10,24,54,0.4)] transition-all duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-navy-50 bg-navy-50/40 px-4 py-3.5">
          <Avatar user={user} className="h-11 w-11 text-sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-navy-800">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.contact}</p>
          </div>
        </div>

        {/* Links */}
        <nav className="p-1.5">
          {menuItems.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
            >
              <Icon className="h-4.5 w-4.5 text-navy-500" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-navy-50 p-1.5">
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogoutIcon className="h-4.5 w-4.5" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
