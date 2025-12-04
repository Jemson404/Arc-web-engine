import NavigationCube from "@/components/NavigationCube";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-8">
          <span className="text-5xl mb-2 block">✦</span>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 mb-4">
            ARC Engine
          </h1>
          <p className="text-xl md:text-2xl text-amber-400 font-medium">
            Two Minds. One Spark.
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-zinc-400 mb-12 max-w-xl leading-relaxed">
          A dual-mind reflection system that synthesizes analytical depth with creative exploration to illuminate moments of genuine insight.
        </p>

        {/* Navigation Cube */}
        <NavigationCube />

        {/* Footer tagline */}
        <p className="mt-16 text-sm text-zinc-600">
          Navigate the cube to explore ARC Engine&apos;s capabilities
        </p>
      </main>
    </div>
  );
}
