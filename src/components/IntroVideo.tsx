import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroVideoProps {
  key?: React.Key;
  onComplete: () => void;
  onMusicStart?: () => void;
  event?: string | null;
  readyToTransition?: boolean;
}

// Fixed positions so the gold dust doesn't jump between renders
const SPARKLES = [
  { left: '8%', top: '18%', size: 3, delay: 0, duration: 7 },
  { left: '18%', top: '72%', size: 2, delay: 1.2, duration: 9 },
  { left: '27%', top: '35%', size: 2, delay: 2.5, duration: 8 },
  { left: '38%', top: '85%', size: 3, delay: 0.6, duration: 10 },
  { left: '52%', top: '12%', size: 2, delay: 3.1, duration: 7.5 },
  { left: '63%', top: '64%', size: 3, delay: 1.8, duration: 8.5 },
  { left: '74%', top: '28%', size: 2, delay: 0.3, duration: 9.5 },
  { left: '84%', top: '78%', size: 3, delay: 2.2, duration: 7 },
  { left: '92%', top: '45%', size: 2, delay: 1, duration: 10 },
  { left: '45%', top: '55%', size: 2, delay: 3.6, duration: 8 },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay },
});

// Irregular, melted-wax outline for the seal (deterministic so it never reshuffles)
const WAX_PATH = (() => {
  const n = 28;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const r = 46 + Math.sin(i * 2.7) * 1.8 + Math.cos(i * 1.3) * 1.4 + (i % 7 === 0 ? 2.2 : 0);
    return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r];
  });
  const mid = (p: number[], q: number[]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M ${mid(pts[n - 1], pts[0]).join(' ')}`;
  pts.forEach((p, i) => {
    const m = mid(p, pts[(i + 1) % n]);
    d += ` Q ${p[0].toFixed(2)} ${p[1].toFixed(2)} ${m[0].toFixed(2)} ${m[1].toFixed(2)}`;
  });
  return d + ' Z';
})();

// Laurel leaves curving up both sides of the monogram
const LAUREL = [...Array(7)].flatMap((_, i) => {
  const t = 112 + i * 19;
  return [t, 180 - t].map((deg) => {
    const a = (deg * Math.PI) / 180;
    const x = 50 + Math.cos(a) * 26;
    const y = 50 + Math.sin(a) * 26;
    const tilt = deg + (deg > 90 ? 50 : -50) + 90;
    return { x, y, tilt, key: `${deg}` };
  });
});

function WaxSeal() {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
      <defs>
        <radialGradient id="wax" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="45%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <radialGradient id="waxInner" cx="60%" cy="65%" r="70%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0b0b0b" />
        </radialGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7e7a1" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="65%" stopColor="#8a6d1f" />
          <stop offset="100%" stopColor="#f3dc8a" />
        </linearGradient>
        <filter id="sealShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#d4af37" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Wax body */}
      <path d={WAX_PATH} fill="url(#wax)" filter="url(#sealShadow)" />
      <path d={WAX_PATH} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8" transform="translate(-0.6 -0.6)" />

      {/* Pressed stamp well */}
      <circle cx="50" cy="50" r="36" fill="url(#waxInner)" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#000" strokeOpacity="0.7" strokeWidth="1.6" transform="translate(0.7 0.9)" />
      <circle cx="50" cy="50" r="36.5" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="0.8" />

      {/* Gold rings */}
      <circle cx="50" cy="50" r="33" fill="none" stroke="url(#gold)" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="url(#gold)" strokeWidth="0.4" strokeDasharray="0.6 1.6" />

      {/* Laurel wreath */}
      {LAUREL.map((l) => (
        <ellipse
          key={l.key}
          cx={l.x}
          cy={l.y}
          rx="3.4"
          ry="1.3"
          fill="url(#gold)"
          transform={`rotate(${l.tilt} ${l.x} ${l.y})`}
        />
      ))}
      <circle cx="50" cy="20" r="1.1" fill="url(#gold)" />

      {/* Monogram */}
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fill="url(#gold)"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: 21 }}
      >
        S<tspan fontSize="12" dy="-2"> &amp; </tspan><tspan dy="2">B</tspan>
      </text>
      <text
        x="50"
        y="67.5"
        textAnchor="middle"
        fill="url(#gold)"
        style={{ fontFamily: "'Cinzel', serif", fontSize: 3.6, letterSpacing: 1.2 }}
      >
        MMXXVII
      </text>
    </svg>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 60 60" className={`absolute w-10 h-10 sm:w-14 sm:h-14 text-[#d4af37] ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M2 30 V2 H30" />
      <path d="M8 22 V8 H22" opacity="0.6" />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
      <path d="M14 14 l4 4 m-4 0 l4 -4" opacity="0.8" />
    </svg>
  );
}

