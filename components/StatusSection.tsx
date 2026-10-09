"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import TechIcon from "@/components/TechIcon";
import { steamProfileUrl } from "@/lib/config";

interface SpotifyNow {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArtUrl?: string | null;
  songUrl?: string;
}

interface SteamStatus {
  personastate?: number;
  gameextrainfo?: string;
  gameid?: string;
  avatar?: string;
  personaname?: string;
}

interface RecentGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  icon_url: string;
}

interface TopTrack {
  name: string;
  artist: string;
  albumArt: string | null;
}

const POLL_MS = 30000;

export default function StatusSection() {
  const [spotify, setSpotify] = useState<SpotifyNow>({ isPlaying: false });
  const [steam, setSteam] = useState<SteamStatus>({});
  const [recentGames, setRecentGames] = useState<RecentGame[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    const sync = async () => {
      try {
        const [nowRes, steamRes, recentRes, topRes] = await Promise.all([
          fetch("/api/spotify/now-playing"),
          fetch("/api/steam/status"),
          fetch("/api/steam/recently-played"),
          fetch("/api/spotify/top-items"),
        ]);
        if (!active) return;

        const now = (await nowRes.json()) as SpotifyNow;
        const steamData = (await steamRes.json()) as SteamStatus;
        const recent = (await recentRes.json()) as { games?: RecentGame[] };
        const top = (await topRes.json()) as { tracks?: TopTrack[] };
        if (!active) return;

        setSpotify(now);
        setSteam(steamData);
        setRecentGames(recent.games ?? []);
        setTopTracks(top.tracks ?? []);
      } catch {
        // transient API failure: keep the last known state on screen
      } finally {
        if (active) setLoaded(true);
      }
    };

    sync();
    const interval = setInterval(sync, POLL_MS);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const steamOnline = (steam.personastate ?? 0) > 0;
  const steamInGame = steamOnline && !!steam.gameextrainfo;
  const systemOnline = spotify.isPlaying || steamOnline;

  return (
    <section aria-labelledby="status-heading">
      <SectionHeading id="status-heading" index="01" title="Status &amp; Music" meta="Spotify + Steam live" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-carbon border border-carbon">
        <div className="md:col-span-5 bg-paper p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center gap-2 text-[10px] uppercase tracking-widest text-muted pb-2 border-b border-carbon/15">
            <span>In session</span>
            <span className="shrink-0 font-mono font-bold text-carbon border border-carbon px-1.5 py-0.5">
              {systemOnline ? "Online" : "Offline"}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-crimson mb-2">
              <span
                className={`w-1.5 h-1.5 inline-block ${spotify.isPlaying ? "bg-crimson pulse-dot" : "bg-carbon/30"}`}
                aria-hidden="true"
              />
              <TechIcon name="spotify" className="w-3 h-3" />
              Now playing
            </div>
            <div
              className={`text-lg font-bold tracking-tight leading-tight ${spotify.isPlaying ? "text-carbon" : "text-muted"}`}
            >
              {spotify.isPlaying ? spotify.title : "Idle"}
            </div>
            <div className="text-xs text-muted truncate">
              {spotify.isPlaying ? spotify.artist : "Not playing"}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-teal-ink mb-2">
              <span
                className={`w-1.5 h-1.5 inline-block ${steamOnline ? "bg-teal pulse-dot" : "bg-carbon/30"}`}
                aria-hidden="true"
              />
              <TechIcon name="steam" className="w-3 h-3" />
              Game session
            </div>
            <a
              href={steamProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div
                className={`text-lg font-bold tracking-tight leading-tight group-hover:text-crimson ${steamInGame ? "text-carbon" : "text-muted"}`}
              >
                {steamInGame ? steam.gameextrainfo : steamOnline ? "Online" : "Offline"}
              </div>
              <div className="text-xs text-muted truncate">
                {steam.personaname ?? "CEPATO"}
              </div>
            </a>
          </div>

          {recentGames.length > 0 && (
            <div className="pt-4 border-t border-carbon/15">
              <div className="text-[10px] uppercase tracking-widest text-muted mb-2">Recent 2W</div>
              <ul className="space-y-1.5">
                {recentGames.map((game) => (
                  <li key={game.appid} className="flex items-baseline gap-2 text-[11px]">
                    <span className="flex-1 truncate">{game.name}</span>
                    <span className="shrink-0 font-mono text-muted tabular-nums">
                      {(game.playtime_2weeks / 60).toFixed(1)}h
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="md:col-span-7 bg-paper p-5">
          <div className="text-[10px] uppercase tracking-widest text-muted mb-3">Top tracks</div>
          {topTracks.length > 0 ? (
            <table className="w-full table-fixed border-collapse text-xs">
              <tbody>
                {topTracks.map((track, i) => (
                  <tr
                    key={`${track.name}-${i}`}
                    className="border-b border-carbon/15 last:border-0 hover:bg-carbon/5"
                  >
                    <td className="w-8 py-2 align-top font-mono text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-2 pr-3 font-bold">
                      <span className="block truncate">{track.name}</span>
                    </td>
                    <td className="w-[38%] py-2 text-right text-muted">
                      <span className="block truncate">{track.artist}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xs text-muted">{loaded ? "No data" : "Syncing…"}</p>
          )}
        </div>
      </div>
    </section>
  );
}
