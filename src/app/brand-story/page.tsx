import Link from 'next/link';

export default function BrandStoryPage() {
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
          ✦ Our Purpose
        </h1>
        <p className="text-xl text-amber-400 mb-12 text-center">
          The Story Behind ARC Engine
        </p>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Why ARC Exists</h2>
            <p className="mb-4">
              In a world saturated with advice, solutions, and quick fixes, ARC Engine offers something different: the space to think clearly. Not to be told what to do, but to see your own thoughts from multiple angles.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">The Problem We Saw</h2>
            <p className="mb-4">
              Most AI tools race to give you answers. They optimize for speed, confidence, and decisiveness. But genuine insight rarely comes from being told what to think — it emerges when you&apos;re able to hold competing truths in tension.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Approach</h2>
            <p className="mb-4">
              ARC Engine is designed around a simple insight: the mind that grounds you and the mind that expands you are both necessary. Neither is complete alone. When they&apos;re held together — in the right moment, with the right question — something new becomes visible.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">For Seekers, Not Followers</h2>
            <p className="mb-4">
              ARC Engine isn&apos;t for everyone. It&apos;s for people who trust their own capacity to recognize truth when they see it. People who don&apos;t need to be told what to do — they need clarity to see what they already know.
            </p>
          </section>
          
          <section className="border-l-4 border-amber-500/50 pl-6 py-2">
            <p className="text-lg italic text-zinc-400">
              &quot;Two minds illuminating what one alone cannot see.&quot;
            </p>
          </section>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/manifesto"
            className="inline-block px-8 py-3 border border-zinc-700 text-zinc-300 font-medium rounded-full hover:border-amber-500/50 hover:text-amber-400 transition-all mr-4"
          >
            Read the Manifesto
          </Link>
          <Link 
            href="/chat"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-400 transition-all"
          >
            Try ARC Engine
          </Link>
        </div>
      </div>
    </div>
  );
}
