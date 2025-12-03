'use client';
import React from 'react';

interface ArcPanelProps {
  label: string;
  side: 'left' | 'right';
  text: string;
}

export const ArcPanel: React.FC<ArcPanelProps> = ({ label, side, text }) => (
  <div
    className={`arc-panel arc-${side}`}
    style={{
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '1px solid rgba(255,255,255,0.12)',
      minHeight: '180px',
      whiteSpace: 'pre-wrap'
    }}
  >
    <div style={{ opacity: 0.7, fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
      {label}
    </div>
    <div>{text}</div>
  </div>
);
