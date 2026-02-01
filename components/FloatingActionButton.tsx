import React, { useState, useEffect } from 'react';

const FloatingActionButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 sm:bottom-10 sm:right-10
        w-14 h-14 rounded-[20px]
        bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]
        shadow-lg shadow-[rgba(0,0,0,0.2)]
        flex items-center justify-center
        hover:shadow-xl hover:-translate-y-1 hover:rounded-[16px]
        active:scale-95
        transition-all duration-300 ease-emphasized
        z-40
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
      `}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
    >
      <span className="material-symbols-rounded text-[24px]">vertical_align_top</span>
    </button>
  );
};

export default FloatingActionButton;