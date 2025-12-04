import Link from 'next/link';

export default function SparksPage() {
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
          💡 Sparks Vault
        </h1>
        <p className="text-xl text-amber-400 mb-8">
          Your Saved Insights
        </p>
        <p className="text-zinc-400 max-w-xl mx-auto mb-12">
          A collection of meaningful sparks from your ARC Engine sessions. These are the moments where tension between perspectives created genuine insight.
        </p>
        
        {/* Placeholder for sparks list */}
        <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
          <div className="p-6 rounded-xl border border-amber-500/20 bg-gradient-to-br from-zinc-900 to-zinc-900/50 text-left">
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl">✦</span>
              <span className="text-xs text-zinc-600">No sparks yet</span>
            </div>
            <p className="text-zinc-500 text-sm">
              When a meaningful insight emerges from the tension between ARC-0 and ARC-1, you can save it here for future reference.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <Link 
            href="/chat"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-400 transition-all"
          >
            Create Your First Spark
          </Link>
        </div>
      </div>
    </div>
  );
}
