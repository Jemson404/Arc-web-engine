export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center gap-8 px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            ARC Engine
          </h1>
          <p className="text-lg text-zinc-400 mb-8">
            Dual perspective analysis with Spark detection
          </p>
        </div>

        <div className="w-full space-y-4">
          <a
            href="/arc"
            className="block w-full rounded-lg bg-purple-600 px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-purple-700"
          >
            <div className="text-xl mb-1">ARC Engine v3</div>
            <div className="text-sm text-purple-200">Full chat experience with real-time Spark integration</div>
          </a>

          <a
            href="/spark-lab"
            className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            <div className="text-xl mb-1">Spark Logic Lab</div>
            <div className="text-sm text-zinc-400">Standalone demo to test Spark detection manually</div>
          </a>
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500">
          <p>PRD v3 Implementation with Spark Logic Layer</p>
        </div>
      </main>
    </div>
  );
}
