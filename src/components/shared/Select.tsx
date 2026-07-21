"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "../Icons";

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
  /** Secondary line under the label, in the list only. */
  hint?: string;
  /** Emoji, flag or short mark shown before the label. */
  lead?: React.ReactNode;
  disabled?: boolean;
};

export type SelectProps<T extends string> = {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  /** Text before the control (rendered inline, e.g. "Sort by"). */
  label?: string;
  /** Shown when nothing matches `value`. */
  placeholder?: string;
  /** `pill` for toolbars, `field` for forms, `ghost` for tight rows. */
  variant?: "pill" | "field" | "ghost";
  size?: "sm" | "md";
  /** Stretch the trigger to the container width. */
  block?: boolean;
  /** Which edge the popover lines up with. */
  align?: "left" | "right";
  disabled?: boolean;
  name?: string;
  /** Put this on the trigger so an external <label htmlFor> can point at it. */
  id?: string;
  ariaLabel?: string;
  className?: string;
  /** Extra classes for the trigger button. */
  triggerClassName?: string;
};

const TRIGGER_BASE =
  "flex items-center justify-between gap-2 font-semibold text-navy-800 outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS = {
  pill: "rounded-full border bg-white shadow-soft hover:shadow-card",
  field: "rounded-xl border bg-navy-50/40 hover:bg-white",
  ghost: "rounded-lg border border-transparent bg-transparent hover:bg-navy-50",
} as const;

const SIZES = {
  sm: "py-1.5 pl-3 pr-2 text-xs",
  md: "py-2.5 pl-4 pr-3 text-sm",
} as const;

/**
 * The project's single dropdown. Native `<select>` can't be styled consistently
 * across browsers, so this renders an accessible listbox instead: full keyboard
 * support, click-outside/Escape to close, and a hidden input for form posts.
 */
export default function Select<T extends string>({
  value,
  options,
  onChange,
  label,
  placeholder = "Select…",
  variant = "pill",
  size = "md",
  block = false,
  align = "left",
  disabled = false,
  name,
  id,
  ariaLabel,
  className = "",
  triggerClassName = "",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const selectedIndex = options.findIndex((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  const openList = () => {
    setActiveIndex(Math.max(0, selectedIndex));
    setOpen(true);
  };

  const pick = (option: SelectOption<T>) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  /** Skip disabled options when arrowing through the list. */
  const step = (from: number, delta: number) => {
    const n = options.length;
    for (let i = 1; i <= n; i++) {
      const next = (from + delta * i + n * i) % n;
      if (!options[next].disabled) return next;
    }
    return from;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        openList();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => step(i, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => step(i, -1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(step(-1, 1));
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(step(0, -1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(options[activeIndex]);
        break;
    }
  };

  return (
    <div
      className={`flex items-center gap-2.5 ${block ? "w-full" : ""} ${className}`}
    >
      {label && (
        <span className="whitespace-nowrap text-sm font-medium text-muted">
          {label}
        </span>
      )}

      <div
        ref={wrapRef}
        onKeyDown={onKeyDown}
        className={`relative ${block ? "w-full" : ""}`}
      >
        {name && <input type="hidden" name={name} value={value} />}

        <button
          type="button"
          id={id}
          role="combobox"
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openList())}
          className={`group ${TRIGGER_BASE} ${VARIANTS[variant]} ${SIZES[size]} ${
            block ? "w-full" : "min-w-36"
          } ${
            variant === "ghost"
              ? open
                ? "bg-navy-50"
                : ""
              : open
                ? "border-navy-500 ring-4 ring-navy-500/10"
                : "border-navy-100 hover:border-navy-200"
          } ${triggerClassName}`}
        >
          <span className="flex min-w-0 items-center gap-2">
            {selected?.lead}
            <span className={`truncate ${selected ? "" : "text-muted"}`}>
              {selected?.label ?? placeholder}
            </span>
          </span>
          <span
            className={`grid shrink-0 place-items-center rounded-full transition-all duration-200 ${
              size === "sm" ? "h-5 w-5" : "h-6 w-6"
            } ${
              open
                ? "rotate-180 bg-navy-500 text-white"
                : "bg-navy-50 text-navy-500 group-hover:bg-navy-100"
            }`}
          >
            <ChevronDownIcon
              className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"}
            />
          </span>
        </button>

        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-activedescendant={`${listId}-${activeIndex}`}
            className={`absolute z-50 mt-2 max-h-72 min-w-full origin-top overflow-y-auto rounded-2xl border border-navy-50 bg-white p-1.5 shadow-[0_20px_60px_-20px_rgba(10,24,54,0.4)] animate-fade-up [animation-duration:180ms] ${
              align === "right" ? "right-0" : "left-0"
            } ${block ? "w-full" : "w-max max-w-[min(20rem,90vw)]"}`}
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
                    disabled={o.disabled}
                    onMouseEnter={() => !o.disabled && setActiveIndex(i)}
                    onClick={() => pick(o)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      i === activeIndex && !o.disabled
                        ? "bg-navy-50"
                        : "bg-transparent"
                    } ${
                      isSelected
                        ? "font-bold text-navy-800"
                        : "font-medium text-navy-700"
                    }`}
                  >
                    {o.lead}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{o.label}</span>
                      {o.hint && (
                        <span className="block truncate text-[11px] font-normal text-muted">
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
