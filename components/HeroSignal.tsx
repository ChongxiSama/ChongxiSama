"use client";

import { useLiveStatus } from "@/lib/liveStatus";

export default function HeroSignal() {
  const { spotify, steam } = useLiveStatus();
  const steamOnline = (steam.personastate ?? 0) > 0;
  const steamText = steam.gameextrainfo
    ? `playing ${steam.gameextrainfo}`
    : steamOnline
      ? "online"
      : "offline";
  const spotifyText = spotify.isPlaying
    ? `listening to ${spotify.title ?? ""} — ${spotify.artist ?? ""}`
    : "idle";

  return (
    <div className="deco flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[9px]">
      <span className="flex min-w-0 items-center gap-2 text-on-shell/60">
        <span
          className={`h-1.5 w-1.5 shrink-0 ${steamOnline ? "bg-teal pulse-dot" : "bg-on-shell/25"}`}
          aria-hidden="true"
        />
        <span className="truncate">steam: {steamText}</span>
      </span>
      <span className="text-on-shell/25" aria-hidden="true">
        ·
      </span>
      <span className="flex min-w-0 items-center gap-2 text-on-shell/60">
        <span
          className={`h-1.5 w-1.5 shrink-0 ${spotify.isPlaying ? "bg-crimson pulse-dot" : "bg-on-shell/25"}`}
          aria-hidden="true"
        />
        <span className="truncate">spotify: {spotifyText}</span>
      </span>
    </div>
  );
}
