'use client';

import { useState } from 'react';
import { evaluateSpark, type SparkResult } from '@/lib/sparkEngine';

export default function Home() {
  const [userMessage, setUserMessage] = useState('');
  const [arc0Message, setArc0Message] = useState('');
  const [arc1Message, setArc1Message] = useState('');
  const [sparkState, setSparkState] = useState<SparkResult | null>(null);

  const handleEvaluate = () => {
    if (userMessage && arc0Message && arc1Message) {
      const sparkResult = evaluateSpark({
        userMessage,
        arc0Message: arc0Message,
        arc1Message: arc1Message,
      });
      setSparkState(sparkResult);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col gap-8 py-12 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            ARC Engine - Spark Logic Layer v1
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            The space between ARC-0 and ARC-1 where insights emerge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ARC-0 Panel */}
          <div className="flex flex-col gap-4 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">ARC-0</h2>
            <textarea
              className="w-full h-32 p-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-black dark:text-zinc-50"
              placeholder="Enter ARC-0 message (grounding, practical)..."
              value={arc0Message}
              onChange={(e) => setArc0Message(e.target.value)}
            />
          </div>

          {/* Spark Panel */}
          <div className="spark-panel flex flex-col gap-4 p-6 border-2 border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-center text-black dark:text-zinc-50">✦ Spark</h2>
            <div className={sparkState?.spark ? "spark-active-animation" : "spark-idle-animation"}>
              {sparkState ? (
                <pre className="whitespace-pre-wrap text-sm text-black dark:text-zinc-50">{sparkState.summary}</pre>
              ) : (
                <p className="text-sm text-neutral-500">
                  The space between ARC-0 and ARC-1 lights up when a Spark appears.
                </p>
              )}
            </div>
            {sparkState && (
              <div className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
                <p>Debug Scores:</p>
                <p>Emotional: {(sparkState.scores.emotionalIntensity * 100).toFixed(1)}%</p>
                <p>Conflict: {(sparkState.scores.conflict * 100).toFixed(1)}%</p>
                <p>Readiness: {(sparkState.scores.readiness * 100).toFixed(1)}%</p>
                <p>Length: {(sparkState.scores.lengthFactor * 100).toFixed(1)}%</p>
                <p className="font-semibold">Total: {(sparkState.scores.totalScore * 100).toFixed(1)}%</p>
              </div>
            )}
          </div>

          {/* ARC-1 Panel */}
          <div className="flex flex-col gap-4 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">ARC-1</h2>
            <textarea
              className="w-full h-32 p-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-black dark:text-zinc-50"
              placeholder="Enter ARC-1 message (exploratory, aspirational)..."
              value={arc1Message}
              onChange={(e) => setArc1Message(e.target.value)}
            />
          </div>
        </div>

        {/* User Message Input */}
        <div className="flex flex-col gap-4 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">User Message</h2>
          <textarea
            className="w-full h-32 p-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-black dark:text-zinc-50"
            placeholder="Enter your message here..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button
            onClick={handleEvaluate}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Evaluate Spark
          </button>
        </div>
      </main>
    </div>
  );
}
