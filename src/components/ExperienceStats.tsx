import { experienceStats } from "@/lib/data";
import { Icon } from "./Icons";

export default function ExperienceStats() {
  return (
    <section className="container-x">
      <div className="grid grid-cols-2 gap-6 rounded-2xl bg-gradient-to-r from-navy-800 to-navy-600 px-6 py-8 shadow-card sm:grid-cols-4 sm:px-10">
        {experienceStats.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 ${
              i !== 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""
            }`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-500/20 text-gold-400">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs text-white/70">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