export function IntroVideo({ onComplete, onMusicStart, readyToTransition }: IntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (!readyToTransition) return;

    setIsPlaying(true);
    if (onMusicStart) onMusicStart();
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.error("Video play failed", e);
        // Fallback if video fails to play
        onComplete();
      });
    }
  };

  const handleVideoEnded = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/intro.mp4"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        onEnded={handleVideoEnded}
        playsInline
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            {/* Black & white portrait backdrop */}
            <motion.img
              src="/Warmly%20Lit%20Elegant%20Couple%20Portrait.png"
              alt=""
              aria-hidden
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-25"
              style={{ objectPosition: 'center 25%' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.92)_70%,#000_100%)]" />

            {/* Gold dust */}
            {SPARKLES.map((s, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-[#d4af37] shadow-[0_0_8px_2px_rgba(212,175,55,0.6)] pointer-events-none"
                style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
                animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            {/* Ornate frame */}
            <div className="absolute inset-4 sm:inset-8 border border-[#d4af37]/40 pointer-events-none" />
            <div className="absolute inset-6 sm:inset-11 border border-[#d4af37]/15 pointer-events-none" />
            <Corner className="top-4 left-4 sm:top-8 sm:left-8" />
            <Corner className="top-4 right-4 sm:top-8 sm:right-8 rotate-90" />
            <Corner className="bottom-4 right-4 sm:bottom-8 sm:right-8 rotate-180" />
            <Corner className="bottom-4 left-4 sm:bottom-8 sm:left-8 -rotate-90" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-8">
              <motion.p
                {...fadeUp(0.2)}
                className="text-2xl sm:text-3xl text-[#d4af37] mb-6"
                dir="rtl"
                style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
              >
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </motion.p>

              <motion.p
                {...fadeUp(0.5)}
                className="font-sans uppercase tracking-[0.45em] text-[10px] sm:text-xs text-gray-300 mb-4"
              >
                The Wedding Of
              </motion.p>

              <motion.h1
                {...fadeUp(0.8)}
                className="font-display text-[#d4af37] text-6xl sm:text-8xl leading-none drop-shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
              >
                Shimzy
              </motion.h1>
              <motion.span
                {...fadeUp(1)}
                className="font-serif italic text-white/80 text-2xl sm:text-3xl my-1 sm:my-2"
              >
                &amp;
              </motion.span>
              <motion.h1
                {...fadeUp(1.2)}
                className="font-display text-[#d4af37] text-6xl sm:text-8xl leading-none drop-shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
              >
                Bhagya
              </motion.h1>

              <motion.div {...fadeUp(1.5)} className="flex items-center gap-3 mt-8 mb-3">
                <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-[#d4af37] to-transparent" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
                <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-[#d4af37] to-transparent" />
              </motion.div>

              <motion.p
                {...fadeUp(1.7)}
                className="font-names text-white tracking-[0.35em] text-sm sm:text-base"
              >
                22 · 01 · 2027
              </motion.p>
              <motion.p
                {...fadeUp(1.8)}
                className="font-serif italic text-gray-400 text-sm sm:text-base mt-1"
              >
                Oakray Regency Hotel, Kandy
              </motion.p>

              {/* Wax-seal button */}
              <motion.div {...fadeUp(2.1)} className="mt-10 sm:mt-12 flex flex-col items-center">
                <button
                  onClick={handlePlay}
                  disabled={!readyToTransition}
                  aria-label="Open invitation"
                  className={`group relative w-28 h-28 sm:w-36 sm:h-36 transition-transform duration-700 ease-out ${
                    readyToTransition ? 'cursor-pointer hover:scale-105 hover:-rotate-3 active:scale-95' : 'cursor-wait'
                  }`}
                >
                  {/* Soft breathing halo */}
                  <motion.span
                    className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35)_0%,transparent_70%)] pointer-events-none"
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.08, 0.95] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Orbiting gold ring */}
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] text-[#d4af37]/60 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: readyToTransition ? 30 : 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
                    <circle cx="50" cy="2" r="1.2" fill="currentColor" />
                  </motion.svg>

                  <WaxSeal />

                  {/* Light gleam sweeping across the stamp */}
                  <span className="absolute inset-[14%] rounded-full overflow-hidden pointer-events-none">
                    <motion.span
                      className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]"
                      animate={{ left: ['-60%', '160%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                    />
                  </span>
                </button>

                <span className="mt-6 font-sans uppercase tracking-[0.4em] text-[10px] sm:text-[11px] text-[#d4af37]">
                  {readyToTransition ? 'Tap to Open' : 'Preparing…'}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
