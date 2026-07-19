import Image from "next/image";
import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-800">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-800/80 to-navy-900/90" />

      <div className="container-x relative pt-32 pb-14 sm:pt-40 sm:pb-16">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-white/60">
          <Link href="/" className="transition hover:text-gold-400">
            Home
          </Link>
          <span>/</span>
          <span className="text-white/90">{title}</span>
        </nav>

        <p className="text-xs font-bold uppercase tracking-[0.08em] text-gold-400">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
