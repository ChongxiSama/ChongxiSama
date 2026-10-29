"use client";

import { setTheme, useTheme, type ThemeMode } from "@/lib/theme";

const MODES: { id: ThemeMode; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

export default function ThemeToggle() {
  const mode = useTheme();

  return (
    <div role="group" aria-label="Theme" className="flex items-center border border-on-shell/20">
      {MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={mode === item.id}
          onClick={() => setTheme(item.id)}
          className={`deco px-2 py-1 text-[8px] leading-none transition-colors ${
            mode === item.id ? "bg-on-shell text-shell" : "text-on-shell/50 hover:text-on-shell"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
