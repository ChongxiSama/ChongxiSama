import Image from "next/image";
import HeroSignal from "@/components/HeroSignal";
import { profile } from "@/lib/config";

const fields = [
  { label: "ORCID", value: "0009-0007-9348-1534" },
  { label: "Locale", value: "zh-CN / en-US" },
  { label: "Timezone", value: "UTC-9" },
  { label: "Domain", value: "chongxi.us" },
];

export default function HeroPanel() {
  return (
    <section aria-label="Profile" className="relative overflow-hidden bg-shell text-on-shell">
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 960px) 100vw, 960px"
        className="object-cover opacity-60 [mask-image:radial-gradient(115%_100%_at_68%_32%,black_28%,transparent_76%)]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-shell/90 via-shell/35 to-shell/90"
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 pt-8 sm:px-12 sm:pt-10 md:px-16 md:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-on-shell/15 pb-3 text-[9px] text-on-shell/55">
          <span className="deco">CEPATO Technical Note</span>
          <span className="font-mono tabular-nums">TN-2026</span>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h1 className="text-[clamp(2.75rem,10vw,7rem)] font-bold uppercase leading-[0.85] tracking-tight">
              {profile.name}
            </h1>
            <p className="deco mt-4 text-[10px] text-on-shell/70">{profile.role}</p>
          </div>
          <p className="text-sm italic text-ochre">{profile.motto}</p>
        </div>

        <p className="mt-6 max-w-xl text-sm leading-6 text-on-shell/65">{profile.slogan}</p>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-on-shell/15 pt-5 lg:grid-cols-4">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="deco text-[8px] text-on-shell/40">{field.label}</dt>
              <dd className="mt-1.5 font-mono text-[11px] text-on-shell/80">{field.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-on-shell/15 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={28}
              height={28}
              className="h-7 w-7 object-cover"
            />
            <HeroSignal />
          </div>
          <span className="deco hidden text-[8px] text-on-shell/35 sm:inline">Chongxi &amp; CEPATO</span>
        </div>
      </div>

      <div className="relative z-10 flex h-[3px]" aria-hidden="true">
        <span className="w-1/4 bg-teal" />
        <span className="w-1/4 bg-ochre" />
        <span className="w-1/4 bg-crimson" />
        <span className="w-1/4 bg-sienna" />
      </div>
    </section>
  );
}
