import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Mock spark insight generation
    const spark = `✦ SPARK: The convergence of analytical rigor and creative intuition reveals a deeper truth about "${message}". When logic meets imagination, we discover insights that neither could find alone. This synthesis transforms understanding into wisdom.`;
    
    return NextResponse.json({ spark });
  } catch {
    return NextResponse.json(
      { error: 'Spark generation failed' },
      { status: 500 }
    );
  }
}
