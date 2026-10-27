import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Loader2, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Web app URL from Deploy > New deployment in the RSVP sheet's Apps Script (see google-apps-script/SETUP.md)
const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx7gyF8LgerEOwsbIonleJd8gxMhaHirgU8XpCVFzI9HOfurmueSJxOgOYtizx5zYY-/exec';

interface RSVPFormProps {
  inviteeName?: string;
  eventName?: string;
  eventParam?: string;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ inviteeName = '', eventName = 'the celebration', eventParam = 'both' }) => {
  const [formData, setFormData] = useState({
    fullName: inviteeName,
    attending: 'yes',
    guests: '1',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (inviteeName) {
      setFormData(prev => ({ ...prev, fullName: inviteeName }));
    }
  }, [inviteeName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!RSVP_SCRIPT_URL) {
      toast.error('RSVP is not connected yet. Please contact the couple directly.');
      return;
    }
    setStatus('loading');

    try {
      // URL-encoded body is a "simple" request, so Apps Script receives it without a CORS preflight
      const payload = new URLSearchParams({
        fullName: formData.fullName.trim(),
        attending: formData.attending,
        guests: formData.attending === 'yes' ? formData.guests : '0',
        message: formData.message.trim(),
        invitedAs: inviteeName,
        page: window.location.href,
        event: eventParam,
      });

      await fetch(RSVP_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      });

      setStatus('success');
      toast.success('Your RSVP has been warmly received!');
      setFormData({ fullName: inviteeName, attending: 'yes', guests: '1', message: '' });
    } catch (error) {
      console.error('Error sending RSVP: ', error);
      setStatus('error');
      toast.error('Could not submit RSVP. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 relative py-10">
      {/* Premium ambient backdrop & glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-[#d4af37]/15 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="p-10 sm:p-14 lg:p-16 rounded-[3rem] border border-[#d4af37] shadow-[0_30px_60px_rgba(212,175,55,0.2)] relative overflow-hidden bg-gradient-to-br from-black/80 via-black/60 to-[#d4af37]/20 backdrop-blur-3xl lg:flex items-center gap-16"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

        {/* Left Side: Elegant Text */}
        <div className="lg:w-1/2 lg:pr-10 mb-12 lg:mb-0 relative text-center lg:text-left">
          <Sparkles className="absolute -top-6 -left-6 w-12 h-12 text-[#d4af37]/40 animate-pulse" />

          <div className="inline-flex items-center justify-center lg:justify-start gap-4 mb-6">
            <span className="text-[#d4af37] uppercase tracking-[0.5em] text-xs sm:text-sm font-bold drop-shadow-md">
              Kindly Respond
            </span>
            <div className="hidden lg:block w-16 h-[1px] bg-gradient-to-r from-[#d4af37]/60 to-transparent" />
          </div>

          <h2 className="text-5xl sm:text-6xl font-display text-white tracking-tight leading-[1.1] mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Reserve <span className="italic font-light text-[#d4af37]">Your</span> Seat
          </h2>

          <p className="text-white/90 font-serif text-xl sm:text-2xl leading-relaxed mb-8 drop-shadow-md">
            {inviteeName
              ? `Dear ${inviteeName}, your presence at ${eventName} means the world to us. Please kindly let us know if you will be able to join our celebration.`
              : `Your presence means the world to us. Please kindly let us know if you will be able to join our celebration.`
            }
          </p>

          <div className="w-12 h-[1px] bg-[#d4af37]/40 mx-auto lg:mx-0" />
        </div>

        {/* Right Side: Flowing Form */}
        <div className="lg:w-1/2 relative z-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 px-8 bg-black/60 backdrop-blur-md rounded-[2rem] border border-[#d4af37]/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-[#d4af37]/30">
                  <CheckCircle className="w-12 h-12 text-[#d4af37]" />
                </div>
                <h3 className="text-4xl font-display text-[#d4af37] mb-4 tracking-tight drop-shadow-sm">With Gratitude</h3>
                <p className="text-[#d4af37]/80 leading-relaxed font-serif text-lg mb-8">
                  Your response has been warmly received. We cannot wait to celebrate with you!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded-full border border-[#d4af37]/30 text-[#d4af37] font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-[#d4af37]/10 transition-all duration-300 shadow-sm"
                >
                  Update Response
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-black/40 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-[#d4af37]/50 shadow-[0_15px_30px_rgba(212,175,55,0.1)]"
              >
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-3 ml-2 drop-shadow-sm">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g., John & Jane Doe"
                    className="w-full bg-black/60 text-[#d4af37] px-6 py-4 rounded-full border border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/80 focus:border-[#d4af37]/80 outline-none transition-all duration-300 font-serif italic text-xl shadow-inner placeholder:text-[#d4af37]/40"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-3 ml-2 drop-shadow-sm">Attendance</label>
                  <div className="relative group">
                    <select
                      className="w-full bg-black/60 text-[#d4af37] px-6 py-4 rounded-full border border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/80 focus:border-[#d4af37]/80 outline-none transition-all duration-300 appearance-none font-serif italic text-xl shadow-inner cursor-pointer"
                      value={formData.attending}
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    >
                      <option value="yes" className="bg-black text-[#d4af37]">Joyfully Accepts</option>
                      <option value="no" className="bg-black text-[#d4af37]">Regretfully Declines</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37] transition-transform duration-300 group-hover:scale-110">
                      <Heart className="w-6 h-6 fill-[#d4af37]/40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                    </div>
                  </div>
                </div>

                {formData.attending === 'yes' && (
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-3 ml-2 drop-shadow-sm">Number of Guests</label>
                    <select
                      className="w-full bg-black/60 text-[#d4af37] px-6 py-4 rounded-full border border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/80 focus:border-[#d4af37]/80 outline-none transition-all duration-300 font-serif italic text-xl shadow-inner cursor-pointer"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                      {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                        <option key={n} value={n} className="bg-black text-[#d4af37]">
                          {n === '1' ? '1 Guest' : `${n} Guests`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-bold text-[#d4af37] mb-3 ml-2 drop-shadow-sm">Message (Optional)</label>
                  <textarea
                    placeholder="Leave a message for the couple..."
                    className="w-full bg-black/60 text-[#d4af37] px-6 py-4 rounded-[2rem] border border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/80 focus:border-[#d4af37]/80 outline-none transition-all duration-300 h-32 resize-none font-serif italic text-xl shadow-inner placeholder:text-[#d4af37]/40"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full bg-[#d4af37] text-stone-900 py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase hover:bg-[#b89645] transition-all duration-300 shadow-[0_10px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.25)] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Confirm Attendance'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
