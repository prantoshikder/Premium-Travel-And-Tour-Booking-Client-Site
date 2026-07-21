"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "./Icons";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧", rtl: false },
  { code: "bn", label: "Bangla", native: "বাংলা", flag: "🇧🇩", rtl: false },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸", rtl: false },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷", rtl: false },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦", rtl: true },
] as const;

const STORAGE_KEY = "tp_lang";

/** Language switcher. `inline` renders it open inside the mobile drawer. */
export default function LocalePicker({
  dark = true,
  inline = false,
}: {
  dark?: boolean;
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  // Restore on the client only — localStorage isn't available on the server.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    if (saved && LANGUAGES.some((l) => l.code === saved)) setCode(saved);
  }, []);

  // Keep the document in sync so screen readers, hyphenation and RTL follow.
  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.code === code);
    if (!lang) return;
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.rtl ? "rtl" : "ltr";
  }, [code]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
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

  const select = (next: string) => {
    setCode(next);
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  };

  const active = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

  const options = (
    <div className="p-1.5">
      {LANGUAGES.map((l) => {
        const selected = l.code === active.code;
        return (
          <button
            key={l.code}
            role="menuitemradio"
            aria-checked={selected}
            onClick={() => select(l.code)}
            className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${
              selected ? "bg-navy-50" : "hover:bg-navy-50/60"
            }`}
          >
            <span className="text-base leading-none">{l.flag}</span>
            <span className="min-w-0 flex-1">
              <span
                className={`block truncate text-sm ${
                  selected
                    ? "font-bold text-navy-800"
                    : "font-medium text-navy-700"
                }`}
              >
                {l.native}
              </span>
              <span className="block truncate text-[11px] text-muted">
                {l.label}
              </span>
            </span>
            {selected && (
              <CheckIcon className="h-4 w-4 shrink-0 text-navy-500" />
            )}
          </button>
        );
      })}
    </div>
  );

  // Inside the mobile drawer the list is always visible — no popover needed.
  if (inline) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white">
        <p className="border-b border-navy-50 bg-navy-50/50 px-4 py-2.5 text-[11px] font-bold tracking-wider text-muted uppercase">
          Language
        </p>
        <div className="max-h-64 overflow-y-auto">{options}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language — ${active.label}`}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
          dark
            ? "text-white/90 hover:bg-white/10 hover:text-gold-400"
            : "text-navy-700 hover:bg-navy-50"
        } ${open ? (dark ? "bg-white/10" : "bg-navy-50") : ""}`}
      >
        <GlobeIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{active.native}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        role="menu"
        className={`absolute right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-[0_20px_60px_-20px_rgba(10,24,54,0.4)] transition-all duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {options}
      </div>
    </div>
  );
}
