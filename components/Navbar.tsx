import React, { useState, useEffect } from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      fixed top-6 z-50 transition-all duration-long ease-emphasized
      ${scrolled ? 'w-[90%] max-w-[400px]' : 'w-[90%] max-w-[1200px]'}
    `}>
      <div className={`
        relative flex items-center justify-between px-2 py-2 rounded-full
        bg-[var(--md-sys-color-surface-container)]/90 backdrop-blur-xl
        border border-[var(--md-sys-color-outline-variant)]/30
        shadow-lg shadow-black/5
        transition-all duration-long ease-emphasized
      `}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 pl-4">
          <div className={`
            w-10 h-10 rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]
            flex items-center justify-center font-bold font-mono text-lg
            transition-all duration-long ease-emphasized
            ${scrolled ? 'rotate-0' : '-rotate-12'}
          `}>
            C
          </div>
          
          <div className={`
            flex flex-col overflow-hidden transition-all duration-long ease-emphasized
            ${scrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'}
          `}>
            <span className="text-lg font-bold tracking-tight text-[var(--md-sys-color-on-surface)] leading-none">
              CHONGXI
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[var(--md-sys-color-on-surface-variant)] opacity-80 mt-0.5">
              OPERATIVE
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pr-2">
           <div className={`
             hidden sm:flex items-center px-4 py-1.5 rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] text-xs font-mono gap-2 transition-all duration-long ease-emphasized
             ${scrolled ? 'opacity-0 translate-x-10 absolute pointer-events-none' : 'opacity-100 translate-x-0'}
           `}>
               <span className="w-1.5 h-1.5 rounded-full bg-[var(--md-sys-color-primary)] animate-pulse"></span>
               SYSTEM ONLINE
           </div>

          <button
            onClick={toggleTheme}
            className="group hover-state relative h-12 w-12 rounded-full flex items-center justify-center overflow-hidden text-[var(--md-sys-color-on-surface-variant)] active:scale-90 transition-transform duration-short ease-standard"
            aria-label="Toggle Dark Mode"
          >
            <div className="state-layer text-[var(--md-sys-color-on-surface-variant)]"></div>
            <span className="material-symbols-rounded text-2xl transition-all duration-medium ease-emphasized rotate-0 group-hover:rotate-180">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;