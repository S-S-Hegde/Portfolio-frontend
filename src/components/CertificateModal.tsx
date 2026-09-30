import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, CheckCircle2, ShieldCheck, Calendar, Hash, UserCheck, Sparkles, Building2, BookOpen } from 'lucide-react';
import { CertificationItem } from '../types';
import { soundFx } from '../utils/audio';

interface CertificateModalProps {
  certificate: CertificationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling while CertificateModal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      (window as any).lenisInstance?.stop();
    } else {
      document.body.style.overflow = '';
      (window as any).lenisInstance?.start();
    }
    return () => {
      document.body.style.overflow = '';
      (window as any).lenisInstance?.start();
    };
  }, [isOpen]);

  if (!certificate) return null;

  const isNptel = certificate.id === 'nptel-c';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-y-auto overscroll-contain"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto overscroll-contain bg-[#0A0E17] border border-cyan-500/30 rounded-3xl shadow-[0_0_80px_rgba(0,240,255,0.25)] p-6 md:p-8 custom-scrollbar z-10"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-slate-400 hover:text-white transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header Banner */}
            <div className="relative rounded-2xl p-6 mb-6 overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-950/40 via-[#0B111E] to-purple-950/30">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl border ${
                    isNptel
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  }`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
                      Verified Academic Credential
                    </span>
                    <span className="text-sm font-bold text-white">
                      {certificate.issuer}
                    </span>
                  </div>
                </div>

                <span className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${
                  certificate.badgeType === 'Elite'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                }`}>
                  {certificate.badgeType.toUpperCase()} TIER
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug mb-2">
                {certificate.title}
              </h2>

              <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{certificate.authority}</span>
              </p>
            </div>

            {/* Recipient Identification & Credential ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  <UserCheck className="w-3 h-3 text-cyan-400" /> Awarded To
                </span>
                <p className="text-sm font-bold text-white tracking-wide">
                  {certificate.recipient}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3 h-3 text-purple-400" /> Issue Timeline
                </span>
                <p className="text-sm font-medium text-slate-200">
                  {certificate.issueDate}
                </p>
              </div>

              {certificate.credentialId && (
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 sm:col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block flex items-center gap-1.5 mb-1">
                      <Hash className="w-3 h-3 text-emerald-400" /> Official Roll / Credential ID
                    </span>
                    <code className="text-xs font-mono font-bold text-emerald-400">
                      {certificate.credentialId}
                    </code>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    Proctored & Validated
                  </span>
                </div>
              )}
            </div>

            {/* Score & Performance Breakdown */}
            {certificate.scoreBreakdown && certificate.scoreBreakdown.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Performance & Score Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {certificate.scoreBreakdown.map((sb, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
                    >
                      <span className="text-[11px] text-slate-400 font-mono block truncate">
                        {sb.label}
                      </span>
                      <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                        {sb.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description / Course Scope */}
            <div className="mb-6">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" /> Verified Curriculum & Competency
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/5">
                {certificate.description}
              </p>
            </div>

            {/* Skills Acquired */}
            <div className="mb-6">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Verified Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Issuing Signatories */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 mb-6 text-xs text-slate-400">
              <span className="font-mono text-slate-500 block text-[10px] uppercase mb-1">
                Authorized Signatories
              </span>
              <span className="text-slate-300">{certificate.signatories}</span>
            </div>

            {/* Action Button: Verify on Official Portal */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                Tamper-resistant cryptographic verification
              </span>
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)]"
              >
                <span>Verify on Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
