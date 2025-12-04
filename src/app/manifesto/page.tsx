import Link from 'next/link';

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex flex-col px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/"
          className="text-zinc-500 hover:text-amber-400 text-sm mb-8 inline-block transition-colors"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          📖 The ARC Manifesto
        </h1>
        <p className="text-xl text-amber-400 mb-12 text-center">
          How ARC Engine Works
        </p>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Two Minds, One Spark</h2>
            <p className="mb-4">
              ARC Engine is built on the principle that genuine insight emerges from the tension between different perspectives. It&apos;s not about finding the &quot;right&quot; answer — it&apos;s about illuminating the space between grounded reality and expansive possibility.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">ARC-0: The Grounding Mind</h2>
            <p className="mb-4 text-blue-400/80">
              ARC-0 reflects what is undeniably present. It asks: What feels real right now? What consequences are already unfolding? It holds your thoughts without trying to fix or expand them.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">ARC-1: The Exploring Mind</h2>
            <p className="mb-4 text-purple-400/80">
              ARC-1 reflects what could be true. It asks: What possibilities haven&apos;t you entertained yet? What angles feel quietly true but remain unspoken? It opens space without pushing direction.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">✦ The Spark</h2>
            <p className="mb-4 text-amber-400/80">
              When the tension between ARC-0 and ARC-1 reaches a meaningful threshold — when the grounded and the expansive create genuine contrast — a Spark may emerge. This is not advice. It&apos;s not a solution. It&apos;s a reflection of the part of you that can hold both truths at once.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">No Advice. Only Reflection.</h2>
            <p className="mb-4">
              ARC Engine never tells you what to do. It never says &quot;you should&quot; or &quot;you must.&quot; It offers perspective, contrast, and occasionally — when earned — a moment of synthesis. The insight is yours to recognize.
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/chat"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-400 transition-all"
          >
            Experience ARC Engine
          </Link>
        </div>
      </div>
    </div>
  );
}
