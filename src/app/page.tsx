'use client';

import React, { useState } from 'react';
import { ArcPanel } from '@/ui/ArcPanel';
import { CenterPanel } from '@/ui/CenterPanel';
import { generateARC0Text } from '@/core/arc0';
import { generateARC1Text } from '@/core/arc1';
import { evaluateSpark } from '@/core/sparkEngine';
import { setLastResponse } from '@/core/contextManager';
import type { ArcMode, ArcEngineResponse } from '@/types/arc';

export default function Home() {
  const [input, setInput] = useState('');
  const [arc0Text, setArc0Text] = useState('I do not have anything to ground yet, because you have not shared a thought.');
  const [arc1Text, setArc1Text] = useState('I cannot explore possibilities until you give me something to explore.');
  const [centerText, setCenterText] = useState('Two minds await a real thought.');
  const [mode, setMode] = useState<ArcMode>('idle');
  const [delta, setDelta] = useState(0);
  const [hasSpark, setHasSpark] = useState(false);

  const handleReflect = () => {
    const arc0 = generateARC0Text(input);
    const arc1 = generateARC1Text(input);
    const spark = evaluateSpark(input, arc0, arc1);

    setArc0Text(arc0);
    setArc1Text(arc1);
    setCenterText(spark.centerText);
    setMode(spark.mode);
    setDelta(spark.delta);
    setHasSpark(spark.hasSpark);

    const response: ArcEngineResponse = {
      arc0,
      arc1,
      centerText: spark.centerText,
      mode: spark.mode,
      delta: spark.delta,
      hasSpark: spark.hasSpark
    };
    setLastResponse(response);
  };

  const handleReset = () => {
    setInput('');
    setArc0Text('I do not have anything to ground yet, because you have not shared a thought.');
    setArc1Text('I cannot explore possibilities until you give me something to explore.');
    setCenterText('Two minds await a real thought.');
    setMode('idle');
    setDelta(0);
    setHasSpark(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#0a0a0a', color: '#ededed' }}>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">ARC Engine</h1>
        <p className="text-sm opacity-60">A dual-mind reflection system</p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ArcPanel label="ARC-0 · Grounding" side="left" text={arc0Text} />
        <CenterPanel mode={mode} text={centerText} hasSpark={hasSpark} />
        <ArcPanel label="ARC-1 · Exploring" side="right" text={arc1Text} />
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your thought here..."
          className="w-full p-4 rounded-lg resize-none"
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#ededed',
            minHeight: '100px'
          }}
        />
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleReflect}
            className="px-6 py-3 rounded-full font-medium transition-colors"
            style={{
              background: '#ededed',
              color: '#0a0a0a'
            }}
          >
            Reflect
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full font-medium transition-colors"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ededed'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm opacity-50">
        <p>Δ Tension: {delta.toFixed(3)} | Mode: {mode}</p>
      </footer>
    </div>
  );
}
