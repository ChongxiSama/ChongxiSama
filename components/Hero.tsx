"use client";

import React from 'react';
import { homepageTitle, profile } from '@/lib/config';

const Hero: React.FC = () => {
  const [currentAvatarIndex, setCurrentAvatarIndex] = React.useState(0);
  const [isAvatarRounded, setIsAvatarRounded] = React.useState(false);

  const handleClick = () => {
    setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % profile.avatars.length);
    setIsAvatarRounded((prev) => !prev);
  };

  const dynamicRoundedClass = isAvatarRounded ? 'rounded-full' : 'rounded-[48px]';

  const avatarContainerClasses = `
    relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden
    bg-[var(--md-sys-color-surface-container)] shadow-2xl shadow-[var(--md-sys-color-shadow)]/10
    transition-all duration-extra-long ease-emphasized-decelerate
    border-[4px] border-[var(--md-sys-color-surface)]
    ${dynamicRoundedClass}
    group-hover:rounded-full
  `;

  return (
    <section className="flex flex-col items-center sm:items-start pt-8 sm:pt-16 w-full relative">
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-8 flex flex-col gap-8 z-10 text-center sm:text-left items-center sm:items-start">
            
            {/* Title */}
            <h1 className="text-5xl sm:text-7xl font-[500] leading-tight tracking-tight text-[var(--md-sys-color-on-surface)] animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              {homepageTitle}
            </h1>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <div className="relative group cursor-pointer" onClick={handleClick}>
            {/* Morphing Blob */}
            <div className="absolute inset-0 scale-125 bg-[var(--md-sys-color-secondary-container)] animate-morph-2 blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
            
            {/* Avatar Container */}
            <div className={avatarContainerClasses}>
               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--md-sys-color-primary)]/10 to-transparent z-10 mix-blend-overlay"></div>
               <img
                 src={profile.avatars[currentAvatarIndex]}
                 alt={`${profile.name} Avatar`}
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-extra-long ease-emphasized"
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;