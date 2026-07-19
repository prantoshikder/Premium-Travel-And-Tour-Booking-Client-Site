"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import Avatar from "@/components/auth/Avatar";
import PageHeader from "@/components/account/PageHeader";
import { CheckIcon, CameraIcon } from "@/components/Icons";

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-navy-100 bg-navy-50/40 px-4 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-muted/70 focus:border-navy-500 focus:bg-white focus:ring-4 focus:ring-navy-500/10"
      />
    </div>
  );
}

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(
    user?.via === "email" ? user.contact : ""
  );
  const [phone, setPhone] = useState(user?.via === "phone" ? user.contact : "");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      ...user,
      name: name.trim() || user.name,
      contact: user.via === "email" ? email.trim() || user.contact : phone.trim() || user.contact,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information and how we can reach you."
      />

      {/* Profile banner */}
      <div className="overflow-hidden rounded-2xl border border-navy-50 bg-white shadow-soft">
        <div className="h-24 bg-gradient-to-r from-navy-800 to-navy-600" />
        <div className="flex flex-wrap items-end gap-4 px-6 pb-5">
          <div className="relative -mt-10">
            <Avatar user={user} className="h-20 w-20 text-xl ring-4 ring-white" />
            <button
              type="button"
              aria-label="Change photo"
              className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-navy-500 text-white transition hover:bg-navy-600"
            >
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-1 min-w-0">
            <h2 className="truncate text-lg font-bold text-navy-800">{user.name}</h2>
            <p className="truncate text-sm text-muted">{user.contact}</p>
          </div>
          <span className="mb-1 ml-auto inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-600">
            Gold Member
          </span>
        </div>
      </div>

      {/* Edit form */}
      <form
        onSubmit={handleSave}
        className="mt-6 rounded-2xl border border-navy-50 bg-white p-6 shadow-soft"
      >
        <h3 className="text-base font-bold text-navy-800">Personal information</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
          <Field label="Country" value={country} onChange={setCountry} placeholder="e.g. Bangladesh" />
          <Field
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />
          <Field
            label="Phone number"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="+880 1XXXXXXXXX"
          />
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-semibold text-navy-800">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell us a little about your travel style…"
            className="w-full resize-none rounded-xl border border-navy-100 bg-navy-50/40 px-4 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-muted/70 focus:border-navy-500 focus:bg-white focus:ring-4 focus:ring-navy-500/10"
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
          >
            Save changes
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600">
              <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
              Saved!
            </span>
          )}
        </div>
      </form>
    </>
  );
}
