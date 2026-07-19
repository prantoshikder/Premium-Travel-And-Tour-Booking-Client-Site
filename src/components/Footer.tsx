import { footerColumns } from "@/lib/data";
import { PlaneIcon, ArrowRightIcon } from "./Icons";

function Social({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-gold-500 hover:text-navy-800"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="mt-12 bg-navy-900 text-white">
      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.6fr] lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-500 text-navy-800">
                <PlaneIcon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-xl font-extrabold">
                travel<span className="text-gold-400">perk</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Your trusted travel partner for flights, hotels, tours, and
              unforgettable experiences worldwide.
            </p>
            <div className="mt-5 flex gap-2.5">
              <Social>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M13.5 9H16l.5-3h-3V4.2c0-.9.3-1.5 1.6-1.5H16.6V.1C16.3.1 15.3 0 14.1 0 11.6 0 10 1.5 10 4.1V6H7.5v3H10v9h3.5Z" />
                </svg>
              </Social>
              <Social>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.4 11.4 0 0 1 3.7 4.6a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 4c-.5.2-1.1.2-1.7.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1a11.3 11.3 0 0 0 6.1 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2Z" />
                </svg>
              </Social>
              <Social>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.7 3.7 0 0 1-1.4-.9 3.7 3.7 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0Z" />
                </svg>
              </Social>
              <Social>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M6.9 20V9H3.6v11h3.3ZM5.2 7.5a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM20.4 20v-6c0-3.2-1.7-4.7-4-4.7-1.8 0-2.7 1-3.1 1.7V9H9.9v11h3.3v-6.1c0-.3 0-.6.1-.8.3-.6.8-1.3 1.8-1.3 1.3 0 1.8 1 1.8 2.4V20h3.5Z" />
                </svg>
              </Social>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-white/60 transition hover:text-gold-400"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <h4 className="text-sm font-bold text-white">Newsletter</h4>
            <p className="mt-4 text-sm text-white/60">
              Subscribe to get exclusive travel deals and updates.
            </p>
            <form className="mt-4 flex items-center gap-2 rounded-full bg-white/10 p-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-800 transition hover:bg-gold-400">
                <ArrowRightIcon className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © 2025 Travelperk. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            {["VISA", "MC", "PayPal"].map((p) => (
              <span
                key={p}
                className="grid h-7 w-11 place-items-center rounded bg-white text-[10px] font-bold text-navy-800"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
