'use client';

import { useState, KeyboardEvent } from 'react';

interface InputBarProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export default function InputBar({ onSubmit, disabled }: InputBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full px-6 py-4 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="What clarity are you seeking today?"
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
      </div>
    </div>
  );
}
