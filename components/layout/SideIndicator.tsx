"use client";

import React from 'react';

interface SideIndicatorProps {
  activeChapter: number;
  chapters: any[];
  brandLabel: string;
  utcLabel: string;
}

const SideIndicator: React.FC<SideIndicatorProps> = ({ activeChapter, chapters, brandLabel, utcLabel }) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-12 bg-lt-ink z-40 hidden md:flex flex-col items-center py-12 justify-between">
      <div className="flex flex-col items-center">
        <div 
          className="font-display text-[11px] text-lt-ghost tracking-[0.8em] uppercase select-none opacity-40"
          style={{ writingMode: 'vertical-rl' }}
        >
          {brandLabel}
        </div>
      </div>

      <nav className="flex flex-col items-center gap-6 relative">
        <div className="absolute top-0 bottom-0 w-[1px] bg-lt-border/20 left-1/2 -translate-x-1/2 -z-10"></div>
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          return (
            <div key={chapter.id} className="relative flex flex-col items-center">
              {isActive ? (
                <div className="flex flex-col items-center animate-enter">
                  <div className="w-[3px] h-4 bg-lt-accent mb-2"></div>
                  <span 
                    className="font-mono text-[9px] text-lt-accent font-black tracking-widest uppercase"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    CHAPTER_{chapter.label}
                  </span>
                </div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-lt-ghost/30 hover:bg-lt-ghost transition-colors cursor-pointer"></div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col items-center">
        <div 
          className="font-mono text-[10px] text-lt-ghost tracking-widest font-bold opacity-60"
          style={{ writingMode: 'vertical-rl' }}
        >
          {utcLabel}
        </div>
      </div>
    </aside>
  );
};

export default SideIndicator;
