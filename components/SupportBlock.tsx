import { support } from "@/lib/config";

export default function SupportBlock() {
  return (
    <section aria-label="Support" className="mt-12 border-t border-carbon/15 pt-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="deco text-[9px] text-muted">Sponsor</div>
          <p className="mt-1 text-sm text-carbon/80">{support.description}</p>
        </div>
        <a
          href={support.url}
          target="_blank"
          rel="noopener noreferrer"
          className="deco shrink-0 bg-carbon px-5 py-2.5 text-[10px] font-bold text-paper transition-colors hover:bg-crimson"
        >
          {support.cta} ↗
        </a>
      </div>
    </section>
  );
}
