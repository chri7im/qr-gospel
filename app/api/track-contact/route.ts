import { NextResponse } from 'next/server';
import { trackContactSubmission } from '../../lib/analytics';

export async function POST(request: Request) {
  try {
    const { visitorId, email, message, language, concern, phone } = await request.json();
    if (!visitorId || !email || !message || !language || !concern) {
      return NextResponse.json({ error: 'visitorId, email, message, language, and concern are required' }, { status: 400 });
    }
    await trackContactSubmission(visitorId, email, message, language, concern, phone);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in track-contact API:', error);
    return NextResponse.json({ error: error.message || 'Failed to track contact submission' }, { status: 500 });
  }
}