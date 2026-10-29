import AboutSection from "@/components/AboutSection";
import Chapter from "@/components/Chapter";
import GridGuides from "@/components/GridGuides";
import HeroPanel from "@/components/HeroPanel";
import LinkMatrix from "@/components/LinkMatrix";
import ProjectList from "@/components/ProjectList";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import StatusSection from "@/components/StatusSection";
import SupportBlock from "@/components/SupportBlock";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div id="top" className="min-h-dvh bg-void">
      <SiteNav />

      <main className="w-full">
        <article className="card">
          <HeroPanel />

          <div className="px-6 py-10 sm:px-10 md:px-16 md:py-14 xl:px-24">
            <Chapter id="about" index="01" title="About">
              <AboutSection />
            </Chapter>

            <Chapter id="signals" index="02" title="Signals">
              <StatusSection />
            </Chapter>

            <Chapter id="links" index="03" title="Links">
              <LinkMatrix />
            </Chapter>

            <Chapter id="stack" index="04" title="Stack">
              <TechStack />
            </Chapter>

            <Chapter id="work" index="05" title="Work">
              <ProjectList />
            </Chapter>

            <SupportBlock />

            <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-carbon/15 pt-4">
              <span className="deco text-[8px] text-muted">CEPATO Technical Note · 2026</span>
              <span className="font-mono text-[10px] text-muted">
                chongxi.us / 0009-0007-9348-1534
              </span>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
      <GridGuides />
    </div>
  );
}
