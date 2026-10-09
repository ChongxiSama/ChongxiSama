import AnimateOnScroll from "@/components/AnimateOnScroll";
import LinkMatrix from "@/components/LinkMatrix";
import ProjectList from "@/components/ProjectList";
import SectionHeading from "@/components/SectionHeading";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StatusSection from "@/components/StatusSection";
import SupportBlock from "@/components/SupportBlock";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-16 xl:px-20">
        <div className="focus-in stagger-1 mb-6 flex gap-1.5 sm:mb-8" aria-hidden="true">
          <span className="h-2.5 w-2.5 bg-teal" />
          <span className="h-2.5 w-2.5 bg-ochre" />
          <span className="h-2.5 w-2.5 bg-crimson" />
          <span className="h-2.5 w-2.5 bg-sienna" />
        </div>

        <SiteHeader />

        <AnimateOnScroll className="mb-10 sm:mb-12 md:mb-16">
          <StatusSection />
        </AnimateOnScroll>

        <AnimateOnScroll className="mb-10 sm:mb-12 md:mb-16">
          <section aria-labelledby="links-heading">
            <SectionHeading id="links-heading" index="02" title="Links" meta="6 external nodes" />
            <LinkMatrix />
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll className="mb-10 sm:mb-12 md:mb-16">
          <section aria-labelledby="stack-heading">
            <SectionHeading id="stack-heading" index="03" title="Tech Stack" meta="Production share" />
            <TechStack />
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll className="mb-10 sm:mb-12 md:mb-16">
          <section aria-labelledby="projects-heading">
            <SectionHeading
              id="projects-heading"
              index="04"
              title="Projects"
              meta="GitHub repositories"
            />
            <ProjectList />
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll className="mb-10 sm:mb-12 md:mb-16">
          <SupportBlock />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <SiteFooter />
        </AnimateOnScroll>
      </div>
    </div>
  );
}
