'use client';

import React, { useState, useEffect } from 'react';
import FloatingActionButton from './FloatingActionButton';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check initial preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen text-[var(--md-sys-color-on-surface)] transition-colors duration-medium ease-emphasized flex flex-col items-center w-full selection:bg-[var(--md-sys-color-primary-container)] selection:text-[var(--md-sys-color-on-primary-container)] relative overflow-x-hidden font-sans">
      
      {/* Global Ambient Effects */}
      <div className="bg-noise z-50 opacity-[0.025] pointer-events-none"></div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Organic Blob Layer */}
          <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] bg-[var(--md-sys-color-primary-container)] opacity-40 dark:opacity-20 blur-[64px] animate-morph-1 mix-blend-multiply dark:mix-blend-screen gpu-accelerated-morph"></div>
          <div className="absolute top-[30%] right-[-20%] w-[70vw] h-[70vw] sm:w-[50vw] sm:h-[50vw] bg-[var(--md-sys-color-tertiary-container)] opacity-40 dark:opacity-20 blur-[80px] animate-morph-2 mix-blend-multiply dark:mix-blend-screen gpu-accelerated-morph" style={{ animationDelay: '-5s' }}></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[75vw] h-[75vw] sm:w-[55vw] sm:h-[55vw] bg-[var(--md-sys-color-secondary-container)] opacity-30 dark:opacity-15 blur-[64px] animate-morph-1 mix-blend-multiply dark:mix-blend-screen gpu-accelerated-morph" style={{ animationDelay: '-10s' }}></div>

          {/* Segmented Circle */}
          <div className="absolute top-[5%] right-[5%] w-28 h-28 sm:w-40 sm:h-40 text-[var(--md-sys-color-primary)] opacity-60 dark:opacity-30 animate-float gpu-accelerated">
             <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full animate-spin-slow">
                <path d="M 15.86,84.14 A 48,48 0 1 1 84.14,84.14" />
             </svg>
          </div>

          {/* Pill*/}
          <div className="absolute top-[40%] left-[-5%] w-24 h-48 sm:w-28 sm:h-56 text-[var(--md-sys-color-secondary)] opacity-50 dark:opacity-25 animate-float-delayed gpu-accelerated">
              <svg viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full rotate-12">
                 <rect x="2" y="2" width="96" height="196" rx="48" ry="48" />
              </svg>
          </div>

          {/* Donut */}
          <div className="absolute bottom-[10%] right-[8%] w-24 h-24 sm:w-36 sm:h-36 text-[var(--md-sys-color-tertiary)] opacity-60 dark:opacity-30 animate-float-slow gpu-accelerated">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full animate-spin-reverse-slow">
                 <circle cx="50" cy="50" r="48" />
                 <circle cx="50" cy="50" r="24" />
              </svg>
          </div>

          {/* Squircle */}
           <div className="absolute top-[10%] left-[8%] w-20 h-20 sm:w-28 sm:h-28 text-[var(--md-sys-color-secondary)] opacity-50 dark:opacity-25 animate-float-slow gpu-accelerated">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full -rotate-12 animate-spin-slow">
                 <path d="M50,2 C80,2 98,20 98,50 C98,80 80,98 50,98 C20,98 2,80 2,50 C2,20 20,2 50,2 Z" />
              </svg>
          </div>
          
          {/* Rounded Plus */}
           <div className="absolute bottom-[5%] left-[2%] w-16 h-16 sm:w-24 sm:h-24 text-[var(--md-sys-color-primary)] opacity-50 dark:opacity-25 animate-float gpu-accelerated">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full rotate-45 animate-spin-slow">
                 <path d="M20 50 L80 50 M50 20 L50 80" />
              </svg>
          </div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50">
          <button
            onClick={toggleTheme}
            className="group relative h-12 w-12 rounded-full flex items-center justify-center overflow-hidden bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface-variant)] active:scale-90 transition-transform duration-short ease-standard shadow-sm border border-[var(--md-sys-color-outline-variant)]/30 backdrop-blur-md cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            <div className="state-layer text-[var(--md-sys-color-on-surface-variant)]"></div>
            <span className="material-symbols-rounded text-2xl transition-all duration-medium ease-emphasized rotate-0 group-hover:rotate-180">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
      </div>

      {children}

      <FloatingActionButton />
    </div>
  );
}
