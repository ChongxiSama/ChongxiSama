"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { profile, connectLinks, dashboard } from '@/lib/config';
import SideIndicator from '@/components/layout/SideIndicator';
import { SiteData } from '@/lib/data';

const ArchiveCard = ({ children, title, chapter, refCode, meta, watermark, id }: {
  children: React.ReactNode;
  title: string;
  chapter: string;
  refCode: string;
  meta: string;
  watermark: string;
  id: string;
}) => (
  <div id={id} className="relative w-full bg-lt-bg paper-texture px-6 md:px-16 py-12 md:py-16 overflow-hidden animate-enter border-b border-lt-border/10">
    <div className="absolute -top-10 -right-20 pointer-events-none select-none z-0">
      <span className="font-display text-[200px] sm:text-[320px] text-lt-ink opacity-[0.03] leading-none uppercase">
        {watermark}
      </span>
    </div>

    <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start mb-12 sm:mb-20 border-b border-lt-border pb-4 gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[10px] bg-lt-accent"></div>
          <span className="text-[11px] font-mono tracking-[0.2em] font-semibold text-lt-ink uppercase">
            {chapter} // {title}
          </span>
        </div>
        <div className="text-[11px] font-mono text-lt-ghost uppercase tracking-widest">
          {refCode}
        </div>
      </div>
      <div className="text-left sm:text-right text-[11px] font-mono text-lt-muted uppercase tracking-[0.3em]">
        {meta}
      </div>
    </div>

    <div className="relative z-10">{children}</div>

    <div className="absolute bottom-0 left-0 right-0 h-[3px] flex">
      <div className="bg-rl-teal w-1/3"></div>
      <div className="bg-rl-gold w-1/3"></div>
      <div className="bg-rl-red w-1/3"></div>
    </div>
  </div>
);

const SectionHeader = ({ id, title }: { id: string; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <h2 className="text-[11px] font-mono font-black text-lt-muted uppercase tracking-[0.3em]">
      {id} // {title}
    </h2>
    <div className="flex-1 h-[1px] bg-lt-border"></div>
  </div>
);

const RpStamp = () => (
  <div className="rp-stamp">
    <span className="r">R</span>
    <span className="p">P</span>
  </div>
);

const SyncProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const duration = 4000; 
    const start = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const easedT = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(easedT * 100));
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="grid grid-cols-20 gap-[3px]">
        {Array.from({ length: 20 }).map((_, i) => {
          const threshold = (i + 1) * (100 / 20);
          const isActive = progress >= threshold;
          return (
            <div key={i} className={`w-1 h-1.5 rounded-[0.5px] transition-colors duration-300 ${isActive ? 'bg-lt-accent shadow-[0_0_4px_rgba(212,98,26,0.4)]' : 'bg-lt-ink/10'}`}></div>
          );
        })}
      </div>
      <span className="font-mono text-[10px] text-lt-accent font-black tabular-nums tracking-tighter">
        {progress.toString().padStart(3, '0')}%
      </span>
    </div>
  );
};

