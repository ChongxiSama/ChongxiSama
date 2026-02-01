"use client";

import React, { useState, useEffect, useRef } from 'react';
import { personalLinks, sections } from '@/lib/config';
import ExpandingButton from './ExpandingButton';
import useClickOutside from './useClickOutside';

interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArtUrl?: string;
  error?: boolean;
}

const SpotifyNowPlayingCard: React.FC<{ link: any }> = ({ link }) => {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ isPlaying: false });
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const cardRef = useClickOutside<HTMLDivElement>(() => {
        setIsExpanded(false);
    });

    const fetchStatus = async () => {
        try {
            const targetUrl = 'https://spot.chongxi.us';
            const targetUrlWithCacheBuster = `https://spot.chongxi.us?_=${new Date().getTime()}`;
            // Proxy
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrlWithCacheBuster)}`;
            const response = await fetch(proxyUrl);

            if (!response.ok) throw new Error('Network response was not OK');
            
            const data = await response.json();
            const htmlText = data.contents;

            if (!htmlText) throw new Error('Failed to retrieve HTML content from proxy.');

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');

            const title = doc.querySelector('.text-3xl.white-title')?.textContent?.trim() || doc.querySelector('.text-2xl.white-title')?.textContent?.trim();
            const duration = doc.querySelector('#cur-duration-pc')?.textContent?.trim() || doc.querySelector('#cur-duration-mobile')?.textContent?.trim();

            if (title && title !== "Chongxi is not playing anything" && title !== "万物皆虚" && duration && duration !== "0:00") {
                const artist = doc.querySelector('.text-xl.white-artist')?.textContent?.trim() || doc.querySelector('.text-lg.white-artist')?.textContent?.trim();
                const albumArtSrc = doc.querySelector('.w-2\\/5 .rounded-3xl img')?.getAttribute('src') || doc.querySelector('.aspect-\\[9\\/16\\] .rounded-3xl img')?.getAttribute('src');
                
                setNowPlaying({ isPlaying: true, title, artist, albumArtUrl: albumArtSrc ? new URL(albumArtSrc, targetUrl).href : undefined, error: false });
            } else {
                setNowPlaying({ isPlaying: false, title: "Offline", artist: undefined, albumArtUrl: undefined, error: false });
            }

        } catch (e) {
            console.error("Failed to fetch Spotify status:", e);
            setNowPlaying({ isPlaying: false, error: true });
        } finally {
            if(loading) setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            ref={cardRef}
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative cursor-pointer flex flex-col justify-between p-6 rounded-[28px] ripple-root bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface)] overflow-hidden transition-all duration-medium ease-emphasized hover:scale-[1.02]  hover:rounded-[24px]"
        >
            <div className="state-layer text-[var(--md-sys-color-on-surface)] rounded-[inherit]"></div>
            <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <svg className="w-5 h-5 fill-current text-green-500" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.322-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.083-2.29a.75.75 0 0 1-1.026.247c-2.52-1.54-6.752-1.655-9.289-.914a.75.75 0 0 1-.415-1.434c2.825-.811 7.422-.667 10.337 1.155a.75.75 0 0 1 .247 1.026z"></path></svg>
                    <span>{link.platform}</span>
                </div>
                <ExpandingButton url={link.url} text="Open" isExpanded={isExpanded} />
            </div>
            <div className="relative z-10 mt-auto min-h-[96px] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-mono mb-4">
                     {!loading && !nowPlaying.error && ( nowPlaying.isPlaying ? (<><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span><span>LIVE</span></>) : (<><span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-outline)]"></span><span>OFFLINE</span></>) )}
                </div>
                {loading ? 
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="w-3/4 h-5 rounded-md bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                            <div className="w-1/2 h-4 rounded-md bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                        </div>
                    </div> 
                    : nowPlaying.error ? 
                    <div className="flex items-center gap-3 text-red-500/80">
                        <span className="material-symbols-rounded">error</span>
                        <span className="font-medium text-sm">Failed to load status</span>
                    </div> 
                    : nowPlaying.isPlaying ? 
                    <div className="flex items-center gap-4 w-full">
                        {nowPlaying.albumArtUrl ? 
                            <img src={nowPlaying.albumArtUrl} alt={nowPlaying.title} className="w-16 h-16 rounded-lg object-cover shadow-md" /> 
                            : 
                            <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] flex items-center justify-center">
                                <span className="material-symbols-rounded text-3xl text-[var(--md-sys-color-on-surface-variant)]">music_note</span>
                            </div>
                        }
                        <div className="flex flex-col overflow-hidden flex-1">
                            <p className="font-medium text-base truncate" title={nowPlaying.title}>{nowPlaying.title}</p>
                            <p className="text-sm text-[var(--md-sys-color-on-surface-variant)] truncate" title={nowPlaying.artist}>{nowPlaying.artist}</p>
                        </div>
                    </div> 
                    : 
                    <div className="flex items-center gap-4 text-[var(--md-sys-color-on-surface-variant)]">
                        <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] flex items-center justify-center">
                            <span className="material-symbols-rounded text-3xl">music_off</span>
                        </div>
                        <p className="font-medium">Offline</p>
                    </div>
                }
            </div>
        </div>
    );
};

const PersonalLinkCard: React.FC<{ link: any }> = ({ link }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useClickOutside<HTMLDivElement>(() => {
        setIsExpanded(false);
    });

    return (
        <div 
          ref={cardRef}
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative cursor-pointer flex flex-col justify-between p-6 sm:p-8 rounded-[28px] ripple-root bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface)] overflow-hidden transition-all duration-medium ease-emphasized hover:scale-[1.02]  hover:rounded-[24px]"
        >
            <div className="state-layer text-[var(--md-sys-color-on-surface)] rounded-[inherit]"></div>
            <div className="relative z-10 flex justify-between items-start">
               <div className="p-3 rounded-xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]">
                    <span className="material-symbols-rounded">{link.icon}</span>
               </div>
               <ExpandingButton url={link.url} text="Visit" isExpanded={isExpanded}/>
            </div>
            <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-medium">{link.platform}</h3>
                <p className="text-[var(--md-sys-color-on-surface-variant)] text-sm mt-1">{link.description}</p>
            </div>
        </div>
    );
};

const PersonalLinks: React.FC = () => {
    return (
        <section className="w-full">
             <div className="flex items-center gap-4 mb-12">
                <span className="h-px flex-1 bg-[var(--md-sys-color-outline-variant)]/50"></span>
                <h2 className="text-[24px] sm:text-[32px] font-[500] text-[var(--md-sys-color-on-surface)]">{sections.personalNodes}</h2>
                <span className="h-px w-12 bg-[var(--md-sys-color-outline-variant)]/50"></span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {personalLinks.map((link, index) => {
                    if (link.live) {
                        return <SpotifyNowPlayingCard key={index} link={link} />;
                    }
                    return <PersonalLinkCard key={index} link={link} />;
                })}
            </div>
        </section>
    );
}

export default PersonalLinks;