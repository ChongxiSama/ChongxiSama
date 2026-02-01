import React from 'react';
import { profile, footer } from '@/lib/config';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--md-sys-color-outline-variant)]/30 pt-12 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[var(--md-sys-color-on-surface-variant)]">
        
        <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-[16px] overflow-hidden bg-[var(--md-sys-color-surface-container-high)] shadow-sm">
                <img 
                  src="https://blog.chongxi.us/images/xi.webp" 
                  alt={`${profile.name} Avatar`} 
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="flex flex-col">
                 <span className="font-bold text-[var(--md-sys-color-on-surface)]">{profile.name}</span>
                 <span className="text-xs font-mono opacity-80">{profile.role}</span>
             </div>
        </div>

        <div className="flex flex-col items-center md:items-end text-sm">
             <p>{footer.line1}</p>
             <p className="text-xs font-mono opacity-60 mt-1">{footer.line2}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
