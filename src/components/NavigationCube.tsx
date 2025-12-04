'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CubeFace {
  id: number;
  label: string;
  href: string;
  ctaLabel: string;
  glowColor: string;
  dotColor: string;
}

const cubeFaces: CubeFace[] = [
  { id: 0, label: 'ARC Engine', href: '/chat', ctaLabel: 'Enter ARC Engine', glowColor: '#3b82f6', dotColor: '#3b82f6' },
  { id: 1, label: 'History', href: '/history', ctaLabel: 'View History', glowColor: '#6366f1', dotColor: '#6366f1' },
  { id: 2, label: 'Manifesto', href: '/manifesto', ctaLabel: 'Open Manifesto', glowColor: '#e5e5e5', dotColor: '#e5e5e5' },
  { id: 3, label: 'Purpose', href: '/brand-story', ctaLabel: 'Why ARC Exists', glowColor: '#a855f7', dotColor: '#a855f7' },
  { id: 4, label: 'Settings', href: '/settings', ctaLabel: 'Open Settings', glowColor: '#64748b', dotColor: '#64748b' },
  { id: 5, label: 'Sparks Vault', href: '/sparks', ctaLabel: 'Open Sparks Vault', glowColor: '#06b6d4', dotColor: '#06b6d4' },
];

// Map face index to rotation needed to show that face
const faceRotations: { [key: number]: { x: number; y: number } } = {
  0: { x: 0, y: 0 },      // Front - ARC Engine
  1: { x: 0, y: -90 },    // Right - History
  2: { x: 0, y: 180 },    // Back - Manifesto
  3: { x: 0, y: 90 },     // Left - Purpose
  4: { x: -90, y: 0 },    // Top - Settings
  5: { x: 90, y: 0 },     // Bottom - Sparks Vault
};

interface ARCDiceProps {
  onFaceChange: (faceIndex: number) => void;
  activeFace: number;
}

