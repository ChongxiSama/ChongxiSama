import React, { useState, useRef } from 'react';
import { connectLinks, sections } from '@/lib/config';
import ExpandingButton from './ExpandingButton';
import useClickOutside from './useClickOutside';

const getColorClasses = (color: string) => {
    switch(color) {
      case 'primary': return 'from-[var(--md-sys-color-primary-container)] to-[var(--md-sys-color-surface-container-lowest)] text-[var(--md-sys-color-on-primary-container)]';
      case 'secondary': return 'from-[var(--md-sys-color-secondary-container)] to-[var(--md-sys-color-surface-container-lowest)] text-[var(--md-sys-color-on-secondary-container)]';
      case 'tertiary': return 'from-[var(--md-sys-color-tertiary-container)] to-[var(--md-sys-color-surface-container-lowest)] text-[var(--md-sys-color-on-tertiary-container)]';
      case 'pink': return 'from-[#F8E8EE] to-[var(--md-sys-color-surface-container-lowest)] text-[#8B456D] dark:from-[#5C2E47] dark:text-[#F8E8EE]';
      default: return 'from-[var(--md-sys-color-surface-container-highest)] to-[var(--md-sys-color-surface-container-lowest)] text-[var(--md-sys-color-on-surface)]';
    }
};

const ConnectCard: React.FC<{ link: any, index: number }> = ({ link, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useClickOutside<HTMLDivElement>(() => {
        setIsExpanded(false);
    });

    return (
        <div 
            ref={cardRef}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group cursor-pointer relative p-6 sm:p-8 rounded-[32px] bg-gradient-to-br ${getColorClasses(link.color)} overflow-hidden transition-all duration-medium ease-emphasized hover:scale-[1.02] active:scale-[0.98] animate-gradient-xy bg-[length:200%_200%] hover:rounded-[24px]`}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="state-layer rounded-[inherit]"></div>
            <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="flex justify-between items-start">
                    <div></div>
                    <ExpandingButton url={link.url} text="Open" isExpanded={isExpanded} />
                </div>
                <div className="mt-auto">
                  <div className="text-lg font-medium">{link.platform}</div>
                  <div className="text-sm opacity-70 font-mono">{link.username}</div>
                </div>
            </div>
            <span className="absolute -bottom-4 -right-4 material-symbols-rounded text-[120px] opacity-10 rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-extra-long ease-emphasized">{link.icon}</span>
        </div>
    );
};

const ConnectGrid: React.FC = () => {
  return (
    <section className="w-full animate-fade-in-up" style={{ animationDelay: '600ms' }}>
      <div className="flex items-center gap-4 mb-8">
         <span className="h-px flex-1 bg-[var(--md-sys-color-outline-variant)]/50"></span>
         <h2 className="text-[24px] sm:text-[32px] font-light text-[var(--md-sys-color-on-surface)]">{sections.uplink}</h2>
         <span className="h-px w-12 bg-[var(--md-sys-color-outline-variant)]/50"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {connectLinks.map((link: any, index: number) => (
          <ConnectCard link={link} index={index} key={link.platform} />
        ))}
      </div>
    </section>
  );
};

export default ConnectGrid;