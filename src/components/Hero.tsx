import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Sparkles, ShieldCheck, Cpu, Code2, Download, ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { TiltCard } from './TiltCard';
import { KineticText } from './KineticText';

const ROLES = [
  'Full-Stack Web Developer',
  'AI Systems Integrator',
  'Backend & API Specialist',
  'MERN Stack Architect',
  'LLM Pipeline Engineer'
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const marqueeItems = [
    'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI',
    'NVIDIA NIMs', 'Cohere', 'Mistral', 'Grok AI', 'JWT & RBAC',
    'REST APIs', 'Tailwind CSS', 'TypeScript', 'Java', 'C (IIT Kanpur Elite)'
  ];

  return (
    <section className="min-h-[88vh] pt-28 sm:pt-32 pb-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting orbs with soft blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] max-w-full bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 flex-1 flex flex-col justify-center">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#090D16]/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">{PERSONAL_INFO.availability}</span>
          </div>
        </motion.div>

        {/* Main Title with Kinetic Split-Word Reveal */}
        <div className="space-y-3.5">
          <h1 className="text-3xl sm:text-5xl lg:text-[3.65rem] font-black tracking-tight leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
            <KineticText
              text="Designing & Engineering Intelligent Full-Stack Platforms."
              as="span"
              wordClassName="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 via-sky-300 to-purple-400"
            />
          </h1>

          {/* Dynamic Role Flipper with clean spacing */}
          <div className="flex items-center flex-wrap gap-2 text-base sm:text-xl font-mono text-slate-200 min-h-[32px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <span className="text-cyan-400 font-bold">&gt;</span>
            <span className="text-slate-300">I am a </span>
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 font-bold border-b-2 border-cyan-400/60 pb-0.5"
            >
              {ROLES[roleIndex]}
            </motion.span>
          </div>

          {/* Bio paragraph with high-contrast text */}
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed pt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Hi, I&apos;m <strong className="text-white font-bold">{PERSONAL_INFO.name}</strong>. Currently pursuing Information Science & Engineering at <strong className="text-white font-semibold">SDM Institute of Technology (CGPA 8.31)</strong>. Creator of <strong className="text-cyan-300 font-semibold">VeriProof</strong> (forensic AI candidate verification platform) and <strong className="text-emerald-300 font-semibold">TourEase</strong>.
          </p>
        </div>

        {/* Action Buttons Bar with Magnetic Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3.5 pt-6"
        >
          <Link
            to="/projects"
            onClick={() => soundFx.playClick()}
            data-magnetic="true"
            data-cursor-text="EXPLORE"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.02]"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <Link
            to="/terminal"
            onClick={() => soundFx.playClick()}
            data-magnetic="true"
            data-cursor-text="TERMINAL"
            className="px-5 py-3.5 rounded-xl bg-[#0B0F18]/85 hover:bg-[#0E1320] border border-white/15 hover:border-cyan-500/50 text-slate-100 hover:text-cyan-300 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all backdrop-blur-xl shadow-lg"
          >
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span>Launch CLI Console</span>
          </Link>

          <Link
            to="/contact"
            onClick={() => soundFx.playClick()}
            data-magnetic="true"
            data-cursor-text="CONNECT"
            className="px-5 py-3.5 rounded-xl bg-[#0B0F18]/85 hover:bg-[#0E1320] border border-white/15 text-slate-100 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all backdrop-blur-xl shadow-lg"
          >
            <Mail className="w-4 h-4 text-purple-400" />
            <span>Get In Touch</span>
          </Link>

          <div className="flex items-center gap-2 pl-1">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              data-magnetic="true"
              data-cursor-text="GITHUB"
              title="GitHub Profile"
              className="p-3.5 rounded-xl bg-[#0B0F18]/85 border border-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 hover:scale-105 transition-all backdrop-blur-xl shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              data-magnetic="true"
              data-cursor-text="LINKEDIN"
              title="LinkedIn Profile"
              className="p-3.5 rounded-xl bg-[#0B0F18]/85 border border-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 hover:scale-105 transition-all backdrop-blur-xl shadow-lg"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Real-time Quick Stats 3D Tilt HUD Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <TiltCard
              key={idx}
              maxTilt={8}
              glareOpacity={0.2}
              glareColor="rgba(0, 240, 255, 0.35)"
              cursorText="METRIC"
              className="p-3.5 sm:p-4 rounded-2xl bg-[#090D16]/90 border border-white/15 hover:border-cyan-500/50 backdrop-blur-2xl transition-all duration-300 group hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200 mt-0.5">
                {stat.label}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                {stat.detail}
              </p>
            </TiltCard>
          ))}
        </motion.div>
      </div>

      {/* Infinite Tech Marquee with balanced spacing */}
      <div className="w-full pt-10 pb-2 overflow-hidden mask-fade">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#090D16]/80 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
