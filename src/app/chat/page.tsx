'use client';

import Link from 'next/link';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <Link 
          href="/"
          className="text-zinc-500 hover:text-amber-400 text-sm mb-8 inline-block transition-colors"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          ⚡ ARC Engine
        </h1>
        <p className="text-xl text-amber-400 mb-8">
          Dual-Mind Reflection System
        </p>
        <p className="text-zinc-400 max-w-xl mx-auto mb-12">
          Enter your thoughts and receive reflections from two perspectives — ARC-0 (analytical grounding) and ARC-1 (creative exploration).
        </p>
        
        {/* Placeholder for chat interface */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">ARC-0</h3>
            <p className="text-sm text-zinc-500">Grounding perspective</p>
          </div>
          <div className="p-6 rounded-xl border border-amber-500/30 bg-zinc-900/50">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">✦ Spark</h3>
            <p className="text-sm text-zinc-500">Synthesis emerges here</p>
          </div>
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">ARC-1</h3>
            <p className="text-sm text-zinc-500">Exploring perspective</p>
          </div>
        </div>
        
        {/* Input area */}
        <div className="mt-8 max-w-2xl mx-auto">
          <textarea
            placeholder="What clarity are you seeking today?"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none resize-none"
            rows={3}
          />
          <button className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-400 transition-all">
            Let them reflect
          </button>
        </div>
      </div>
    </div>
  );
}
