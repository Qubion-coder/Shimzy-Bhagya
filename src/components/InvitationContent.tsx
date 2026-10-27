import { motion } from 'motion/react';
import { Music, VolumeX, Heart } from 'lucide-react';
import { Hero } from './Hero';
import { FloatingPetals } from './FloatingPetals';
import { CoupleDetails } from './CoupleDetails';
import { CeremonyDetails } from './CeremonyDetails';
import { VenueSection } from './VenueSection';

import { Timeline } from './Timeline';
import { Countdown } from './Countdown';
import { RSVPForm } from './RSVPForm';

import { InviteeBanner } from './InviteeBanner';
import { DeferredMount } from './DeferredMount';

interface InvitationContentProps {
  active: boolean;
  eventParam: string;
  fullInviteeName: string;
  eventLabel: string;
  weddingDate: Date;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export function InvitationContent({
  active,
  eventParam,
  fullInviteeName,
  eventLabel,
  weddingDate,
  isMusicPlaying,
  onToggleMusic,
}: InvitationContentProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="font-sans text-stone-800 bg-brand-blush selection:bg-brand-plum/20"
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={onToggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/70 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(176,137,104,0.15)] flex items-center justify-center border border-brand-lavender/50 text-brand-plum hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? (
          <Music className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </motion.button>

      <FloatingPetals />
      <Hero event={eventParam} inviteeName={fullInviteeName} />

      {fullInviteeName && (
        <DeferredMount active={active} delay={80}>
          <InviteeBanner inviteeName={fullInviteeName} eventLabel={eventLabel} />
        </DeferredMount>
      )}

      <DeferredMount active={active} delay={120} minHeight="40vh">
        <div className="py-24 sm:py-32 bg-gradient-to-b from-brand-blush via-[#0a0a0a] to-brand-blush relative overflow-hidden">
          {/* Watermark Background Image covering full section including padding */}
          <div className="absolute inset-x-0 bottom-0 top-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10 mix-blend-multiply">
            <img 
              src="/WhatsApp%20Image%202026-07-09%20at%2021.34.28.jpeg" 
              alt="Watermark background" 
              className="w-full h-full object-cover object-top sm:object-center sepia contrast-125" 
            />
          </div>
          <CoupleDetails />
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={180} minHeight="40vh">
        <div className="py-24 sm:py-32 bg-brand-blush relative overflow-hidden">
          <CeremonyDetails event={eventParam} />
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={240} minHeight="60vh">
        <VenueSection />
      </DeferredMount>

      <DeferredMount active={active} delay={360} minHeight="20vh">
        <div className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/ChatGPT Image Aug 29, 2026, 09_42_47 PM.png"
              alt="Countdown Background"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16 text-center">
            <span className="text-[#d4af37] uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              The Wait Is Almost Over
            </span>
          </div>
          <div className="relative z-10">
            <Countdown targetDate={weddingDate} />
          </div>
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={390} minHeight="30vh">
        <div className="py-12 sm:py-20 bg-brand-blush relative overflow-hidden">
          <Timeline />
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={420} minHeight="30vh">
        <div className="py-24 sm:py-32 bg-black relative overflow-hidden">
          <RSVPForm inviteeName={fullInviteeName} eventName={eventLabel} eventParam={eventParam} />
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={520}>
        <footer className="py-16 bg-brand-blush border-t border-brand-plum/20 text-center relative overflow-hidden mt-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-plum/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center px-6">
            <p className="font-serif text-[1.1rem] sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              Your presence and blessings are the greatest gift we could ask for.<br/>
              We look forward to celebrating with you,
            </p>

            <div className="mt-4 mb-2">
              <p 
                className="text-4xl sm:text-5xl text-[#d4af37] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                dir="rtl"
                style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif", fontWeight: 400 }}
              >
                إِنْ شَاءَ ٱللَّٰهُ
              </p>
              <p className="font-serif italic text-lg sm:text-xl text-[#b89645] mt-3 tracking-wide">
                In Sha Allah
              </p>
            </div>

            <div className="mt-16 border-t border-brand-plum/20 pt-6 w-full max-w-sm flex justify-center">
              <p className="text-[#d4af37] text-xs font-sans tracking-wider text-center leading-relaxed">
                Want a beautiful wedding website like this? <br className="sm:hidden" />
                Create yours with <a target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white underline font-semibold transition-colors duration-300" href="https://wa.me/94707819074">invitemint</a>
              </p>
            </div>
          </div>
        </footer>
      </DeferredMount>
    </motion.div>
  );
}
