'use client';

import { useState } from 'react';
import { evaluateSpark, type SparkResult } from '@/lib/sparkEngine';

export default function SparkLabPage() {
  const [userMessage, setUserMessage] = useState('');
  const [arc0Message, setArc0Message] = useState('');
  const [arc1Message, setArc1Message] = useState('');
  const [sparkResult, setSparkResult] = useState<SparkResult | null>(null);

  const handleEvaluate = () => {
    if (!userMessage.trim() || !arc0Message.trim() || !arc1Message.trim()) {
      alert('Please fill in all three fields');
      return;
    }

    const result = evaluateSpark({
      userMessage: userMessage.trim(),
      arc0Message: arc0Message.trim(),
      arc1Message: arc1Message.trim(),
    });

    setSparkResult(result);
  };

  const handleClear = () => {
    setUserMessage('');
    setArc0Message('');
    setArc1Message('');
    setSparkResult(null);
  };

  const loadExample = () => {
    setUserMessage("I'm so tired of feeling stuck in this job. I keep saying I'll look for something new, but I never do. I feel scared and overwhelmed whenever I think about it. Why do I keep doing this to myself?");
    setArc0Message("You're experiencing fear and overwhelm right now, which is completely valid. Your current job provides security and predictability. The anxiety you feel when thinking about change is your mind trying to protect you from uncertainty.");
    setArc1Message("What if this feeling of being stuck is actually a sign that you're ready for growth? Perhaps the fear isn't a stop sign, but rather an indicator that something meaningful is on the other side. What would it look like to take one small step toward exploring new opportunities?");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ARC Engine – Spark Logic Layer v1</h1>
          <p className="text-zinc-400">
            Standalone demo to test Spark detection logic with custom inputs
          </p>
          <div className="mt-4 flex gap-2">
            <a 
              href="/arc" 
              className="text-sm text-purple-400 hover:text-purple-300 underline"
            >
              ← Back to Full ARC Engine
            </a>
          </div>
        </header>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* User Message Input */}
          <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4">
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              User Message
            </label>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Enter what the user said..."
              className="h-40 w-full rounded border border-zinc-600 bg-zinc-900 p-3 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          {/* ARC-0 Message Input */}
          <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4">
            <label className="mb-2 block text-sm font-semibold text-blue-400">
              ARC-0 Response (Validation)
            </label>
            <textarea
              value={arc0Message}
              onChange={(e) => setArc0Message(e.target.value)}
              placeholder="Enter ARC-0's grounding response..."
              className="h-40 w-full rounded border border-zinc-600 bg-zinc-900 p-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* ARC-1 Message Input */}
          <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4">
            <label className="mb-2 block text-sm font-semibold text-green-400">
              ARC-1 Response (Exploration)
            </label>
            <textarea
              value={arc1Message}
              onChange={(e) => setArc1Message(e.target.value)}
              placeholder="Enter ARC-1's exploratory response..."
              className="h-40 w-full rounded border border-zinc-600 bg-zinc-900 p-3 text-sm text-white placeholder-zinc-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={handleEvaluate}
            className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Evaluate Spark
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-3 font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={loadExample}
            className="rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-3 font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Load Example
          </button>
        </div>

        {/* Results Section */}
        {sparkResult && (
          <div className="space-y-4">
            {/* Spark Status */}
            <div className={`rounded-lg border p-6 ${sparkResult.spark ? 'border-purple-500 bg-purple-950/30' : 'border-zinc-700 bg-zinc-800'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {sparkResult.spark ? '✦ Spark Detected!' : 'No Spark'}
                </h2>
                <span className={`rounded-full px-4 py-1 text-sm font-medium ${sparkResult.spark ? 'bg-purple-600 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
                  Score: {(sparkResult.scores.totalScore * 100).toFixed(1)}%
                </span>
              </div>

              {/* Summary */}
              <div className="rounded bg-zinc-900 p-4">
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Summary</h3>
                <pre className="whitespace-pre-wrap text-sm text-zinc-200">
                  {sparkResult.summary}
                </pre>
              </div>
            </div>

            {/* Debug Scores */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4">Debug Scores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ScoreCard
                  label="Emotional Intensity"
                  score={sparkResult.scores.emotionalIntensity}
                  weight={35}
                  color="red"
                />
                <ScoreCard
                  label="Conflict"
                  score={sparkResult.scores.conflict}
                  weight={30}
                  color="orange"
                />
                <ScoreCard
                  label="Readiness"
                  score={sparkResult.scores.readiness}
                  weight={25}
                  color="blue"
                />
                <ScoreCard
                  label="Length Factor"
                  score={sparkResult.scores.lengthFactor}
                  weight={10}
                  color="green"
                />
              </div>
              <div className="mt-4 rounded bg-zinc-900 p-3">
                <p className="text-sm text-zinc-400">
                  Total Score = (0.35 × Emotional) + (0.30 × Conflict) + (0.25 × Readiness) + (0.10 × Length)
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  Spark Threshold: <span className="font-semibold text-purple-400">60%</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ScoreCardProps {
  label: string;
  score: number;
  weight: number;
  color: 'red' | 'orange' | 'blue' | 'green';
}

function ScoreCard({ label, score, weight, color }: ScoreCardProps) {
  const percentage = Math.round(score * 100);
  
  const colorClasses = {
    red: 'bg-red-600',
    orange: 'bg-orange-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
  };

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <span className="text-xs text-zinc-500">Weight: {weight}%</span>
      </div>
      <div className="mb-2 text-2xl font-bold">{percentage}%</div>
      <div className="h-2 w-full rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
