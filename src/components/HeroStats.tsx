import { heroStats } from "@/lib/data";
import { Icon } from "./Icons";

export default function HeroStats() {
  return (
    <section className="container-x pb-16">
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-navy-50 bg-white px-6 py-8 shadow-soft sm:grid-cols-4">
        {heroStats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-600">
              <Icon name={s.icon} className="h-6 w-6" />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-navy-800">{s.value}</p>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
