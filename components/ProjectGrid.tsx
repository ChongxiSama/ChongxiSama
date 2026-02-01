import React, { useState, useEffect, useRef } from 'react';
import { projects, sections } from '@/lib/config';
import ExpandingButton from './ExpandingButton';
import useClickOutside from './useClickOutside';

const ProjectCard: React.FC<{ project: any, index: number }> = ({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useClickOutside<HTMLDivElement>(() => {
        setIsExpanded(false);
    });

    return (
        <div 
            ref={cardRef}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
            group relative cursor-pointer flex flex-col justify-between p-6 sm:p-8 rounded-[28px]
            bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface)]
            overflow-hidden
            transition-all duration-medium ease-emphasized
            active:scale-[0.98]
            hover:rounded-[20px] hover:scale-[1.02]
            ${project.featured ? 'md:col-span-2 md:row-span-2 min-h-[360px]' : 'min-h-[260px]'}
            animate-fade-in-up
            `}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="state-layer text-[var(--md-sys-color-on-surface)] rounded-[inherit]"></div>

            <div className="relative z-10 flex justify-between items-start">
                <span className={`
                    text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border
                    ${project.status.includes('building') 
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300' 
                        : 'bg-[var(--md-sys-color-surface-container-high)] border-[var(--md-sys-color-outline)]/20 text-[var(--md-sys-color-on-surface-variant)]'}
                `}>
                    {project.status}
                </span>
                {project.link && <ExpandingButton url={project.link} text="Visit" isExpanded={isExpanded} />}
            </div>

            <div className="relative z-10 mt-auto">
                <h3 className={`${project.featured ? 'text-[32px]' : 'text-[22px]'} font-medium leading-tight mb-3 group-hover:translate-x-1 transition-transform duration-medium ease-emphasized`}>
                    {project.title}
                </h3>
                <p className="text-[var(--md-sys-color-on-surface-variant)] text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string) => (
                        <span key={t} className="text-xs font-medium text-[var(--md-sys-color-on-secondary-container)] bg-[var(--md-sys-color-secondary-container)] px-3 py-1.5 rounded-lg">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--md-sys-color-primary-container)] rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-long ease-emphasized"></div>
        </div>
    );
};

const ProjectGrid: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full">
      <div className="flex items-center gap-4 mb-12">
         <span className="h-px flex-1 bg-[var(--md-sys-color-outline-variant)]/50"></span>
         <h2 className="text-[24px] sm:text-[32px] font-[500] text-[var(--md-sys-color-on-surface)]">{sections.repositories}</h2>
         <span className="h-px w-12 bg-[var(--md-sys-color-outline-variant)]/50"></span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {loading && projects.map((project: any, i: number) => (
            <div key={`skel-${i}`} className={`relative overflow-hidden rounded-[28px] bg-[var(--md-sys-color-surface-container)] shimmer-bg animate-shimmer ${project.featured ? 'md:col-span-2 md:row-span-2 min-h-[360px]' : 'min-h-[260px]'}`} />
        ))}

        {!loading && projects.map((project: any, index: number) => (
            <ProjectCard project={project} index={index} key={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
