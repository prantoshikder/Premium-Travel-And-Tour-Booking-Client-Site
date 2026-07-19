"use client";

import { useId, useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
} from "../Icons";

const icons = {
  mail: MailIcon,
  lock: LockIcon,
  user: UserIcon,
  phone: PhoneIcon,
} as const;

type AuthFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  icon: keyof typeof icons;
  autoComplete?: string;
  name?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  error?: string;
  /** When set, the field shows a button on the right to switch email ⇄ phone. */
  mode?: "email" | "phone";
  onToggleMode?: () => void;
};

export default function AuthField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
  autoComplete,
  name,
  inputMode,
  error,
  mode,
  onToggleMode,
}: AuthFieldProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  // In toggle mode the left icon mirrors the active field type.
  const LeftIcon = mode ? (mode === "phone" ? PhoneIcon : MailIcon) : icons[icon];
  const hasRightSlot = isPassword || !!mode;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-navy-800"
      >
        {label}
      </label>
      <div className="group relative flex items-center">
        <LeftIcon className="pointer-events-none absolute left-3.5 h-5 w-5 text-muted transition group-focus-within:text-navy-500" />
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={!!error}
          className={`w-full rounded-xl border bg-navy-50/40 py-3 pl-11 text-sm text-navy-800 outline-none transition placeholder:text-muted/70 focus:bg-white focus:ring-4 ${
            hasRightSlot ? "pr-12" : "pr-4"
          } ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-navy-100 focus:border-navy-500 focus:ring-navy-500/10"
          }`}
        />

        {/* Password visibility toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2.5 grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-navy-50 hover:text-navy-600"
          >
            {show ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}

        {/* Email ⇄ phone toggle: shows the icon of the OTHER mode */}
        {mode && onToggleMode && (
          <button
            type="button"
            onClick={onToggleMode}
            title={mode === "email" ? "Use phone number" : "Use email"}
            aria-label={mode === "email" ? "Switch to phone number" : "Switch to email"}
            className="absolute right-2.5 grid h-8 w-8 place-items-center rounded-lg text-navy-500 transition hover:bg-navy-50 hover:text-navy-700"
          >
            {mode === "email" ? (
              <PhoneIcon className="h-5 w-5" />
            ) : (
              <MailIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
