import { about } from "@/lib/config";

export default function AboutSection() {
  return (
    <div>
      <div className="max-w-[62ch] space-y-8">
        {about.sections.map((section) => (
          <section key={section.id}>
            <h3 className="deco mb-3 text-[9px] font-semibold text-carbon">{section.title}</h3>

            <div className="space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[13px] leading-5 text-carbon/85">
                  {paragraph}
                </p>
              ))}
            </div>

            {section.subsections?.map((sub) => (
              <div key={sub.title} className="mt-5">
                <h4 className="deco mb-1.5 text-[8px] text-muted">{sub.title}</h4>
                <div className="space-y-2">
                  {sub.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[13px] leading-5 text-carbon/85">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {sub.links && (
                  <ul className="mt-2 space-y-1">
                    {sub.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] underline decoration-carbon/30 underline-offset-2 transition-colors hover:text-crimson"
                        >
                          {link.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {section.links && (
              <ul className="mt-3 space-y-1">
                {section.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] underline decoration-carbon/30 underline-offset-2 transition-colors hover:text-crimson"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
