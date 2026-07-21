"use client";

import PageHeader from "@/components/account/PageHeader";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { CheckIcon, LockIcon, LogoutIcon } from "@/components/Icons";
import Select from "@/components/shared/Select";
import { useAuth } from "@/lib/auth";
import { validateConfirmPassword, validatePassword } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
          checked ? "left-5.5" : "left-0.5"
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
    <section className="rounded-2xl border border-navy-50 bg-white p-4 shadow-soft sm:p-6">
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
    <div className="flex flex-col items-start gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy-800">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{desc}</p>
      </div>
      {control}
    </div>
  );
}

/** Inline password change — no page hop, so the rest of Settings stays in view. */
function ChangePassword({ onDone }: { onDone: () => void }) {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const set = (key: keyof typeof values, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => {
      const rest = { ...prev };
      delete rest[key];
      return rest;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.current) next.current = "Enter your current password";
    const passwordError = validatePassword(values.next);
    if (passwordError) next.next = passwordError;
    else if (values.next === values.current)
      next.next = "Pick a password you haven't used here before";
    const confirmError = validateConfirmPassword(values.next, values.confirm);
    if (confirmError) next.confirm = confirmError;

    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`pw-${Object.keys(next)[0]}`)?.focus();
      return;
    }

    // No backend yet — show the same states a real save would.
    setStatus("saving");
    setTimeout(() => {
      setStatus("saved");
      setTimeout(onDone, 1600);
    }, 900);
  };

  if (status === "saved") {
    return (
      <div className="animate-fade-up mt-4 flex items-center gap-2 rounded-xl bg-teal-500/10 px-4 py-3 text-sm font-semibold text-teal-600 [animation-duration:200ms]">
        <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
        Password updated. Use it the next time you sign in.
      </div>
    );
  }

  return (
    <form
      id="password-form"
      onSubmit={handleSubmit}
      className="mt-4 rounded-2xl border border-navy-100 bg-navy-50/40 p-4 sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordField
          id="pw-current"
          label="Current password"
          value={values.current}
          onChange={(v) => set("current", v)}
          error={errors.current}
          show={show}
          autoComplete="current-password"
          className="sm:col-span-2"
        />
        <div>
          <PasswordField
            id="pw-next"
            label="New password"
            value={values.next}
            onChange={(v) => set("next", v)}
            error={errors.next}
            show={show}
            autoComplete="new-password"
          />
          <PasswordStrength value={values.next} />
        </div>
        <PasswordField
          id="pw-confirm"
          label="Confirm new password"
          value={values.confirm}
          onChange={(v) => set("confirm", v)}
          error={errors.confirm}
          show={show}
          autoComplete="new-password"
        />
      </div>

      <label className="mt-4 flex w-fit cursor-pointer items-center gap-2 text-xs font-medium text-navy-700">
        <input
          type="checkbox"
          checked={show}
          onChange={(e) => setShow(e.target.checked)}
          className="h-4 w-4 rounded border-navy-200 accent-navy-500"
        />
        Show passwords
      </label>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-navy-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "saving" ? "Updating…" : "Update password"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-full px-4 py-2.5 text-sm font-semibold text-muted transition hover:text-navy-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  show,
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  show: boolean;
  autoComplete: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-navy-800"
      >
        {label}
      </label>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        placeholder="••••••••"
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-navy-800 transition outline-none placeholder:text-muted/60 focus:ring-4 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
            : "border-navy-100 focus:border-navy-500 focus:ring-navy-500/10"
        }`}
      />
      {error && (
        <p role="alert" className="mt-1 text-[11px] text-red-500">
          {error}
        </p>
      )}
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
  const [changingPassword, setChangingPassword] = useState(false);
  // Bumped on every open so the form starts empty, without flickering on close.
  const [passwordFormKey, setPasswordFormKey] = useState(0);

  const togglePasswordForm = () => {
    if (!changingPassword) setPasswordFormKey((k) => k + 1);
    setChangingPassword((v) => !v);
  };

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
              <Select
                value={language}
                onChange={setLanguage}
                align="right"
                variant="field"
                options={[
                  { value: "English", label: "English", lead: "🇬🇧" },
                  {
                    value: "বাংলা",
                    label: "বাংলা",
                    hint: "Bangla",
                    lead: "🇧🇩",
                  },
                  {
                    value: "Español",
                    label: "Español",
                    hint: "Spanish",
                    lead: "🇪🇸",
                  },
                  {
                    value: "Français",
                    label: "Français",
                    hint: "French",
                    lead: "🇫🇷",
                  },
                ]}
              />
            }
          />
          <Row
            title="Currency"
            desc="Prices are shown in this currency."
            control={
              <Select
                value={currency}
                onChange={setCurrency}
                align="right"
                variant="field"
                options={[
                  { value: "USD", label: "USD", hint: "US Dollar", lead: "$" },
                  { value: "EUR", label: "EUR", hint: "Euro", lead: "€" },
                  {
                    value: "GBP",
                    label: "GBP",
                    hint: "Pound Sterling",
                    lead: "£",
                  },
                  {
                    value: "BDT",
                    label: "BDT",
                    hint: "Bangladeshi Taka",
                    lead: "৳",
                  },
                ]}
              />
            }
          />
        </Section>

        {/* Security */}
        <Section title="Security">
          <Row
            title="Password"
            desc={
              changingPassword
                ? "Enter your current password, then pick a new one."
                : "Change the password used to sign in."
            }
            control={
              <button
                type="button"
                onClick={togglePasswordForm}
                aria-expanded={changingPassword}
                aria-controls="password-form"
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  changingPassword
                    ? "border-navy-500 bg-navy-500 text-white hover:bg-navy-600"
                    : "border-navy-200 text-navy-700 hover:bg-navy-50"
                }`}
              >
                <LockIcon className="h-4 w-4" />
                {changingPassword ? "Cancel" : "Change"}
              </button>
            }
          />

          {/* grid-rows 0fr → 1fr animates the real height, so it slides open. */}
          <div
            inert={!changingPassword}
            aria-hidden={!changingPassword}
            className={`grid transition-all duration-300 ease-out ${
              changingPassword
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <ChangePassword
                key={passwordFormKey}
                onDone={() => setChangingPassword(false)}
              />
            </div>
          </div>
        </Section>

        {/* Danger zone */}
        <section className="rounded-2xl border border-red-200 bg-red-50/40 p-4 sm:p-6">
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
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 sm:w-auto sm:py-2.5"
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
