import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-thin tracking-wider text-white mb-6">
          Two Minds. One Spark.
        </h1>
        <p className="text-xl text-gray-400 mb-12 opacity-70">
          A private space where two inner voices help you think.
        </p>
        <Link
          href="/arc"
          className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Open ARC Engine
        </Link>
      </div>
    </div>
  );
}