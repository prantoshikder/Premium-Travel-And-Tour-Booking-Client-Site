"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { PlaneIcon, GlobeIcon, ChevronDownIcon } from "./Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        <a href="#home" className="flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-500 text-navy-800">
            <PlaneIcon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            travel<span className="text-gold-400">perk</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group flex items-center gap-1 text-sm font-medium text-white/90 transition hover:text-gold-400"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDownIcon className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden items-center gap-4 lg:flex">
          <button className="flex items-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-gold-400">
            <GlobeIcon className="h-4 w-4" />
            English / USD
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg">
            Sign In
          </button>
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

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="container-x mt-4 flex flex-col gap-1 rounded-2xl bg-navy-800/95 p-4 backdrop-blur">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-gold-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <button className="w-full rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-800">
              Sign In
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
