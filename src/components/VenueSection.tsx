import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const MAP_URL = 'https://maps.app.goo.gl/GnfsBSbtfm4hkKY37?g_st=aw';

export const VenueSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-blush py-20 sm:py-28">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6"
      >
        <span className="block font-sans uppercase tracking-[0.5em] text-[11px] sm:text-xs text-gray-300 mb-5">
          The Place
        </span>
        <h2 className="font-serif text-[#d4af37] text-4xl sm:text-7xl leading-tight">
          Oakray Regency Hotel
        </h2>
        <p className="font-serif text-gray-100 text-2xl sm:text-3xl mt-2">
          Riversage Hall
        </p>
        <p className="font-serif italic text-gray-400 text-xl sm:text-2xl mt-2">
          Kandy, Sri Lanka
        </p>
      </motion.div>

      {/* Hotel photo, shown whole at its own aspect ratio so nothing is cropped on phones */}
      <div className="relative mt-10 sm:mt-14 mx-auto max-w-5xl sm:px-6">
        <div className="relative overflow-hidden sm:rounded-3xl sm:border sm:border-[#d4af37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <img
            src="/WhatsApp%20Image%202026-10-22%20at%2020.41.43.jpeg"
            alt="Oakray Regency Hotel, Kandy"
            loading="lazy"
            decoding="async"
            className="block w-full aspect-[4/3] sm:aspect-[1200/630] object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Card overlapping the bottom of the photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative z-10 -mt-8 sm:-mt-20 mx-5 sm:mx-auto sm:max-w-xl"
        >
          <div className="rounded-[2rem] bg-black/80 backdrop-blur-xl border border-[#d4af37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)] px-6 sm:px-10 py-8 sm:py-10 text-center">
            <p className="font-serif italic text-gray-200 text-lg sm:text-2xl leading-relaxed">
              Join us at Riversage Hall, and celebrate with us through the evening
            </p>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex items-center justify-center gap-3 w-full rounded-full bg-[#d4af37] hover:bg-[#e6c25a] text-black py-4 sm:py-5 font-sans uppercase tracking-[0.3em] text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-colors duration-300"
            >
              <MapPin className="w-5 h-5" />
              View on the Map
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
