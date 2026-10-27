import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const MAP_URL = 'https://maps.app.goo.gl/GnfsBSbtfm4hkKY37?g_st=aw';

export const VenueSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-blush min-h-[52rem] sm:min-h-[56rem] flex flex-col">
      {/* Hotel photo */}
      <motion.img
        src="/WhatsApp%20Image%202026-10-22%20at%2020.41.43.jpeg"
        alt="Oakray Regency Hotel, Kandy"
        loading="lazy"
        decoding="async"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 60%' }}
      />
      {/* Fade into the page so the heading reads cleanly over the sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-brand-blush" />
      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-brand-blush via-brand-blush/85 to-transparent" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6 pt-24 sm:pt-32"
      >
        <span className="block font-sans uppercase tracking-[0.5em] text-[11px] sm:text-xs text-gray-300 mb-5">
          The Place
        </span>
        <h2 className="font-serif text-[#d4af37] text-5xl sm:text-7xl leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Oakray Regency Hotel
        </h2>
        <p className="font-serif text-gray-100 text-2xl sm:text-3xl mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Riversage Hall
        </p>
        <p className="font-serif italic text-gray-300 text-xl sm:text-2xl mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Kandy, Sri Lanka
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 mt-auto mb-16 sm:mb-24 mx-5 sm:mx-auto sm:w-full sm:max-w-xl"
      >
        <div className="rounded-[2rem] bg-black/60 backdrop-blur-xl border border-[#d4af37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)] px-7 sm:px-10 py-9 sm:py-10 text-center">
          <p className="font-serif italic text-gray-200 text-xl sm:text-2xl leading-relaxed">
            Join us at Riversage Hall, and celebrate with us through the evening
          </p>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center justify-center gap-3 w-full rounded-full bg-[#d4af37] hover:bg-[#e6c25a] text-black py-4 sm:py-5 font-sans uppercase tracking-[0.3em] text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-colors duration-300"
          >
            <MapPin className="w-5 h-5" />
            View on the Map
          </a>
        </div>
      </motion.div>
    </section>
  );
};
