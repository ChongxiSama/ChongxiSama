import Image from 'next/image';
import { profile, allLinks, projects } from '@/lib/config';
import { SiteData } from '@/lib/data';
import ChapterTracker from '@/components/ChapterTracker';
import SignalMonitor from '@/components/SignalMonitor';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import TechIcon from '@/components/TechIcon';

const ArchiveCard = ({ children, refCode, id, alt = false, watermarkPos = 'top-right', density = 'normal' }: {
  children: React.ReactNode;
  refCode: string;
  id: string;
  alt?: boolean;
  watermarkPos?: string;
  density?: 'compact' | 'normal' | 'spacious';
}) => {
  const posClass = watermarkPos === 'bottom-left' ? '-bottom-16 -left-16'
    : watermarkPos === 'center-right' ? 'top-1/3 -right-16'
    : watermarkPos === 'top-left' ? '-top-10 -left-16'
    : watermarkPos === 'bottom-right' ? '-bottom-10 -right-16'
    : '-top-10 -right-16';
  const padY = density === 'compact' ? 'py-7' : density === 'spacious' ? 'py-10' : 'py-8';
  return (
    <div id={id} className={`relative w-full ${alt ? 'bg-surface' : 'bg-bg'} paper-texture px-5 ${padY} border-b border-border/10`}>
      <div className={`absolute ${posClass} z-0 pointer-events-none select-none overflow-hidden`}>
        <span className="text-[8px] font-mono text-ghost/30 uppercase tracking-[0.4em]">{refCode}</span>
      </div>
      <div className="relative z-10">{children}</div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] flex overflow-hidden">
        <div className="bg-rl-teal w-1/3 stripe-animate"></div>
        <div className="bg-rl-gold w-1/3 stripe-animate-delay"></div>
        <div className="bg-rl-red w-1/3 stripe-animate-delay-2"></div>
      </div>
    </div>
  );
};

