import { NextResponse } from 'next/server';
import { trackLanguageSelection } from '../../lib/analytics';

export async function POST(request: Request) {
  try {
    const { visitorId, language } = await request.json();
    if (!visitorId || !language) {
      return NextResponse.json({ error: 'visitorId and language are required' }, { status: 400 });
    }
    await trackLanguageSelection(visitorId, language);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in track-language API:', error);
    return NextResponse.json({ error: 'Failed to track language selection' }, { status: 500 });
  }
}