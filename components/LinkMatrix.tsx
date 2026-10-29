import { allLinks } from "@/lib/config";
import TechIcon from "@/components/TechIcon";

export default function LinkMatrix() {
  const nodes = allLinks.filter((link) => !link.current);

  return (
    <ul className="divide-y divide-carbon/15 border-t border-carbon/15">
      {nodes.map((link) => (
        <li key={link.name}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 py-3.5 transition-colors hover:text-crimson"
          >
            <TechIcon name={link.icon} className="h-3.5 w-3.5 shrink-0 text-muted" />
            <span className="shrink-0 text-sm font-bold">{link.name}</span>
            <span className="deco hidden shrink-0 text-[8px] text-muted sm:inline">{link.tag}</span>
            <span className="ml-auto truncate font-mono text-[11px] text-muted">{link.handle}</span>
            <span className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-crimson">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