const SectionHeader = ({ id, title }: { id: string; title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <h2 className="text-[9px] font-mono font-black text-muted uppercase tracking-[0.3em]">
      {id} // {title}
    </h2>
    <div className="flex-1 h-[1px] bg-border"></div>
  </div>
);



const TechBar = ({ items }: { items: { name: string; pct: number }[] }) => {
  const colors = ['bg-rl-teal', 'bg-rl-gold', 'bg-rl-red', 'bg-accent', 'bg-ink/60'];
  return (
    <div className="space-y-2">
      <div className="h-[8px] flex overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className={`${colors[i % colors.length]} transition-all duration-700`} style={{ width: `${item.pct}%` }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 flex-shrink-0 ${colors[i % colors.length]}`} />
            <TechIcon name={item.name} className="w-3 h-3 text-ink/50" />
            <span className="font-mono text-[9px] text-ink font-bold uppercase">{item.name}</span>
            <span className="font-mono text-[8px] text-accent font-black tabular-nums">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ArchiveFlow({ data }: { data: SiteData }) {
  const c1 = data.chapters[0];
  const c2 = data.chapters[1];
  const c3 = data.chapters[2];
  const c4 = data.chapters[3];
  const activeLink = allLinks.find(l => l.current);
  const nodeLinks = allLinks.filter(l => !l.current);

  return (
    <ChapterTracker
      chapters={data.chapters}
      brandLabel={data.global.brand_label}
      utcLabel={data.global.utc_label}
    >
      <main className="flex flex-col">
        <div className="w-full md:max-w-[480px] md:mx-auto md:px-4 flex flex-col md:pt-6">
        <ArchiveCard id={`chapter-${c1.id}`} refCode={c1.ref}>
          <AnimateOnScroll>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] flex-shrink-0 border border-border overflow-hidden group">
                <Image src={profile.avatars[0]} alt="Avatar" fill sizes="72px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" priority />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '3px 3px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-10 -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
                <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-ink/30"></div>
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-ink/30"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-[40px] sm:text-[56px] leading-[0.8] tracking-[-0.04em] text-ink uppercase font-black whitespace-nowrap">
                  {profile.name}<span className="text-[28px] opacity-30">.us</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-ghost uppercase tracking-widest">{c1.content?.orcid_prefix}{profile.orcid.id}</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={40}>
            <div className="mb-6">
              <div className="flex flex-wrap gap-1.5">
                {c1.content?.tags.map((tag: string, i: number) => (
                  <span key={i} className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-default ${i === 0 ? 'bg-ink text-bg' : 'border border-ink/60 text-ink hover:bg-ink hover:text-bg'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <div className="space-y-6">
            <AnimateOnScroll delay={80}>
              <section>
                <SectionHeader id="01" title={c1.content?.briefing_title ?? ''} />
                <p className="font-cn text-[13px] leading-[1.7] text-ink">
                  <span className="font-black text-[14px]">{c1.content?.slogan_main}</span><br/>
                  {c1.content?.slogan.map((s: any, i: number) => (
                    <span key={i} className={s.highlight ? "font-black" : ""}>{s.text}</span>
                  ))}
                </p>
              </section>
            </AnimateOnScroll>
            <AnimateOnScroll delay={120}>
              <SignalMonitor title={c1.content?.monitor_title ?? ''} />
            </AnimateOnScroll>
          </div>
        </ArchiveCard>
        <ArchiveCard id={`chapter-${c2.id}`} refCode={c2.ref} alt watermarkPos="bottom-left" density="compact">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-dashed border-border/40"></div>
              <span className="text-[7px] font-mono text-ghost/50 uppercase tracking-[0.5em]">Active_Node</span>
              <div className="flex-1 border-t border-dashed border-border/40"></div>
            </div>
            {activeLink && (
              <AnimateOnScroll>
                <a href={activeLink.url} target="_blank" rel="noreferrer"
                   className="group block py-3 px-3 -mx-2 transition-all duration-300 border-l-2 border-l-accent bg-accent/[0.04] relative hover:bg-accent/[0.08]">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-6 h-6 flex-shrink-0 text-accent transition-colors">
                      <TechIcon name={activeLink.icon} className="w-6 h-6" />
                    </div>
                    <span className="font-display text-[28px] text-ink uppercase leading-none font-black group-hover:text-accent transition-colors">
                      {activeLink.name}
                    </span>
                    <span className="text-[7px] font-mono text-accent font-black uppercase tracking-widest status-pulse ml-1">● CURRENT</span>
                  </div>
                  <div className="flex items-center gap-2 ml-[34px]">
                    <span className="font-mono text-[10px] text-muted transition-colors group-hover:text-ink">{activeLink.url.replace('https://', '').replace('mailto:', '')}</span>
                    <span className="font-display text-base text-accent group-hover:translate-x-1 transition-transform font-black ml-auto">→</span>
                  </div>
                </a>
              </AnimateOnScroll>
            )}
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-dashed border-border/40"></div>
              <span className="text-[7px] font-mono text-ghost/50 uppercase tracking-[0.5em]">Network_Nodes</span>
              <div className="flex-1 border-t border-dashed border-border/40"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {nodeLinks.map((link: any, idx: number) => (
                <AnimateOnScroll key={idx} delay={idx * 60}>
                  <a href={link.url} target="_blank" rel="noreferrer"
                     className="group block py-2.5 px-2.5 border border-border/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-accent/40 hover:border-l-2 hover:border-l-accent relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 flex-shrink-0 text-ink/40 group-hover:text-accent transition-colors">
                        <TechIcon name={link.icon} className="w-4 h-4" />
                      </div>
                      <span className="font-display text-[16px] text-ink uppercase leading-none font-black group-hover:text-accent transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-[24px]">
                      <span className="inline-block w-[4px] h-[4px] rounded-full bg-ghost/30"></span>
                      <span className="font-mono text-[8px] text-muted transition-colors group-hover:text-ink truncate">{link.desc || link.url.replace('https://', '').replace('mailto:', '')}</span>
                    </div>
                    <div className="absolute top-1.5 right-1.5">
                      <span className="text-[6px] font-mono text-ghost/30 uppercase tracking-widest">{link.type}</span>
                    </div>
                  </a>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </ArchiveCard>
        <ArchiveCard id={`chapter-${c3.id}`} refCode={c3.ref} alt watermarkPos="top-left" density="compact">
          <div className="space-y-4">
            {c3.tech_groups?.map((group: any, idx: number) => (
              <AnimateOnScroll key={idx} delay={idx * 60}>
                <div>
                  <SectionHeader id={`0${idx + 1}`} title={group.title} />
                  <TechBar items={group.items} />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </ArchiveCard>
        <ArchiveCard id={`chapter-${c4.id}`} refCode={c4.ref} watermarkPos="bottom-right">
          <div className="space-y-6">
            {projects?.map((proj: any, idx: number) => (
              <AnimateOnScroll key={idx} delay={idx * 60}>
                <div className="group relative -mx-5 px-5 py-4 transition-all duration-300 overflow-hidden hover:bg-surface/30">
                  <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-[2px] transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[8px] font-mono text-ghost/50 font-bold">PRJ</span>
                      <h3 className="font-display text-[24px] text-ink uppercase leading-none font-black group-hover:text-accent transition-colors">
                        {proj.title}
                      </h3>
                      <span className="ml-auto px-1.5 py-0.5 text-[8px] font-mono font-bold bg-accent text-white uppercase tracking-widest">
                        {proj.status}
                      </span>
                    </div>
                    <div className="border-t border-border/30 my-2 transition-all duration-300 group-hover:border-accent/30"></div>
                    <p className="font-cn text-[13px] text-ink leading-relaxed mb-3 text-justify">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.tech.map((t: string) => (
                        <span key={t} className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono border border-ink/20 text-muted uppercase tracking-widest">
                          <TechIcon name={t} className="w-3 h-3" />
                          {t}
                        </span>
                      ))}
                    </div>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 group/link">
                        <span className="font-mono text-[9px] font-bold text-ink uppercase tracking-[0.2em]">{c4.deployment_label}</span>
                        <span className="font-display text-lg text-accent group-hover/link:translate-x-1 transition-transform font-black">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </ArchiveCard>
        <ArchiveCard id="donate" refCode="Support_Ref" density="compact">
          <div className="absolute top-2 right-3 pointer-events-none select-none">
            <span className="text-[7px] font-mono text-ghost/20 uppercase tracking-[0.5em]">TRANSMISSION_AUTHORIZED</span>
          </div>
          <AnimateOnScroll>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-[8px] bg-accent" />
                <span className="text-[9px] font-mono tracking-[0.25em] font-semibold text-ink uppercase">Support</span>
              </div>
              <p className="font-cn text-[12px] text-ink leading-relaxed">
                Buy me a coffee to keep the servers running.
              </p>
              <a href="https://xice.cx/donate/" target="_blank" rel="noopener noreferrer"
                 className="group relative border border-border bg-bg w-full text-center py-2.5 px-6 text-[9px] font-mono font-black uppercase tracking-[0.35em] overflow-hidden transition-all duration-300 hover:bg-ink hover:text-bg">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-ink" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-ink" />
                Buy Me A Coffee
              </a>
            </div>
          </AnimateOnScroll>
        </ArchiveCard>
        <div className="relative w-full bg-ink paper-texture px-5 py-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/footer-bg.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          <div className="absolute z-10 -top-1 -left-1 w-3 h-3 border-t border-l border-bg/40"></div>
          <div className="absolute z-10 -bottom-1 -right-1 w-3 h-3 border-b border-r border-bg/40"></div>
          <div className="absolute inset-0 z-[2] paper-texture opacity-20 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="text-sm text-right text-bg/60 font-novecento">
              Copyright &copy; {new Date().getFullYear()} <span className="text-accent">Chongxi &amp; CEPATO</span><br/>
              <span className="opacity-50">Powered by</span>
              <a className="text-accent font-medium hover:underline transition" href="https://nextjs.org" target="_blank" rel="noreferrer"> Next.js</a>
              <span className="opacity-50"> &amp; </span>
              <a className="text-accent font-medium hover:underline transition" href="https://github.com/ChongxiSama" target="_blank" rel="noreferrer"> CEPATO</a>
              <span className="text-[0.65rem] opacity-30 mt-2 block uppercase tracking-widest">Non-Collaborative_Entity // Protocol_V.4.21</span>
              <span className="text-[0.6rem] opacity-20 mt-1 block uppercase tracking-widest">MoeICP: NO. 20250591 // Verified</span>
            </div>
          </div>
        </div>

      </div></main>
    </ChapterTracker>
  );
}