const SignalMonitor = ({ title }: { title: string }) => {
  const [spotify, setSpotify] = useState<{ isPlaying: boolean; title?: string; artist?: string }>({ isPlaying: false });
  const [steam, setSteam] = useState<{ personastate?: number; gameextrainfo?: string }>({});
  const [bilibili, setBilibili] = useState<{ title?: string; progress?: number; duration?: number; bvid?: string; view_at?: string }>({});

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [spotRes, steamRes, biliRes] = await Promise.all([
          fetch('/api/spotify/now-playing'),
          fetch('/api/steam/status'),
          fetch('/api/bilibili/recent')
        ]);
        
        const spotData = await spotRes.json();
        setSpotify(spotData);
        
        const steamData = await steamRes.json();
        setSteam(steamData);

        const biliData = await biliRes.json();
        setBilibili(biliData);
      } catch (e) {}
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getBiliStatus = () => {
    if (!bilibili.title || !bilibili.view_at) return null;
    
    const diff = (Date.now() - new Date(bilibili.view_at).getTime()) / 1000;
    const isLive = diff < 180;
    const percent = bilibili.progress === -1 ? 100 : Math.floor(((bilibili.progress || 0) / (bilibili.duration || 1)) * 100);
    
    return { isLive, percent };
  };

  const status = getBiliStatus();

  return (
    <section className="mt-12">
      <SectionHeader id="02" title={title} />
      <div className="space-y-0">
        <div className="flex items-center justify-between py-4 border-b border-lt-border">
          <span className="font-mono text-[11px] text-lt-ghost font-bold uppercase tracking-widest">SPT · Now Playing</span>
          <span className={`font-display text-[15px] uppercase font-black transition-colors ${spotify.isPlaying ? 'text-lt-accent' : 'text-lt-ghost'}`}>
            {spotify.isPlaying ? (
              <>{spotify.title} <span className="text-[10px] font-normal opacity-70">- {spotify.artist}</span></>
            ) : 'Offline'}
          </span>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-lt-border">
          <span className="font-mono text-[11px] text-lt-ghost font-bold uppercase tracking-widest">STM · In Session</span>
          <span className={`font-display text-[15px] uppercase font-black transition-colors ${steam.personastate && steam.personastate > 0 ? 'text-lt-accent' : 'text-lt-ghost'}`}>
            {steam.gameextrainfo ? steam.gameextrainfo : (steam.personastate && steam.personastate > 0 ? 'Online' : 'Offline')}
          </span>
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-[11px] text-lt-ghost font-bold uppercase tracking-widest">BILI ·</span>
            {!status ? (
              <span className="font-mono text-[11px] text-lt-ghost font-bold uppercase tracking-widest">Recent</span>
            ) : status.isLive ? (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-lt-accent font-black uppercase tracking-widest">Live</span>
                <span className="text-lt-accent opacity-50">•</span>
                <span className="font-mono text-[10px] text-lt-accent font-black">{status.percent}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-lt-ghost font-bold uppercase tracking-widest">Recent</span>
                <span className="text-lt-ghost opacity-50">•</span>
                <span className="font-mono text-[10px] text-lt-ghost font-bold">{status.percent}%</span>
              </div>
            )}
          </div>
          {bilibili.title ? (
            <div className="flex-1 ml-8 overflow-hidden relative">
              <a 
                href={`https://www.bilibili.com/video/${bilibili.bvid}`} 
                target="_blank" 
                rel="noreferrer"
                className="group/bili block text-right overflow-hidden whitespace-nowrap"
              >
                <div className="inline-block hover:underline">
                  <span className="font-display text-[13px] uppercase font-black text-lt-accent animate-marquee pr-24">
                    {bilibili.title}
                  </span>
                  <span className="font-display text-[13px] uppercase font-black text-lt-accent animate-marquee pr-24">
                    {bilibili.title}
                  </span>
                </div>
              </a>
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-lt-bg to-transparent pointer-events-none z-10"></div>
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-lt-bg to-transparent pointer-events-none z-10"></div>
            </div>
          ) : (
            <span className="font-display text-[15px] uppercase font-black text-lt-ghost">Offline</span>
          )}
        </div>
      </div>
    </section>
  );
};

