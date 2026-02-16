"use client";

import React, { useState, useEffect } from 'react';
import { personalLinks, sections } from '@/lib/config';
import ExpandingButton from './ExpandingButton';
import useClickOutside from './useClickOutside';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArtUrl?: string;
  songUrl?: string;
  error?: boolean;
}

interface SteamData {
  personastate: number;
  gameextrainfo?: string;
  gameid?: string;
  avatar?: string;
  personaname?: string;
  error?: boolean;
}

const SpotifyNowPlayingCard: React.FC<{ link: any }> = ({ link }) => {
    const [data, setData] = useState<SpotifyData>({ isPlaying: false });
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const cardRef = useClickOutside<HTMLDivElement>(() => {
        setIsExpanded(false);
    });

    const fetchStatus = async () => {
        try {
            const response = await fetch('/api/spotify/now-playing');
            if (!response.ok) throw new Error();
            const result = await response.json();
            setData(result);
        } catch (e) {
            setData({ isPlaying: false, error: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000);
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
                <ExpandingButton url={data.songUrl || link.url} text="Listen" isExpanded={isExpanded} />
            </div>
            <div className="relative z-10 mt-auto min-h-[96px] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-mono mb-4">
                     {!loading && !data.error && ( data.isPlaying ? (<><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span><span>LIVE</span></>) : (<><span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-outline)]"></span><span>OFFLINE</span></>) )}
                </div>
                {loading ? 
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="w-3/4 h-5 rounded-md bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                            <div className="w-1/2 h-4 rounded-md bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                        </div>
                    </div> 
                    : data.error ? 
                    <div className="flex items-center gap-3 text-red-500/80">
                        <span className="material-symbols-rounded">error</span>
                        <span className="font-medium text-sm">Service Unavailable</span>
                    </div> 
                    : data.isPlaying ? 
                    <div className="flex items-center gap-4 w-full">
                        {data.albumArtUrl ? 
                            <img src={data.albumArtUrl} alt={data.title} className="w-16 h-16 rounded-lg object-cover shadow-md" /> 
                            : 
                            <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] flex items-center justify-center">
                                <span className="material-symbols-rounded text-3xl text-[var(--md-sys-color-on-surface-variant)]">music_note</span>
                            </div>
                        }
                        <div className="flex flex-col overflow-hidden flex-1">
                            <p className="font-medium text-base truncate" title={data.title}>{data.title}</p>
                            <p className="text-sm text-[var(--md-sys-color-on-surface-variant)] truncate" title={data.artist}>{data.artist}</p>
                        </div>
                    </div> 
                    : 
                    <div className="flex items-center gap-4 text-[var(--md-sys-color-on-surface-variant)]">
                        <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] flex items-center justify-center">
                            <span className="material-symbols-rounded text-3xl">music_off</span>
                        </div>
                        <p className="font-medium">Not Playing</p>
                    </div>
                }
            </div>
        </div>
    );
};

const SteamStatusCard: React.FC<{ link: any }> = ({ link }) => {
    const [data, setData] = useState<SteamData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const cardRef = useClickOutside<HTMLDivElement>(() => {
        setIsExpanded(false);
    });

    const fetchStatus = async () => {
        try {
            const response = await fetch('/api/steam/status');
            if (!response.ok) throw new Error();
            const result = await response.json();
            setData(result);
        } catch (e) {
            setData({ personastate: 0, error: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    const isPlaying = !!data?.gameextrainfo;
    const isOnline = data?.personastate && data.personastate > 0;

    return (
        <div 
            ref={cardRef}
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative cursor-pointer flex flex-col justify-between p-6 rounded-[28px] ripple-root bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface)] overflow-hidden transition-all duration-medium ease-emphasized hover:scale-[1.02]  hover:rounded-[24px]"
        >
            <div className="state-layer text-[var(--md-sys-color-on-surface)] rounded-[inherit]"></div>
            <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-rounded text-blue-500">sports_esports</span>
                    <span>{link.platform}</span>
                </div>
                <ExpandingButton url={link.url} text="Profile" isExpanded={isExpanded} />
            </div>
            <div className="relative z-10 mt-auto min-h-[96px] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-mono mb-4">
                     {!loading && !data?.error && ( 
                        isPlaying ? (<><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span><span>IN-GAME</span></>) 
                        : isOnline ? (<><span className="w-2 h-2 rounded-full bg-green-500"></span><span>ONLINE</span></>)
                        : (<><span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-outline)]"></span><span>OFFLINE</span></>) 
                     )}
                </div>
                {loading ? 
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="w-3/4 h-5 rounded-md bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                            <div className="w-1/2 h-4 rounded-md bg-[var(--md-sys-color-surface-container-high)] shimmer-bg animate-shimmer"></div>
                        </div>
                    </div> 
                    : data?.error ? 
                    <div className="flex items-center gap-3 text-red-500/80">
                        <span className="material-symbols-rounded">error</span>
                        <span className="font-medium text-sm">Service Unavailable</span>
                    </div> 
                    : isPlaying ? 
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-16 h-16 rounded-lg bg-blue-500/10 flex items-center justify-center overflow-hidden border border-blue-500/20">
                             <img 
                                src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${data.gameid}/header.jpg`} 
                                className="w-full h-full object-cover scale-110" 
                                alt="game" 
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = data.avatar || '';
                                }}
                             />
                        </div>
                        <div className="flex flex-col overflow-hidden flex-1">
                            <p className="font-medium text-base truncate" title={data.gameextrainfo}>{data.gameextrainfo}</p>
                            <p className="text-sm text-[var(--md-sys-color-on-surface-variant)] truncate">Playing now</p>
                        </div>
                    </div> 
                    : 
                    <div className="flex items-center gap-4 text-[var(--md-sys-color-on-surface-variant)]">
                        <div className="w-16 h-16 rounded-lg bg-[var(--md-sys-color-surface-container-high)] flex items-center justify-center overflow-hidden">
                            {data?.avatar ? <img src={data.avatar} className="w-full h-full object-cover grayscale opacity-50" alt="avatar" /> : <span className="material-symbols-rounded text-3xl">person_off</span>}
                        </div>
                        <p className="font-medium">{isOnline ? 'Chilling' : 'Away'}</p>
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
                    if (link.live && link.type === 'spotify') {
                        return <SpotifyNowPlayingCard key={index} link={link} />;
                    }
                    if (link.live && link.type === 'steam') {
                        return <SteamStatusCard key={index} link={link} />;
                    }
                    return <PersonalLinkCard key={index} link={link} />;
                })}
            </div>
        </section>
    );
}

export default PersonalLinks;