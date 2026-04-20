import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/spotify';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const API_BASE = 'https://api.spotify.com/v1';

export async function GET() {
  const { access_token } = await getAccessToken();

  if (!access_token) {
    return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
  }

  const response = await fetch(`${API_BASE}/me/top/tracks?time_range=short_term&limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { items } = await response.json();

  const tracks = items.map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return NextResponse.json({ tracks });
}
