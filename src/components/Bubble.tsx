'use client';

interface BubbleProps {
  text: string;
  isUser?: boolean;
  timestamp?: string;
}

export default function Bubble({ text, isUser = false, timestamp }: BubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-zinc-800 text-zinc-100'
        }`}
      >
        <p className="text-sm leading-relaxed">{text}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-zinc-500'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
