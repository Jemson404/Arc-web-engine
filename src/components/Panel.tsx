'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  idle?: boolean;
}

export default function Panel({ title, children, className = '', idle = false }: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden ${className}`}
    >
      {/* Idle animations */}
      {idle && (
        <>
          {/* Breathing glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1), transparent 70%)',
            }}
          />
          
          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
            animate={{
              y: [0, 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
      
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
          {title}
        </h2>
      </div>
      
      {/* Panel content */}
      <div className="p-4 overflow-y-auto h-full">
        {children}
      </div>
    </motion.div>
  );
}
