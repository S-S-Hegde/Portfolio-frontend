import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Clock,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Date().toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, fieldName: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    soundFx.playSuccess();

    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#CCFF00', '#00F0FF', '#FFFFFF'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      soundFx.playSuccess();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#CCFF00', '#FFFFFF', '#00F0FF'],
        });
      } catch {
        // ignore
      }

      // Construct mailto
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Masthead */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-accent-lime" />
            <span className="uppercase tracking-wider">05 // CONTACT &amp; DIRECT INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Initiate a Conversation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Whether you have a full-time engineering role, an open architectural problem, or an experimental collaboration—my inbox is always open.
          </p>
        </div>

        {/* 2-Column Split: Contact Channels + Direct Dispatch Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Direct Channels & Availability */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 rounded-2xl bg-[#0E1117] border border-white/[0.08] hover:border-accent-lime/40 transition-colors space-y-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Primary Direct Channel
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold text-white font-mono break-all">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  title="Copy email address"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-accent-lime hover:text-black border border-white/10 text-slate-300 transition-all shrink-0 ml-2"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedField === 'email' && (
                <p className="text-xs font-mono text-accent-lime">
                  ✓ Copied to clipboard!
                </p>
              )}
            </div>

            {/* Direct Phone Card */}
            <div className="p-6 rounded-2xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-colors space-y-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Telephone &amp; WhatsApp
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold text-white font-mono">
                  {PERSONAL_INFO.phone}
                </span>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  title="Copy phone number"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-accent-lime hover:text-black border border-white/10 text-slate-300 transition-all shrink-0 ml-2"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedField === 'phone' && (
                <p className="text-xs font-mono text-accent-lime">
                  ✓ Phone copied to clipboard!
                </p>
              )}
            </div>

            {/* Location & Time Zone Status Card */}
            <div className="p-6 rounded-2xl bg-[#0E1117] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-lime" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentTime || 'IST'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Open to on-site roles across India and international remote engineering opportunities.
              </p>
            </div>

            {/* Social Links */}
            <div className="p-5 rounded-2xl bg-[#0E1117] border border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Verified Profiles</span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white hover:text-accent-lime transition-all"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white hover:text-accent-lime transition-all"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Direct Dispatch Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/[0.08]">
            <h3 className="text-lg font-bold text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the form below. Submitting will open your default email client with your message pre-composed.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Miller"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-accent-lime focus:outline-none text-sm text-white placeholder-slate-500 font-sans transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-accent-lime focus:outline-none text-sm text-white placeholder-slate-500 font-sans transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full-Stack Engineering Role / Architecture Collaboration"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-accent-lime focus:outline-none text-sm text-white placeholder-slate-500 font-sans transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the opportunity or project details..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-accent-lime focus:outline-none text-sm text-white placeholder-slate-500 font-sans transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-accent-lime hover:bg-[#B8E600] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <span>Dispatching...</span>
                ) : isSent ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Message Ready — Opening Mail Client</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Shridhar</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
