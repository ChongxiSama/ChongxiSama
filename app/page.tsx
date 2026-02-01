import Hero from '@/components/Hero';
import ProfileCard from '@/components/ProfileCard';
import ConnectGrid from '@/components/ConnectGrid';
import PersonalLinks from '@/components/PersonalLinks';
import ProjectGrid from '@/components/ProjectGrid';
import ActivitySection from '@/components/ActivitySection';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <main className="w-full max-w-[1440px] px-4 sm:px-6 md:px-12 flex flex-col gap-24 pb-32 pt-20 relative z-10">
      <Hero />
      
      <div className="flex flex-col gap-24 -mt-12">
          <ScrollReveal delay={0}>
            <ProfileCard />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ConnectGrid />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <PersonalLinks />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ProjectGrid />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ActivitySection />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Dashboard />
          </ScrollReveal>
      </div>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </main>
  );
}