import { getSteamStatus } from '@/lib/steam';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = await getSteamStatus();
    return Response.json(status, {
      headers: { 'Access-Control-Allow-Origin': 'https://xice.cx' },
    });
  } catch {
    return Response.json({ personastate: 0 }, {
      headers: { 'Access-Control-Allow-Origin': 'https://xice.cx' },
    });
  }
}
