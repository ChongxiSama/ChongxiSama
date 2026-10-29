import { techGroups } from "@/lib/data";
import TechIcon from "@/components/TechIcon";

export default function TechStack() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {techGroups.map((group, groupIndex) => (
        <div key={group.title}>
          <div className="mb-4 flex items-baseline justify-between gap-2 border-b border-carbon/20 pb-1.5">
            <span className="deco text-[9px] text-muted">{group.title}</span>
            <span className="font-mono text-[9px] tabular-nums text-muted">
              {String(groupIndex + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="space-y-3 font-mono text-[11px] tabular-nums">
            {group.items.map((item, i) => (
              <div key={item.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span
                    className={`flex min-w-0 items-center gap-1.5 ${i === 0 ? "text-carbon" : "text-muted"}`}
                  >
                    <TechIcon name={item.icon} className="h-3 w-3 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span className="w-7 shrink-0 text-right text-carbon">{item.pct}</span>
                </div>

                <div className="relative h-[3px] w-full bg-carbon/10">
                  <span className="absolute inset-y-0 left-1/4 w-px bg-carbon/20" aria-hidden="true" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-carbon/20" aria-hidden="true" />
                  <span className="absolute inset-y-0 left-3/4 w-px bg-carbon/20" aria-hidden="true" />
                  <div
                    className={`relative h-full ${i === 0 ? "bg-crimson" : "bg-carbon/55"}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
