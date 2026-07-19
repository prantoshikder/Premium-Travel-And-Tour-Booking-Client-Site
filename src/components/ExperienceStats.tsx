import { experienceStats } from "@/lib/data";
import { Icon } from "./Icons";

export default function ExperienceStats() {
  return (
    <section className="container-x">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-2xl bg-linear-to-r from-navy-800 to-navy-600 px-5 py-8 shadow-card sm:grid-cols-4 sm:gap-6 sm:px-10">
        {experienceStats.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-2.5 sm:gap-3 ${
              i !== 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-500/20 text-gold-400 sm:h-11 sm:w-11">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-extrabold text-white sm:text-2xl">
                {s.value}
              </p>
              <p className="truncate text-xs text-white/70">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
