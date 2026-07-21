"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthField from "./AuthField";
import { ArrowRightIcon } from "../Icons";
import { useAuth } from "@/lib/auth";
import {
  validateIdentifier,
  validatePassword,
  normalizePhone,
  nameFromIdentifier,
} from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

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

    const value =
      mode === "phone" ? normalizePhone(identifier) : identifier.trim();
    // No backend yet — sign the user in locally and send them on their way.
    login({ name: nameFromIdentifier(value, mode), contact: value, via: mode });
    const dest = new URLSearchParams(window.location.search).get("next");
    router.push(dest && dest.startsWith("/") ? dest : "/");
  };

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
