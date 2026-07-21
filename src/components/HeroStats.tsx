import { heroStats } from "@/temp/home";
import { Icon } from "./Icons";

export default function HeroStats() {
  return (
    <section className="container-x pb-16">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-2xl border border-navy-50 bg-white px-5 py-8 shadow-soft sm:grid-cols-4 sm:gap-6 sm:px-6">
        {heroStats.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 sm:gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-600 sm:h-12 sm:w-12">
              <Icon name={s.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-extrabold text-navy-800 sm:text-2xl">{s.value}</p>
              <p className="truncate text-xs text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
