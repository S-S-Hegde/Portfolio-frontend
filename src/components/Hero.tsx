import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Mail, ShieldCheck, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [localTime, setLocalTime] = useState<string>('');

  // Live IST Clock for authentic editorial touch
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle scroll parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const contentY = useTransform(smoothY, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(smoothY, [0, 0.7], [1, 0]);

  const handleScrollToVeriProof = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playClick();
    const el = document.getElementById('veriproof');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Architectural Subtle Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid intersection */}
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        {/* Single restrained electric-lime ambient glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(204, 255, 0, 0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-6xl mx-auto w-full z-10 flex-1 flex flex-col justify-center"
      >
        {/* Top Metadata Row: Editorial Masthead */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-6 border-b border-white/[0.08] text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
            <span className="text-white font-medium uppercase tracking-wider">
              SHRIDHAR HEGDE
            </span>
            <span className="text-white/20">/</span>
            <span className="text-slate-400">PORTFOLIO &lsquo;26</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[11px] text-slate-400">
            <span>KARNATAKA, INDIA [12.97°N]</span>
            <span className="text-white/20">•</span>
            <span>CLOCK: <span className="text-white font-bold">{localTime || 'IST'}</span></span>
            <span className="text-white/20">•</span>
            <span className="text-accent-lime">AVAILABLE FOR ROLES</span>
          </div>
        </motion.div>

        {/* Monumental Editorial Headline */}
        <div className="space-y-4">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight leading-[1.02] text-white"
            >
              BUILDING RESILIENT
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight leading-[1.02] text-white flex items-center flex-wrap gap-x-4"
            >
              <span>DISTRIBUTED SYSTEMS</span>
              <span className="text-accent-lime font-mono text-3xl sm:text-5xl font-light">
                &amp;
              </span>
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight leading-[1.02] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400"
            >
              PRACTICAL AI.
            </motion.h1>
          </div>
        </div>

        {/* Narrative Introduction & Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            I am a full-stack engineer focused on high-throughput backend architecture,
            intuitive client interfaces, and verifiable AI workflows. Creator of{' '}
            <a
              href="#veriproof"
              onClick={handleScrollToVeriProof}
              className="text-accent-lime hover:underline font-semibold"
            >
              VeriProof
            </a>
            , an automated candidate skill-assessment platform that audits GitHub repositories,
            AST code complexity, and resume claims.
          </p>
        </motion.div>

        {/* Action Suite (Primary Case Study CTA, GitHub, Contact) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#veriproof"
            onClick={handleScrollToVeriProof}
            className="px-6 py-3.5 rounded-full bg-accent-lime hover:bg-[#B8E600] text-black font-extrabold text-sm flex items-center gap-2.5 transition-all shadow-[0_0_20px_rgba(204,255,0,0.25)] hover:scale-[1.02]"
          >
            <span>Explore VeriProof Case Study</span>
            <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="px-5 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <GithubIcon className="w-4 h-4 text-slate-300" />
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <Link
            to="/contact"
            onClick={() => soundFx.playClick()}
            className="px-5 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4 text-slate-300" />
            <span>Get in Touch</span>
          </Link>
        </motion.div>

        {/* Architectural Highlights Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-14 pt-8 border-t border-white/[0.08]"
        >
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-lime/30 transition-colors">
            <span className="text-[10px] font-mono text-accent-lime uppercase tracking-widest block mb-1">
              01 // Flagship Project
            </span>
            <h4 className="text-sm font-bold text-white">VeriProof Platform</h4>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Candidate skill assessment &amp; GitHub AST commit forensics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-lime/30 transition-colors">
            <span className="text-[10px] font-mono text-accent-lime uppercase tracking-widest block mb-1">
              02 // Core Stack
            </span>
            <h4 className="text-sm font-bold text-white">React 18 &bull; Node &bull; Express</h4>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              End-to-end type-safe web APIs and component architecture.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-lime/30 transition-colors">
            <span className="text-[10px] font-mono text-accent-lime uppercase tracking-widest block mb-1">
              03 // AI Microservices
            </span>
            <h4 className="text-sm font-bold text-white">Python FastAPI &bull; Gemini</h4>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              On-device YOLOv10/MediaPipe vision &amp; structured LLM extraction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-lime/30 transition-colors">
            <span className="text-[10px] font-mono text-accent-lime uppercase tracking-widest block mb-1">
              04 // Systems Rigor
            </span>
            <h4 className="text-sm font-bold text-white">IIT Kanpur Elite &bull; SDM-IT</h4>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              NPTEL Elite C programming &amp; ISE engineering foundations.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="max-w-6xl mx-auto w-full pt-8 flex items-center justify-between text-[11px] font-mono text-slate-500"
      >
        <span className="flex items-center gap-2">
          <span>SCROLL TO INSPECT ARCHITECTURES</span>
          <ArrowDown className="w-3 h-3 text-accent-lime animate-bounce" />
        </span>
        <span className="hidden sm:inline">PROD // REACT 18 &bull; VITE</span>
      </motion.div>
    </section>
  );
};

export default Hero;
