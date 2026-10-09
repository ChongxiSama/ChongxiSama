import Image from "next/image";
import { profile } from "@/lib/config";

export default function SiteHeader() {
  return (
    <header className="focus-in stagger-2 border-b-2 border-carbon pb-8 mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-start gap-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-carbon overflow-hidden">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none">
                {profile.name}
              </h1>
              <span className="text-[10px] uppercase font-bold bg-carbon text-paper px-1.5 py-0.5">
                Verified
              </span>
            </div>

            <div className="text-xs text-muted mb-2">{profile.role}</div>

            <a
              href={profile.orcid.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-mono border-t border-b border-carbon/20 py-0.5 hover:text-crimson"
            >
              <span className="font-bold text-teal-ink">ORCID</span>
              <span>{profile.orcid.id}</span>
            </a>
          </div>
        </div>

        <div className="border-l border-carbon pl-5 py-1 text-xs w-full md:w-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-teal inline-block pulse-dot" aria-hidden="true" />
            <span className="font-bold">System status: online (SYS_ONLINE)</span>
          </div>
          <div className="text-muted text-[11px] font-mono">
            Primary node:{" "}
            <a href={profile.node} className="text-carbon font-bold underline hover:text-crimson">
              {profile.domain}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-carbon/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
        <div className="md:col-span-4">
          <span className="text-xs font-bold italic tracking-wider text-crimson">{profile.motto}</span>
        </div>
        <div className="md:col-span-8 text-xs leading-relaxed">{profile.slogan}</div>
      </div>
    </header>
  );
}
