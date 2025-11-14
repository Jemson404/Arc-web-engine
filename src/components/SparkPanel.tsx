'use client';

import PanelHeader from './PanelHeader';

interface SparkPanelProps {
  sparks: string[];
}

export default function SparkPanel({ sparks }: SparkPanelProps) {
  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-lg border border-zinc-800">
      <PanelHeader title="✨ Spark" subtitle="Synthesis & Insights" />
      <div className="flex-1 overflow-y-auto p-4">
        {sparks.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
            Waiting for perspectives to generate sparks...
          </div>
        ) : (
          <div className="space-y-3">
            {sparks.map((spark, index) => (
              <div
                key={index}
                className="bg-zinc-800 rounded-lg p-4 border border-zinc-700"
              >
                <p className="text-sm text-zinc-100 leading-relaxed">{spark}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
