"use client";

import { type Chapter } from '@/lib/data';
import { useEffect, useState } from 'react';
import { getThemeMode, cycleTheme, subscribe, applyTheme } from '@/lib/theme';

interface SideIndicatorProps {
  activeChapter: number;
  chapters: Chapter[];
  brandLabel: string;
  utcLabel: string;
}

const SideIndicator = ({ activeChapter, chapters, brandLabel, utcLabel }: SideIndicatorProps) => {
  const [mode, setMode] = useState(getThemeMode);

  useEffect(() => {
    applyTheme();
    const unsub = subscribe(setMode);
    return unsub;
  }, []);

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

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={cycleTheme}
          className="w-5 h-5 text-ghost/50 hover:text-accent transition-colors"
          aria-label={`Theme: ${mode}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            {mode === 'auto' ? (
              <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>
            ) : mode === 'light' ? (
              <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5.64 5.64l1.42 1.42M16.94 16.94l1.42 1.42M5.64 18.36l1.42-1.42M16.94 7.06l1.42-1.42" /></>
            ) : (
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            )}
          </svg>
        </button>
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
