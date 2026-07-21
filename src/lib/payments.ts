/**
 * Payment method catalogue + the input formatting/validation rules each one needs.
 *
 * Rule of thumb followed here: a merchant site never asks for a wallet PIN or
 * OTP. Those are entered on the provider's own page after a redirect, so we only
 * collect what identifies the payer (account number, email, card details).
 */

export type PayField = {
  name: string;
  label: string;
  placeholder?: string;
  help?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  maxLength?: number;
  /** Reformats as the user types (masking). */
  format?: (raw: string) => string;
  /** Returns an error message, or undefined when valid. */
  validate?: (value: string) => string | undefined;
  /** Span the full width of the two-column grid. */
  full?: boolean;
};

export type PayMethod = {
  key: string;
  label: string;
  hint: string;
  badge: string;
  badgeClass: string;
  /** Shown under the header once selected. */
  summary: string;
  fields: PayField[];
  /** Extra reassurance shown below the fields. */
  note?: string;
  /** True when the payer finishes on the provider's page. */
  redirect?: boolean;
};

/* ------------------------------------------------------------------ helpers */

const digits = (v: string) => v.replace(/\D/g, "");

const required = (label: string) => (v: string) =>
  v.trim() ? undefined : `${label} is required`;

export function formatCardNumber(raw: string) {
  const d = digits(raw).slice(0, 19);
  // Amex groups as 4-6-5, everything else as 4-4-4-4.
  if (/^3[47]/.test(d)) {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)]
      .filter(Boolean)
      .join(" ");
  }
  return d.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(raw: string) {
  const d = digits(raw).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function formatPhone(raw: string) {
  const d = digits(raw).slice(0, 11);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)} ${d.slice(5)}`;
}

/** Standard checksum every card issuer uses — catches most typos instantly. */
export function luhn(number: string) {
  const d = digits(number);
  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = Number(d[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return d.length >= 13 && sum % 10 === 0;
}

export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

export function cardBrand(number: string): CardBrand {
  const d = digits(number);
  if (/^4/.test(d)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "mastercard";
  if (/^3[47]/.test(d)) return "amex";
  if (/^6(011|5)/.test(d)) return "discover";
  return "unknown";
}

export const brandLabel: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  unknown: "Card",
};

const validateEmail = (v: string) =>
  !v.trim()
    ? "Email is required"
    : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? undefined
      : "Enter a valid email address";

/** Bangladeshi mobile wallets all use an 11-digit 01XXXXXXXXX number. */
const validateBdMobile = (v: string) => {
  const d = digits(v);
  if (!d) return "Account number is required";
  if (d.length !== 11) return "Enter the full 11-digit number";
  if (!/^01[3-9]/.test(d)) return "Numbers start with 013–019";
  return undefined;
};

const mobileField = (brand: string): PayField => ({
  name: "account",
  label: `${brand} account number`,
  placeholder: "01XXX XXXXXX",
  help: `The mobile number registered with your ${brand} account.`,
  autoComplete: "tel",
  inputMode: "tel",
  maxLength: 12,
  format: formatPhone,
  validate: validateBdMobile,
  full: true,
});

const walletEmailField = (brand: string): PayField => ({
  name: "email",
  label: `${brand} account email`,
  placeholder: "you@example.com",
  autoComplete: "email",
  inputMode: "email",
  validate: validateEmail,
  full: true,
});

/* ------------------------------------------------------------------ catalogue */

export const PAYMENT_GROUPS: { title: string; methods: PayMethod[] }[] = [
  {
    title: "Cards",
    methods: [
      {
        key: "card",
        label: "Credit / Debit card",
        hint: "Visa · Mastercard · Amex",
        badge: "CARD",
        badgeClass: "bg-navy-500 text-white",
        summary: "Charged instantly. 3-D Secure may ask you to confirm.",
        fields: [
          {
            name: "number",
            label: "Card number",
            placeholder: "1234 5678 9012 3456",
            autoComplete: "cc-number",
            inputMode: "numeric",
            maxLength: 23,
            format: formatCardNumber,
            validate: (v) =>
              !v.trim()
                ? "Card number is required"
                : luhn(v)
                  ? undefined
                  : "Check the card number — a digit looks wrong",
            full: true,
          },
          {
            name: "holder",
            label: "Name on card",
            placeholder: "As printed on the card",
            autoComplete: "cc-name",
            validate: required("Name on card"),
            full: true,
          },
          {
            name: "expiry",
            label: "Expiry date",
            placeholder: "MM/YY",
            autoComplete: "cc-exp",
            inputMode: "numeric",
            maxLength: 5,
            format: formatExpiry,
            validate: (v) => {
              const [mm, yy] = v.split("/");
              if (!mm || !yy || yy.length < 2) return "Use MM/YY";
              const month = Number(mm);
              if (month < 1 || month > 12) return "Month must be 01–12";
              const now = new Date();
              const exp = new Date(2000 + Number(yy), month, 0);
              return exp < now ? "This card has expired" : undefined;
            },
          },
          {
            name: "cvc",
            label: "Security code (CVC)",
            placeholder: "123",
            help: "3 digits on the back — 4 on the front for Amex.",
            autoComplete: "cc-csc",
            inputMode: "numeric",
            maxLength: 4,
            format: (v) => digits(v).slice(0, 4),
            validate: (v) =>
              digits(v).length >= 3 ? undefined : "Enter 3 or 4 digits",
          },
        ],
      },
    ],
  },
  {
    title: "Mobile banking · Bangladesh",
    methods: [
      {
        key: "bkash",
        label: "bKash",
        hint: "Most used wallet in BD",
        badge: "bK",
        badgeClass: "bg-[#e2136e] text-white",
        summary: "Confirm with your PIN on the bKash page.",
        fields: [mobileField("bKash")],
        note: "We never see your PIN or OTP — bKash asks for those on their own secure page.",
        redirect: true,
      },
      {
        key: "nagad",
        label: "Nagad",
        hint: "Instant, low fee",
        badge: "Ng",
        badgeClass: "bg-[#ec1c24] text-white",
        summary: "Confirm with your PIN on the Nagad page.",
        fields: [mobileField("Nagad")],
        note: "We never see your PIN or OTP — Nagad asks for those on their own secure page.",
        redirect: true,
      },
      {
        key: "rocket",
        label: "Rocket",
        hint: "Dutch-Bangla Bank",
        badge: "Rk",
        badgeClass: "bg-[#8c2b87] text-white",
        summary: "Confirm with your PIN on the Rocket page.",
        fields: [mobileField("Rocket")],
        note: "Enter the 11-digit mobile number only — the check digit is added by Rocket.",
        redirect: true,
      },
      {
        key: "upay",
        label: "Upay",
        hint: "UCB fintech wallet",
        badge: "Up",
        badgeClass: "bg-[#00a94f] text-white",
        summary: "Confirm with your PIN on the Upay page.",
        fields: [mobileField("Upay")],
        redirect: true,
      },
    ],
  },
  {
    title: "International wallets",
    methods: [
      {
        key: "paypal",
        label: "PayPal",
        hint: "Buyer protection included",
        badge: "PP",
        badgeClass: "bg-[#003087] text-white",
        summary: "Log in to PayPal to approve the payment.",
        fields: [walletEmailField("PayPal")],
        redirect: true,
      },
      {
        key: "wise",
        label: "Wise",
        hint: "Best rate for currency swap",
        badge: "Wi",
        badgeClass: "bg-[#9fe870] text-navy-800",
        summary: "Approve the transfer in your Wise account.",
        fields: [walletEmailField("Wise")],
        redirect: true,
      },
      {
        key: "alipay",
        label: "Alipay",
        hint: "Widely used across Asia",
        badge: "支",
        badgeClass: "bg-[#1677ff] text-white",
        summary: "Scan the Alipay QR to finish.",
        fields: [
          {
            name: "account",
            label: "Alipay account (email or phone)",
            placeholder: "you@example.com",
            validate: required("Alipay account"),
            full: true,
          },
        ],
        redirect: true,
      },
      {
        key: "apple",
        label: "Apple Pay",
        hint: "One tap with Face / Touch ID",
        badge: "Pay",
        badgeClass: "bg-navy-900 text-white",
        summary: "Nothing to type — confirm on your device.",
        fields: [],
        note: "Available in Safari on a signed-in Apple device.",
      },
      {
        key: "google",
        label: "Google Pay",
        hint: "Pay with a saved card",
        badge: "GP",
        badgeClass: "bg-[#1a73e8] text-white",
        summary: "Nothing to type — pick a card in the Google Pay sheet.",
        fields: [],
      },
    ],
  },
  {
    title: "Bank transfer",
    methods: [
      {
        key: "bank",
        label: "Bank transfer",
        hint: "Clears in 1 business day",
        badge: "BT",
        badgeClass: "bg-teal-500 text-white",
        summary: "Seats are held for 24 hours until the transfer clears.",
        fields: [
          {
            name: "holder",
            label: "Account holder name",
            placeholder: "Exactly as on your bank record",
            autoComplete: "name",
            validate: required("Account holder name"),
            full: true,
          },
          {
            name: "bank",
            label: "Bank name",
            placeholder: "e.g. BRAC Bank",
            validate: required("Bank name"),
            full: true,
          },
          {
            name: "account",
            label: "Account number",
            placeholder: "0000 0000 0000",
            inputMode: "numeric",
            maxLength: 20,
            validate: (v) =>
              digits(v).length >= 8 ? undefined : "Enter at least 8 digits",
          },
          {
            name: "swift",
            label: "SWIFT / Routing code",
            placeholder: "BRAKBDDH",
            help: "Found on your bank statement.",
            format: (v) => v.toUpperCase(),
            validate: required("SWIFT / Routing code"),
          },
        ],
      },
    ],
  },
];

export const ALL_METHODS = PAYMENT_GROUPS.flatMap((g) => g.methods);

export const findMethod = (key: string) =>
  ALL_METHODS.find((m) => m.key === key) ?? ALL_METHODS[0];

/** Contact details we need regardless of how the traveller pays. */
export const CONTACT_FIELDS: PayField[] = [
  {
    name: "email",
    label: "Email for e-ticket",
    placeholder: "you@example.com",
    autoComplete: "email",
    inputMode: "email",
    validate: validateEmail,
  },
  {
    name: "phone",
    label: "Mobile number",
    placeholder: "01XXX XXXXXX",
    help: "Used only for flight-change alerts.",
    autoComplete: "tel",
    inputMode: "tel",
    maxLength: 12,
    format: formatPhone,
    validate: (v) =>
      digits(v).length >= 10 ? undefined : "Enter a valid mobile number",
  },
];
