import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function PlaneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.6.6 0 0 0-.6 1l4.5 2.7-3 3H3.2a.6.6 0 0 0-.4 1L5 18l1.1 2.2a.6.6 0 0 0 1-.4v-2.5l3-3 2.7 4.5a.6.6 0 0 0 1-.6Z" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.6 13.8 12 22.4a1.5 1.5 0 0 1-2.1 0L2 14.5a1.5 1.5 0 0 1-.4-1V3.5A1.5 1.5 0 0 1 3 2h9.9c.4 0 .8.2 1 .4l6.6 6.6a1.5 1.5 0 0 1 0 2.1Z" />
      <circle cx="7" cy="7" r="1.4" />
    </svg>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" />
      <path d="M4 15a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Z" />
      <path d="M20 17v1a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.3a3 3 0 0 1 0 5.4" />
      <path d="M18 14a6 6 0 0 1 3 5" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function BeachIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4a8 8 0 0 0-8 7h16a8 8 0 0 0-8-7Z" />
      <path d="M12 4v16" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function MountainIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 19 6-11 4 6 2-3 6 8Z" />
      <circle cx="17" cy="6" r="1.6" />
    </svg>
  );
}

export function LandmarkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 3 8h18Z" />
      <path d="M5 11v7M9.5 11v7M14.5 11v7M19 11v7" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function FamilyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="6" r="2.4" />
      <circle cx="17" cy="6" r="2.4" />
      <path d="M4 21v-4a3 3 0 0 1 6 0v4M14 21v-4a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export function CrownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7l4 4 5-6 5 6 4-4-2 12H5Z" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8v10M3 13h18v5M21 18v-3a3 3 0 0 0-3-3H9v1" />
      <circle cx="7" cy="11" r="1.6" />
    </svg>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M18 18h2" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="15" cy="18" r="2" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V4M4 20h16" />
      <path d="m7 15 3-4 3 3 4-6" />
    </svg>
  );
}

export function TicketIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" />
      <path d="M12 6v2M12 12v2M12 16v2" />
    </svg>
  );
}

export function TeamIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 21a6 6 0 0 1 12 0" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5 15 8.6l6.8 1-4.9 4.7 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8L2.2 9.6l6.8-1Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

export function HotelIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M9 21v-4h6v4M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 5-4 1 2-5Z" />
    </svg>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export function PassportIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.6" />
      <path d="M9 16h6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.6 3H4.5A1.5 1.5 0 0 0 3 4.6c0 8.2 6.6 14.8 14.8 14.8a1.5 1.5 0 0 0 1.5-1.5v-2.1a1.5 1.5 0 0 0-1.2-1.5l-2.5-.5a1.5 1.5 0 0 0-1.4.4l-.9.9a11.4 11.4 0 0 1-5-5l.9-.9a1.5 1.5 0 0 0 .4-1.4l-.5-2.5A1.5 1.5 0 0 0 6.6 3Z" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.6 6.1A9.7 9.7 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3 3.6M6.6 6.6A17 17 0 0 0 2 12s3.5 6 10 6a9.6 9.6 0 0 0 4-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m3 3 18 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 1-3.4 1a5.9 5.9 0 0 1-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.9a5.9 5.9 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.1c1.5 0 2.8.5 3.9 1.5l2.9-2.9A10 10 0 0 0 3 7.5l3.4 2.6A5.9 5.9 0 0 1 12 6.1Z"
      />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#1877F2" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

const iconMap = {
  tag: TagIcon,
  headset: HeadsetIcon,
  shield: ShieldIcon,
  heart: HeartIcon,
  users: UsersIcon,
  pin: PinIcon,
  beach: BeachIcon,
  mountain: MountainIcon,
  landmark: LandmarkIcon,
  family: FamilyIcon,
  crown: CrownIcon,
  bed: BedIcon,
  sliders: SlidersIcon,
  chart: ChartIcon,
  ticket: TicketIcon,
  team: TeamIcon,
  clock: ClockIcon,
  plane: PlaneIcon,
  hotel: HotelIcon,
  compass: CompassIcon,
  camera: CameraIcon,
  passport: PassportIcon,
};

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const Cmp = iconMap[name as IconName] ?? TagIcon;
  return <Cmp {...props} />;
}
