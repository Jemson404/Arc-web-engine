'use client';

import { useState } from 'react';
import { evaluateSpark, type SparkResult } from '@/lib/sparkEngine';

interface Message {
  role: 'user' | 'arc0' | 'arc1';
  content: string;
}

export default function ArcEnginePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sparkState, setSparkState] = useState<SparkResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Simulate API call for ARC-0 response (validation/grounding)
      const arc0Response = await generateArc0Response(userMessage);
      
      // Simulate API call for ARC-1 response (exploration/possibility)
      const arc1Response = await generateArc1Response(userMessage);

      // Add both responses
      setMessages(prev => [
        ...prev,
        { role: 'arc0', content: arc0Response },
        { role: 'arc1', content: arc1Response }
      ]);

      // Evaluate spark after getting both responses
      const sparkResult = evaluateSpark({
        userMessage: userMessage,
        arc0Message: arc0Response,
        arc1Message: arc1Response,
      });

      setSparkState(sparkResult);
    } catch (error) {
      console.error('Error generating responses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-900 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4">
        <h1 className="text-2xl font-bold">ARC Engine – PRD v3</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Real-time dual perspective analysis with Spark detection
        </p>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* ARC-0 Panel (Left) */}
        <div className="flex w-1/3 flex-col border-r border-zinc-800 bg-zinc-900">
          <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-3">
            <h2 className="font-semibold text-blue-400">ARC-0</h2>
            <p className="text-xs text-zinc-500">Validation & Grounding</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages
              .filter(m => m.role === 'arc0')
              .map((msg, idx) => (
                <div
                  key={`arc0-${idx}`}
                  className="rounded-lg bg-blue-950/30 p-4 border border-blue-900/50"
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              ))}
            {isLoading && messages.filter(m => m.role === 'arc0').length === messages.filter(m => m.role === 'user').length - 1 && (
              <div className="rounded-lg bg-blue-950/30 p-4 border border-blue-900/50">
                <p className="text-sm text-zinc-400 animate-pulse">Generating ARC-0 response...</p>
              </div>
            )}
          </div>
        </div>

        {/* Spark Panel (Middle) */}
        <div className="flex w-1/3 flex-col border-r border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-3">
            <h2 className="font-semibold text-purple-400">✦ Spark</h2>
            <p className="text-xs text-zinc-500">Integration Layer</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="spark-panel">
              <div className={sparkState?.spark ? "spark-active-animation" : "spark-idle-animation"}>
                {sparkState ? (
                  <pre className="whitespace-pre-wrap text-sm text-zinc-300 bg-purple-950/20 p-4 rounded-lg border border-purple-900/50">
                    {sparkState.summary}
                  </pre>
                ) : (
                  <p className="text-sm text-neutral-500 text-center py-8">
                    The space between ARC-0 and ARC-1 lights up when a Spark appears.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ARC-1 Panel (Right) */}
        <div className="flex w-1/3 flex-col bg-zinc-900">
          <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-3">
            <h2 className="font-semibold text-green-400">ARC-1</h2>
            <p className="text-xs text-zinc-500">Exploration & Possibility</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages
              .filter(m => m.role === 'arc1')
              .map((msg, idx) => (
                <div
                  key={`arc1-${idx}`}
                  className="rounded-lg bg-green-950/30 p-4 border border-green-900/50"
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              ))}
            {isLoading && messages.filter(m => m.role === 'arc1').length === messages.filter(m => m.role === 'user').length - 1 && (
              <div className="rounded-lg bg-green-950/30 p-4 border border-green-900/50">
                <p className="text-sm text-zinc-400 animate-pulse">Generating ARC-1 response...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-800 bg-zinc-950 p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share what's on your mind..."
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Analyzing...' : 'Send'}
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-xs text-zinc-500">
              User messages: {messages.filter(m => m.role === 'user').length} | 
              Sparks detected: {sparkState?.spark ? '1' : '0'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// Simulated API calls - In production, these would call actual AI models
async function generateArc0Response(userMessage: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // ARC-0: Validation and grounding response
  const responses = [
    `I hear that you're feeling ${extractEmotion(userMessage)}. That's a valid emotional response to what you're experiencing. Let's acknowledge what's real in this moment.`,
    `Your feelings about this situation are understandable. What you're experiencing right now is: ${userMessage.slice(0, 50)}... This is your current reality, and it matters.`,
    `Taking a step back, I see that you're dealing with something significant. Your immediate concern seems centered on the present moment and what's actually happening right now.`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

async function generateArc1Response(_userMessage: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // ARC-1: Exploration and possibility response
  const responses = [
    `What if you could approach this differently? There might be perspectives you haven't considered yet. What possibilities open up if you shift your angle just slightly?`,
    `I'm curious about what could emerge from this. Have you thought about where this might lead if you explored it further? Sometimes the path forward isn't obvious at first.`,
    `This situation could be an opportunity for something new. What would it look like if you leaned into the uncertainty rather than resisting it?`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function extractEmotion(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('scared') || lowerMessage.includes('anxious')) return 'anxious';
  if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) return 'exhausted';
  if (lowerMessage.includes('lost') || lowerMessage.includes('stuck')) return 'stuck';
  if (lowerMessage.includes('overwhelmed')) return 'overwhelmed';
  return 'challenged';
}
