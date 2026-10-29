import type { ReactNode } from "react";
import SectionHeading from "@/components/SectionHeading";

interface ChapterProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

export default function Chapter({ id, index, title, children }: ChapterProps) {
  const separated = index !== "01";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`grid scroll-mt-20 grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-x-8 ${
        separated ? "mt-12 border-t border-carbon/15 pt-8" : ""
      }`}
    >
      <div className="md:col-span-2">
        <div className="md:sticky md:top-20">
          <SectionHeading id={`${id}-heading`} index={index} title={title} />
        </div>
      </div>
      <div className="md:col-span-10">{children}</div>
    </section>
  );
}
