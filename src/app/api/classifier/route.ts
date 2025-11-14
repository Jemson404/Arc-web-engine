import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Mock classifier logic - simple heuristic for MVP
    // In production, this would call an LLM to determine if spark is needed
    const needsSpark = message.length > 50 || 
                       message.includes('?') || 
                       message.toLowerCase().includes('explain') ||
                       message.toLowerCase().includes('why') ||
                       message.toLowerCase().includes('compare');
    
    return NextResponse.json({
      classification: needsSpark ? 'NEEDS_SPARK' : 'NO_SPARK'
    });
  } catch {
    return NextResponse.json(
      { error: 'Classification failed' },
      { status: 500 }
    );
  }
}
