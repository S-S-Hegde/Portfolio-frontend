import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, ExternalLink, Sparkles, Clock, Globe } from 'lucide-react';
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

  // Live IST Clock
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

    // Trigger subtle confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00F0FF', '#8A2BE2', '#10B981'],
    });

    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playClick();
    setIsSubmitting(true);

    // Simulate sending & trigger celebratory full confetti shower
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      soundFx.playSuccess();

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#3B82F6', '#8A2BE2', '#F59E0B'],
      });

      // Construct mailto link
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
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET&apos;S COLLABORATE & BUILD</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Start a Conversation
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
            Looking for a passionate Full-Stack Engineer with strong AI integration, backend architecture, and problem-solving skills? Let&apos;s talk.
          </p>
        </div>

        {/* 2-Column Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Social Hub */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Contact Cards */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#090D14] border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Contact Information
              </h3>

              {/* Email One-Click Copy */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  title="Copy email"
                  className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone One-Click Copy */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-emerald-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm font-medium text-slate-200 hover:text-emerald-300 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  title="Copy phone"
                  className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 transition-all"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location & Live Clock */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 block">
                      Location
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3 text-cyan-400" /> Local Time
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {currentTime || 'IST'}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t border-white/5">
                <span className="text-xs font-mono uppercase text-slate-500 block mb-3">
                  Social Profiles & Repositories
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 flex items-center gap-2.5 text-slate-300 hover:text-white transition-all group"
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">GitHub</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-slate-500 group-hover:text-cyan-400" />
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 flex items-center gap-2.5 text-slate-300 hover:text-white transition-all group"
                  >
                    <LinkedinIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">LinkedIn</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-slate-500 group-hover:text-purple-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl bg-[#090D14] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out this quick form to initiate an email directly to Shridhar.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry / Full-stack opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Shridhar, I came across your VeriProof project and would like to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors custom-scrollbar"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : isSent ? (
                    <span className="flex items-center gap-2 text-black">
                      <Check className="w-4 h-4" /> Message Prepared!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message & Trigger Confetti 🎉
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
