import { NextResponse } from 'next/server';
import { trackVisitor } from '../../lib/analytics';

export async function POST(request: Request) {
  try {
    const { visitorId } = await request.json();
    if (!visitorId) {
      return NextResponse.json({ error: 'visitorId is required' }, { status: 400 });
    }
    await trackVisitor(visitorId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in track-visitor API:', error);
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}