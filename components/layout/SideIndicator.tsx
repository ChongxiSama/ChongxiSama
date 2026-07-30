import { type Chapter } from '@/lib/data';

interface SideIndicatorProps {
  activeChapter: number;
  chapters: Chapter[];
  brandLabel: string;
  utcLabel: string;
}

const SideIndicator = ({ activeChapter, chapters, brandLabel, utcLabel }: SideIndicatorProps) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-12 bg-ink z-40 hidden md:flex flex-col items-center py-12 justify-between overflow-hidden">
      <div className="flex flex-col items-center">
        <div 
          className="font-display text-[11px] text-ghost tracking-[0.8em] uppercase select-none opacity-40"
          style={{ writingMode: 'vertical-rl' }}
        >
          {brandLabel}
        </div>
      </div>

      <nav className="flex flex-col items-center gap-6 relative" aria-label="Chapter navigation">
        <div className="absolute top-0 bottom-0 w-[1px] bg-border/20 left-1/2 -translate-x-1/2 -z-10"></div>
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          return (
            <div key={chapter.id} className="relative flex flex-col items-center">
              {isActive ? (
                <div className="flex flex-col items-center animate-enter">
                  <div className="w-[3px] h-4 bg-accent mb-2"></div>
                  <span 
                    className="font-mono text-[9px] text-accent font-black tracking-widest uppercase"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    CHAPTER_{chapter.label}
                  </span>
                </div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-ghost/30 hover:bg-ghost transition-colors"></div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col items-center">
        <div 
          className="font-mono text-[10px] text-ghost tracking-widest font-bold opacity-60"
          style={{ writingMode: 'vertical-rl' }}
        >
          {utcLabel}
        </div>
      </div>
    </aside>
  );
};

export default SideIndicator;
