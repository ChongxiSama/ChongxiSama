import React from 'react';

const ExpandingButton: React.FC<{ url: string; text: string; isExpanded: boolean }> = ({ url, text, isExpanded }) => (
    <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={text}
        className={`
            group/btn relative h-10 flex items-center justify-center 
            bg-[var(--md-sys-color-surface-container-high)] 
            rounded-full transition-all duration-medium ease-emphasized 
            text-[var(--md-sys-color-on-surface-variant)] 
            hover:bg-[var(--md-sys-color-secondary-container)] 
            hover:text-[var(--md-sys-color-on-secondary-container)] 
            ${isExpanded ? 'pr-3' : ''}
        `}
        onClick={(e) => {
            if (!isExpanded) {
                e.preventDefault();
            }
            e.stopPropagation();
        }}
    >
        <div className="state-layer text-[var(--md-sys-color-on-secondary-container)] rounded-full"></div>
        <div className="flex items-center">
            <div className="relative w-10 h-10 flex items-center justify-center">
                 <span className={`material-symbols-rounded text-xl transition-transform duration-medium ease-emphasized ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>
                    arrow_outward
                </span>
            </div>
            <div className={`
                overflow-hidden transition-all duration-medium ease-emphasized
                ${isExpanded ? 'w-[3.5rem]' : 'w-0'}
            `}>
                <span className="text-sm font-medium whitespace-nowrap">{text}</span>
            </div>
        </div>
    </a>
);

export default ExpandingButton;