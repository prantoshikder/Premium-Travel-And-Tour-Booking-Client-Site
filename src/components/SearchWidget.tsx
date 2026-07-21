"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "./shared/Select";
import {
  PlaneIcon,
  HotelIcon,
  CompassIcon,
  CameraIcon,
  PassportIcon,
  SearchIcon,
} from "./Icons";

type FieldDef = {
  name: string;
  label: string;
  type: "text" | "date" | "number" | "select";
  placeholder?: string;
  options?: string[];
  min?: number;
  /** Hide the field for certain trip types (flights only). */
  hideFor?: string[];
};

type TabDef = {
  id: string;
  label: string;
  icon: typeof PlaneIcon;
  href: string;
  cta: string;
  /** Radio row shown above the fields. */
  modes?: string[];
  fields: FieldDef[];
};

const TABS: TabDef[] = [
  {
    id: "flights",
    label: "Flights",
    icon: PlaneIcon,
    href: "/flights",
    cta: "Search Flights",
    modes: ["One Way", "Round Trip", "Multi City"],
    fields: [
      { name: "from", label: "From", type: "text", placeholder: "New York (NYC)" },
      { name: "to", label: "To", type: "text", placeholder: "Paris (PAR)" },
      { name: "depart", label: "Depart", type: "date" },
      {
        name: "return",
        label: "Return",
        type: "date",
        hideFor: ["One Way", "Multi City"],
      },
      { name: "passengers", label: "Passengers", type: "number", min: 1 },
    ],
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: HotelIcon,
    href: "/hotels",
    cta: "Search Hotels",
    fields: [
      {
        name: "destination",
        label: "Destination",
        type: "text",
        placeholder: "City, area or hotel",
      },
      { name: "checkin", label: "Check-in", type: "date" },
      { name: "checkout", label: "Check-out", type: "date" },
      { name: "guests", label: "Guests", type: "number", min: 1 },
      { name: "rooms", label: "Rooms", type: "number", min: 1 },
    ],
  },
  {
    id: "tours",
    label: "Tours",
    icon: CompassIcon,
    href: "/tours",
    cta: "Find Tours",
    fields: [
      {
        name: "destination",
        label: "Destination",
        type: "text",
        placeholder: "Where to?",
      },
      {
        name: "category",
        label: "Experience",
        type: "select",
        options: ["Any", "Beach", "Adventure", "Cultural", "Family", "Luxury", "City"],
      },
      { name: "date", label: "Start date", type: "date" },
      { name: "travellers", label: "Travellers", type: "number", min: 1 },
    ],
  },
  {
    id: "activities",
    label: "Activities",
    icon: CameraIcon,
    href: "/activities",
    cta: "Find Activities",
    fields: [
      {
        name: "destination",
        label: "Where",
        type: "text",
        placeholder: "City or landmark",
      },
      { name: "date", label: "Date", type: "date" },
      {
        name: "duration",
        label: "Duration",
        type: "select",
        options: ["Any", "Up to 3 hours", "Half day", "Full day", "Multi-day"],
      },
      { name: "people", label: "People", type: "number", min: 1 },
    ],
  },
  {
    id: "visa",
    label: "Visa",
    icon: PassportIcon,
    href: "/visa",
    cta: "Check Requirements",
    fields: [
      {
        name: "nationality",
        label: "Passport from",
        type: "text",
        placeholder: "Bangladesh",
      },
      {
        name: "country",
        label: "Travelling to",
        type: "text",
        placeholder: "United Kingdom",
      },
      {
        name: "purpose",
        label: "Visa type",
        type: "select",
        options: ["Tourist", "Business", "Student", "Work", "Family visit"],
      },
      { name: "date", label: "Travel date", type: "date" },
    ],
  },
];

