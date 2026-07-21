"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "../Icons";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  hint?: string;
};

type Props<T extends string> = {
  label?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

export default function SortSelect<T extends string>({
  label = "Sort by",
  value,
  options,
  onChange,
  className = "",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      options.findIndex((o) => o.value === value),
    ),
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  const pick = (v: T) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (
      !open &&
      (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
    ) {
      e.preventDefault();
      setActive(
        Math.max(
          0,
          options.findIndex((o) => o.value === value),
        ),
      );
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(options[active].value);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    }
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-muted whitespace-nowrap">
          {label}
        </span>
      )}

      <div ref={wrapRef} className="relative" onKeyDown={onKeyDown}>
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          className={`group flex w-full min-w-47.5 items-center justify-between gap-3 rounded-full border bg-white py-2.5 pl-4 pr-3 text-sm font-semibold text-navy-800 shadow-soft transition-all duration-200 outline-none hover:border-navy-200 hover:shadow-card ${
            open ? "border-navy-500 ring-4 ring-navy-500/10" : "border-navy-100"
          }`}
        >
          <span className="truncate">{selected?.label}</span>
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-all duration-200 ${
              open
                ? "rotate-180 bg-navy-500 text-white"
                : "bg-navy-50 text-navy-500 group-hover:bg-navy-100"
            }`}
          >
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </span>
        </button>

        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-activedescendant={`${listId}-${active}`}
            className="absolute right-0 z-30 mt-2 w-full min-w-55 origin-top overflow-hidden rounded-2xl border border-navy-100 bg-white p-1.5 shadow-card animate-fade-up [animation-duration:180ms]"
          >
            {options.map((o, i) => {
              const isSelected = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => pick(o.value)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? "bg-navy-50" : "bg-transparent"
                    } ${
                      isSelected
                        ? "font-bold text-navy-800"
                        : "font-medium text-navy-700"
                    }`}
                  >
                    <span className="flex flex-col">
                      <span>{o.label}</span>
                      {o.hint && (
                        <span className="text-[11px] font-normal text-muted">
                          {o.hint}
                        </span>
                      )}
                    </span>
                    {isSelected && (
                      <CheckIcon className="h-4 w-4 shrink-0 text-navy-500" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
