import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';

interface HeroProps {
  event?: string | null;
  inviteeName?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  return touch;
}

export const Hero: React.FC<HeroProps> = ({ event = 'both', inviteeName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const useParallax = !reducedMotion && !isTouch;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-brand-blush/30">
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={useParallax ? { y: y1, scale } : undefined}
      >
        <img
          src="/ChatGPT Image Aug 29, 2026, 09_42_47 PM.png"
          alt="Wedding Background"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
      </motion.div>



      <div className="absolute inset-5 sm:inset-8 border border-brand-plum/30 rounded-3xl pointer-events-none z-20 hidden sm:block shadow-[inset_0_0_30px_rgba(201,169,110,0.1)]" />
      <div className="absolute inset-6 sm:inset-9 border border-brand-plum/15 rounded-[1.3rem] pointer-events-none z-20 hidden sm:block" />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-6xl mt-32 sm:mt-48"
        style={useParallax ? { opacity } : undefined}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-brand-plum to-transparent" />
            <Heart className="w-5 h-5 text-brand-plum fill-brand-plum/30 animate-pulse" />
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-brand-plum to-transparent" />
          </div>

          <div className="mb-4 sm:mb-6 px-4">
            <span className="text-brand-plum italic text-lg sm:text-2xl font-serif block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              With the Grace and Blessings <br className="block sm:hidden" /> of Allah Subhanahu Wa Ta'ala,
            </span>
          </div>
          
          <div className="mb-6 sm:mb-10 px-4 max-w-3xl">
            <p className="text-gray-200 font-serif text-[1rem] sm:text-xl leading-relaxed drop-shadow-md">
              Mr. Munif Khan and Mrs. Sofia Nisha<br/>
              request the honour of your presence at the Walimah Reception of their eldest son,
            </p>
          </div>

          <div className="relative mb-6 sm:mb-8 w-full flex justify-center py-4 sm:py-8 px-2 overflow-visible z-10">
            <h1 className="relative text-5xl sm:text-[4.5rem] lg:text-[6rem] font-names text-[#d4af37] font-normal leading-tight sm:leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] tracking-normal sm:tracking-tight overflow-visible py-2 text-center">
              MAAZIL KHAN <br />
              <span className="text-[#b89645] font-normal mx-2 sm:mx-4 text-4xl sm:text-[3.5rem] lg:text-[5rem] inline-block -translate-y-1 sm:-translate-y-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">&</span>
              <br />
              GAZAALA IQBAL
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 relative z-10 px-4 max-w-2xl">
            <p className="text-[1rem] sm:text-xl font-serif text-gray-200 text-center leading-relaxed drop-shadow-md">
              only daughter of Mr. Sheik Iqbal and Mrs. Sofia Khan<br/>
              of Wailevu, Labasa.
            </p>
          </div>


        </motion.div>
      </motion.div>

      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-30">
        <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-brand-plum to-transparent" />
        <div className="bg-black/40 backdrop-blur-md px-2.5 py-6 rounded-full border border-brand-plum/40 shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-brand-plum font-bold font-sans">
            Walimah Reception
          </p>
        </div>
        <div className="w-[1px] h-28 bg-gradient-to-t from-transparent via-brand-plum to-transparent" />
      </div>

      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-30">
        <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-brand-plum to-transparent" />
        <div className="bg-stone-900/90 backdrop-blur-md px-2.5 py-6 rounded-full border border-brand-plum/40 shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-brand-rose font-bold font-sans rotate-180">
            Save the Date • August 2026
          </p>
        </div>
        <div className="w-[1px] h-28 bg-gradient-to-t from-transparent via-brand-plum to-transparent" />
      </div>

      <motion.div
        className="absolute bottom-0 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.5em] text-[#d4af37] font-extrabold bg-black/60 px-5 py-2 rounded-full border border-brand-plum/40 backdrop-blur-md shadow-lg">
          Discover
        </span>
        <div className="w-[1px] h-6 sm:h-16 bg-gradient-to-b from-brand-plum to-transparent animate-bounce" />
      </motion.div>
    </div>
  );
};
