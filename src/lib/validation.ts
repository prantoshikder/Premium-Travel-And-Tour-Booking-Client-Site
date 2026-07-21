export type IdentifierKind = "email" | "phone" | "empty" | "invalid";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Optional leading +, then 7–15 digits (spaces, dashes, parens ignored).
const PHONE_RE = /^\+?\d{7,15}$/;

/** Normalize a phone string by stripping spaces, dashes, dots and parens. */
export function normalizePhone(value: string) {
  return value.replace(/[\s\-.()]/g, "");
}

/**
 * Detect whether the user is typing an email or a phone number, so the UI can
 * react (icon, keyboard hint) before the value is fully valid.
 */
export function detectKind(value: string): IdentifierKind {
  const v = value.trim();
  if (!v) return "empty";
  // Any letter or "@" means they're heading toward an email.
  if (/[a-zA-Z@]/.test(v)) return "email";
  // Otherwise it's digits / phone punctuation.
  return "phone";
}

/**
 * Validate the identifier. Pass a mode ("email" | "phone") to validate strictly
 * against that type; omit it to auto-detect. Returns an error string or "".
 */
export function validateIdentifier(
  value: string,
  mode?: "email" | "phone"
): string {
  const v = value.trim();
  const kind = mode ?? detectKind(v);

  if (kind === "email") {
    if (!v) return "Email address is required.";
    return EMAIL_RE.test(v) ? "" : "Enter a valid email address.";
  }
  if (!v) return "Phone number is required.";
  return PHONE_RE.test(normalizePhone(v))
    ? ""
    : "Enter a valid phone number (7–15 digits).";
}

export function validateName(value: string): string {
  if (!value.trim()) return "Full name is required.";
  return value.trim().length >= 2 ? "" : "Please enter your full name.";
}

export function validatePassword(value: string): string {
  if (!value) return "Password is required.";
  return value.length >= 6 ? "" : "Password must be at least 6 characters.";
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): string {
  if (!confirm) return "Please confirm your password.";
  return password === confirm ? "" : "Passwords do not match.";
}

export function validateOtp(value: string): string {
  if (!value) return "Enter the 6-digit code.";
  return /^\d{6}$/.test(value) ? "" : "The code must be 6 digits.";
}

export type Strength = { score: 0 | 1 | 2 | 3 | 4; label: string };

/** Rough password strength for a visual meter (not a security guarantee). */
export function passwordStrength(value: string): Strength {
  if (!value) return { score: 0, label: "" };
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;
  const s = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return { score: s, label: labels[s] };
}

/** Derive a friendly display name when we only have an email/phone (e.g. login). */
export function nameFromIdentifier(
  value: string,
  mode: "email" | "phone"
): string {
  if (mode === "email") {
    const local = value.split("@")[0] || "Traveler";
    const cleaned = local.replace(/[._-]+/g, " ").trim();
    return cleaned
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  }
  return "Traveler";
}

/** Mask an email/phone for confirmation messages, e.g. jo•••@mail.com. */
export function maskIdentifier(value: string, mode: "email" | "phone"): string {
  const v = value.trim();
  if (mode === "email") {
    const [user, domain] = v.split("@");
    if (!domain) return v;
    const head = user.slice(0, 2);
    return `${head}${"•".repeat(Math.max(user.length - 2, 1))}@${domain}`;
  }
  const digits = normalizePhone(v);
  const tail = digits.slice(-3);
  return `${"•".repeat(Math.max(digits.length - 3, 0))}${tail}`;
}
