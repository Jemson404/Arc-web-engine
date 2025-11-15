'use client';

import { motion } from 'framer-motion';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'arc0' | 'arc1' | 'summary' | 'spark';
  streaming?: boolean;
}

export default function MessageBubble({ content, role, streaming }: MessageBubbleProps) {
  const isUser = role === 'user';
  
  const getBgColor = () => {
    switch (role) {
      case 'user':
        return 'bg-purple-600/20 border-purple-500/30';
      case 'arc0':
        return 'bg-blue-600/10 border-blue-500/20';
      case 'arc1':
        return 'bg-pink-600/10 border-pink-500/20';
      case 'summary':
        return 'bg-zinc-800 border-zinc-700';
      default:
        return 'bg-zinc-800 border-zinc-700';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-3 ${isUser ? 'ml-auto' : 'mr-auto'} max-w-[85%]`}
    >
      <div className={`px-4 py-3 rounded-lg border ${getBgColor()}`}>
        <div className="text-sm text-zinc-100 whitespace-pre-wrap break-words">
          {content}
          {streaming && (
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1"
            >
              ▋
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
