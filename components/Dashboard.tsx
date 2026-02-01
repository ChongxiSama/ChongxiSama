import React from 'react';
import { dashboard, sections } from '@/lib/config';

const Dashboard: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-center gap-4 mb-12">
         <span className="h-px flex-1 bg-[var(--md-sys-color-outline-variant)]/50"></span>
         <h2 className="text-[24px] sm:text-[32px] font-[500] text-[var(--md-sys-color-on-surface)]">{sections.dashboard}</h2>
         <span className="h-px w-12 bg-[var(--md-sys-color-outline-variant)]/50"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Status */}
            <div className="lg:col-span-4 bg-[var(--md-sys-color-surface-container)] rounded-[28px] p-8 flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[var(--md-sys-color-tertiary-container)] text-[var(--md-sys-color-on-tertiary-container)]">
                        <span className="material-symbols-rounded">dns</span>
                    </div>
                    <h4 className="text-xl font-medium">Uplink Status</h4>
                </div>
                
                <div className="flex flex-col gap-2">
                    {dashboard.servers.map((server: any, i: number) => (
                        <div 
                            key={server.name} 
                            className="group hover-state relative flex items-center justify-between p-4 rounded-xl ripple-root bg-[var(--md-sys-color-surface)] border border-transparent hover:border-[var(--md-sys-color-outline-variant)]/30 transition-all duration-medium ease-emphasized overflow-hidden"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="state-layer text-[var(--md-sys-color-on-surface)]"></div>
                            <span className="font-mono text-sm uppercase relative z-10">{server.name}</span>
                            <div className="flex items-center gap-2 relative z-10">
                                <span className={`w-2.5 h-2.5 rounded-full ${server.connected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-auto pt-4 flex items-center gap-2 text-green-600 text-xs font-mono font-bold tracking-wider">
                     <span className="material-symbols-rounded text-sm">lock</span>
                     Secured via HTTPS
                </div>
            </div>

            {/* Tech Stack */}
            <div className="lg:col-span-8 bg-[var(--md-sys-color-surface-container-high)] rounded-[28px] p-8 relative overflow-hidden flex flex-col animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <div className="flex items-center gap-3 mb-8 z-10">
                    <div className="p-3 rounded-xl bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
                        <span className="material-symbols-rounded">memory</span>
                    </div>
                    <h4 className="text-xl font-medium">Tech Stack</h4>
                </div>
                
                <div className="flex flex-wrap gap-3 z-10">
                    {dashboard.skills.map((skill: string, i: number) => (
                        <span 
                            key={skill} 
                            className="
                                px-5 py-2.5 rounded-xl text-sm font-medium
                                bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]
                                border border-[var(--md-sys-color-outline-variant)]/20
                                hover:bg-[var(--md-sys-color-primary-container)] hover:text-[var(--md-sys-color-on-primary-container)] hover:border-transparent hover:scale-105
                                transition-all duration-400 ease-emphasized-decelerate cursor-default
                            "
                            style={{ animationDelay: `${i * 30 + 400}ms` }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Background */}
                <span className="absolute -bottom-4 -right-4 text-[180px] leading-none font-bold text-[var(--md-sys-color-on-surface)] opacity-[0.03] select-none pointer-events-none rotate-[-5deg]">
                    DEV
                </span>
            </div>
      </div>
    </section>
  );
};

export default Dashboard;
