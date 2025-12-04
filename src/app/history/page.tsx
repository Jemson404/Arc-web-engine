import Link from 'next/link';

export default function HistoryPage() {
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
          📜 Session History
        </h1>
        <p className="text-xl text-amber-400 mb-8">
          Your Past Reflections
        </p>
        <p className="text-zinc-400 max-w-xl mx-auto mb-12">
          Review your previous conversations with ARC Engine and revisit insights from past sessions.
        </p>
        
        {/* Placeholder for history list */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-left">
            <p className="text-zinc-500 text-sm">No sessions yet</p>
            <p className="text-zinc-600 text-xs mt-1">Start a conversation in the ARC Engine to see your history here.</p>
          </div>
        </div>
        
        <Link 
          href="/chat"
          className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-400 transition-all"
        >
          Start a New Session
        </Link>
      </div>
    </div>
  );
}
