import { blogUrl, navLinks } from "@/lib/config";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-on-shell/10 bg-shell/95 backdrop-blur">
      <div className="w-full px-6 sm:px-10 md:px-16 xl:px-24">
        <div className="flex h-12 items-center justify-between gap-3">
          <a href="#top" className="deco shrink-0 text-[10px] font-semibold text-on-shell">
            CHONGXI.US
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="deco text-[9px] text-on-shell/55 transition-colors hover:text-on-shell"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="deco hidden text-[9px] text-on-shell/60 transition-colors hover:text-on-shell sm:block"
            >
              Blog ↗
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
