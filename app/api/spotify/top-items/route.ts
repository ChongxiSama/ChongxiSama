import { getAccessToken } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

interface TopTrackPayload {
  items?: {
    name: string;
    artists: { name: string }[];
    album: { images?: { url: string }[] };
  }[];
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    if (!access_token) return Response.json({ tracks: [] });

    const res = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term',
      {
        headers: { Authorization: `Bearer ${access_token}` },
        cache: 'no-store',
      }
    );

    if (!res.ok) return Response.json({ tracks: [] });

    const data = (await res.json()) as TopTrackPayload;
    const tracks = (data.items ?? []).map((track) => ({
      name: track.name,
      artist: track.artists.map((item) => item.name).join(', '),
      albumArt: track.album.images?.[2]?.url ?? track.album.images?.[0]?.url ?? null,
    }));

    return Response.json({ tracks });
  } catch {
    return Response.json({ tracks: [] });
  }
}
