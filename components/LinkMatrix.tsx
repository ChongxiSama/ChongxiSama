import { allLinks } from "@/lib/config";
import TechIcon from "@/components/TechIcon";

export default function LinkMatrix() {
  const nodes = allLinks.filter((link) => !link.current);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-carbon border border-carbon">
      {nodes.map((link, i) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="swiss-cell flex h-24 lg:h-28 flex-col justify-between gap-4 bg-paper p-3.5 lg:p-4"
        >
          <div className="flex justify-between items-start gap-2">
            <span className="cell-muted font-mono text-[10px] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="tag-outline shrink-0 border border-carbon px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider">
              {link.tag}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <TechIcon name={link.icon} className="w-3.5 h-3.5 shrink-0 cell-muted" />
              <span className="text-sm font-bold leading-tight truncate">{link.name}</span>
            </div>
            <div className="cell-muted mt-0.5 font-mono text-[10px] truncate">{link.handle} ↗</div>
          </div>
        </a>
      ))}
    </div>
  );
}
