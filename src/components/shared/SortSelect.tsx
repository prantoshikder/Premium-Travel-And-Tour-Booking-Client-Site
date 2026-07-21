"use client";

import Select, { type SelectOption } from "./Select";

export type { SelectOption };

/** Toolbar sort control — the shared `Select` with the sort defaults applied. */
export default function SortSelect<T extends string>({
  label = "Sort by",
  value,
  options,
  onChange,
  className = "",
}: {
  label?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <Select
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      variant="pill"
      align="right"
      className={className}
      triggerClassName="min-w-[11.5rem]"
    />
  );
}
