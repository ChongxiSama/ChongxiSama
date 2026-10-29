import { projects } from "@/lib/config";
import TechIcon from "@/components/TechIcon";

export default function ProjectList() {
  return (
    <div className="divide-y divide-carbon/15 border-t border-carbon/15">
      {projects.map((project) => (
        <article
          key={project.title}
          className="flex flex-col justify-between gap-3 py-4 md:flex-row md:items-center"
        >
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-sm font-bold tracking-tight">{project.title}</h3>
              <span className="deco text-[8px] text-muted">{project.statusLabel}</span>
              {project.stars !== undefined && (
                <span className="font-mono text-[10px] tabular-nums text-muted">
                  ★ {project.stars}
                </span>
              )}
            </div>
            <p className="text-xs text-muted">{project.description}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4 font-mono">
            {project.tech.map((tech) => (
              <span key={tech} className="flex items-center gap-1 text-[10px] text-muted">
                <TechIcon name={tech} className="h-3 w-3" />
                {tech}
              </span>
            ))}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-[11px] font-bold underline decoration-carbon/30 underline-offset-2 transition-colors hover:text-crimson"
            >
              {project.linkLabel ?? "Repository →"}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
