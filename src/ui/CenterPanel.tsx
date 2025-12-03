'use client';
import React from 'react';
import { ArcMode } from '../types/arc';

interface CenterPanelProps {
  mode: ArcMode;
  text: string;
  hasSpark: boolean;
}

export const CenterPanel: React.FC<CenterPanelProps> = ({ mode, text, hasSpark }) => {
  const isSpark = mode === 'spark' && hasSpark;

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.9rem',
        border: isSpark ? '1px solid rgba(255,255,200,0.9)' : '1px solid rgba(255,255,255,0.15)',
        boxShadow: isSpark ? '0 0 18px rgba(255,255,200,0.4)' : '0 0 10px rgba(0,0,0,0.35)',
        minHeight: '200px',
        transition: '200ms all ease',
        whiteSpace: 'pre-wrap'
      }}
    >
      <div style={{ opacity: 0.8, fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
        {isSpark ? '✦ Spark' : mode === 'idle' ? 'Middle Lens (Idle)' : 'Middle Lens'}
      </div>
      <div>{text}</div>
    </div>
  );
};
