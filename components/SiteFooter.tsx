import Image from "next/image";
import { archive } from "@/lib/data";
import { blogUrl, profile } from "@/lib/config";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-shell text-on-shell">
      <Image
        src="/images/footer-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-shell/85" aria-hidden="true" />

      <div className="relative z-10 w-full px-6 py-10 sm:px-10 md:px-16 xl:px-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-1.5">
            <div className="deco text-[9px] text-on-shell/45">{profile.domain}</div>
            <div className="text-xs text-on-shell/70">
              Copyright © {year} {profile.name} &amp; CEPATO · Powered by Next.js
            </div>
            <div className="font-mono text-[11px] text-on-shell/45">
              {`${archive.status} // ${archive.protocol}`}
            </div>
            <div className="font-mono text-[11px] text-on-shell/45">
              {`${archive.moeicp.label}: ${archive.moeicp.value} // ${archive.moeicp.verified}`}
            </div>
          </div>

          <div className="deco flex gap-4 text-[9px] text-on-shell/60">
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-on-shell"
            >
              Blog ↗
            </a>
            <a
              href={archive.statusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-on-shell"
            >
              Status ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
