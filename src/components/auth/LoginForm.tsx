"use client";

import { useState } from "react";
import Link from "next/link";
import AuthField from "./AuthField";
import { ArrowRightIcon, CheckIcon } from "../Icons";
import {
  validateIdentifier,
  validatePassword,
  normalizePhone,
} from "@/lib/validation";

export default function LoginForm() {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>(
    {}
  );
  const [done, setDone] = useState(false);

  const toggleMode = () => {
    setMode((m) => (m === "email" ? "phone" : "email"));
    setIdentifier("");
    setErrors((e) => ({ ...e, identifier: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      identifier: validateIdentifier(identifier, mode),
      password: validatePassword(password),
    };
    setErrors(next);
    if (next.identifier || next.password) return;

    const value = mode === "phone" ? normalizePhone(identifier) : identifier.trim();
    // No backend yet — surface the parsed payload so the flow is verifiable.
    console.log("Login with", { via: mode, value });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal-500 text-white">
          <CheckIcon className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <h3 className="mt-4 text-lg font-bold text-navy-800">You&apos;re all set!</h3>
        <p className="mt-1 text-sm text-muted">
          Signing you in via your {mode === "phone" ? "phone number" : "email"}.
        </p>
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
          if (errors.identifier)
            setErrors((prev) => ({ ...prev, identifier: undefined }));
        }}
        placeholder={mode === "email" ? "you@example.com" : "+1 555 000 1234"}
        autoComplete={mode === "email" ? "email" : "tel"}
        inputMode={mode === "email" ? "email" : "tel"}
        type={mode === "email" ? "email" : "tel"}
        icon="mail"
        mode={mode}
        onToggleMode={toggleMode}
        error={errors.identifier}
      />
      <AuthField
        label="Password"
        type="password"
        value={password}
        onChange={(v) => {
          setPassword(v);
          if (errors.password)
            setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        placeholder="Enter your password"
        autoComplete="current-password"
        icon="lock"
        error={errors.password}
      />

      <div className="flex items-center justify-between pt-1">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-navy-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-navy-200 accent-navy-500"
          />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-navy-600 transition hover:text-gold-600"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
      >
        Sign In
        <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </form>
  );
}
