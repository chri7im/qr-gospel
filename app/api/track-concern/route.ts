import { NextResponse } from 'next/server';
import { trackConcern } from '../../lib/analytics';

export async function POST(request: Request) {
  try {
    const { visitorId, concern } = await request.json();
    if (!visitorId || !concern) {
      return NextResponse.json({ error: 'visitorId and concern are required' }, { status: 400 });
    }
    await trackConcern(visitorId, concern);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in track-concern API:', error);
    return NextResponse.json({ error: 'Failed to track concern' }, { status: 500 });
  }
}