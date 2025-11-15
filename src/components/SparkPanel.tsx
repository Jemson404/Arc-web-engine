'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SparkPanelProps {
  content?: string;
  show: boolean;
}

export default function SparkPanel({ content, show }: SparkPanelProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.9), rgba(39, 39, 42, 0.7))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(147, 51, 234, 0.2)',
          }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0.1, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }}
          />
          
          {/* Header with animated spark icon */}
          <div className="px-4 py-3 border-b border-purple-500/20 flex items-center gap-2">
            <motion.span
              className="text-lg text-purple-400"
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✦
            </motion.span>
            <h2 className="text-sm font-bold text-purple-300 uppercase tracking-wide">
              Spark Insight
            </h2>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {content ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-zinc-100 leading-relaxed"
              >
                {content}
              </motion.p>
            ) : (
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-zinc-500"
              >
                Synthesizing insights...
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
