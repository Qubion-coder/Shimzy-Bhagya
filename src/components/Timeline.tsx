import React from 'react';
import { motion } from 'motion/react';
import { Users, Presentation, Utensils, PartyPopper } from 'lucide-react';

const events = [
  { time: '7:00 PM', title: 'Guest Arrival', icon: Users, desc: 'Welcome and seating.' },
  { time: '7:30 PM', title: 'Formal Programme', icon: Presentation, desc: 'The reception begins.' },
  { time: '8:30 PM', title: 'Dinner', icon: Utensils, desc: 'A grand feast for our guests.' },
  { time: '9:30 PM – 12:00 AM', title: 'Celebration Continues', icon: PartyPopper, desc: 'Enjoy the rest of the evening.' },
];

interface TimelineProps {
  event?: string | null;
}

export const Timeline: React.FC<TimelineProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-brand-plum uppercase tracking-[0.4em] text-[10px] font-medium mb-4 block">
          The Evening's Flow
        </span>
        <h2 className="text-5xl font-display text-[#d4af37] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Schedule
        </h2>
        <div className="w-12 h-px bg-brand-plum/40 mx-auto mt-6" />
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-plum/40 to-transparent" />

        <div className="space-y-12">
          {events.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Time */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-2xl font-serif text-[#d4af37] italic">{item.time}</span>
              </div>

              {/* Icon Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-brand-plum/40 flex items-center justify-center shadow-xl">
                <item.icon className="w-5 h-5 text-[#d4af37]" />
              </div>

              {/* Content */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h4 className="text-2xl font-serif text-gray-200">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
