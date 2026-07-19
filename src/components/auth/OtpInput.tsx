"use client";

import { useRef } from "react";

type OtpInputProps = {
  /** Current value, a string of up to `length` digits. */
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
};

export default function OtpInput({
  value,
  onChange,
  length = 6,
  error,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").slice(0, length);

  const setDigit = (index: number, digit: string) => {
    const arr = value.split("");
    arr[index] = digit;
    onChange(arr.join("").slice(0, length));
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    setDigit(index, digit);
    if (index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        setDigit(index, "");
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
        setDigit(index - 1, "");
      }
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1)
      refs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-between gap-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={`Digit ${i + 1}`}
          className={`h-12 w-full min-w-0 rounded-xl border bg-navy-50/40 text-center text-lg font-bold text-navy-800 outline-none transition focus:bg-white focus:ring-4 sm:h-14 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-navy-100 focus:border-navy-500 focus:ring-navy-500/10"
          }`}
        />
      ))}
    </div>
  );
}
