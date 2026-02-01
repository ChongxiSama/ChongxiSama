import React, { useEffect, useState } from 'react';
import { sections } from '@/lib/config';

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  category?: string;
}

const ActivitySection: React.FC = () => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const RSS_URL = 'https://blog.chongxi.us/atom.xml';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
        
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
             const parsedItems: RSSItem[] = data.items.slice(0, 3).map((item: any) => ({
                 title: item.title,
                 link: item.link,
                 pubDate: item.pubDate,
                 category: item.categories?.[0] || 'LOG'
             }));
             setTimeout(() => {
                setItems(parsedItems);
                setLoading(false);
             }, 1000);
        } else {
            throw new Error("Feed parsing failed");
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRSS();
  }, []);

  if (error || (!loading && items.length === 0)) return null;

  return (
    <section className="w-full">
      <div className="flex items-center gap-4 mb-12">
         <span className="h-px flex-1 bg-[var(--md-sys-color-outline-variant)]/50"></span>
         <h2 className="text-[24px] sm:text-[32px] font-[500] text-[var(--md-sys-color-on-surface)]">{sections.logs}</h2>
         <span className="h-px w-12 bg-[var(--md-sys-color-outline-variant)]/50"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {loading && [1, 2, 3].map((i) => (
             <div key={i} className="h-64 rounded-[24px] bg-[var(--md-sys-color-surface-container)] shimmer-bg animate-shimmer"></div>
         ))}

         {!loading && items.map((item, index) => (
            <div 
                key={index}
                className="group relative flex flex-col justify-between p-6 rounded-[24px] bg-[var(--md-sys-color-surface-container-low)] transition-all duration-medium ease-emphasized hover:scale-[1.02] active:scale-[0.98] overflow-hidden animate-fade-in-up hover:rounded-[20px]"
                style={{ animationDelay: `${index * 150}ms` }}
            >
                <div className="state-layer text-[var(--md-sys-color-on-surface)] rounded-[inherit]"></div>

                <div className="relative z-10 flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-[var(--md-sys-color-primary)]">
                        {item.category?.toUpperCase()}
                    </span>
                    <span className="text-[12px] font-mono text-[var(--md-sys-color-on-surface-variant)] opacity-60">
                         {item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) : 'N/A'}
                    </span>
                </div>

                <h3 className="relative z-10 text-[20px] font-medium leading-snug text-[var(--md-sys-color-on-surface)] line-clamp-3">
                    {item.title}
                </h3>

                <a 
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link relative z-10 mt-6 flex items-center gap-2 text-[var(--md-sys-color-on-surface-variant)] self-start hover:text-[var(--md-sys-color-primary)] transition-colors duration-medium ease-emphasized"
                >
                    <span className="text-sm font-medium">Read Entry</span>
                    <span className="material-symbols-rounded text-lg group-hover/link:translate-x-1 transition-transform duration-medium ease-emphasized">arrow_forward</span>
                </a>
            </div>
         ))}
      </div>
    </section>
  );
};

export default ActivitySection;
