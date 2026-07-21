"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { clearBooking, loadBooking, type PendingBooking } from "@/lib/booking";
import {
  CONTACT_FIELDS,
  PAYMENT_GROUPS,
  brandLabel,
  cardBrand,
  findMethod,
  type PayField,
} from "@/lib/payments";
import {
  CheckIcon,
  ClockIcon,
  LockIcon,
  PlaneIcon,
  ShieldIcon,
} from "../Icons";

type Values = Record<string, string>;

export default function CheckoutClient() {
  const { user } = useAuth();
  const [booking, setBooking] = useState<PendingBooking | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [method, setMethod] = useState("card");
  // Values are namespaced (`card.number`) so switching methods keeps what was typed.
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Values>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "processing" | "paid">("idle");

  const active = findMethod(method);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setBooking(loadBooking());
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Prefill contact details from the signed-in account.
  useEffect(() => {
    if (!user) return;
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setValues((prev) => ({
      ...prev,
      "contact.email":
        prev["contact.email"] ?? (user.via === "email" ? user.contact : ""),
      "contact.phone":
        prev["contact.phone"] ?? (user.via === "phone" ? user.contact : ""),
      "card.holder": prev["card.holder"] ?? user.name,
    }));
  }, [user]);

  /** Every field that must be valid for the current method. */
  const activeFields: { key: string; field: PayField }[] = useMemo(
    () => [
      ...CONTACT_FIELDS.map((f) => ({ key: `contact.${f.name}`, field: f })),
      ...active.fields.map((f) => ({ key: `${active.key}.${f.name}`, field: f })),
    ],
    [active]
  );

  const setValue = (key: string, field: PayField, raw: string) => {
    const next = field.format ? field.format(raw) : raw;
    setValues((prev) => ({ ...prev, [key]: next }));
    // Only clear errors while typing; never introduce new ones mid-keystroke.
    if (errors[key] && !field.validate?.(next)) {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest[key];
        return rest;
      });
    }
  };

  const validateField = (key: string, field: PayField) => {
    const message = field.validate?.(values[key] ?? "");
    setErrors((prev) => {
      if (message) return { ...prev, [key]: message };
      const rest = { ...prev };
      delete rest[key];
      return rest;
    });
    return message;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    const next: Values = {};
    for (const { key, field } of activeFields) {
      const message = field.validate?.(values[key] ?? "");
      if (message) next[key] = message;
    }
    setErrors(next);
    setTouched(Object.fromEntries(activeFields.map(({ key }) => [key, true])));

    const firstBad = activeFields.find(({ key }) => next[key]);
    if (firstBad) {
      document.getElementById(firstBad.key)?.focus();
      return;
    }

    // No gateway yet — simulate the round-trip so the button state reads true.
    setStatus("processing");
    setTimeout(() => {
      clearBooking();
      setStatus("paid");
    }, 1200);
  };

  if (!loaded) return null;

  if (!booking) {
    return (
      <div className="rounded-2xl border border-dashed border-navy-100 bg-white py-20 text-center">
        <p className="text-lg font-bold text-navy-800">Nothing to pay for yet</p>
        <p className="mt-1 text-sm text-muted">
          Pick a flight, tour or deal to start a booking.
        </p>
        <Link
          href="/flights"
          className="mt-5 inline-block rounded-full bg-navy-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-600"
        >
          Browse flights
        </Link>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div className="rounded-2xl border border-teal-500/30 bg-white px-6 py-16 text-center shadow-soft">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-500/10 text-teal-600">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-navy-800">
          Booking confirmed
        </h2>
        <p className="mt-1 text-sm text-muted">
          {booking.kind === "flight"
            ? `Seats ${booking.seats.join(", ")} on ${booking.airline} · ${booking.fromCity} → ${booking.toCity}`
            : `${booking.title} · ${booking.duration} · departing ${new Date(booking.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`}
        </p>
        <p className="mt-1 text-sm text-muted">
          Paid ${booking.total} with {active.label}. Your e-ticket is on its way
          to{" "}
          <span className="font-semibold text-navy-700">
            {values["contact.email"] || user?.contact}
          </span>
          .
        </p>
        <Link
          href="/account/bookings"
          className="mt-6 inline-block rounded-full bg-navy-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-600"
        >
          View my bookings
        </Link>
      </div>
    );
  }

  const busy = status === "processing";

  return (
    <>
      <Stepper />

      <form
        onSubmit={handlePay}
        className="grid gap-8 lg:grid-cols-[1fr_22rem]"
        noValidate
      >
        <div className="space-y-6">
          {/* 1 — Contact */}
          <section className="rounded-2xl border border-navy-50 bg-white p-6 shadow-soft">
            <SectionHead
              step={1}
              title="Contact details"
              subtitle="Where we send your e-ticket and any flight updates."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {CONTACT_FIELDS.map((f) => {
                const key = `contact.${f.name}`;
                return (
                  <Field
                    key={key}
                    id={key}
                    field={f}
                    value={values[key] ?? ""}
                    error={touched[key] ? errors[key] : undefined}
                    onChange={(v) => setValue(key, f, v)}
                    onBlur={() => {
                      setTouched((p) => ({ ...p, [key]: true }));
                      validateField(key, f);
                    }}
                  />
                );
              })}
            </div>
          </section>

          {/* 2 — Method */}
          <section className="rounded-2xl border border-navy-50 bg-white p-6 shadow-soft">
            <SectionHead
              step={2}
              title="How would you like to pay?"
              subtitle="Pick one — you only fill in what that method needs."
            />

            <div className="mt-5 space-y-5" role="radiogroup" aria-label="Payment method">
              {PAYMENT_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted">
                    {group.title}
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {group.methods.map((m) => {
                      const isActive = method === m.key;
                      return (
                        <label
                          key={m.key}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${
                            isActive
                              ? "border-navy-500 bg-navy-50/50 ring-4 ring-navy-500/10"
                              : "border-navy-100 bg-white hover:border-navy-200 hover:bg-navy-50/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value={m.key}
                            checked={isActive}
                            onChange={() => setMethod(m.key)}
                            className="h-4 w-4 shrink-0 accent-navy-500"
                          />
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-extrabold ${m.badgeClass}`}
                          >
                            {m.badge}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold text-navy-800">
                              {m.label}
                            </span>
                            <span className="block truncate text-xs text-muted">
                              {m.hint}
                            </span>
                          </span>
                          {isActive && (
                            <CheckIcon className="h-4 w-4 shrink-0 text-navy-500" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3 — Details for the chosen method */}
          <section className="rounded-2xl border border-navy-50 bg-white p-6 shadow-soft">
            <SectionHead
              step={3}
              title={`Pay with ${active.label}`}
              subtitle={active.summary}
            />

            {active.fields.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {active.fields.map((f) => {
                  const key = `${active.key}.${f.name}`;
                  const isCardNumber = active.key === "card" && f.name === "number";
                  const brand = isCardNumber
                    ? cardBrand(values[key] ?? "")
                    : "unknown";
                  return (
                    <Field
                      key={key}
                      id={key}
                      field={f}
                      value={values[key] ?? ""}
                      error={touched[key] ? errors[key] : undefined}
                      adornment={
                        isCardNumber && brand !== "unknown"
                          ? brandLabel[brand]
                          : undefined
                      }
                      onChange={(v) => setValue(key, f, v)}
                      onBlur={() => {
                        setTouched((p) => ({ ...p, [key]: true }));
                        validateField(key, f);
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-navy-50/50 px-4 py-3 text-sm text-navy-700">
                No details needed here — you&apos;ll confirm the payment on your
                device.
              </p>
            )}

            {active.note && (
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-teal-500/5 px-4 py-3 text-xs text-navy-700">
                <ShieldIcon className="mt-px h-4 w-4 shrink-0 text-teal-600" />
                {active.note}
              </p>
            )}

            {active.redirect && (
              <p className="mt-3 text-xs text-muted">
                After you press pay we&apos;ll open {active.label} to authorise
                the amount. Don&apos;t close this tab.
              </p>
            )}
          </section>

          <p className="flex items-center gap-2 text-xs text-muted">
            <LockIcon className="h-4 w-4 text-teal-600" />
            Secured with 256-bit TLS. We never store card numbers, PINs or OTPs.
          </p>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-navy-50 bg-white p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-navy-800">
            Order summary
          </h2>

          <div className="mt-4 flex items-center gap-3">
            {booking.kind === "flight" ? (
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-xl">
                {booking.logo}
              </span>
            ) : booking.image ? (
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={booking.image}
                  alt={booking.title}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
            ) : null}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy-800">
                {booking.kind === "flight" ? booking.airline : booking.title}
              </p>
              <p className="truncate text-xs text-muted">
                {booking.reference.toUpperCase()} ·{" "}
                {booking.kind === "flight" ? booking.stops : booking.duration}
              </p>
            </div>
          </div>

          {booking.kind === "package" && (
            <div className="mt-4 space-y-2 rounded-xl bg-navy-50/50 p-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted">Departure</span>
                <span className="font-semibold text-navy-800">
                  {new Date(booking.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Duration</span>
                <span className="font-semibold text-navy-800">
                  {booking.duration}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Travellers</span>
                <span className="font-semibold text-navy-800">
                  {booking.adults} {booking.adults > 1 ? "adults" : "adult"}
                  {booking.children > 0 &&
                    `, ${booking.children} ${booking.children > 1 ? "children" : "child"}`}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Rooms</span>
                <span className="font-semibold text-navy-800">{booking.rooms}</span>
              </div>
              {booking.savedAmount ? (
                <p className="inline-block rounded-md bg-gold-500/20 px-2 py-1 text-[11px] font-bold text-gold-600">
                  You save ${booking.savedAmount}
                </p>
              ) : null}
            </div>
          )}

          {booking.kind === "package" && booking.addOns.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted">Add-ons</p>
              <ul className="mt-1.5 space-y-1 text-sm text-navy-700">
                {booking.addOns.map((a) => (
                  <li key={a.name} className="flex justify-between gap-3">
                    <span>{a.name}</span>
                    <span className="font-semibold">
                      ${a.price} × {booking.guests}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {booking.kind === "flight" && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-navy-50/50 p-3">
            <div>
              <p className="text-base font-extrabold text-navy-800">
                {booking.depart}
              </p>
              <p className="text-[11px] text-muted">{booking.from}</p>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <span className="flex items-center gap-1 text-[10px] text-muted">
                <ClockIcon className="h-3 w-3" />
                {booking.duration}
              </span>
              <div className="my-1 flex w-full items-center gap-1">
                <span className="h-px flex-1 bg-navy-100" />
                <PlaneIcon className="h-3 w-3 text-navy-400" />
                <span className="h-px flex-1 bg-navy-100" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-extrabold text-navy-800">
                {booking.arrive}
              </p>
              <p className="text-[11px] text-muted">{booking.to}</p>
            </div>
          </div>
          )}

          {booking.kind === "flight" && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted">Seats</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {booking.seats.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-navy-50 px-2 py-1 text-[11px] font-bold text-navy-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <dl className="mt-5 space-y-2 border-t border-navy-50 pt-4 text-sm">
            <div className="flex justify-between text-navy-700">
              <dt>
                {booking.kind === "flight"
                  ? `Base fare · ${booking.seats.length} ${booking.seats.length > 1 ? "passengers" : "passenger"}`
                  : `Package · ${booking.guests} ${booking.guests > 1 ? "travellers" : "traveller"}`}
              </dt>
              <dd className="font-semibold">
                $
                {(booking.kind === "flight"
                  ? booking.baseFare * booking.seats.length
                  : booking.baseFare
                ).toLocaleString()}
              </dd>
            </div>
            {booking.seatFee > 0 && (
              <div className="flex justify-between text-navy-700">
                <dt>{booking.kind === "flight" ? "Seat upgrades" : "Add-ons"}</dt>
                <dd className="font-semibold">
                  ${booking.seatFee.toLocaleString()}
                </dd>
              </div>
            )}
            <div className="flex justify-between text-navy-700">
              <dt>Taxes & fees</dt>
              <dd className="font-semibold">${booking.taxes}</dd>
            </div>
            <div className="flex justify-between border-t border-navy-50 pt-2 text-navy-800">
              <dt className="font-bold">Total (USD)</dt>
              <dd className="text-xl font-extrabold">${booking.total}</dd>
            </div>
          </dl>

          <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-navy-50/60 px-3 py-2 text-[11px] text-muted">
            Paying with
            <span className="font-bold text-navy-700">{active.label}</span>
          </p>

          <button
            type="submit"
            disabled={busy}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-3.5 text-sm font-bold text-navy-800 shadow-md transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-800/30 border-t-navy-800" />
                Processing…
              </>
            ) : (
              <>
                <LockIcon className="h-4 w-4" />
                {active.redirect
                  ? `Continue to ${active.label}`
                  : `Pay $${booking.total}`}
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[11px] text-muted">
            Free cancellation within 24 hours · no hidden fees
          </p>
          <Link
            href="/flights"
            className="mt-2 block text-center text-xs font-semibold text-muted transition hover:text-navy-700"
          >
            Change flight
          </Link>
        </aside>
      </form>
    </>
  );
}

/* ------------------------------------------------------------------ pieces */

function Stepper() {
  const steps = ["Choose", "Trip details", "Payment"];
  return (
    <ol className="mb-8 flex items-center gap-2 text-xs font-semibold">
      {steps.map((s, i) => {
        const done = i < 2;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
                done
                  ? "bg-teal-500/10 text-teal-600"
                  : "bg-navy-500 text-white"
              }`}
            >
              {done ? (
                <CheckIcon className="h-3 w-3" />
              ) : (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-white/20 text-[10px]">
                  {i + 1}
                </span>
              )}
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="h-px w-4 bg-navy-100 sm:w-8" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function SectionHead({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-500 text-xs font-bold text-white">
        {step}
      </span>
      <div>
        <h2 className="text-base font-extrabold text-navy-800">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}

function Field({
  id,
  field,
  value,
  error,
  adornment,
  onChange,
  onBlur,
}: {
  id: string;
  field: PayField;
  value: string;
  error?: string;
  adornment?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const helpId = useId();
  const invalid = !!error;

  return (
    <div className={field.full ? "sm:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-semibold text-navy-700"
      >
        {field.label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={field.placeholder}
          inputMode={field.inputMode}
          autoComplete={field.autoComplete}
          maxLength={field.maxLength}
          aria-invalid={invalid}
          aria-describedby={field.help || error ? helpId : undefined}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-muted/60 focus:ring-4 ${
            invalid
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-navy-100 focus:border-navy-500 focus:ring-navy-500/10"
          } ${adornment ? "pr-24" : ""}`}
        />
        {adornment && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-navy-50 px-2 py-1 text-[10px] font-bold text-navy-600">
            {adornment}
          </span>
        )}
      </div>
      {(error || field.help) && (
        <p
          id={helpId}
          className={`mt-1 text-[11px] ${error ? "text-red-500" : "text-muted"}`}
          role={error ? "alert" : undefined}
        >
          {error ?? field.help}
        </p>
      )}
    </div>
  );
}
