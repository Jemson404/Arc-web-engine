'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

interface CubeFace {
  label: string;
  href: string;
  icon: string;
  description: string;
}

const cubeFaces: CubeFace[] = [
  { label: 'ARC Engine', href: '/chat', icon: '⚡', description: 'Dual-mind reflection' },
  { label: 'History', href: '/history', icon: '📜', description: 'Past sessions' },
  { label: 'Manifesto', href: '/manifesto', icon: '📖', description: 'How it works' },
  { label: 'Brand Story', href: '/brand-story', icon: '✦', description: 'Our purpose' },
  { label: 'Settings', href: '/settings', icon: '⚙️', description: 'Personalization' },
  { label: 'Sparks Vault', href: '/sparks', icon: '💡', description: 'Saved insights' },
];

export default function NavigationCube() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cubeFaces.length) % cubeFaces.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cubeFaces.length);
  }, []);

  const activeFace = cubeFaces[activeIndex];

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 3D Cube Container */}
      <div 
        className="relative w-64 h-64 perspective-1000"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Cube */}
        <div 
          className={`relative w-full h-full transition-transform duration-700 ease-out transform-style-3d ${
            isHovering ? 'scale-105' : ''
          }`}
          style={{
            transform: `rotateY(${activeIndex * -60}deg)`,
          }}
        >
          {cubeFaces.map((face, index) => (
            <Link
              key={face.href}
              href={face.href}
              className={`absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-amber-500/50 shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-900/50 border-zinc-700/30 opacity-0 pointer-events-none'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                transform: `rotateY(${index * 60}deg) translateZ(128px)`,
              }}
            >
              <span className="text-5xl mb-4 animate-pulse">{face.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{face.label}</h3>
              <p className="text-sm text-zinc-400 text-center">{face.description}</p>
            </Link>
          ))}
        </div>
        
        {/* Glow effect */}
        <div 
          className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${
            isHovering ? 'opacity-60' : 'opacity-30'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(245, 200, 66, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={handlePrevious}
          className="w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 flex items-center justify-center"
          aria-label="Previous"
        >
          ←
        </button>
        
        {/* Dots indicator */}
        <div className="flex gap-2">
          {cubeFaces.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-6 bg-amber-500'
                  : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
              aria-label={`Go to ${cubeFaces[index].label}`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 flex items-center justify-center"
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Active label */}
      <div className="text-center">
        <Link 
          href={activeFace.href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold rounded-full hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/30"
        >
          <span>{activeFace.icon}</span>
          <span>Enter {activeFace.label}</span>
        </Link>
      </div>
    </div>
  );
}
