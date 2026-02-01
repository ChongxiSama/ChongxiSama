import React from 'react';
import { profile } from '@/lib/config';

const ProfileCard: React.FC = () => {
    return (
        <section className="w-full">
            <div className="ripple-root group hover-state relative p-8 rounded-[28px] bg-[var(--md-sys-color-surface-container)] border border-[var(--md-sys-color-outline-variant)]/20 hover:border-[var(--md-sys-color-primary)]/40 overflow-hidden flex flex-col items-center text-center transition-colors duration-medium ease-emphasized">
                 <div className="state-layer text-[var(--md-sys-color-on-surface)]"></div>
                 {/* Decorative Blob */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--md-sys-color-primary-container)]/50 rounded-full blur-[80px] opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--md-sys-color-secondary-container)]/50 rounded-full blur-[80px] opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)]">{profile.name}</h2>
                    
                    {/* Info Row */}
                    <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 text-sm">
                        <p className="font-mono tracking-widest text-[var(--md-sys-color-primary)]">
                            {profile.role}
                        </p>
                        <span className="hidden sm:block h-4 w-px bg-[var(--md-sys-color-outline-variant)]/40"></span>
                        <div className="flex items-center gap-1.5 text-[var(--md-sys-color-on-surface-variant)]">
                            <span className="material-symbols-rounded text-base">location_on</span>
                            <span className="font-sans">{profile.location}</span>
                        </div>
                    </div>

                    {/* Slogan */}
                    <div className="mt-6 max-w-2xl">
                        <h3 className="text-xl leading-relaxed tracking-normal text-[var(--md-sys-color-on-surface-variant)] font-light">
                           {profile.slogan.map((part: { text: string; highlighted?: boolean }, index: number) => 
                                part.highlighted ? (
                                    <span key={index} className="font-medium text-[var(--md-sys-color-primary)]">
                                        {part.text}
                                    </span>
                                ) : (
                                    <span key={index}>{part.text}</span>
                                )
                           )}
                        </h3>
                    </div>

                    {/* ORCID Button */}
                    <div className="mt-8">
                         <a 
                            href={profile.orcid.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn relative inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full font-medium text-sm overflow-hidden bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] transition-all duration-short ease-standard active:scale-95 hover:shadow-lg hover:shadow-black/10"
                            >
                            <div className="state-layer text-[var(--md-sys-color-on-secondary-container)]"></div>
                            <div className="relative flex items-center gap-2">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m146.1,196.4c-11.3,0-20.5-9.2-20.5-20.5s9.2-20.5,20.5-20.5,20.5,9.2,20.5,20.5-9.2,20.5-20.5,20.5zm-62-19.2h-15.5v-83.3h15.5zm-7.7-93.3c-11.3,0-20.5-9.2-20.5-20.5s9.2-20.5,20.5-20.5,20.5,9.2,20.5,20.5-9.2,20.5-20.5,20.5zm15.5,19.3h-31v102.6h31z" />
                                </svg>
                                <span className="font-mono">{profile.orcid.id}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileCard;
