import { support } from "@/lib/config";

export default function SupportBlock() {
  return (
    <section aria-label="Support" className="border-t border-carbon pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-carbon p-5">
        <div>
          <h2 className="text-sm font-bold tracking-tight">{support.title}</h2>
          <p className="text-xs text-muted mt-0.5">{support.description}</p>
        </div>
        <a
          href={support.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-carbon text-paper px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-crimson"
        >
          {support.cta} ↗
        </a>
      </div>
    </section>
  );
}
