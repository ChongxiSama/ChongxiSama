"use client";

import { useSyncExternalStore } from "react";

const POLL_MS = 30_000;

export interface SpotifyNow {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArtUrl?: string | null;
  songUrl?: string;
}

export interface SteamStatus {
  personastate?: number;
  gameextrainfo?: string;
  gameid?: string;
  avatar?: string;
  personaname?: string;
}

export interface RecentGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  icon_url: string;
}

export interface TopTrack {
  name: string;
  artist: string;
  albumArt: string | null;
}

export interface LiveStatus {
  spotify: SpotifyNow;
  steam: SteamStatus;
  recentGames: RecentGame[];
  topTracks: TopTrack[];
  loaded: boolean;
}

const EMPTY: LiveStatus = {
  spotify: { isPlaying: false },
  steam: {},
  recentGames: [],
  topTracks: [],
  loaded: false,
};

let snapshot: LiveStatus = EMPTY;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function publish(next: LiveStatus) {
  snapshot = next;
  for (const listener of listeners) listener();
}

async function refresh() {
  try {
    const [nowRes, steamRes, recentRes, topRes] = await Promise.all([
      fetch("/api/spotify/now-playing"),
      fetch("/api/steam/status"),
      fetch("/api/steam/recently-played"),
      fetch("/api/spotify/top-items"),
    ]);

    const now = (await nowRes.json()) as SpotifyNow;
    const steam = (await steamRes.json()) as SteamStatus;
    const recent = (await recentRes.json()) as { games?: RecentGame[] };
    const top = (await topRes.json()) as { tracks?: TopTrack[] };

    publish({
      spotify: now,
      steam,
      recentGames: recent.games ?? [],
      topTracks: top.tracks ?? [],
      loaded: true,
    });
  } catch {
    publish({ ...snapshot, loaded: true });
  }
}

function onVisibilityChange() {
  if (document.visibilityState === "visible") void refresh();
}

function start() {
  if (timer !== null) return;
  void refresh();
  timer = setInterval(() => {
    if (document.visibilityState === "visible") void refresh();
  }, POLL_MS);
  document.addEventListener("visibilitychange", onVisibilityChange);
}

function stop() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  document.removeEventListener("visibilitychange", onVisibilityChange);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stop();
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return EMPTY;
}

export function useLiveStatus(): LiveStatus {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
