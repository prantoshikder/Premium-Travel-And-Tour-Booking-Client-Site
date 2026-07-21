"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthField from "./AuthField";
import { ArrowRightIcon } from "../Icons";
import { useAuth } from "@/lib/auth";
import {
  validateIdentifier,
  validateName,
  validatePassword,
  normalizePhone,
} from "@/lib/validation";

type Errors = {
  name?: string;
  identifier?: string;
  password?: string;
  terms?: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const toggleMode = () => {
    setMode((m) => (m === "email" ? "phone" : "email"));
    setIdentifier("");
    setErrors((e) => ({ ...e, identifier: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      name: validateName(name),
      identifier: validateIdentifier(identifier, mode),
      password: validatePassword(password),
      terms: agreed ? "" : "Please accept the terms to continue.",
    };
    setErrors(next);
    if (next.name || next.identifier || next.password || next.terms) return;

    const value =
      mode === "phone" ? normalizePhone(identifier) : identifier.trim();
    // No backend yet — create the session locally and send them on their way.
    login({ name: name.trim(), contact: value, via: mode });
    const dest = new URLSearchParams(window.location.search).get("next");
    router.push(dest && dest.startsWith("/") ? dest : "/");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <AuthField
        label="Full name"
        value={name}
        onChange={(v) => {
          setName(v);
          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        placeholder="John Doe"
        autoComplete="name"
        icon="user"
        error={errors.name}
      />
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
        placeholder="Create a password (min 6 chars)"
        autoComplete="new-password"
        icon="lock"
        error={errors.password}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-sm text-navy-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (errors.terms)
                setErrors((prev) => ({ ...prev, terms: undefined }));
            }}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy-200 accent-navy-500"
          />
          <span>
            I agree to the{" "}
            <Link
              href="#"
              className="font-semibold text-navy-600 hover:text-gold-600"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="font-semibold text-navy-600 hover:text-gold-600"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.terms && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.terms}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
      >
        Create Account
        <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </form>
  );
}
