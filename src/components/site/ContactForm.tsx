"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "../Icons";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet — a real app would POST the message here.
    console.log("Contact message", form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass =
    "w-full rounded-xl border border-navy-100 bg-navy-50/40 px-4 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-muted/70 focus:border-navy-500 focus:bg-white focus:ring-4 focus:ring-navy-500/10";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy-50 bg-white p-6 shadow-soft sm:p-8"
    >
      <h2 className="text-lg font-bold text-navy-800">Send us a message</h2>
      <p className="mt-1 text-sm text-muted">
        We usually reply within a few hours.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy-800">
            Full name
          </label>
          <input required value={form.name} onChange={set("name")} placeholder="John Doe" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy-800">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-navy-800">
          Subject
        </label>
        <input value={form.subject} onChange={set("subject")} placeholder="How can we help?" className={inputClass} />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-navy-800">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          placeholder="Write your message…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
        >
          Send message
          <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
        </button>
        {sent && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600">
            <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
            Message sent!
          </span>
        )}
      </div>
    </form>
  );
}
