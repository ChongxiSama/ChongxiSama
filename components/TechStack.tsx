import { techGroups } from "@/lib/data";
import TechIcon from "@/components/TechIcon";

const BAR_COLORS = ["bg-carbon", "bg-teal", "bg-ochre"];

export default function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
      {techGroups.map((group) => (
        <div key={group.title} className="border border-carbon p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-3">{group.title}</div>

          <div className="space-y-3 font-mono tabular-nums">
            {group.items.map((item, i) => (
              <div key={item.name}>
                <div
                  className={`flex items-baseline justify-between gap-2 mb-1 ${
                    i === 0 ? "font-bold" : "text-muted"
                  }`}
                >
                  <span className="flex items-center gap-1.5 min-w-0">
                    <TechIcon name={item.icon} className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span className="shrink-0">{item.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden bg-carbon/15">
                  <div
                    className={`h-full bar-grow ${BAR_COLORS[i % BAR_COLORS.length]}`}
                    style={{ width: `${item.pct}%`, animationDelay: `${i * 0.1}s` }}
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
