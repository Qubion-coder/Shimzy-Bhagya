import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  color: string;
  drift: number;
  type: 'circle' | 'sparkle' | 'star';
}

function getParticleCount() {
  if (typeof window === 'undefined') return 30;
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;
  if (coarse || narrow) return 20;
  return 40;
}

export const FloatingPetals: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Gold and warm dust colors
    const colors = ['#FFD700', '#DAA520', '#B8860B', '#F0E68C', '#FFEA00', '#FFF8DC'];
    const types: ('circle' | 'sparkle' | 'star')[] = ['circle', 'circle', 'sparkle', 'star'];
    const count = getParticleCount();

    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 10 + 5, // smaller size for dust: 5 to 15px
      rotation: Math.random() * 360,
      duration: Math.random() * 15 + 10, // slightly faster/slower
      delay: Math.random() * -20, 
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 40 - 20,
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[40]" style={{ perspective: '1000px' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute will-change-transform"
          initial={{
            x: `${particle.x}vw`,
            y: '-10vh',
            rotateZ: particle.rotation,
            opacity: 0,
          }}
          animate={{
            y: '110vh',
            x: `${particle.x + particle.drift}vw`,
            rotateZ: particle.rotation + (Math.random() > 0.5 ? 360 : -360),
            opacity: [0, 0.8, 1, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        >
          <svg
            width={particle.size}
            height={particle.size}
            viewBox="0 0 24 24"
            className="drop-shadow-sm opacity-80"
          >
            <defs>
              <radialGradient id={`dust-grad-${particle.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="40%" stopColor={particle.color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={particle.color} stopOpacity="0" />
              </radialGradient>
            </defs>
            {particle.type === 'circle' && (
              <circle cx="12" cy="12" r="10" fill={`url(#dust-grad-${particle.id})`} />
            )}
            {particle.type === 'sparkle' && (
              <path
                d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z"
                fill={particle.color}
                style={{ filter: `drop-shadow(0 0 4px ${particle.color})` }}
              />
            )}
            {particle.type === 'star' && (
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={particle.color}
                style={{ filter: `drop-shadow(0 0 2px ${particle.color})` }}
              />
            )}
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
