"use client";

import { useEffect, useState } from 'react';
import TechIcon from '@/components/TechIcon';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArtUrl?: string;
  songUrl?: string;
}

interface SteamData {
  personastate?: number;
  gameextrainfo?: string;
  gameid?: string;
  avatar?: string;
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

const AudioWave = () => (
  <div className="flex items-end gap-[2px] h-[14px]">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="w-[3px] bg-lt-accent rounded-[1px] audio-bar"
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </div>
);

const StatusDot = ({ active }: { active: boolean }) => (
  <span className={`inline-block w-[6px] h-[6px] rounded-full ${active ? 'bg-lt-accent status-pulse' : 'bg-lt-ghost/40'}`}></span>
);

export default function SignalMonitor({ title }: { title: string }) {
  const [spotify, setSpotify] = useState<SpotifyData>({ isPlaying: false });
  const [steam, setSteam] = useState<SteamData>({});
  const [recentGames, setRecentGames] = useState<RecentGame[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [spotRes, steamRes, recentRes, topRes] = await Promise.all([
          fetch('/api/spotify/now-playing'),
          fetch('/api/steam/status'),
          fetch('/api/steam/recently-played'),
          fetch('/api/spotify/top-items'),
        ]);
        setSpotify(await spotRes.json());
        setSteam(await steamRes.json());
        const { games } = await recentRes.json();
        setRecentGames(games);
        const { tracks } = await topRes.json();
        setTopTracks(tracks);
      } catch (e) {}
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const steamOnline = steam.personastate !== undefined && steam.personastate > 0;
  const steamInGame = steamOnline && !!steam.gameextrainfo;
  const systemOnline = spotify.isPlaying || steamOnline;

  return (
    <section className="border border-lt-border/50 bg-lt-bg/40 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-lt-border/30 bg-lt-surface/30">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-[10px] bg-lt-accent"></div>
          <h2 className="text-[10px] font-mono font-black text-lt-muted uppercase tracking-[0.25em]">
            02 // {title}
          </h2>
        </div>
        <span className="text-[8px] font-mono text-lt-ghost uppercase tracking-widest">
          {systemOnline ? 'SYS_ONLINE' : 'SYS_IDLE'}
        </span>
      </div>

      <div className="divide-y divide-lt-border/20">
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="w-10 h-10 flex-shrink-0 bg-lt-surface border border-lt-border/50 overflow-hidden relative">
            {spotify.isPlaying && spotify.albumArtUrl ? (
              <img src={spotify.albumArtUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lt-ghost/40">
                <TechIcon name="spotify" className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <StatusDot active={spotify.isPlaying} />
              <span className="font-mono text-[9px] text-lt-ghost font-bold uppercase tracking-widest">Now Playing</span>
              {spotify.isPlaying && <AudioWave />}
            </div>
            <span className={`font-display text-[13px] uppercase font-black transition-colors block truncate ${spotify.isPlaying ? 'text-lt-ink' : 'text-lt-ghost/60'}`}>
              {spotify.isPlaying ? spotify.title : 'Offline'}
            </span>
            {spotify.artist && (
              <span className="font-mono text-[10px] text-lt-muted block truncate">{spotify.artist}</span>
            )}
          </div>
        </div>
        <a href="https://steamcommunity.com/profiles/76561199634347036" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-3 hover:bg-lt-surface/40 transition-colors">
          <div className="w-10 h-10 flex-shrink-0 bg-lt-surface border border-lt-border/50 overflow-hidden relative">
            {steamInGame && steam.gameid ? (
              <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${steam.gameid}/header.jpg`} alt="" className="w-full h-full object-cover" />
            ) : steamOnline && steam.avatar ? (
              <img src={steam.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lt-ghost/40">
                <TechIcon name="steam" className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <StatusDot active={steamInGame || steamOnline} />
              <span className="font-mono text-[9px] text-lt-ghost font-bold uppercase tracking-widest">In Session</span>
            </div>
            <span className={`font-display text-[13px] uppercase font-black transition-colors block truncate ${steamInGame ? 'text-lt-ink' : steamOnline ? 'text-lt-muted' : 'text-lt-ghost/60'}`}>
              {steam.gameextrainfo ? steam.gameextrainfo : steamOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <span className="text-[8px] font-mono text-lt-ghost uppercase tracking-widest">VIEW</span>
        </a>
        {recentGames.length > 0 && (
          <div className="px-3 py-2">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-[3px] h-[6px] bg-lt-ghost/40"></div>
              <span className="font-mono text-[8px] text-lt-ghost font-bold uppercase tracking-[0.2em]">RECENT_2W</span>
            </div>
            <div className="space-y-1.5">
              {recentGames.map((game) => (
                <div key={game.appid} className="flex items-center gap-2">
                  <img src={game.icon_url} alt="" className="w-4 h-4 flex-shrink-0 bg-lt-surface border border-lt-border/30" />
                  <span className="font-mono text-[10px] text-lt-muted truncate flex-1">{game.name}</span>
                  <span className="font-mono text-[9px] text-lt-ghost flex-shrink-0">{(game.playtime_2weeks / 60).toFixed(1)}h</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {topTracks.length > 0 && (
          <div className="px-3 py-2">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-[3px] h-[6px] bg-lt-accent/60"></div>
              <span className="font-mono text-[8px] text-lt-ghost font-bold uppercase tracking-[0.2em]">TOP_TRACKS</span>
            </div>
            <div className="space-y-1.5">
              {topTracks.map((track, i) => (
                <div key={i} className="flex items-center gap-2">
                  {track.albumArt ? (
                    <img src={track.albumArt} alt="" className="w-4 h-4 flex-shrink-0 bg-lt-surface border border-lt-border/30 object-cover" />
                  ) : (
                    <div className="w-4 h-4 flex-shrink-0 bg-lt-surface border border-lt-border/30" />
                  )}
                  <span className="font-mono text-[10px] text-lt-muted truncate flex-1">{track.name}</span>
                  <span className="font-mono text-[9px] text-lt-ghost flex-shrink-0 truncate max-w-[80px]">{track.artist}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
