import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <main className="flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Two Minds. One Spark.
        </h1>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
          Experience the convergence of dual perspectives, synthesized into breakthrough insights.
        </p>
        <Link
          href="/arc"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
        >
          Enter ARC
        </Link>
      </main>
    </div>
  );
}
