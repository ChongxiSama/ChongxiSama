import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (!response || response.status === 204 || response.status > 400) {
      return Response.json({ isPlaying: false });
    }

    const song = await response.json();

    if (song.item === null) {
      return Response.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
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
