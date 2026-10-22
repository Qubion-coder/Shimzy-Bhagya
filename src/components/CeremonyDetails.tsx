import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, MapPin, Heart, Sparkles, Palette } from 'lucide-react';

interface CeremonyDetailsProps {
  event?: string | null;
}

export const CeremonyDetails: React.FC<CeremonyDetailsProps> = ({ event = 'both' }) => {
  const isHomecoming = event === 'homecoming';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Premium ambient backdrop */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-radial from-brand-lavender/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-brand-plum uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[11px] sm:text-xs font-bold drop-shadow-sm">
                Event Details
              </span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-brand-plum/60 to-transparent" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display text-[#d4af37] mb-8 leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Wedding Celebration
            </h2>

            <p className="text-gray-300 font-serif text-lg sm:text-xl leading-relaxed mb-12 max-w-lg">
                Insha'Allah, we look forward to sharing this joyous occasion with you.
            </p>

            {/* Premium Timeline */}
            <div className="relative space-y-12 ml-10 sm:ml-12 border-l-[1.5px] border-brand-lavender/30 pl-10 sm:pl-12 py-4">

              {/* Date */}
              <div className="relative group flex items-center min-h-[48px]">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-black/40 backdrop-blur-md rounded-full border border-brand-plum/40 shadow-lg flex items-center justify-center group-hover:border-brand-plum transition-all duration-500">
                  <Calendar className="w-5 h-5 text-brand-plum group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-gray-200 group-hover:text-[#d4af37] transition-colors duration-500">
                    Friday, 22 January 2027
                  </h4>
                </div>
              </div>

              {/* Time */}
              <div className="relative group flex items-center min-h-[48px]">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-black/40 backdrop-blur-md rounded-full border border-brand-plum/40 shadow-lg flex items-center justify-center group-hover:border-brand-plum transition-all duration-500">
                  <Clock className="w-5 h-5 text-brand-plum group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-gray-200 group-hover:text-[#d4af37] transition-colors duration-500">
                    7:00 PM – 12:00 AM
                  </h4>
                </div>
              </div>

              {/* Location */}
              <div className="relative group flex items-center min-h-[48px]">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-black/40 backdrop-blur-md rounded-full border border-brand-plum/40 shadow-lg flex items-center justify-center group-hover:border-brand-plum transition-all duration-500">
                  <MapPin className="w-5 h-5 text-brand-plum group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-gray-200 group-hover:text-[#d4af37] transition-colors duration-500">
                    Riversage Hall
                  </h4>
                  <p className="font-serif text-base sm:text-lg text-gray-400 mt-1">
                    Oakray Regency Hotel, Kandy
                  </p>
                  <a
                    href="https://maps.app.goo.gl/GnfsBSbtfm4hkKY37?g_st=aw"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full border border-brand-plum/50 text-[#d4af37] text-xs uppercase tracking-[0.3em] font-sans font-semibold hover:bg-brand-plum/10 transition-colors duration-300"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </a>
                </div>
              </div>

              {/* Dress Code */}
              <div className="relative group flex items-center min-h-[48px]">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-black/40 backdrop-blur-md rounded-full border border-brand-plum/40 shadow-lg flex items-center justify-center group-hover:border-brand-plum transition-all duration-500">
                  <Palette className="w-5 h-5 text-brand-plum group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-gray-200 group-hover:text-[#d4af37] transition-colors duration-500">
                    Theme: Black &amp; White
                  </h4>
                </div>
              </div>


            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
};
