import { NextResponse } from 'next/server';
import { trackOtherConcern } from '../../lib/analytics';

export async function POST(request: Request) {
  try {
    const { visitorId, description } = await request.json();
    if (!visitorId || !description) {
      return NextResponse.json({ error: 'visitorId and description are required' }, { status: 400 });
    }
    await trackOtherConcern(visitorId, description);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in track-other-concern API:', error);
    return NextResponse.json({ error: 'Failed to track other concern' }, { status: 500 });
  }
}