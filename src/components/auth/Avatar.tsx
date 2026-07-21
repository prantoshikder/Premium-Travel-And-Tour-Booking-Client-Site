import Image from "next/image";
import { initials, type User } from "@/lib/auth";

export default function Avatar({
  user,
  className = "h-10 w-10 text-sm",
}: {
  user: User;
  className?: string;
}) {
  if (user.avatar) {
    return (
      <span
        className={`relative overflow-hidden rounded-full ring-2 ring-gold-400/50 ${className}`}
      >
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          sizes="40px"
          className="object-cover"
        />
      </span>
    );
  }
  return (
    <span
      className={`grid place-items-center rounded-full bg-gold-500 font-bold text-navy-800 ring-2 ring-gold-400/50 ${className}`}
      aria-hidden
    >
      {initials(user.name)}
    </span>
  );
}
