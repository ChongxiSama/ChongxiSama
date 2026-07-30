"use client";

import { useEffect, useState } from 'react';
import { getThemeMode, cycleTheme, subscribe } from '@/lib/theme';

const TopStripe = () => {
  const [mode, setMode] = useState(getThemeMode);

  useEffect(() => {
    const unsub = subscribe(setMode);
    return unsub;
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[3px] flex z-50 md:hidden">
        <div className="bg-rl-teal w-1/3"></div>
        <div className="bg-rl-gold w-1/3"></div>
        <div className="bg-rl-red w-1/3"></div>
      </div>
      <button
        onClick={cycleTheme}
        className="fixed top-1 right-2 z-50 w-6 h-6 flex items-center justify-center md:hidden text-ink/40 hover:text-accent transition-colors"
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
    </>
  );
};

export default TopStripe;