const FieldReport = ({ syncLabel, datePrefix }: { syncLabel: string; datePrefix: string }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const RSS_URL = 'https://xice.cx/atom.xml';
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
        const data = await res.json();
        if (data.status === 'ok') setItems(data.items.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchRSS();
  }, []);

  if (loading) return <div className="text-lt-ghost font-mono text-[11px] animate-pulse">{syncLabel}</div>;

  return (
    <div className="space-y-0">
      {items.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noreferrer" 
           className="block group relative py-8 border-b border-lt-border last:border-0 -mx-4 px-4 transition-all duration-300 hover:bg-lt-surface/50 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-0 bg-lt-accent group-hover:w-[2px] transition-all duration-300"></div>
          
          <div className="relative z-10 flex gap-4 items-start mb-3 transition-transform duration-300 group-hover:translate-x-1">
            <span className="text-[11px] font-mono text-lt-ghost uppercase font-bold flex-shrink-0 mt-1">RPT_0{idx + 1}</span>
            <h3 className="font-display text-[20px] text-lt-ink uppercase leading-tight tracking-tight group-hover:text-lt-accent transition-colors line-clamp-2 font-black">
              {item.title}
            </h3>
          </div>
          <span className="block text-[11px] font-mono text-lt-ghost uppercase mb-3 ml-[52px] transition-transform duration-300 group-hover:translate-x-1">
            {datePrefix}{new Date(item.pubDate).toLocaleDateString('zh-CN').replace(/\//g, '.')}
          </span>
          <div className="relative z-10 flex justify-between items-end gap-12 ml-[52px] transition-transform duration-300 group-hover:translate-x-1">
            <p className="font-cn text-[15px] text-lt-muted leading-relaxed line-clamp-2 text-justify">
              {item.description.replace(/<[^>]*>?/gm, '').slice(0, 120)}...
            </p>
            <span className="font-display text-2xl text-lt-accent group-hover:translate-x-1 transition-transform font-black">→</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default function ArchiveFlow({ data }: { data: SiteData }) {
  const [activeChapter, setActiveChapter] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const chapterNum = parseInt(id.split('-')[1]);
            setActiveChapter(chapterNum);
          }
        });
      },
      { threshold: 0.3 }
    );
    const cards = document.querySelectorAll('[id^="chapter-"]');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const c1 = data.chapters[0];
  const c2 = data.chapters[1];
  const c3 = data.chapters[2];
  const c4 = data.chapters[3];
  const c5 = data.chapters[4];
  const c6 = data.chapters[5];

  const formatHandle = (platform: string, url: string) => {
    if (platform === 'Bilibili') {
      const match = url.match(/space\/(\d+)/);
      return match ? `${c2.uid_label}${match[1]}` : url.split('/').pop();
    }
    return url.split('/').pop() || url;
  };

  return (
    <>
      <SideIndicator 
        activeChapter={activeChapter} 
        chapters={data.chapters} 
        brandLabel={data.global.brand_label} 
        utcLabel={data.global.utc_label} 
      />
      
      <main className="flex flex-col items-center md:ml-12">
        <div className="w-full md:max-w-[840px] md:mx-auto flex flex-col pt-8 md:pt-16">
        
        <ArchiveCard 
          id={`chapter-${c1.id}`}
          chapter={`Chapter_${c1.label}`} 
          title={c1.title} 
          refCode={c1.ref} 
          meta={c1.meta} 
          watermark={c1.watermark}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="w-full md:w-[240px] flex-shrink-0">
              <div className="flex items-center justify-between mb-4 border-b border-lt-border pb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[9px] font-mono text-lt-ghost uppercase tracking-widest">Lv</span>
                  <span className="text-[11px] font-mono font-black text-lt-accent uppercase">{c1.content?.clearance}</span>
                </div>
                <SyncProgress />
              </div>
              <div className="aspect-[3/4] w-full bg-lt-surface border border-lt-border relative overflow-hidden group">
                <Image 
                  src={profile.avatars[0]} 
                  alt="Avatar" 
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover grayscale opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '4px 4px' }}></div>
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-lt-ink/20"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-lt-ink/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lt-accent/5 to-transparent h-20 -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-14">
                <div className="mb-2">
                  <span className="text-[11px] font-mono text-lt-ghost uppercase tracking-widest">{c1.content?.orcid_prefix}{profile.orcid.id}</span>
                </div>
                <h1 className="font-display text-[56px] sm:text-[72px] leading-[0.8] tracking-tighter text-lt-ink uppercase font-black">
                  {profile.name}
                </h1>
                <div className="mt-2">
                  <span className="text-[32px] font-display text-lt-ink opacity-20 uppercase leading-none font-black">{c1.content?.role_prefix}{c1.content?.role}</span>
                </div>
                <div className="mt-8 flex gap-2">
                  {c1.content?.tags.map((tag: string, i: number) => (
                    <span key={i} className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 cursor-default ${i === 0 ? 'bg-lt-ink text-lt-bg' : 'border border-lt-ink text-lt-ink hover:bg-lt-ink hover:text-lt-bg'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-12">
                <section>
                  <SectionHeader id="01" title={c1.content?.briefing_title} />
                  <p className="font-cn text-[15px] leading-[1.75] text-lt-ink text-justify">
                    <span className="font-black">{c1.content?.slogan_main}</span><br/>
                    {c1.content?.slogan.map((s: any, i: number) => (
                      <span key={i} className={s.highlight ? "font-black" : ""}>{s.text}</span>
                    ))}
                  </p>
                </section>
                <SignalMonitor title={c1.content.monitor_title} />
              </div>
            </div>
          </div>
        </ArchiveCard>

        <ArchiveCard 
          id={`chapter-${c2.id}`}
          chapter={`Chapter_${c2.label}`} 
          title={c2.title} 
          refCode={c2.ref} 
          meta={c2.meta} 
          watermark={c2.watermark}
        >
          <div className="space-y-10">
            {connectLinks.filter((l: any) => l.platform !== 'Email').map((link: any, idx: number) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer" 
                 className="block group relative -mx-4 px-4 py-2 transition-all duration-300 hover:bg-lt-surface/50 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-lt-accent group-hover:w-[2px] transition-all duration-300"></div>
                
                <div className="flex gap-4 items-baseline mb-2 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-[11px] font-mono text-lt-ghost uppercase font-bold">
                    {link.platform.substring(0, 2).toUpperCase()}_0{idx + 1}
                  </span>
                  <span className="font-display text-[42px] sm:text-[48px] text-lt-ink uppercase leading-none font-black group-hover:text-lt-accent transition-colors">
                    {link.platform}
                  </span>
                </div>
                <div className="border-t border-lt-border my-2 transition-all duration-300 group-hover:border-lt-accent/30"></div>
                <div className="flex justify-between items-center transition-transform duration-300 group-hover:translate-x-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-lt-muted transition-colors group-hover:text-lt-ink">{formatHandle(link.platform, link.url)}</span>
                    <span className="text-[9px] font-mono text-lt-muted uppercase tracking-widest">{c2.active_label}</span>
                  </div>
                  <span className="font-display text-2xl text-lt-accent group-hover:translate-x-1 transition-transform font-black">→</span>
                </div>
              </a>
            ))}
          </div>
        </ArchiveCard>

        <ArchiveCard 
          id={`chapter-${c3.id}`}
          chapter={`Chapter_${c3.label}`} 
          title={c3.title} 
          refCode={c3.ref} 
          meta={c3.meta} 
          watermark={c3.watermark}
        >
          <FieldReport syncLabel={c3.sync_label} datePrefix={c3.date_prefix} />
        </ArchiveCard>

        <ArchiveCard 
          id={`chapter-${c4.id}`}
          chapter={`Chapter_${c4.label}`} 
          title={c4.title} 
          refCode={c4.ref} 
          meta={c4.meta} 
          watermark={c4.watermark}
        >
          <div className="space-y-10">
            {c4.links.map((link: any, idx: number) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer" 
                 className="block group relative -mx-4 px-4 py-2 transition-all duration-300 hover:bg-lt-surface/50 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-lt-accent group-hover:w-[2px] transition-all duration-300"></div>
                
                <div className="flex gap-4 items-baseline mb-2 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-[11px] font-mono text-lt-ghost uppercase font-bold">
                    NAV_0{idx + 1}
                  </span>
                  <span className="font-display text-[42px] sm:text-[48px] text-lt-ink uppercase leading-none font-black group-hover:text-lt-accent transition-colors">
                    {link.name}
                  </span>
                </div>
                <div className="border-t border-lt-border my-2 transition-all duration-300 group-hover:border-lt-accent/30"></div>
                <div className="flex justify-between items-center transition-transform duration-300 group-hover:translate-x-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-lt-muted transition-colors group-hover:text-lt-ink">
                      {link.url}
                    </span>
                    {link.current && (
                      <span className="text-[9px] font-mono text-lt-accent font-black uppercase tracking-widest">
                        ● CURRENT
                      </span>
                    )}
                  </div>
                  <span className="font-display text-2xl text-lt-accent group-hover:translate-x-1 transition-transform font-black">→</span>
                </div>
              </a>
            ))}
          </div>
        </ArchiveCard>

        <ArchiveCard 
          id={`chapter-${c5.id}`}
          chapter={`Chapter_${c5.label}`} 
          title={c5.title} 
          refCode={c5.ref} 
          meta={c5.meta} 
          watermark={c5.watermark}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {c5.sections.map((sec: any, idx: number) => (
              <div key={idx}>
                <SectionHeader id={`0${idx + 1}`} title={sec.title} />
                <ul className="space-y-5 font-mono text-[13px] text-lt-ink">
                  {sec.items.map((item: any, i: number) => (
                    <li key={i} className="flex justify-between items-baseline border-b border-lt-border/30 pb-1 hover:border-lt-accent/30 transition-colors group cursor-default">
                      <span className="font-bold group-hover:text-lt-accent transition-colors">{item.name.toUpperCase()}</span>
                      <span className="text-lt-ghost tracking-[0.2em] text-[10px] font-bold">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-2">
              <SectionHeader id="03" title="Archive_Ref" />
              <div className="flex items-center gap-6 bg-lt-surface/30 p-6 border border-lt-border">
                <RpStamp />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-lt-ghost uppercase font-bold mb-1">{c5.archive_id.label}</p>
                    <p className="font-display text-xl text-lt-ink uppercase font-black tracking-tight">{c5.archive_id.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-lt-ghost uppercase font-bold mb-1">{c5.archive_id.clearance_label}</p>
                    <p className="font-mono text-xs text-lt-accent font-black tracking-widest uppercase">{c5.archive_id.clearance_value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ArchiveCard>

        <ArchiveCard 
          id={`chapter-${c6.id}`}
          chapter={`Chapter_${c6.label}`} 
          title={c6.title} 
          refCode={c6.ref} 
          meta={c6.meta} 
          watermark={c6.watermark}
        >
          <div className="space-y-16">
            {dashboard.projects?.map((proj: any, idx: number) => (
              <div key={idx} className="group relative -mx-4 px-4 py-8 hover:bg-lt-surface/30 transition-all duration-300 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-lt-accent group-hover:w-[2px] transition-all duration-300"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-4 transition-transform duration-300 group-hover:translate-x-1">
                  <div className="flex gap-4 items-baseline">
                    <span className="text-[11px] font-mono text-lt-ghost uppercase font-bold">PRJ_0{idx + 1}</span>
                    <h3 className="font-display text-[32px] text-lt-ink uppercase leading-none font-black group-hover:text-lt-accent transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-lt-accent text-white rounded-sm uppercase tracking-widest">
                      {proj.status}
                    </span>
                  </div>
                </div>
                <div className="border-t border-lt-border my-6 transition-all duration-300 group-hover:border-lt-accent/30"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 transition-transform duration-300 group-hover:translate-x-1">
                  <div className="max-w-xl">
                    <p className="font-cn text-[15px] text-lt-ink leading-relaxed mb-8 text-justify">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t: string) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-mono border border-lt-ink/30 text-lt-muted rounded-sm uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-3 self-end sm:self-auto group/link">
                      <span className="font-mono text-[11px] font-bold text-lt-ink uppercase tracking-[0.2em]">{c6.deployment_label}</span>
                      <span className="font-display text-3xl text-lt-ink group-hover/link:translate-x-1 transition-transform font-black text-lt-accent">→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ArchiveCard>

        <div className="relative w-full bg-lt-bg paper-texture px-6 md:px-16 py-12 md:py-16 overflow-hidden border-b border-lt-border/10">
          <div className="absolute top-0 right-0 p-4 opacity-[0.04] pointer-events-none">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2,21V19H20V21H2M20,7H17V3H20V7M17,17H6V9H17V17Z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-[10px] bg-lt-accent" />
                <span className="text-[11px] font-mono tracking-[0.2em] font-semibold text-lt-ink uppercase">
                  Donation_Channel
                </span>
              </div>
            </div>

            <p className="font-cn text-[15px] text-lt-ink leading-relaxed">
              Financial support helps keep the servers online and the research ongoing.
            </p>

            <a href="https://xice.cx/donate/" target="_blank" rel="noopener noreferrer" 
               className="group relative border border-lt-border bg-lt-bg w-full text-center py-3 px-6 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink" />
              Donate
            </a>
          </div>
        </div>

        <div className="relative w-full bg-lt-ink paper-texture px-6 md:px-16 py-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/footer-bg.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          <div className="absolute z-10 -top-1 -left-1 w-3 h-3 border-t border-l border-lt-bg/40"></div>
          <div className="absolute z-10 -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-bg/40"></div>
          <div className="absolute inset-0 z-[2] paper-texture opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-sm text-right text-lt-bg/60 font-novecento">
              Copyright &copy; {new Date().getFullYear()} <span className="text-lt-accent">Chongxi &amp; CEPATO</span><br/>
              <span className="opacity-50">Powered by</span>
              <a className="text-lt-accent font-medium hover:underline transition" href="https://nextjs.org" target="_blank" rel="noreferrer"> Next.js</a>
              <span className="opacity-50"> &amp; </span>
              <a className="text-lt-accent font-medium hover:underline transition" href="https://github.com/ChongxiSama" target="_blank" rel="noreferrer"> CEPATO</a>
              <span className="text-[0.65rem] opacity-30 mt-3 block uppercase tracking-widest">Non-Collaborative_Entity // Protocol_V.4.21</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[3px] flex z-10">
            <div className="bg-rl-teal w-1/3"></div>
            <div className="bg-rl-gold w-1/3"></div>
            <div className="bg-rl-red w-1/3"></div>
          </div>
        </div>

      </div></main>
    </>
  );
}
