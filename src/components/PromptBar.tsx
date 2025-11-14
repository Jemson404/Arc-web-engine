'use client';

import { useState, useRef, useEffect } from 'react';

interface PromptBarProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export default function PromptBar({ onSubmit, isLoading }: PromptBarProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 60)}px`;
    }
  };

  return (
    <div className="flex items-center gap-3 h-full">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Share your thoughts, questions, or ideas..."
          disabled={isLoading}
          className="w-full h-12 px-4 py-3 bg-gray-900 text-white rounded-lg resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{
            fontSize: '14px',
            lineHeight: '1.4'
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!input.trim() || isLoading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                 whitespace-nowrap min-w-[100px]"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sparking...
          </span>
        ) : (
          'Spark it'
        )}
      </button>
    </div>
  );
}