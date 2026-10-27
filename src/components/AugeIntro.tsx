import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audio';

interface AugeIntroProps {
  onComplete: () => void;
}

export const AugeIntro: React.FC<AugeIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING DISTRIBUTED ENTERPRISE KERNEL...');
  const [isExiting, setIsExiting] = useState(false);
  const rafRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  // Buttery-smooth 144Hz/120Hz/60Hz frame-synchronized progress loop
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1800; // 1.8s snappy, authoritative boot sequence

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Smooth custom acceleration & deceleration curve (cubic-bezier like)
      // Ease-out with organic pacing: fast start, steady mid, crisp lock
      const eased =
        rawProgress < 0.7
          ? Math.pow(rawProgress / 0.7, 0.85) * 0.78
          : 0.78 + (1 - Math.pow(1 - (rawProgress - 0.7) / 0.3, 2.4)) * 0.22;

      const currentPercent = Math.min(100, Math.floor(eased * 100));
      setProgress(currentPercent);

      // Corporate & Gaming telemetry updates synchronized with progress milestones
      if (currentPercent < 22) {
        setStatusText('INITIALIZING DISTRIBUTED KERNEL & MEMORY BUS...');
      } else if (currentPercent < 48) {
        setStatusText('COMPILING 144Hz GLSL SHADER PIPELINE // 0.08ms FRAME...');
      } else if (currentPercent < 75) {
        setStatusText('LINKING ZERO-TRUST RBAC & REAL-TIME NETCODE MESH...');
      } else if (currentPercent < 98) {
        setStatusText('DEPLOYING MISSION-CRITICAL CLOUD INFRASTRUCTURE...');
      } else {
        setStatusText('TACTICAL SYSTEMS ONLINE // WELCOME ARCHITECT');
      }

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        if (!completedRef.current) {
          completedRef.current = true;
          try {
            soundFx.playSuccess();
          } catch {
            // Audio context gesture restriction
          }
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 700);
          }, 240);
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(100);
    setIsExiting(true);
    setTimeout(onComplete, 350);
  };

  const nameLetters = ['S', 'H', 'R', 'I', 'D', 'H', 'A', 'R', ' ', 'H', 'E', 'G', 'D', 'E'];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="corporate-gaming-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            opacity: 0.98,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#040608] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-default transform-gpu will-change-transform"
        >
          {/* Zero-Jank Hardware-Accelerated Ambient Mesh (Pure CSS Radial Gradients, NO blur filters) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top-Right Signature Electric Lime Flare */}
            <div
              className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full pointer-events-none opacity-40 transform-gpu"
              style={{
                background:
                  'radial-gradient(circle, rgba(204, 255, 0, 0.22) 0%, rgba(204, 255, 0, 0.06) 42%, transparent 70%)',
              }}
            />

            {/* Bottom-Left Titanium Graphite Flare */}
            <div
              className="absolute -bottom-32 -left-32 w-[700px] h-[700px] rounded-full pointer-events-none opacity-40 transform-gpu"
              style={{
                background:
                  'radial-gradient(circle, rgba(148, 163, 184, 0.16) 0%, rgba(71, 85, 105, 0.08) 45%, transparent 72%)',
              }}
            />

            {/* Center Subtle Cyber Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 transform-gpu"
              style={{
                background:
                  'radial-gradient(circle, rgba(204, 255, 0, 0.18) 0%, transparent 68%)',
              }}
            />

            {/* High-Precision Cyber Grid Scanlines */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Subtle Diagonal Carbon Fiber Weave */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 8px)',
              }}
            />
          </div>

          {/* Top Telemetry Header: Corporate Executive & Gaming HUD */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-ping opacity-75 absolute" />
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="tracking-widest uppercase font-bold text-white">
                  NEXUS CORE
                </span>
                <span className="text-[#CCFF00]/60">//</span>
                <span className="hidden sm:inline text-slate-400 text-[11px] tracking-wider">
                  ENTERPRISE ARCHITECTURE & AAA GAME TECH
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-[11px] text-slate-400 font-mono">
              <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-slate-300">
                FRAME: 144Hz SYNC
              </span>
              <span className="px-2 py-0.5 rounded border border-[#CCFF00]/30 bg-[#CCFF00]/10 text-[#CCFF00]">
                P99: &lt; 14ms
              </span>
              <span className="text-slate-500">SLA: 99.99%</span>
            </div>

            <button
              onClick={handleSkip}
              className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-[#CCFF00] text-[10px] uppercase font-mono tracking-wider text-slate-300 hover:text-[#CCFF00] transition-all hover:bg-[#CCFF00]/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              SKIP [ESC]
            </button>
          </div>

          {/* Centerpiece: Monumental Typography & Tactical Brackets */}
          <div className="relative z-10 my-auto text-center flex flex-col items-center max-w-4xl mx-auto px-4">
            {/* Tactical Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#CCFF00]/40 text-[11px] sm:text-xs font-mono tracking-[0.22em] text-[#CCFF00] uppercase shadow-[0_0_20px_rgba(204,255,0,0.15)]"
            >
              <span className="text-[#CCFF00] font-bold">&gt;&gt;</span>
              <span>PRINCIPAL SYSTEMS ARCHITECT & REAL-TIME ENGINE DEV</span>
              <span className="text-[#CCFF00] font-bold">&lt;&lt;</span>
            </motion.div>

            {/* Giant Monolithic Name Reveal */}
            <div className="flex items-center justify-center flex-wrap overflow-hidden py-1">
              {nameLetters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 + i * 0.02,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block text-4xl sm:text-6xl md:text-8xl font-black tracking-tight transform-gpu ${
                    char === ' '
                      ? 'w-3 sm:w-6'
                      : 'text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]'
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Sub-Headline: Corporate High-Octane Mission */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-5 text-slate-300 text-xs sm:text-sm md:text-base font-medium tracking-[0.16em] uppercase max-w-2xl text-center leading-relaxed"
            >
              Architecting Mission-Critical Distributed Backends & AAA Real-Time Interactive Worlds
            </motion.p>

            {/* Tactical Gaming Metric Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="mt-7 hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-400"
            >
              <span className="px-2.5 py-1 rounded bg-[#090D16] border border-white/10 text-slate-300">
                ENTERPRISE MICROSERVICES
              </span>
              <span className="text-white/20">•</span>
              <span className="px-2.5 py-1 rounded bg-[#090D16] border border-[#CCFF00]/30 text-[#CCFF00]">
                CUSTOM WEBGL / GLSL
              </span>
              <span className="text-white/20">•</span>
              <span className="px-2.5 py-1 rounded bg-[#090D16] border border-white/10 text-slate-300">
                ANTI-CHEAT & FORENSIC AI
              </span>
            </motion.div>
          </div>

          {/* Bottom Telemetry HUD: Real-time Status & High-Speed Gauge */}
          <div className="relative z-10 flex flex-col gap-3 max-w-4xl mx-auto w-full">
            <div className="flex items-end justify-between font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-[#CCFF00] uppercase tracking-widest block font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                  REAL-TIME TELEMETRY FEED
                </span>
                <span className="text-xs sm:text-sm text-slate-200 tracking-wide font-medium">
                  {statusText}
                </span>
              </div>

              {/* High-Precision Numeric Counter */}
              <div className="text-right">
                <span className="text-3xl sm:text-5xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-white to-slate-200">
                  {String(progress).padStart(3, '0')}
                </span>
                <span className="text-[#CCFF00] font-mono text-sm ml-1 font-bold">%</span>
              </div>
            </div>

            {/* Laser Progress Gauge */}
            <div className="relative h-[4px] w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00] shadow-[0_0_16px_#CCFF00] rounded-full transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Quick Status Sub-Bar */}
            <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
              <span>STATUS: NOMINAL</span>
              <span className="hidden sm:inline">BUFFER: 144Hz LOCK</span>
              <span>CLICK OR PRESS ESC TO ENTER</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AugeIntro;
