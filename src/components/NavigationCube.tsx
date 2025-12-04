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

interface ARCDiceProps {
  onFaceChange: (faceIndex: number) => void;
  activeFace: number;
  navigateToFaceRef: React.MutableRefObject<((index: number) => void) | null>;
}

function ARCDice({ onFaceChange, activeFace, navigateToFaceRef }: ARCDiceProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 25 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState(0);
  
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });
  const idleAnimationRef = useRef<number | null>(null);
  const idleTimeRef = useRef(0);
  const lastDragTime = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const timer1 = setTimeout(() => setEntrancePhase(1), 200);
    const timer2 = setTimeout(() => setEntrancePhase(2), 900);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  useEffect(() => {
    if (entrancePhase < 2) return;
    
    const animate = () => {
      const timeSinceDrag = Date.now() - lastDragTime.current;
      
      if (!isDragging && timeSinceDrag > 500) {
        idleTimeRef.current += 0.008;
        
        if (cubeRef.current) {
          const breatheX = Math.sin(idleTimeRef.current * 0.7) * 3;
          const breatheY = Math.cos(idleTimeRef.current * 0.5) * 4;
          cubeRef.current.style.transform = `rotateX(${rotation.x + breatheX}deg) rotateY(${rotation.y + breatheY}deg)`;
        }
      }
      
      idleAnimationRef.current = requestAnimationFrame(animate);
    };
    
    idleAnimationRef.current = requestAnimationFrame(animate);
    return () => { if (idleAnimationRef.current) cancelAnimationFrame(idleAnimationRef.current); };
  }, [isDragging, rotation, entrancePhase]);

  const determineActiveFace = useCallback((rotX: number, rotY: number): number => {
    let normalizedX = ((rotX % 360) + 360) % 360;
    let normalizedY = ((rotY % 360) + 360) % 360;
    if (normalizedX > 180) normalizedX -= 360;
    if (normalizedY > 180) normalizedY -= 360;
    
    if (normalizedX < -45) return 4; // Top - Settings
    if (normalizedX > 45) return 5;  // Bottom - Sparks Vault
    if (normalizedY >= -45 && normalizedY < 45) return 0;   // Front - ARC Engine
    if (normalizedY >= 45 && normalizedY < 135) return 3;   // Left side showing = Purpose (was 1)
    if (normalizedY >= 135 || normalizedY < -135) return 2; // Back - Manifesto
    if (normalizedY >= -135 && normalizedY < -45) return 1; // Right side showing = History (was 3)
    return 0;
  }, []);

  const navigateToFace = useCallback((faceIndex: number) => {
    const targetRotations: { [key: number]: { x: number; y: number } } = {
      0: { x: 0, y: 0 }, 1: { x: 0, y: -90 }, 2: { x: 0, y: 180 },
      3: { x: 0, y: 90 }, 4: { x: -90, y: 0 }, 5: { x: 90, y: 0 },
    };
    const target = targetRotations[faceIndex];
    let currentY = rotation.y;
    while (currentY > 180) currentY -= 360;
    while (currentY < -180) currentY += 360;
    let diff = target.y - currentY;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    setRotation({ x: target.x, y: currentY + diff });
    onFaceChange(faceIndex);
  }, [rotation.y, onFaceChange]);

  useEffect(() => { navigateToFaceRef.current = navigateToFace; }, [navigateToFace, navigateToFaceRef]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragMoved(false);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { ...rotation };
    if (idleAnimationRef.current) cancelAnimationFrame(idleAnimationRef.current);
  }, [rotation]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) setDragMoved(true);
    const newRotation = { x: rotationStart.current.x - deltaY * 0.5, y: rotationStart.current.y + deltaX * 0.5 };
    setRotation(newRotation);
    if (cubeRef.current) cubeRef.current.style.transform = `rotateX(${newRotation.x}deg) rotateY(${newRotation.y}deg)`;
    const newActiveFace = determineActiveFace(newRotation.x, newRotation.y);
    if (newActiveFace !== activeFace) onFaceChange(newActiveFace);
  }, [isDragging, determineActiveFace, activeFace, onFaceChange]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    lastDragTime.current = Date.now();
    onFaceChange(determineActiveFace(rotation.x, rotation.y));
  }, [isDragging, rotation, determineActiveFace, onFaceChange]);

  const handleClick = useCallback(() => {
    if (!dragMoved) router.push(cubeFaces[activeFace].href);
  }, [dragMoved, activeFace, router]);

  const cubeSize = 180;
  const translateZ = cubeSize / 2;

  const getEntranceStyles = (): React.CSSProperties => {
    if (entrancePhase === 0) return { transform: 'scale(0.5)', opacity: 0, filter: 'blur(10px)' };
    if (entrancePhase === 1) return { transform: 'scale(0.85)', opacity: 0.8, filter: 'blur(2px)' };
    return { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' };
  };

  const faceStyle = (index: number, transform: string): React.CSSProperties => ({
    width: cubeSize, height: cubeSize, transform,
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    borderColor: cubeFaces[index].glowColor, borderWidth: '2px',
    boxShadow: `0 0 20px ${cubeFaces[index].glowColor}30, inset 0 0 15px ${cubeFaces[index].glowColor}15`,
  });

  return (
    <div className="relative transition-all duration-700 ease-out"
      style={{ perspective: '1000px', width: cubeSize * 1.5, height: cubeSize * 1.5, ...getEntranceStyles() }}
      onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} onMouseEnter={() => setIsHovering(true)}>
      <div className="absolute inset-0 rounded-full blur-3xl transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${cubeFaces[activeFace].glowColor}40 0%, transparent 70%)`, transform: 'scale(1.5)' }} />
      <div ref={cubeRef} className={`absolute inset-0 m-auto cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{ width: cubeSize, height: cubeSize, transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out' }} onClick={handleClick}>
        <div className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 0 ? 'scale-[1.02]' : ''}`}
          style={faceStyle(0, `translateZ(${translateZ}px)`)}>
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#3b82f6" fillOpacity="0.3"/></svg>
          <span className="text-white font-semibold text-sm">ARC Engine</span></div>
        <div className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 2 ? 'scale-[1.02]' : ''}`}
          style={faceStyle(2, `rotateY(180deg) translateZ(${translateZ}px)`)}>
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="1.5">
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
          <span className="text-white font-semibold text-sm">Manifesto</span></div>
        <div className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 1 ? 'scale-[1.02]' : ''}`}
          style={faceStyle(1, `rotateY(90deg) translateZ(${translateZ}px)`)}>
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span className="text-white font-semibold text-sm">History</span></div>
        <div className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 3 ? 'scale-[1.02]' : ''}`}
          style={faceStyle(3, `rotateY(-90deg) translateZ(${translateZ}px)`)}>
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/></svg>
          <span className="text-white font-semibold text-sm">Purpose</span></div>
        <div className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 4 ? 'scale-[1.02]' : ''}`}
          style={faceStyle(4, `rotateX(90deg) translateZ(${translateZ}px)`)}>
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5">
            <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span className="text-white font-semibold text-sm">Settings</span></div>
        <div className={`absolute flex flex-col items-center justify-center border rounded-lg transition-all duration-300 ${isHovering && activeFace === 5 ? 'scale-[1.02]' : ''}`}
          style={faceStyle(5, `rotateX(-90deg) translateZ(${translateZ}px)`)}>
          <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5">
            <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
          <span className="text-white font-semibold text-sm">Sparks Vault</span></div>
      </div>
    </div>
  );
}

