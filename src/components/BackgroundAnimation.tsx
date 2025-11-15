'use client';

import { motion } from 'framer-motion';

// Generate particles outside component to satisfy purity rules
const generateParticles = () => Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 20 + 20,
  delay: Math.random() * 5,
  xMovement: Math.random() * 100 - 50,
  yMovement: Math.random() * 100 - 50,
}));

const particles = generateParticles();

export default function BackgroundAnimation() {

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Particle drift effect */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.03,
          }}
          animate={{
            x: [0, particle.xMovement, 0],
            y: [0, particle.yMovement, 0],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Static flicker overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.015,
        }}
        animate={{
          opacity: [0.01, 0.02, 0.01],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
