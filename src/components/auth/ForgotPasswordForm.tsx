"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthField from "./AuthField";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "../Icons";
import {
  validateIdentifier,
  normalizePhone,
  maskIdentifier,
} from "@/lib/validation";

export default function ForgotPasswordForm() {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const toggleMode = () => {
    setMode((m) => (m === "email" ? "phone" : "email"));
    setIdentifier("");
    setError(undefined);
  };

  const sendCode = () => {
    const value =
      mode === "phone" ? normalizePhone(identifier) : identifier.trim();
    // No backend yet — a real app would request an OTP / reset link here.
    console.log("Send reset code to", { via: mode, value });
    setSent(true);
    setCooldown(30);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateIdentifier(identifier, mode);
    setError(err);
    if (err) return;
    sendCode();
  };

  if (sent) {
    const Icon = mode === "phone" ? PhoneIcon : MailIcon;
    return (
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy-500/10 text-navy-500">
          <Icon className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-lg font-bold text-navy-800">
          Check your {mode}
        </h3>
        <p className="mt-1.5 text-sm text-muted">
          We sent a 6-digit reset code to{" "}
          <span className="font-semibold text-navy-700">
            {maskIdentifier(identifier, mode)}
          </span>
          . Enter it on the next step to reset your password.
        </p>

        <Link
          href="/reset-password"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
        >
          Enter reset code
          <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
        </Link>

        <p className="mt-4 text-sm text-muted">
          Didn&apos;t get it?{" "}
          {cooldown > 0 ? (
            <span className="text-navy-400">Resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={sendCode}
              className="font-semibold text-navy-600 transition hover:text-gold-600"
            >
              Resend code
            </button>
          )}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 text-sm font-semibold text-muted transition hover:text-navy-700"
        >
          Use a different {mode === "email" ? "email" : "number"}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <AuthField
        label={mode === "email" ? "Email address" : "Phone number"}
        value={identifier}
        onChange={(v) => {
          setIdentifier(v);
          if (error) setError(undefined);
        }}
        placeholder={mode === "email" ? "you@example.com" : "+1 555 000 1234"}
        autoComplete={mode === "email" ? "email" : "tel"}
        inputMode={mode === "email" ? "email" : "tel"}
        type={mode === "email" ? "email" : "tel"}
        icon="mail"
        mode={mode}
        onToggleMode={toggleMode}
        error={error}
      />

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
      >
        Send reset code
        <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </form>
  );
}
