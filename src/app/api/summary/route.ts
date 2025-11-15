import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Mock summary generation
    const summary = `Summary: Synthesizing perspectives on "${message}" - The analytical framework provides structural clarity while creative exploration opens new pathways. Together, they form a comprehensive understanding.`;
    
    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json(
      { error: 'Summary generation failed' },
      { status: 500 }
    );
  }
}
