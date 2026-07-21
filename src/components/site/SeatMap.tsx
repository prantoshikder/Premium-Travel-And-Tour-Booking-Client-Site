"use client";

const ROWS = 12;
const LEFT = ["A", "B", "C"] as const;
const RIGHT = ["D", "E", "F"] as const;

export type SeatClass = {
  name: string;
  extra: number;
};

/** Rows 1–2 business, 3–5 extra legroom, rest standard economy. */
export function seatClassFor(row: number): SeatClass {
  if (row <= 2) return { name: "Business", extra: 120 };
  if (row <= 5) return { name: "Extra legroom", extra: 40 };
  return { name: "Economy", extra: 0 };
}

export function seatExtra(seat: string) {
  return seatClassFor(Number(seat.slice(0, -1))).extra;
}

/** Stable pseudo-random occupancy so a flight always shows the same map. */
function isTaken(flightId: string, seat: string) {
  let h = 0;
  for (const ch of `${flightId}-${seat}`) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return h % 10 < 3;
}

export default function SeatMap({
  flightId,
  selected,
  onToggle,
  max = 4,
}: {
  flightId: string;
  selected: string[];
  onToggle: (seat: string) => void;
  max?: number;
}) {
  const rows = Array.from({ length: ROWS }, (_, i) => i + 1);

  const renderSeat = (seat: string) => {
    const taken = isTaken(flightId, seat);
    const isSelected = selected.includes(seat);
    const cls = seatClassFor(Number(seat.slice(0, -1)));
    const full = !isSelected && selected.length >= max;

    return (
      <button
        key={seat}
        type="button"
        disabled={taken || full}
        onClick={() => onToggle(seat)}
        aria-pressed={isSelected}
        aria-label={`Seat ${seat} · ${cls.name}${
          taken ? " · unavailable" : cls.extra ? ` · +$${cls.extra}` : ""
        }`}
        title={`${seat} · ${cls.name}${cls.extra ? ` · +$${cls.extra}` : ""}`}
        className={`h-8 w-8 rounded-lg border text-[10px] font-bold transition ${
          taken
            ? "cursor-not-allowed border-navy-100 bg-navy-100 text-navy-200"
            : isSelected
              ? "border-navy-500 bg-navy-500 text-white shadow-sm"
              : cls.extra >= 120
                ? "border-gold-500/40 bg-gold-500/15 text-navy-700 hover:border-gold-500 hover:bg-gold-500/25"
                : cls.extra > 0
                  ? "border-teal-500/30 bg-teal-500/10 text-navy-700 hover:border-teal-500 hover:bg-teal-500/20"
                  : "border-navy-100 bg-white text-navy-600 hover:border-navy-500 hover:bg-navy-50"
        } ${full && !taken ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {seat}
      </button>
    );
  };

  return (
    <div>
      {/* Legend */}
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-navy-100 bg-white" />
          Economy
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-teal-500/30 bg-teal-500/10" />
          Legroom +$40
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-gold-500/40 bg-gold-500/15" />
          Business +$120
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-navy-100" />
          Taken
        </span>
      </div>

      <div className="rounded-2xl border border-navy-50 bg-navy-50/30 p-3">
        {/* Nose */}
        <div className="mx-auto mb-3 h-5 w-24 rounded-t-full border-x border-t border-navy-100 bg-white" />

        {/* Column headers */}
        <div className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-muted">
          {LEFT.map((c) => (
            <span key={c} className="w-8 text-center">
              {c}
            </span>
          ))}
          <span className="w-6" />
          {RIGHT.map((c) => (
            <span key={c} className="w-8 text-center">
              {c}
            </span>
          ))}
        </div>

        <div className="space-y-1.5">
          {rows.map((r) => (
            <div key={r} className="flex items-center justify-center gap-1.5">
              {LEFT.map((c) => renderSeat(`${r}${c}`))}
              <span className="w-6 text-center text-[10px] font-medium text-muted">
                {r}
              </span>
              {RIGHT.map((c) => renderSeat(`${r}${c}`))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 text-[11px] text-muted">
        Choose up to {max} seats · {selected.length} selected
      </p>
    </div>
  );
}
