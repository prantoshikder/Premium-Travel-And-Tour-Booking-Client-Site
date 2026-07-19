"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import PageHeader from "@/components/account/PageHeader";
import { LockIcon, LogoutIcon } from "@/components/Icons";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-teal-500" : "bg-navy-100"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-navy-50 bg-white p-6 shadow-soft">
      <h3 className="text-base font-bold text-navy-800">{title}</h3>
      <div className="mt-4 divide-y divide-navy-50">{children}</div>
    </section>
  );
}

function Row({
  title,
  desc,
  control,
}: {
  title: string;
  desc: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy-800">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{desc}</p>
      </div>
      {control}
    </div>
  );
}

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [notif, setNotif] = useState({
    deals: true,
    bookings: true,
    sms: false,
    newsletter: true,
  });
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  const selectClass =
    "rounded-xl border border-navy-100 bg-navy-50/40 px-3 py-2 text-sm font-semibold text-navy-800 outline-none transition focus:border-navy-500 focus:bg-white focus:ring-4 focus:ring-navy-500/10";

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Control your notifications, preferences, and account security."
      />

      <div className="space-y-6">
        {/* Notifications */}
        <Section title="Notifications">
          <Row
            title="Exclusive deals"
            desc="Get notified about member-only offers and discounts."
            control={
              <Toggle
                checked={notif.deals}
                onChange={(v) => setNotif((s) => ({ ...s, deals: v }))}
              />
            }
          />
          <Row
            title="Booking updates"
            desc="Reminders and changes about your trips."
            control={
              <Toggle
                checked={notif.bookings}
                onChange={(v) => setNotif((s) => ({ ...s, bookings: v }))}
              />
            }
          />
          <Row
            title="SMS alerts"
            desc="Important updates sent to your phone."
            control={
              <Toggle
                checked={notif.sms}
                onChange={(v) => setNotif((s) => ({ ...s, sms: v }))}
              />
            }
          />
          <Row
            title="Newsletter"
            desc="Travel tips and inspiration in your inbox."
            control={
              <Toggle
                checked={notif.newsletter}
                onChange={(v) => setNotif((s) => ({ ...s, newsletter: v }))}
              />
            }
          />
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <Row
            title="Language"
            desc="The language used across TravelPerk."
            control={
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={selectClass}
              >
                {["English", "বাংলা", "Español", "Français"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            }
          />
          <Row
            title="Currency"
            desc="Prices are shown in this currency."
            control={
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={selectClass}
              >
                {["USD", "EUR", "GBP", "BDT"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            }
          />
        </Section>

        {/* Security */}
        <Section title="Security">
          <Row
            title="Password"
            desc="Change the password used to sign in."
            control={
              <Link
                href="/forgot-password"
                className="flex items-center gap-1.5 rounded-full border border-navy-200 px-4 py-2 text-xs font-semibold text-navy-700 transition hover:bg-navy-50"
              >
                <LockIcon className="h-4 w-4" />
                Change
              </Link>
            }
          />
        </Section>

        {/* Danger zone */}
        <section className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
          <h3 className="text-base font-bold text-red-600">Danger zone</h3>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-navy-800">
                Log out of this device
              </p>
              <p className="mt-0.5 text-xs text-muted">
                You&apos;ll need to sign in again to access your account.
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <LogoutIcon className="h-4 w-4" />
              Log out
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
