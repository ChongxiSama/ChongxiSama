import { allLinks, type LinkNode } from "@/lib/config";
import TechIcon from "@/components/TechIcon";

function tagClass(style: LinkNode["tagStyle"]) {
  if (style === "solid") return "tag-solid border border-carbon";
  if (style === "crimson") return "tag-crimson border border-crimson text-crimson";
  return "tag-outline border border-carbon";
}

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
          className={`swiss-cell flex flex-col justify-between gap-4 h-24 p-3.5 ${
            link.tint ? "bg-ochre/15" : "bg-paper"
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <span className="cell-muted font-mono text-[10px] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`shrink-0 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tagClass(link.tagStyle)}`}>
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
