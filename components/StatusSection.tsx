"use client";

import TechIcon from "@/components/TechIcon";
import { steamProfileUrl } from "@/lib/config";
import { useLiveStatus } from "@/lib/liveStatus";

export default function StatusSection() {
  const { spotify, steam, recentGames, topTracks, loaded } = useLiveStatus();

  const steamOnline = (steam.personastate ?? 0) > 0;
  const steamInGame = steamOnline && Boolean(steam.gameextrainfo);
  const systemOnline = spotify.isPlaying || steamOnline;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
      <div className="flex flex-col gap-5 md:col-span-5">
        <div className="deco flex items-center justify-between gap-2 border-b border-carbon/15 pb-2 text-[9px] text-muted">
          <span>In session</span>
          <span className="font-mono font-bold text-carbon">
            {systemOnline ? "Online" : "Offline"}
          </span>
        </div>

        <div>
          <div className="deco mb-2 flex items-center gap-1.5 text-[9px] font-bold text-crimson">
            <span
              className={`inline-block h-1.5 w-1.5 ${spotify.isPlaying ? "bg-crimson pulse-dot" : "bg-carbon/30"}`}
              aria-hidden="true"
            />
            <TechIcon name="spotify" className="h-3 w-3" />
            Now playing
          </div>
          <div
            className={`text-lg font-bold leading-tight tracking-tight ${spotify.isPlaying ? "text-carbon" : "text-muted"}`}
          >
            {spotify.isPlaying ? spotify.title : "Idle"}
          </div>
          <div className="truncate text-xs text-muted">
            {spotify.isPlaying ? spotify.artist : "Not playing"}
          </div>
        </div>

        <div>
          <div className="deco mb-2 flex items-center gap-1.5 text-[9px] font-bold text-teal-ink">
            <span
              className={`inline-block h-1.5 w-1.5 ${steamOnline ? "bg-teal pulse-dot" : "bg-carbon/30"}`}
              aria-hidden="true"
            />
            <TechIcon name="steam" className="h-3 w-3" />
            Game session
          </div>
          <a
            href={steamProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div
              className={`text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-crimson ${steamInGame ? "text-carbon" : "text-muted"}`}
            >
              {steamInGame ? steam.gameextrainfo : steamOnline ? "Online" : "Offline"}
            </div>
            <div className="truncate text-xs text-muted">{steam.personaname ?? "CEPATO"}</div>
          </a>
        </div>

        {recentGames.length > 0 && (
          <div className="border-t border-carbon/15 pt-4">
            <div className="deco mb-2 text-[9px] text-muted">Recent 2W</div>
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

      <div className="md:col-span-7 md:border-l md:border-carbon/15 md:pl-10">
        <div className="deco mb-3 text-[9px] text-muted">Top tracks</div>
        {topTracks.length > 0 ? (
          <table className="w-full table-fixed border-collapse text-xs">
            <tbody>
              {topTracks.map((track, i) => (
                <tr
                  key={`${track.name}-${i}`}
                  className="border-b border-carbon/15 last:border-0"
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
  );
}
