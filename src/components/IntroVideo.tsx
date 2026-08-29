import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroVideoProps {
  key?: React.Key;
  onComplete: () => void;
  onMusicStart?: () => void;
  event?: string | null;
  readyToTransition?: boolean;
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
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="z-10 flex flex-col items-center relative"
          >
            <div className="absolute inset-0 bg-black/40 blur-xl rounded-full -z-10"></div>
            <button 
              onClick={handlePlay}
              disabled={!readyToTransition}
              className={`px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-serif text-2xl tracking-[0.2em] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.15)] uppercase flex items-center gap-4 ${
                readyToTransition 
                  ? 'hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {readyToTransition ? 'View Invitation' : 'Loading...'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
