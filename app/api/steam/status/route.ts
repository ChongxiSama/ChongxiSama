import { NextResponse } from 'next/server';
import { getSteamStatus } from '@/lib/steam';

export async function GET() {
  const status = await getSteamStatus();

  if (status.error) {
    return NextResponse.json({ error: true }, { status: 500 });
  }

  return NextResponse.json(status);
}