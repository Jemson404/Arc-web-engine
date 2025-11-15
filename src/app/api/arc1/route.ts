import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Mock ARC-1 creative response with streaming
    const response = `ARC-1 (Creative): Fascinating exploration of "${message}"! 🌟 I see this through a kaleidoscope of possibilities. Imagine if we approached this from an unconventional angle - what if the answer lies not in what we know, but in what we haven't yet discovered? The creative space between logic and intuition often reveals the most profound insights.`;
    
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        // Simulate flickering effect with varied delays
        for (let i = 0; i < response.length; i += 2) {
          const chunk = response.slice(i, i + 2);
          controller.enqueue(encoder.encode(chunk));
          // Varied speed for scanline/flicker effect
          await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 20));
        }
        
        controller.close();
      },
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch {
    return new Response('ARC-1 processing failed', { status: 500 });
  }
}
