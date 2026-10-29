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
      className={`scroll-mt-20 ${separated ? "mt-12 border-t border-carbon/15 pt-8" : ""}`}
    >
      <SectionHeading id={`${id}-heading`} index={index} title={title} />
      {children}
    </section>
  );
}
