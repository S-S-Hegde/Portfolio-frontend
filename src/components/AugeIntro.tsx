import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audio';

interface AugeIntroProps {
  onComplete: () => void;
}

export const AugeIntro: React.FC<AugeIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CORE...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progressive counter simulation with dynamic status updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Organic acceleration curve
        const step = prev < 30 ? 2 : prev < 75 ? 4 : prev < 90 ? 3 : 5;
        const next = Math.min(100, prev + step);

        if (next < 25) setStatusText('BOOTING NEURAL RUNTIME // 12.97° N');
        else if (next < 55) setStatusText('COMPILING DISTRIBUTED MESH // V3.4.0');
        else if (next < 85) setStatusText('SYNCHRONIZING LENIS & MOTION ENGINE');
        else setStatusText('SYSTEM READY // WELCOME');

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      try {
        soundFx.playSuccess();
      } catch (e) {
        // Audio might require user interaction on first visit
      }
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 900); // Wait for curtain wipe transition
      }, 350);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const nameLetters = ['S', 'H', 'R', 'I', 'D', 'H', 'A', 'R'];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="auge-preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#04060A] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden cursor-default"
        >
          {/* Dynamic Aurora Gradient Mesh Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top-right Cyan flare */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.35, 0.6, 0.35],
                x: [0, 20, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-cyan-400/30 via-sky-500/20 to-transparent blur-[130px]"
            />
            {/* Bottom-left Deep Purple/Indigo flare */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.55, 0.3],
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-transparent blur-[140px]"
            />
            {/* Center Emerald Accent flare */}
            <motion.div
              animate={{
                scale: [0.9, 1.15, 0.9],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/15 blur-[120px]"
            />

            {/* Subtle High-Tech Grid Scanlines */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          {/* Top Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00F0FF]" />
              <span className="tracking-widest uppercase text-slate-300">SHRIDHAR HEGDE // XP</span>
            </div>

            <div className="hidden sm:flex items-center gap-6 text-[11px] text-slate-500">
              <span>LAT 12.9716° N</span>
              <span>LON 77.5946° E</span>
              <span>RENDER ENGINE: WEBGL / LENIS</span>
            </div>

            <button
              onClick={handleSkip}
              className="px-3 py-1 rounded-full border border-white/10 hover:border-cyan-400/40 text-[10px] uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-all hover:bg-white/[0.04]"
            >
              Skip [ESC]
            </button>
          </div>

          {/* Centerpiece: AUGE-Style Monumental Kinetic Typography */}
          <div className="relative z-10 my-auto text-center flex flex-col items-center">
            {/* Sub-label with expanding geometric brackets */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400 uppercase"
            >
              <span className="opacity-50">[</span>
              <span>DIGITAL ARCHITECTURE & AI</span>
              <span className="opacity-50">]</span>
            </motion.div>

            {/* Huge Display Name Letters Reveal */}
            <div className="flex items-center justify-center overflow-hidden py-2 px-4">
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%', opacity: 0, rotateZ: 4 }}
                  animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-5xl sm:text-7xl md:text-9xl font-black tracking-tight sm:tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle with Character Split */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 sm:mt-6 text-slate-400 text-xs sm:text-base font-medium max-w-md tracking-widest uppercase"
            >
              Engineering High-Throughput Distributed Systems & Multi-LLM Pipelines
            </motion.p>
          </div>

          {/* Bottom Telemetry & Progress Gauge */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-end justify-between font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-cyan-400/80 uppercase tracking-widest block">
                  Status Feedback
                </span>
                <span className="text-xs sm:text-sm text-slate-200 tracking-wide">
                  {statusText}
                </span>
              </div>

              {/* Big AUGE Style Percentage Counter */}
              <div className="text-right">
                <span className="text-3xl sm:text-5xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                  {String(progress).padStart(3, '0')}
                </span>
                <span className="text-cyan-400 font-mono text-sm ml-1">%</span>
              </div>
            </div>

            {/* Glowing Dual Gradient Loading Track */}
            <div className="relative h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_12px_#00F0FF]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
