import { archive } from "@/lib/data";
import { profile } from "@/lib/config";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-carbon pt-6 text-xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-1.5">
          <div className="font-bold">
            Copyright © {new Date().getFullYear()} {profile.name} &amp; CEPATO · Powered by Next.js
            &amp; CEPATO
          </div>
          <div className="space-y-0.5 font-mono text-[11px] text-muted">
            <div>{`Status: ${archive.status} // ${archive.protocol}`}</div>
            <div>{`${archive.moeicp.label}: ${archive.moeicp.value} // ${archive.moeicp.verified}`}</div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col justify-between gap-2 md:border-l md:border-carbon md:pl-5">
          <a
            href={archive.statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-wider text-muted underline hover:text-crimson"
          >
            Status page
          </a>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted">
              {profile.domain}
            </span>
            <span className="block text-[10px] uppercase tracking-wider text-muted">
              All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
