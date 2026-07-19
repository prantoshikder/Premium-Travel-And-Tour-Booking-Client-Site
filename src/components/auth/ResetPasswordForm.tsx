"use client";

import { useState } from "react";
import Link from "next/link";
import AuthField from "./AuthField";
import OtpInput from "./OtpInput";
import PasswordStrength from "./PasswordStrength";
import { ArrowRightIcon, CheckIcon } from "../Icons";
import {
  validateOtp,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validation";

type Errors = {
  otp?: string;
  password?: string;
  confirm?: string;
};

export default function ResetPasswordForm() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      otp: validateOtp(otp),
      password: validatePassword(password),
      confirm: validateConfirmPassword(password, confirm),
    };
    setErrors(next);
    if (next.otp || next.password || next.confirm) return;
    // No backend yet — a real app would submit { otp, password } here.
    console.log("Reset password", { otp });
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal-500 text-white">
          <CheckIcon className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <h3 className="mt-4 text-lg font-bold text-navy-800">Password reset!</h3>
        <p className="mt-1 text-sm text-muted">
          Your password has been updated. You can now sign in with your new
          password.
        </p>
        <Link
          href="/login"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
        >
          Back to sign in
          <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy-800">
          Verification code
        </label>
        <OtpInput
          value={otp}
          onChange={(v) => {
            setOtp(v);
            if (errors.otp) setErrors((p) => ({ ...p, otp: undefined }));
          }}
          error={!!errors.otp}
        />
        {errors.otp && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{errors.otp}</p>
        )}
      </div>

      <div>
        <AuthField
          label="New password"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
          }}
          placeholder="Create a new password"
          autoComplete="new-password"
          icon="lock"
          error={errors.password}
        />
        <PasswordStrength value={password} />
      </div>

      <AuthField
        label="Confirm password"
        type="password"
        value={confirm}
        onChange={(v) => {
          setConfirm(v);
          if (errors.confirm) setErrors((p) => ({ ...p, confirm: undefined }));
        }}
        placeholder="Re-enter your new password"
        autoComplete="new-password"
        icon="lock"
        error={errors.confirm}
      />

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 hover:shadow-lg"
      >
        Reset password
        <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </form>
  );
}
