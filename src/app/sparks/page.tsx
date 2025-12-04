import Link from 'next/link';

// Mock data for sparks
const mockSparks = [
  {
    id: 1,
    content: "The fear isn't about failing — it's about succeeding and still feeling empty. What would make success feel meaningful?",
    date: "2 days ago",
    tags: ["#career", "#purpose", "#fear"],
  },
  {
    id: 2,
    content: "Overthinking isn't the problem. It's that you're thinking in circles instead of spirals. Each pass should go deeper, not repeat.",
    date: "5 days ago",
    tags: ["#overthinking", "#patterns", "#growth"],
  },
  {
    id: 3,
    content: "You're not confused about what to do. You're grieving the version of yourself that wanted something different.",
    date: "1 week ago",
    tags: ["#identity", "#change", "#clarity"],
  },
  {
    id: 4,
    content: "The tension between who you are and who you're becoming isn't a problem to solve — it's the engine of transformation.",
    date: "2 weeks ago",
    tags: ["#transformation", "#identity", "#growth"],
  },
];

export default function SparksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0d0d1a] to-[#0a0a14] flex flex-col px-4 py-12">
      <div className="max-w-4xl mx-auto w-full">
        <Link 
          href="/"
          className="text-zinc-500 hover:text-cyan-400 text-sm mb-8 inline-flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
            </svg>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Sparks Vault
            </h1>
            <p className="text-cyan-400 text-sm">
              Your saved moments of clarity
            </p>
          </div>
        </div>

        <p className="text-zinc-400 mb-8 max-w-2xl">
          A collection of meaningful sparks from your ARC Engine sessions. These are the moments where tension between perspectives created genuine insight.
        </p>
        
        {/* Sparks list */}
        <div className="space-y-4">
          {mockSparks.map((spark) => (
            <div 
              key={spark.id}
              className="p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-[#12121f] to-[#0d0d18] hover:border-cyan-500/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-cyan-400 text-lg">✦</span>
                <span className="text-xs text-zinc-600">{spark.date}</span>
              </div>
              <p className="text-zinc-300 leading-relaxed mb-4">
                {spark.content}
              </p>
              <div className="flex flex-wrap gap-2">
                {spark.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Create more sparks by engaging with ARC Engine
          </p>
          <Link 
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #06b6d4dd, #06b6d499)',
              boxShadow: '0 0 30px #06b6d440',
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Enter ARC Engine
          </Link>
        </div>
      </div>
    </div>
  );
}
