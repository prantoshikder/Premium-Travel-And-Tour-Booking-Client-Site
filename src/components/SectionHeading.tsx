export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      <p className={`eyebrow ${light ? "!text-gold-400" : ""}`}>{eyebrow}</p>
      <h2
        className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-base ${
            light ? "text-white/75" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
