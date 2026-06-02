import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "界园风格图片生产器 - Chongxi's Homepage",
  description: "Jie Yuan style image generator tool",
};

export default function JieYuanPage() {
  return (
    <div className="min-h-screen bg-[#D6D0C2] py-16 md:py-24 flex flex-col items-center gap-12 px-4">
      <div className="relative w-full max-w-[840px] bg-lt-ink paper-texture shadow-2xl px-6 md:px-16 py-8 md:py-10 overflow-hidden">
        <div className="absolute -top-4 md:-top-10 -right-8 md:-right-20 pointer-events-none select-none">
          <span className="font-display text-[32px] md:text-[120px] text-lt-bg opacity-[0.03] leading-none uppercase whitespace-nowrap">
            AD ASTRA PER ASPERA
          </span>
        </div>

        <div className="relative z-10 flex justify-between items-center mb-10 md:mb-12">
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

        <div className="relative z-10">
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

      <div className="relative w-full max-w-[840px] bg-lt-bg paper-texture shadow-2xl px-6 md:px-16 py-12 md:py-16 overflow-hidden min-h-[400px]">
        <div className="absolute -top-4 md:-top-10 -right-8 md:-right-20 pointer-events-none select-none">
          <span className="font-display text-[32px] md:text-[120px] text-lt-ink opacity-[0.03] leading-none uppercase whitespace-nowrap">
            JIEYUAN
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-[3px] h-[10px] bg-lt-accent"></div>
            <span className="text-[11px] font-mono tracking-[0.2em] font-semibold text-lt-ink uppercase">
              Workshop // Pending
            </span>
          </div>
          <p className="font-cn text-[15px] text-lt-muted text-center leading-relaxed max-w-md">
            功能开发中，敬请期待
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] flex z-10">
          <div className="bg-rl-teal w-1/3"></div>
          <div className="bg-rl-gold w-1/3"></div>
          <div className="bg-rl-red w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
