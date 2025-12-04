'use client';

import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex flex-col px-4 py-12">
      <div className="max-w-2xl mx-auto w-full">
        <Link 
          href="/"
          className="text-zinc-500 hover:text-amber-400 text-sm mb-8 inline-block transition-colors"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          ⚙️ Settings
        </h1>
        <p className="text-xl text-amber-400 mb-12 text-center">
          Personalize Your Experience
        </p>
        
        <div className="space-y-6">
          {/* Theme Setting */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-lg font-semibold text-white mb-2">Theme</h3>
            <p className="text-sm text-zinc-500 mb-4">Choose your preferred visual style</p>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-amber-500/50 text-amber-400">
                Dark
              </button>
              <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 opacity-50 cursor-not-allowed">
                Light (Coming Soon)
              </button>
            </div>
          </div>
          
          {/* Spark Sensitivity */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-lg font-semibold text-white mb-2">Spark Sensitivity</h3>
            <p className="text-sm text-zinc-500 mb-4">Adjust how often sparks emerge</p>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 text-sm">Rare</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="50"
                className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-zinc-500 text-sm">Frequent</span>
            </div>
          </div>
          
          {/* Response Length */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-lg font-semibold text-white mb-2">Response Length</h3>
            <p className="text-sm text-zinc-500 mb-4">Preferred depth of reflections</p>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors">
                Brief
              </button>
              <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-amber-500/50 text-amber-400">
                Balanced
              </button>
              <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors">
                Deep
              </button>
            </div>
          </div>
          
          {/* Data */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-lg font-semibold text-white mb-2">Session Data</h3>
            <p className="text-sm text-zinc-500 mb-4">Manage your stored sessions and sparks</p>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:border-red-500/50 hover:text-red-400 transition-colors">
                Clear History
              </button>
              <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-400 transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
