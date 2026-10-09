import { projects } from "@/lib/config";
import TechIcon from "@/components/TechIcon";

export default function ProjectList() {
  return (
    <div className="divide-y divide-carbon border border-carbon text-xs">
      {projects.map((project) => (
        <article
          key={project.title}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-4 hover:bg-carbon/5"
        >
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-sm font-bold tracking-tight">{project.title}</h3>
              <span
                className={`border px-1 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  project.status === "active"
                    ? "border-teal-ink text-teal-ink"
                    : "border-carbon bg-carbon text-paper"
                }`}
              >
                {project.statusLabel}
              </span>
              {project.stars !== undefined && (
                <span className="font-mono text-[10px] text-muted tabular-nums">
                  ★ {project.stars} stars
                </span>
              )}
            </div>
            <p className="text-muted">{project.description}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono">
            {project.tech.map((tech) => (
              <span key={tech} className="flex items-center gap-1 text-[11px] text-muted">
                <TechIcon name={tech} className="w-3 h-3" />
                {tech}
              </span>
            ))}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap font-bold underline hover:text-crimson"
            >
              Repository →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
