import React, { useState } from 'react';
import { Copy, Check, Link as LinkIcon, MessageCircle, ArrowLeft, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  COUPLE,
  PREFIXES,
  type Prefix,
  formatDisplayName,
  buildInviteLink,
  buildInviteMessage,
} from '../utils/guest';

interface Generated {
  link: string;
  displayName: string;
  message: string;
}

// navigator.clipboard needs a secure context; fall back to a hidden textarea elsewhere
async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) throw new Error('copy failed');
}

const fieldClass =
  'w-full bg-black/50 px-5 py-4 rounded-2xl border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all font-serif text-lg text-gray-100 placeholder:text-gray-500';

export const Admin: React.FC = () => {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<Generated | null>(null);
  const [copiedWhat, setCopiedWhat] = useState<'link' | 'message' | null>(null);

  const livePreview = formatDisplayName(prefix, guestName);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter a guest name');
      return;
    }
    const link = buildInviteLink(window.location.origin, prefix, guestName);
    const displayName = formatDisplayName(prefix, guestName);
    setGenerated({ link, displayName, message: buildInviteMessage(displayName, link) });
    setCopiedWhat(null);
    toast.success('Link generated!');
  };

  const handleCopy = async (what: 'link' | 'message') => {
    if (!generated) return;
    try {
      await copyText(what === 'link' ? generated.link : generated.message);
      setCopiedWhat(what);
      toast.success(what === 'link' ? 'Link copied!' : 'Message copied!');
      setTimeout(() => setCopiedWhat((c) => (c === what ? null : c)), 2500);
    } catch {
      toast.error('Could not copy. Please select and copy manually.');
    }
  };

  // Inputs edited after generating → the shown link no longer matches them
  const isStale =
    !!generated && generated.displayName !== livePreview;

  return (
    <div className="min-h-screen bg-brand-blush text-gray-200 font-sans py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Invitation
          </a>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">Admin</span>
        </div>

        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.45em] text-[10px] sm:text-xs text-gray-400 mb-3">Invitation Link Generator</p>
          <h1 className="font-display text-[#d4af37] text-5xl sm:text-6xl">
            {COUPLE.groom} &amp; {COUPLE.bride}
          </h1>
        </header>

        {/* Form */}
        <form
          onSubmit={handleGenerate}
          className="bg-black/40 border border-[#d4af37]/25 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-4">
            <label className="block">
              <span className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2 ml-1">Prefix</span>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value as Prefix)}
                className={`${fieldClass} cursor-pointer`}
              >
                {PREFIXES.map((p) => (
                  <option key={p} value={p} className="bg-black">
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2 ml-1">Guest Name</span>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <p className="text-sm text-gray-400 ml-1 min-h-[1.25rem]">
            {livePreview && (
              <>
                Greeting: <span className="text-gray-100 font-serif text-base">Dear {livePreview} ❤️</span>
              </>
            )}
          </p>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 rounded-full bg-[#d4af37] hover:bg-[#e6c25a] text-black py-4 uppercase tracking-[0.3em] text-sm font-semibold transition-colors active:scale-[0.99]"
          >
            <LinkIcon className="w-4 h-4" />
            Generate Link
          </button>
        </form>

        {/* Result */}
        <section className="mt-8 bg-black/40 border border-[#d4af37]/25 rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <h2 className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-3 ml-1">Generated Link</h2>
          {generated ? (
            <a
              href={generated.link}
              target="_blank"
              rel="noreferrer"
              className="block break-all rounded-2xl bg-black/60 border border-[#d4af37]/30 px-5 py-4 text-[#d4af37] hover:underline font-mono text-sm"
            >
              {generated.link}
            </a>
          ) : (
            <p className="rounded-2xl border border-dashed border-gray-700 px-5 py-6 text-center text-gray-500 font-serif italic">
              Enter a guest and click Generate Link.
            </p>
          )}

          {isStale && (
            <p className="mt-3 ml-1 text-xs text-amber-400">
              You changed the details. Click Generate Link again to update.
            </p>
          )}

          {generated && (
            <>
              <h2 className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mt-6 mb-3 ml-1">Message Preview</h2>
              <div className="rounded-2xl bg-black/60 border border-gray-800 px-5 py-4 font-serif text-[15px] leading-relaxed text-gray-200 whitespace-pre-wrap break-words max-h-80 overflow-y-auto">
                {generated.message}
              </div>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={() => handleCopy('link')}
              disabled={!generated}
              className="flex items-center justify-center gap-2 rounded-full border border-[#d4af37] text-[#d4af37] py-3.5 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#d4af37]/10 transition-colors disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              {copiedWhat === 'link' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedWhat === 'link' ? 'Copied!' : 'Copy Link Only'}
            </button>
            <button
              type="button"
              onClick={() => handleCopy('message')}
              disabled={!generated}
              className="flex items-center justify-center gap-2 rounded-full bg-[#d4af37] text-black py-3.5 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#e6c25a] transition-colors disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-[#d4af37]"
            >
              {copiedWhat === 'message' ? <Check className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
              {copiedWhat === 'message' ? 'Copied!' : 'Copy Full Message'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
