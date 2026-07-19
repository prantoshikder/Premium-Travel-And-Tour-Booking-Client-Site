"use client";

import { passwordStrength } from "@/lib/validation";

const colors = ["bg-navy-100", "bg-red-400", "bg-gold-500", "bg-teal-500", "bg-teal-600"];
const textColors = ["text-muted", "text-red-500", "text-gold-600", "text-teal-600", "text-teal-700"];

export default function PasswordStrength({ value }: { value: string }) {
  if (!value) return null;
  const { score, label } = passwordStrength(value);

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= score ? colors[score] : "bg-navy-100"
            }`}
          />
        ))}
      </div>
      <p className={`mt-1 text-xs font-medium ${textColors[score]}`}>
        {label && `Password strength: ${label}`}
      </p>
    </div>
  );
}