/** Static classes so Tailwind can see them at build time. */
const COLS: Record<number, string> = {
  3: "lg:grid-cols-[1fr_1fr_1fr_auto]",
  4: "lg:grid-cols-[1fr_1fr_1fr_1fr_auto]",
  5: "lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]",
};

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export default function SearchWidget() {
  const router = useRouter();
  const [active, setActive] = useState("flights");
  const [mode, setMode] = useState("Round Trip");
  // Values are namespaced per tab (`hotels.checkin`) so switching tabs keeps them.
  const [values, setValues] = useState<Record<string, string>>({});

  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  // Sensible defaults, set on the client so SSR and hydration agree.
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setValues((prev) => ({
      "flights.depart": addDays(7),
      "flights.return": addDays(14),
      "flights.passengers": "1",
      "hotels.checkin": addDays(7),
      "hotels.checkout": addDays(10),
      "hotels.guests": "2",
      "hotels.rooms": "1",
      "tours.date": addDays(14),
      "tours.travellers": "2",
      "tours.category": "Any",
      "activities.date": addDays(7),
      "activities.duration": "Any",
      "activities.people": "2",
      "visa.purpose": "Tourist",
      "visa.date": addDays(30),
      ...prev,
    }));
  }, []);

  const fields = useMemo(
    () => tab.fields.filter((f) => !(tab.modes && f.hideFor?.includes(mode))),
    [tab, mode]
  );

  const setValue = (key: string, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const handleSearch = () => {
    const params = new URLSearchParams();
    for (const f of fields) {
      const v = values[`${tab.id}.${f.name}`];
      if (v) params.set(f.name, v);
    }
    if (tab.modes) params.set("trip", mode);
    router.push(`${tab.href}?${params.toString()}`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-3 shadow-[0_30px_80px_-30px_rgba(10,24,54,0.5)] sm:p-4">
      {/* Tabs */}
      <div
        className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-navy-50 px-1 pb-3"
        role="tablist"
      >
        {TABS.map((t) => {
          const Ico = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition sm:px-4 ${
                isActive
                  ? "bg-navy-500 text-white shadow"
                  : "text-muted hover:bg-navy-50 hover:text-navy-600"
              }`}
            >
              <Ico className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Trip type — flights only */}
      {tab.modes && (
        <div
          className="flex flex-wrap items-center gap-5 px-3 pt-4"
          role="radiogroup"
          aria-label="Trip type"
        >
          {tab.modes.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-navy-700"
            >
              <span
                className={`grid h-4 w-4 place-items-center rounded-full border-2 transition ${
                  mode === m ? "border-gold-500" : "border-navy-200"
                }`}
              >
                {mode === m && (
                  <span className="h-2 w-2 rounded-full bg-gold-500" />
                )}
              </span>
              {m}
            </button>
          ))}
        </div>
      )}

      {/* Fields for the active tab */}
      <div
        className={`mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-navy-50 sm:grid-cols-2 ${
          COLS[fields.length] ?? COLS[5]
        }`}
      >
        {fields.map((f) => {
          const key = `${tab.id}.${f.name}`;
          return (
            <div key={key} className="bg-white">
              <Field
                id={key}
                def={f}
                value={values[key] ?? ""}
                onChange={(v) => setValue(key, v)}
              />
            </div>
          );
        })}

        <div className="grid place-items-center bg-white p-2">
          <button
            onClick={handleSearch}
            className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-4 text-sm font-bold text-navy-800 transition hover:bg-gold-400"
          >
            <SearchIcon className="h-4 w-4" strokeWidth={2.4} />
            <span className="whitespace-nowrap">{tab.cta}</span>
          </button>
        </div>
      </div>

      {tab.id === "flights" && mode === "Multi City" && (
        <p className="px-3 pt-3 text-xs text-muted">
          Multi-city: search your first leg, then add more flights on the results
          page.
        </p>
      )}
    </div>
  );
}

function Field({
  id,
  def,
  value,
  onChange,
}: {
  id: string;
  def: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputClass =
    "w-full bg-transparent text-sm font-semibold text-navy-800 outline-none placeholder:font-medium placeholder:text-muted/70";

  return (
    <div className="flex flex-col gap-1 px-4 py-3 text-left">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-wide text-muted"
      >
        {def.label}
      </label>

      {def.type === "select" ? (
        <Select
          id={id}
          ariaLabel={def.label}
          value={value || (def.options?.[0] ?? "")}
          onChange={onChange}
          options={(def.options ?? []).map((o) => ({ value: o, label: o }))}
          variant="ghost"
          size="sm"
          block
          triggerClassName="-ml-1.5 py-0.5 text-sm font-semibold text-navy-800"
        />
      ) : (
        <input
          id={id}
          type={def.type}
          min={def.min}
          value={value}
          placeholder={def.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );
}
