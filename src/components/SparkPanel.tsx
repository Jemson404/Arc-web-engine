'use client';

import { SparkSummary } from '@/types/arc';

interface SparkPanelProps {
  currentSpark: SparkSummary | null;
}

export default function SparkPanel({ currentSpark }: SparkPanelProps) {
  if (!currentSpark) {
    return (
      <div
        className="rounded-lg border-2 p-6 text-center"
        style={{
          backgroundColor: 'var(--spark-bg)',
          borderColor: 'var(--spark-border)',
          color: 'white'
        }}
      >
        <div className="opacity-70">
          <div className="text-lg mb-2">✨</div>
          <p className="text-sm">Your spark of insight will appear here...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border-2 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--spark-bg)',
        borderColor: 'var(--spark-border)',
        boxShadow: '0 0 20px rgba(107, 70, 193, 0.3)'
      }}
    >
      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%)'
        }}
      />

      <div className="relative p-6 space-y-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-light mb-2" style={{ color: 'var(--spark-accent)' }}>
            ✨ Spark Insight
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4
              className="text-sm font-medium mb-2 opacity-80"
              style={{ color: 'var(--spark-accent)' }}
            >
              Reconciliation
            </h4>
            <p className="text-white leading-relaxed" style={{ fontSize: '16px' }}>
              {currentSpark.reconciliation}
            </p>
          </div>

          <div className="border-l-4 pl-4" style={{ borderColor: 'var(--spark-accent)' }}>
            <h4
              className="text-sm font-medium mb-2"
              style={{ color: 'var(--spark-accent)' }}
            >
              Next Step
            </h4>
            <p className="text-white font-medium leading-relaxed" style={{ fontSize: '18px' }}>
              {currentSpark.nextStep}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}