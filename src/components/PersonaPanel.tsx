'use client';

import { useEffect, useRef } from 'react';
import { PersonaType } from '@/types/arc';

interface PersonaPanelProps {
  title: string;
  personaType: 'arc0' | 'arc1' | 'spark';
  messages: Array<{
    id: string;
    content: string;
    timestamp: Date;
  }>;
}

export default function PersonaPanel({ title, personaType, messages }: PersonaPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getThemeStyles = () => {
    switch (personaType) {
      case 'arc0':
        return {
          bg: 'var(--arc-0-bg)',
          border: 'var(--arc-0-border)',
          text: 'var(--arc-0-text)',
          accent: 'var(--arc-0-text)'
        };
      case 'arc1':
        return {
          bg: 'var(--arc-1-bg)',
          border: 'var(--arc-1-border)',
          text: 'var(--arc-1-text)',
          accent: 'var(--arc-1-text)'
        };
      case 'spark':
        return {
          bg: 'var(--spark-bg)',
          border: 'var(--spark-border)',
          text: 'white',
          accent: 'var(--spark-accent)'
        };
      default:
        return {
          bg: '#1a1a1a',
          border: '#333',
          text: '#fff',
          accent: '#666'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div
      className="rounded-lg border-2 flex flex-col h-full"
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border
      }}
    >
      <div
        className="px-4 py-3 border-b flex items-center gap-2"
        style={{
          borderBottomColor: theme.border
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: theme.accent }}
        />
        <h3
          className="font-medium text-sm"
          style={{ color: theme.text }}
        >
          {title}
        </h3>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ color: theme.text }}
      >
        {messages.length === 0 ? (
          <div className="text-center opacity-50 text-sm mt-8">
            {personaType === 'arc0' && 'Waiting for analytical perspective...'}
            {personaType === 'arc1' && 'Waiting for creative perspective...'}
            {personaType === 'spark' && 'Waiting for spark of insight...'}
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className="p-3 rounded text-sm leading-relaxed"
              style={{
                backgroundColor: index % 2 === 0 ? 'transparent' : `${theme.border}20`,
                fontSize: '13px',
                lineHeight: '1.4'
              }}
            >
              {message.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}