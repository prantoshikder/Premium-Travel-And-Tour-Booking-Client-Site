"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import { PlaneIcon, GlobeIcon, ChevronDownIcon, LogoutIcon } from "./Icons";
import Drawer from "./Drawer";
import { useAuth } from "@/lib/auth";
import UserMenu from "./auth/UserMenu";
import Avatar from "./auth/Avatar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-800/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-500 text-navy-800">
            <PlaneIcon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            travel<span className="text-gold-400">perk</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition hover:text-gold-400 ${
                    active ? "text-gold-400" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="hidden items-center gap-4 lg:flex">
          <button className="flex items-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-gold-400">
            <GlobeIcon className="h-4 w-4" />
            English / USD
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </button>
          {user ? (
            <UserMenu dark />
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white/90 transition hover:text-gold-400"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded bg-white transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-white transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-white transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu drawer (opens from the left) */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side="left"
        size="18rem"
        ariaLabel="Main menu"
        className="flex flex-col bg-navy-800 text-white"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-white"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-500 text-navy-800">
              <PlaneIcon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              travel<span className="text-gold-400">perk</span>
            </span>
          </a>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/10 hover:text-gold-400 ${
                      active ? "bg-white/10 text-gold-400" : "text-white/90"
                    }`}
                  >
                    {link.label}
                    <ChevronDownIcon className="h-3.5 w-3.5 -rotate-90 text-white/40" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer actions */}
        <div className="space-y-3 border-t border-white/10 p-5">
          <button className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10">
            <GlobeIcon className="h-4 w-4" />
            English / USD
          </button>
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                <Avatar user={user} className="h-10 w-10 text-xs" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">{user.name}</p>
                  <p className="truncate text-xs text-white/60">{user.contact}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <LogoutIcon className="h-4 w-4" />
                Log out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gold-500 px-4 py-3 text-center text-sm font-semibold text-navy-800 transition hover:bg-gold-400"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  );
}
