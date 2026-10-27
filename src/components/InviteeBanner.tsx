import React from 'react';
import { motion } from 'motion/react';

interface InviteeBannerProps {
  inviteeName: string;
  eventLabel?: string;
}

export const InviteeBanner: React.FC<InviteeBannerProps> = ({ inviteeName }) => {
  return (
    <div className="w-full bg-brand-blush py-16 sm:py-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <div className="mx-auto max-w-2xl border border-[#d4af37]/30 rounded-[2rem] px-6 sm:px-12 py-10 sm:py-12 bg-black/40 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <span className="block font-sans uppercase tracking-[0.45em] text-[10px] sm:text-xs text-[#d4af37] mb-6">
            Specially Invited
          </span>

          <p className="font-serif italic text-gray-300 text-lg sm:text-2xl">
            We cordially invite
          </p>

          <h2 className="font-display text-[#d4af37] text-5xl sm:text-6xl lg:text-7xl leading-tight my-3 sm:my-4 break-words drop-shadow-[0_4px_16px_rgba(212,175,55,0.2)]">
            {inviteeName}
          </h2>

          <p className="font-serif italic text-gray-300 text-lg sm:text-2xl">
            to celebrate our special day with us.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="h-px w-12 sm:w-16 bg-gradient-to-l from-[#d4af37] to-transparent" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
            <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
