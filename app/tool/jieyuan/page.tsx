import type { Metadata } from "next";
import JieYuanFilter from "@/components/JieYuanFilter";

export const metadata: Metadata = {
  title: "JieYuan Generator - Chongxi's Homepage",
  description: "Jie Yuan style image generator",
};

export default function JieYuanPage() {
  return (
    <div className="min-h-screen bg-[#D6D0C2] flex flex-col items-center">
      <div className="relative w-full bg-lt-ink paper-texture overflow-hidden">
        <div className="absolute -top-4 md:-top-10 -right-8 md:-right-20 pointer-events-none select-none">
          <span className="font-display text-[32px] md:text-[120px] text-lt-bg opacity-[0.03] leading-none uppercase whitespace-nowrap">
            AD ASTRA PER ASPERA
          </span>
        </div>

        <div className="relative z-10 max-w-[840px] mx-auto px-6 md:px-16 py-8 md:py-10">
          <div className="flex justify-between items-center mb-10 md:mb-12">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-[10px] bg-lt-accent"></div>
              <span className="font-mono text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-lt-bg/70">
                Chongxi // Tools
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-lt-bg/40">
                jieyuan.generator
              </span>
            </div>
          </div>

          <h1 className="font-cn text-[38px] md:text-[64px] leading-[1.1] md:leading-[0.85] tracking-tight md:tracking-tighter text-lt-bg font-black mb-6">
            界园风格图片生产器
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-lt-bg/10">
            <p className="font-cn text-[11px] text-lt-bg/40 tracking-[0.2em]">
              循此苦旅 直抵群星
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] flex z-10">
          <div className="bg-rl-teal w-1/3"></div>
          <div className="bg-rl-gold w-1/3"></div>
          <div className="bg-rl-red w-1/3"></div>
        </div>
      </div>

      <div className="w-full max-w-[840px] mx-auto flex flex-col">
        <section className="relative w-full bg-lt-bg paper-texture px-6 md:px-16 py-12 md:py-16 overflow-hidden">
          <div className="absolute -top-10 -right-20 pointer-events-none select-none">
            <span className="font-display text-[150px] md:text-[320px] text-lt-ink opacity-[0.03] leading-none uppercase">
              JIEYUAN
            </span>
          </div>

          <JieYuanFilter />

          <div className="absolute bottom-0 left-0 right-0 h-[3px] flex z-10">
            <div className="bg-rl-teal w-1/3"></div>
            <div className="bg-rl-gold w-1/3"></div>
            <div className="bg-rl-red w-1/3"></div>
          </div>
        </section>

        <div className="relative w-full bg-lt-ink paper-texture px-6 md:px-16 py-12 overflow-hidden -mt-12 md:-mt-16">
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

        </div>
      </div>
    </div>
  );
}