interface LegendProps { activeFace: number; onLegendClick: (index: number) => void; visible: boolean; }

function Legend({ activeFace, onLegendClick, visible }: LegendProps) {
  const leftColumn = [{ index: 0, label: 'ARC Engine' }, { index: 2, label: 'Manifesto' }, { index: 4, label: 'Settings' }];
  const rightColumn = [{ index: 1, label: 'History' }, { index: 3, label: 'Purpose' }, { index: 5, label: 'Sparks Vault' }];

  return (
    <div className={`flex gap-12 mt-8 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
      <div className="flex flex-col gap-3">
        {leftColumn.map(item => (
          <button key={item.index} onClick={() => onLegendClick(item.index)} className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFace === item.index ? 'scale-150' : ''}`}
              style={{ backgroundColor: cubeFaces[item.index].dotColor, boxShadow: activeFace === item.index ? `0 0 10px ${cubeFaces[item.index].dotColor}` : 'none' }} />
            <span className={`text-sm transition-colors ${activeFace === item.index ? 'text-white' : 'text-zinc-500'}`}>{item.label}</span>
          </button>))}
      </div>
      <div className="flex flex-col gap-3">
        {rightColumn.map(item => (
          <button key={item.index} onClick={() => onLegendClick(item.index)} className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFace === item.index ? 'scale-150' : ''}`}
              style={{ backgroundColor: cubeFaces[item.index].dotColor, boxShadow: activeFace === item.index ? `0 0 10px ${cubeFaces[item.index].dotColor}` : 'none' }} />
            <span className={`text-sm transition-colors ${activeFace === item.index ? 'text-white' : 'text-zinc-500'}`}>{item.label}</span>
          </button>))}
      </div>
    </div>
  );
}

export default function NavigationCube() {
  const [activeFace, setActiveFace] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const navigateToFaceRef = useRef<((index: number) => void) | null>(null);
  const router = useRouter();

  useEffect(() => { const timer = setTimeout(() => setContentVisible(true), 1100); return () => clearTimeout(timer); }, []);

  const handleLegendClick = useCallback((index: number) => { if (navigateToFaceRef.current) navigateToFaceRef.current(index); }, []);
  const handleCTAClick = useCallback(() => { router.push(cubeFaces[activeFace].href); }, [activeFace, router]);

  return (
    <div className="w-full">
      <div className="hidden md:flex min-h-[70vh] items-center">
        <div className="w-[35%] flex items-center justify-center">
          <ARCDice onFaceChange={setActiveFace} activeFace={activeFace} navigateToFaceRef={navigateToFaceRef} />
        </div>
        <div className="w-[65%] pl-8">
          <h1 className={`text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            Two Minds.<br />One Spark.</h1>
          <p className={`text-lg text-zinc-400 mb-6 max-w-md leading-relaxed transition-all duration-700 delay-100 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            A calm space where your thoughts meet two perspectives—and clarity emerges.</p>
          <p className={`text-xs text-zinc-600 mb-8 transition-all duration-700 delay-200 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            Drag to rotate • Hover to preview • Click any face to begin</p>
          <Legend activeFace={activeFace} onLegendClick={handleLegendClick} visible={contentVisible} />
        </div>
      </div>
      <div className="md:hidden flex flex-col items-center text-center px-4">
        <h1 className={`text-3xl font-bold text-white mb-4 transition-all duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>Two Minds. One Spark.</h1>
        <p className={`text-sm text-zinc-400 mb-6 max-w-xs transition-all duration-700 delay-100 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          A calm space where your thoughts meet two perspectives—and clarity emerges.</p>
        <div className="mb-6"><ARCDice onFaceChange={setActiveFace} activeFace={activeFace} navigateToFaceRef={navigateToFaceRef} /></div>
        <p className={`text-xs text-zinc-600 mb-4 transition-all duration-700 delay-200 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>Drag to rotate • Tap to navigate</p>
        <div className={`flex flex-wrap justify-center gap-4 mb-6 transition-all duration-700 delay-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          {cubeFaces.map((face, index) => (
            <button key={index} onClick={() => handleLegendClick(index)} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFace === index ? 'scale-150' : ''}`}
                style={{ backgroundColor: face.dotColor, boxShadow: activeFace === index ? `0 0 8px ${face.dotColor}` : 'none' }} />
              <span className={`text-xs transition-colors ${activeFace === index ? 'text-white' : 'text-zinc-500'}`}>{face.label}</span>
            </button>))}
        </div>
      </div>
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 delay-500 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <button onClick={handleCTAClick} className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${cubeFaces[activeFace].glowColor}dd, ${cubeFaces[activeFace].glowColor}99)`,
            boxShadow: `0 0 30px ${cubeFaces[activeFace].glowColor}40` }}>
          {cubeFaces[activeFace].ctaLabel}
        </button>
      </div>
    </div>
  );
}
