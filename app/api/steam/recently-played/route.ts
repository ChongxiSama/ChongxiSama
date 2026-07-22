import { getRecentlyPlayed } from '@/lib/steam';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const games = await getRecentlyPlayed();
    return Response.json({ games });
  } catch {
    return Response.json({ games: [] });
  }
}
