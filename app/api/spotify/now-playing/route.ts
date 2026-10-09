import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

interface NowPlayingPayload {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    album: { name: string; images?: { url: string }[] };
    external_urls: { spotify: string };
  } | null;
}

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (!response || response.status === 204 || response.status > 400) {
      return Response.json({ isPlaying: false });
    }

    const song = (await response.json()) as NowPlayingPayload;

    if (song.item === null) {
      return Response.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((item) => item.name).join(', ');
    const album = song.item.album.name;
    const albumArtUrl = song.item.album.images?.[0]?.url ?? null;
    const songUrl = song.item.external_urls.spotify;

    return Response.json({
      isPlaying,
      title,
      artist,
      album,
      albumArtUrl,
      songUrl,
    });
  } catch {
    return Response.json({ isPlaying: false });
  }
}