function ARCDice({ onFaceChange, activeFace }: ARCDiceProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });
  const idleAnimationRef = useRef<number | null>(null);
  const router = useRouter();

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Idle animation
  useEffect(() => {
    if (isDragging || !hasLoaded) return;
    
    let time = 0;
    const animate = () => {
      time += 0.01;
      // Subtle breathing animation
      if (cubeRef.current && !isDragging) {
        const breathe = Math.sin(time) * 2;
        cubeRef.current.style.transform = `rotateX(${rotation.x + breathe * 0.3}deg) rotateY(${rotation.y + breathe * 0.5}deg)`;
      }
      idleAnimationRef.current = requestAnimationFrame(animate);
    };
    idleAnimationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (idleAnimationRef.current) cancelAnimationFrame(idleAnimationRef.current);
    };
  }, [isDragging, rotation, hasLoaded]);

  // Determine active face based on rotation
  const determineActiveFace = useCallback((rotX: number, rotY: number): number => {
    // Normalize rotations
    const normalizedX = ((rotX % 360) + 360) % 360;
    const normalizedY = ((rotY % 360) + 360) % 360;
    
    // Check top/bottom first (based on X rotation)
    if (normalizedX > 45 && normalizedX < 135) return 5; // Bottom - Sparks Vault
    if (normalizedX > 225 && normalizedX < 315) return 4; // Top - Settings
    
    // Then check sides based on Y rotation
    if (normalizedY >= 315 || normalizedY < 45) return 0; // Front - ARC Engine
    if (normalizedY >= 45 && normalizedY < 135) return 3; // Left - Purpose
    if (normalizedY >= 135 && normalizedY < 225) return 2; // Back - Manifesto
    if (normalizedY >= 225 && normalizedY < 315) return 1; // Right - History
    
    return 0;
  }, []);

  // Snap to nearest face
  const snapToFace = useCallback((faceIndex: number) => {
    const targetRotation = faceRotations[faceIndex];
    
    // Calculate shortest path for Y rotation
    const currentY = rotation.y % 360;
    let targetY = targetRotation.y;
    
    // Adjust for shortest rotation path
    while (targetY - currentY > 180) targetY -= 360;
    while (currentY - targetY > 180) targetY += 360;
    
    setRotation({
      x: targetRotation.x,
      y: targetY
    });
    onFaceChange(faceIndex);
  }, [rotation.y, onFaceChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (idleAnimationRef.current) cancelAnimationFrame(idleAnimationRef.current);
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { ...rotation };
  }, [rotation]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    const newRotation = {
      x: rotationStart.current.x - deltaY * 0.5,
      y: rotationStart.current.y + deltaX * 0.5,
    };
    
    setRotation(newRotation);
    
    // Update active face during drag
    const newActiveFace = determineActiveFace(newRotation.x, newRotation.y);
    if (newActiveFace !== activeFace) {
      onFaceChange(newActiveFace);
    }
  }, [isDragging, determineActiveFace, activeFace, onFaceChange]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest face
    const nearestFace = determineActiveFace(rotation.x, rotation.y);
    snapToFace(nearestFace);
  }, [isDragging, rotation, determineActiveFace, snapToFace]);

  const handleClick = useCallback(() => {
    if (!isDragging) {
      router.push(cubeFaces[activeFace].href);
    }
  }, [isDragging, activeFace, router]);

  // Navigate to face when legend item is clicked
  const navigateToFace = useCallback((faceIndex: number) => {
    snapToFace(faceIndex);
  }, [snapToFace]);

  // Expose navigateToFace for parent component
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as HTMLDivElement & { navigateToFace?: (index: number) => void }).navigateToFace = navigateToFace;
    }
  }, [navigateToFace]);

  const cubeSize = 180;
  const translateZ = cubeSize / 2;

  return (
    <div 
      ref={containerRef}
      className={`relative transition-all duration-1000 ${hasLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      style={{ perspective: '1000px', width: cubeSize * 1.5, height: cubeSize * 1.5 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseEnter={() => setIsHovering(true)}
    >
      {/* Glow effect behind cube */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${cubeFaces[activeFace].glowColor}30 0%, transparent 70%)`,
          transform: 'scale(1.2)',
        }}
      />
      
      {/* 3D Cube */}
      <div
        ref={cubeRef}
        className={`absolute inset-0 m-auto cursor-grab transition-transform ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          width: cubeSize,
          height: cubeSize,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={handleClick}
      >
        {/* Front Face - ARC Engine */}
        <div
          className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 0 ? 'scale-105' : ''}`}
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `translateZ(${translateZ}px)`,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderColor: '#3b82f6',
            borderWidth: '2px',
            boxShadow: activeFace === 0 ? `0 0 30px ${cubeFaces[0].glowColor}50, inset 0 0 20px ${cubeFaces[0].glowColor}20` : 'none',
          }}
        >
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#3b82f6" fillOpacity="0.3"/>
          </svg>
          <span className="text-white font-semibold text-sm">ARC Engine</span>
        </div>

        {/* Back Face - Manifesto */}
        <div
          className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 2 ? 'scale-105' : ''}`}
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateY(180deg) translateZ(${translateZ}px)`,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderColor: '#e5e5e5',
            borderWidth: '2px',
            boxShadow: activeFace === 2 ? `0 0 30px ${cubeFaces[2].glowColor}50, inset 0 0 20px ${cubeFaces[2].glowColor}20` : 'none',
          }}
        >
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="1.5">
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
          </svg>
          <span className="text-white font-semibold text-sm">Manifesto</span>
        </div>

        {/* Right Face - History */}
        <div
          className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 1 ? 'scale-105' : ''}`}
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateY(90deg) translateZ(${translateZ}px)`,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderColor: '#6366f1',
            borderWidth: '2px',
            boxShadow: activeFace === 1 ? `0 0 30px ${cubeFaces[1].glowColor}50, inset 0 0 20px ${cubeFaces[1].glowColor}20` : 'none',
          }}
        >
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span className="text-white font-semibold text-sm">History</span>
        </div>

        {/* Left Face - Purpose */}
        <div
          className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 3 ? 'scale-105' : ''}`}
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateY(-90deg) translateZ(${translateZ}px)`,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderColor: '#a855f7',
            borderWidth: '2px',
            boxShadow: activeFace === 3 ? `0 0 30px ${cubeFaces[3].glowColor}50, inset 0 0 20px ${cubeFaces[3].glowColor}20` : 'none',
          }}
        >
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
          </svg>
          <span className="text-white font-semibold text-sm">Purpose</span>
        </div>

        {/* Top Face - Settings */}
        <div
          className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 4 ? 'scale-105' : ''}`}
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateX(90deg) translateZ(${translateZ}px)`,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderColor: '#64748b',
            borderWidth: '2px',
            boxShadow: activeFace === 4 ? `0 0 30px ${cubeFaces[4].glowColor}50, inset 0 0 20px ${cubeFaces[4].glowColor}20` : 'none',
          }}
        >
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5">
            <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span className="text-white font-semibold text-sm">Settings</span>
        </div>

        {/* Bottom Face - Sparks Vault */}
        <div
          className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 5 ? 'scale-105' : ''}`}
          style={{
            width: cubeSize,
            height: cubeSize,
            transform: `rotateX(-90deg) translateZ(${translateZ}px)`,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderColor: '#06b6d4',
            borderWidth: '2px',
            boxShadow: activeFace === 5 ? `0 0 30px ${cubeFaces[5].glowColor}50, inset 0 0 20px ${cubeFaces[5].glowColor}20` : 'none',
          }}
        >
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5">
            <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
          </svg>
          <span className="text-white font-semibold text-sm">Sparks Vault</span>
        </div>
      </div>
    </div>
  );
}

interface LegendProps {
  activeFace: number;
  onLegendClick: (index: number) => void;
}

function Legend({ activeFace, onLegendClick }: LegendProps) {
  const leftColumn = [
    { index: 0, label: 'ARC Engine' },
    { index: 2, label: 'Manifesto' },
    { index: 4, label: 'Settings' },
  ];
  
  const rightColumn = [
    { index: 1, label: 'History' },
    { index: 3, label: 'Purpose' },
    { index: 5, label: 'Sparks Vault' },
  ];

  return (
    <div className="flex gap-12 mt-8">
      <div className="flex flex-col gap-3">
        {leftColumn.map(item => (
          <button
            key={item.index}
            onClick={() => onLegendClick(item.index)}
            className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFace === item.index ? 'scale-150' : ''}`}
              style={{
                backgroundColor: cubeFaces[item.index].dotColor,
                boxShadow: activeFace === item.index ? `0 0 10px ${cubeFaces[item.index].dotColor}` : 'none',
              }}
            />
            <span className={`text-sm transition-colors ${activeFace === item.index ? 'text-white' : 'text-zinc-500'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {rightColumn.map(item => (
          <button
            key={item.index}
            onClick={() => onLegendClick(item.index)}
            className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFace === item.index ? 'scale-150' : ''}`}
              style={{
                backgroundColor: cubeFaces[item.index].dotColor,
                boxShadow: activeFace === item.index ? `0 0 10px ${cubeFaces[item.index].dotColor}` : 'none',
              }}
            />
            <span className={`text-sm transition-colors ${activeFace === item.index ? 'text-white' : 'text-zinc-500'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function NavigationCube() {
  const [activeFace, setActiveFace] = useState(0);
  const cubeContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLegendClick = useCallback((index: number) => {
    setActiveFace(index);
    // Find the cube container and call its navigateToFace method
    const container = cubeContainerRef.current?.querySelector('[style*="perspective"]') as HTMLDivElement & { navigateToFace?: (index: number) => void };
    if (container?.navigateToFace) {
      container.navigateToFace(index);
    }
  }, []);

  const handleCTAClick = useCallback(() => {
    router.push(cubeFaces[activeFace].href);
  }, [activeFace, router]);

  return (
    <div ref={cubeContainerRef} className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-[70vh] items-center">
        {/* Left side - Cube (35%) */}
        <div className="w-[35%] flex items-center justify-center">
          <ARCDice onFaceChange={setActiveFace} activeFace={activeFace} />
        </div>

        {/* Right side - Content (65%) */}
        <div className="w-[65%] pl-8">
          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Two Minds.<br />One Spark.
          </h1>
          
          {/* Subtext */}
          <p className="text-lg text-zinc-400 mb-6 max-w-md leading-relaxed">
            A calm space where your thoughts meet two perspectives—and clarity emerges.
          </p>
          
          {/* Instruction */}
          <p className="text-xs text-zinc-600 mb-8">
            Drag to rotate • Hover to preview • Click any face to begin
          </p>
          
          {/* Legend */}
          <Legend activeFace={activeFace} onLegendClick={handleLegendClick} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center text-center px-4">
        {/* Headline */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Two Minds. One Spark.
        </h1>
        
        {/* Subtext */}
        <p className="text-sm text-zinc-400 mb-6 max-w-xs">
          A calm space where your thoughts meet two perspectives—and clarity emerges.
        </p>
        
        {/* Cube */}
        <div className="mb-6">
          <ARCDice onFaceChange={setActiveFace} activeFace={activeFace} />
        </div>
        
        {/* Instruction */}
        <p className="text-xs text-zinc-600 mb-4">
          Drag to rotate • Tap to navigate
        </p>
        
        {/* Legend - horizontal on mobile */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {cubeFaces.map((face, index) => (
            <button
              key={index}
              onClick={() => handleLegendClick(index)}
              className="flex items-center gap-2"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFace === index ? 'scale-150' : ''}`}
                style={{
                  backgroundColor: face.dotColor,
                  boxShadow: activeFace === index ? `0 0 8px ${face.dotColor}` : 'none',
                }}
              />
              <span className={`text-xs transition-colors ${activeFace === index ? 'text-white' : 'text-zinc-500'}`}>
                {face.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Button - Fixed at bottom center */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={handleCTAClick}
          className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${cubeFaces[activeFace].glowColor}dd, ${cubeFaces[activeFace].glowColor}99)`,
            boxShadow: `0 0 30px ${cubeFaces[activeFace].glowColor}40`,
          }}
        >
          {cubeFaces[activeFace].ctaLabel}
        </button>
      </div>
    </div>
  );
}
