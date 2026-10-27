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
        muted
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
                  className={`group relative w-36 h-36 sm:w-44 sm:h-44 transition-transform duration-700 ease-out ${
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

                  <img
                    src="/Luxurious_Black_and_Gold_S___B_Seal-removebg-preview.png"
                    alt="S & B seal"
                    decoding="async"
                    fetchPriority="high"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain select-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
                  />

                  {/* Light gleam sweeping across the stamp */}
                  <span className="absolute inset-[22%] rounded-full overflow-hidden pointer-events-none">
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
