import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const API_BASE = 'https://api.spotify.com/v1';

const ENDPOINTS = {
  player: `${API_BASE}/me/player`,
  recentlyPlayed: `${API_BASE}/me/player/recently-played?limit=50`,
  queue: `${API_BASE}/me/player/queue`,
  topTracks: `${API_BASE}/me/top/tracks?time_range=short_term&limit=10`,
  topArtists: `${API_BASE}/me/top/artists?time_range=short_term&limit=10`,
  recentLiked: `${API_BASE}/me/tracks?limit=1`,
  profile: `${API_BASE}/me`,
};

function clean(data: any): any {
  if (Array.isArray(data)) return data.map(clean);
  if (data !== null && typeof data === 'object') {
    const res: any = {};
    const skip = ['href', 'uri', 'available_markets', 'external_urls', 'disc_number'];
    for (const key in data) {
      if (skip.includes(key)) continue;
      res[key] = clean(data[key]);
    }
    return res;
  }
  return data;
}

async function call(url: string, token: string) {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 204 || res.status >= 400) return null;
    return clean(await res.json());
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const key = req.headers.get('X-API-Key');
  if (!key || key !== process.env.STS_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { access_token } = await getAccessToken();
  if (!access_token) {
    return NextResponse.json({ error: 'Token error' }, { status: 500 });
  }

  const keys = Object.keys(ENDPOINTS) as Array<keyof typeof ENDPOINTS>;
  const tasks = keys.map(k => call(ENDPOINTS[k], access_token));
  const settled = await Promise.allSettled(tasks);

  const out: any = {};
  settled.forEach((r, i) => {
    out[keys[i]] = r.status === 'fulfilled' ? r.value : null;
  });

  return NextResponse.json(out);
}
