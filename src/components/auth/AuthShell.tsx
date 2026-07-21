import Image from "next/image";
import Link from "next/link";
import { authHighlights, authImage } from "@/temp/auth";
import { PlaneIcon, CheckIcon, GoogleIcon, FacebookIcon } from "../Icons";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  showSocial = true,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  showSocial?: boolean;
}) {
  return (
    <main className="flex min-h-screen bg-navy-50/40">
      {/* Left brand / image panel — hidden on small screens */}
      <aside className="relative hidden w-1/2 overflow-hidden lg:block xl:w-[45%]">
        <Image
          src={authImage}
          alt="Traveler overlooking a scenic destination"
          fill
          priority
          sizes="45vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-800/70 to-navy-900/85" />

        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-white transition hover:opacity-90"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500 text-navy-800">
              <PlaneIcon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              travel<span className="text-gold-400">perk</span>
            </span>
          </Link>

          <div className="max-w-md">
            <h2 className="text-3xl leading-tight font-extrabold text-white xl:text-4xl">
              Your next journey begins here.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Join thousands of travelers exploring the world with exclusive
              deals and a booking experience built around you.
            </p>

            <ul className="mt-8 space-y-3.5">
              {authHighlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-white/85"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-800">
                    <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/50">
            © 2025 Travelperk. All Rights Reserved.
          </p>
        </div>
      </aside>

      {/* Right form panel */}
      <section className="flex w-full flex-col px-5 py-8 sm:px-8 lg:w-1/2 lg:justify-center xl:w-[55%]">
        {/* Mobile logo */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 self-start text-navy-800 lg:hidden"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-500 text-navy-800">
            <PlaneIcon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            travel<span className="text-gold-600">perk</span>
          </span>
        </Link>

        <div className="mx-auto w-full max-w-md">
          <h1 className="text-2xl font-extrabold tracking-tight text-navy-800 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>

          {showSocial ? (
            <>
              {/* Social auth */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-navy-100 bg-white py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
                >
                  <GoogleIcon className="h-5 w-5" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-navy-100 bg-white py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50"
                >
                  <FacebookIcon className="h-5 w-5" />
                  Facebook
                </button>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-navy-100" />
                <span className="text-xs font-medium tracking-wide text-muted uppercase">
                  or continue with email
                </span>
                <span className="h-px flex-1 bg-navy-100" />
              </div>
            </>
          ) : (
            <div className="mt-7" />
          )}

          {children}

          <p className="mt-6 text-center text-sm text-muted">{footer}</p>
        </div>
      </section>
    </main>
  );
}
