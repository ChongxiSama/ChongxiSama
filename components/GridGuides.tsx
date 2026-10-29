"use client";

import { useEffect, useState } from "react";

const COLUMNS = 12;

export default function GridGuides() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "g" && !event.metaKey && !event.ctrlKey) {
        setVisible((value) => !value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (process.env.NODE_ENV !== "development" || !visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
      <div className="mx-auto h-full w-full max-w-[960px] px-3 sm:px-6">
        <div className="relative h-full px-6 sm:px-12 md:px-16">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgb(229 72 77 / 0.07) 0 1px, transparent 1px 32px)",
            }}
          />
          <div className="relative grid h-full grid-cols-12 gap-8">
            {Array.from({ length: COLUMNS }).map((_, index) => (
              <div
                key={index}
                className="h-full border-x border-[#E5484D]/20 bg-[#E5484D]/[0.04]"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 bg-carbon px-2 py-1 font-mono text-[9px] text-paper">
        G · grid
      </div>
    </div>
  );
}
