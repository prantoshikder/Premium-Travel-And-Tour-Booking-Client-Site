import { PlaneIcon } from "./Icons";

export default function Newsletter() {
  return (
    <section className="container-x py-12">
      <div className="relative overflow-hidden rounded-3xl bg-navy-800 px-6 py-10 sm:px-12 sm:py-12">
        {/* dashed flight path decoration */}
        <svg
          className="pointer-events-none absolute right-6 top-6 hidden h-40 w-80 text-white/20 lg:block"
          viewBox="0 0 320 160"
          fill="none"
        >
          <path
            d="M10 150 C 120 150, 150 20, 300 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
        </svg>
        <PlaneIcon className="pointer-events-none absolute right-10 top-4 hidden h-10 w-10 text-gold-400 lg:block" strokeWidth={2} />

        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Get Exclusive Travel Deals Straight to Your Inbox
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Subscribe to our newsletter and never miss a great deal!
            </p>
          </div>

          <form className="flex w-full max-w-md items-center gap-2 rounded-full bg-white p-1.5 shadow-lg">
            <input
              type="email"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-navy-800 outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-800 transition hover:bg-gold-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
