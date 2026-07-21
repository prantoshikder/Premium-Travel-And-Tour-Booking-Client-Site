"use client";

import Image from "next/image";
import { useState } from "react";
import Drawer from "../Drawer";
import { CheckIcon, ClockIcon, ShieldIcon, UsersIcon } from "../Icons";
import { useDimension } from "@/hooks/useDimension";
import { CHILD_RATE } from "@/lib/booking";

export type PackageDetails = {
  date: string;
  adults: number;
  children: number;
  rooms: number;
  addOns: { name: string; price: number }[];
};

/** Optional extras, priced per traveller. */
const ADD_ONS = [
  { name: "Airport transfers", price: 35, hint: "Private car both ways" },
  { name: "Travel insurance", price: 25, hint: "Medical + cancellation cover" },
  { name: "Guided city tour", price: 45, hint: "Half day with a local guide" },
];

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

const TAXES_RATE = 0.14;

export default function PackageBookingDrawer({
  open,
  onClose,
  onConfirm,
  title,
  duration,
  price,
  image,
  savedAmount,
  confirmLabel,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (details: PackageDetails) => void;
  title: string;
  duration: string;
  price: number;
  image?: string;
  savedAmount?: number;
  confirmLabel: string;
}) {
  const { isMobile } = useDimension();
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [dateError, setDateError] = useState<string | undefined>();

  const guests = adults + children;
  const addOns = ADD_ONS.filter((a) => picked.includes(a.name)).map(
    ({ name, price: p }) => ({ name, price: p })
  );
  const baseFare = Math.round(price * adults + price * CHILD_RATE * children);
  const addOnTotal = addOns.reduce((sum, a) => sum + a.price * guests, 0);
  const taxes = Math.round((baseFare + addOnTotal) * TAXES_RATE);
  const total = baseFare + addOnTotal + taxes;

  const toggleAddOn = (name: string) =>
    setPicked((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const handleConfirm = () => {
    if (!date) {
      setDateError("Pick your departure date");
      document.getElementById("pkg-date")?.focus();
      return;
    }
    onConfirm({ date, adults, children, rooms, addOns });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      // A side panel needs width phones don't have — slide up instead.
      side={isMobile ? "bottom" : "right"}
      size={isMobile ? "92vh" : "26rem"}
      ariaLabel="Trip details"
      className={`flex flex-col ${isMobile ? "rounded-t-3xl" : ""}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-navy-50 p-6">
        <div className="min-w-0">
          <p className="eyebrow">Step 1 of 2 · Trip details</p>
          <h3 className="mt-1 truncate text-xl font-extrabold text-navy-800">
            {title}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-600 transition hover:bg-navy-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {/* Package */}
        <div className="flex items-center gap-3">
          {image && (
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <Image src={image} alt={title} fill sizes="56px" className="object-cover" />
            </span>
          )}
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <ClockIcon className="h-3.5 w-3.5" />
              {duration}
            </p>
            <p className="text-sm font-bold text-navy-800">
              ${price.toLocaleString()}{" "}
              <span className="font-medium text-muted">/ adult</span>
            </p>
            {savedAmount ? (
              <p className="mt-1 inline-block rounded-md bg-gold-500/20 px-2 py-0.5 text-[11px] font-bold text-gold-600">
                You save ${savedAmount}
              </p>
            ) : null}
          </div>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="pkg-date"
            className="mb-1.5 block text-sm font-bold text-navy-800"
          >
            Departure date
          </label>
          <input
            id="pkg-date"
            type="date"
            min={tomorrow()}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setDateError(undefined);
            }}
            aria-invalid={!!dateError}
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 outline-none transition focus:ring-4 ${
              dateError
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                : "border-navy-100 focus:border-navy-500 focus:ring-navy-500/10"
            }`}
          />
          {dateError && (
            <p role="alert" className="mt-1 text-[11px] text-red-500">
              {dateError}
            </p>
          )}
        </div>

        {/* Travellers */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-navy-800">
            <UsersIcon className="h-4 w-4" />
            Who&apos;s travelling
          </p>
          <div className="space-y-2">
            <Stepper
              label="Adults"
              hint="Age 12+"
              value={adults}
              min={1}
              max={12}
              onChange={setAdults}
            />
            <Stepper
              label="Children"
              hint={`Age 2–11 · ${Math.round(CHILD_RATE * 100)}% of adult price`}
              value={children}
              min={0}
              max={8}
              onChange={setChildren}
            />
            <Stepper
              label="Rooms"
              hint="Twin or double occupancy"
              value={rooms}
              min={1}
              max={6}
              onChange={setRooms}
            />
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <p className="mb-1 text-sm font-bold text-navy-800">Add to your trip</p>
          <p className="mb-2 text-xs text-muted">Optional — priced per traveller.</p>
          <div className="space-y-2">
            {ADD_ONS.map((a) => {
              const on = picked.includes(a.name);
              return (
                <button
                  key={a.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleAddOn(a.name)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                    on
                      ? "border-navy-500 bg-navy-50/60 ring-4 ring-navy-500/10"
                      : "border-navy-100 bg-white hover:border-navy-200 hover:bg-navy-50/40"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
                      on
                        ? "border-navy-500 bg-navy-500 text-white"
                        : "border-navy-200 bg-white"
                    }`}
                  >
                    {on && <CheckIcon className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-navy-800">
                      {a.name}
                    </span>
                    <span className="block text-[11px] text-muted">{a.hint}</span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-navy-800">
                    +${a.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="mb-2 text-sm font-bold text-navy-800">Price breakdown</p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-navy-700">
              <dt>
                Package · {adults} {adults > 1 ? "adults" : "adult"}
                {children > 0 && `, ${children} ${children > 1 ? "children" : "child"}`}
              </dt>
              <dd className="font-semibold">${baseFare.toLocaleString()}</dd>
            </div>
            {addOns.length > 0 && (
              <div className="flex justify-between text-navy-700">
                <dt>Add-ons · {guests} travellers</dt>
                <dd className="font-semibold">${addOnTotal.toLocaleString()}</dd>
              </div>
            )}
            <div className="flex justify-between text-navy-700">
              <dt>Taxes & fees</dt>
              <dd className="font-semibold">${taxes.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between border-t border-navy-50 pt-2 text-navy-800">
              <dt className="font-bold">Total</dt>
              <dd className="text-lg font-extrabold">${total.toLocaleString()}</dd>
            </div>
          </dl>
        </div>

        <p className="flex items-start gap-2 rounded-xl bg-teal-500/5 px-4 py-3 text-xs text-navy-700">
          <ShieldIcon className="mt-px h-4 w-4 shrink-0 text-teal-600" />
          Free cancellation within 24 hours. You won&apos;t be charged until the
          next step.
        </p>
      </div>

      <div className="border-t border-navy-50 p-6">
        <button
          onClick={handleConfirm}
          className="w-full rounded-full bg-navy-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-600"
        >
          {confirmLabel} · ${total.toLocaleString()}
        </button>
      </div>
    </Drawer>
  );
}

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-navy-100 bg-white p-3">
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-navy-800">{label}</span>
        <span className="block text-[11px] text-muted">{hint}</span>
      </span>
      <span className="flex shrink-0 items-center gap-3">
        <RoundButton
          label={`Remove one ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          −
        </RoundButton>
        <span className="w-5 text-center text-sm font-bold text-navy-800">
          {value}
        </span>
        <RoundButton
          label={`Add one ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          +
        </RoundButton>
      </span>
    </div>
  );
}

function RoundButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-7 w-7 place-items-center rounded-full border border-navy-200 text-sm font-bold text-navy-700 transition hover:border-navy-500 hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
