import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Cpu,
  GraduationCap,
  Terminal as TerminalIcon,
  Mail,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ScrollProjectShowcase } from '../components/ScrollProjectShowcase';
import { SkillScrollReveal } from '../components/SkillScrollReveal';
import { ScrollNumberMarquee } from '../components/ScrollNumberMarquee';
import { ScrollReveal, SplitTextReveal } from '../components/ScrollReveal';
import { VeriProofSandbox } from '../components/VeriProofSandbox';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/audio';
import { TiltCard } from '../components/TiltCard';

interface HomeProps {
  onSelectProject: (project: Project) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectProject }) => {
  return (
    <div className="pb-20">
      {/* ─── 1. CINEMATIC HERO ─── */}
      <Hero />

      {/* ─── 2. SCROLL-DRIVEN HORIZONTAL PARALLAX MARQUEE ─── */}
      <ScrollNumberMarquee />

      {/* ─── 3. AUGE-STYLE SCROLL PROJECT SHOWCASE ─── */}
      {/* Full alternating-layout cards that animate in on scroll */}
      <ScrollProjectShowcase onSelectProject={onSelectProject} />

      {/* ─── 4. LIVE VERIPROOF SANDBOX ─── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-8">
        <ScrollReveal y={50}>
          <VeriProofSandbox />
        </ScrollReveal>
      </section>

      {/* ─── 5. SKILL SCROLL REVEAL (slides in from alternating sides) ─── */}
      <SkillScrollReveal />

      {/* ─── 6. ABOUT (engineering philosophy) ─── */}
      <About />

      {/* ─── 7. QUICK NAV CARDS (fade-up stagger) ─── */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Section label */}
        <ScrollReveal y={30}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em]">
              Quick Navigation
            </span>
          </div>
        </ScrollReveal>

        {/* 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              to: '/skills',
              icon: Cpu,
              title: 'Skills & Radar',
              desc: 'Inspect backend frameworks, MongoDB queries, and multi-LLM pipelines.',
              color: '#00F0FF',
              glare: 'rgba(0, 240, 255, 0.3)',
              hoverBorder: 'hover:border-cyan-500/40',
              iconBg: 'bg-cyan-500/10',
              iconBorder: 'border-cyan-500/30',
              iconColor: 'text-cyan-400',
              delay: 0,
            },
            {
              to: '/education',
              icon: GraduationCap,
              title: 'Credentials & Mastery',
              desc: 'IIT Kanpur Systems Elite, Enterprise Architecture & Advanced Engineering Certifications.',
              color: '#A855F7',
              glare: 'rgba(168, 85, 247, 0.3)',
              hoverBorder: 'hover:border-purple-500/40',
              iconBg: 'bg-purple-500/10',
              iconBorder: 'border-purple-500/30',
              iconColor: 'text-purple-400',
              delay: 0.08,
            },
            {
              to: '/terminal',
              icon: TerminalIcon,
              title: 'CLI Tactical Terminal',
              desc: 'Execute real-time engine commands, inspect netcode state & matrix telemetry.',
              color: '#10B981',
              glare: 'rgba(16, 185, 129, 0.3)',
              hoverBorder: 'hover:border-emerald-500/40',
              iconBg: 'bg-emerald-500/10',
              iconBorder: 'border-emerald-500/30',
              iconColor: 'text-emerald-400',
              delay: 0.16,
            },
            {
              to: '/contact',
              icon: Mail,
              title: 'Executive Briefing',
              desc: 'Direct email, phone copy with confetti celebrations, and social profiles.',
              color: '#38BDF8',
              glare: 'rgba(56, 189, 248, 0.3)',
              hoverBorder: 'hover:border-sky-500/40',
              iconBg: 'bg-sky-500/10',
              iconBorder: 'border-sky-500/30',
              iconColor: 'text-sky-400',
              delay: 0.24,
            },
          ].map((card) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={card.to} onClick={() => soundFx.playClick()} className="block h-full">
                <TiltCard
                  maxTilt={10}
                  glareOpacity={0.15}
                  glareColor={card.glare}
                  cursorText={card.title.split(' ')[0].toUpperCase()}
                  className={`p-5 sm:p-6 rounded-3xl bg-[#090D14] border border-white/10 ${card.hoverBorder} transition-all duration-300 group hover:-translate-y-1 h-full`}
                >
                  <div
                    className={`p-2.5 rounded-2xl ${card.iconBg} border ${card.iconBorder} ${card.iconColor} w-fit mb-3.5 group-hover:scale-110 transition-transform`}
                  >
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-white/90 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 8. RECRUITER CALLOUT (scroll reveal) ─── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-8">
        <ScrollReveal y={40}>
          <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-black border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-mono mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>RECRUITER FAST-TRACK</span>
              </div>
              <SplitTextReveal
                text="Ready for Full-Stack & AI Systems Engineering"
                as="h3"
                className="text-xl sm:text-3xl font-extrabold text-white"
                staggerDelay={0.04}
              />
              <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
                Expected Graduation: May 2027 from SDM Institute of Technology. Available for
                internship and full-time engineering roles.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                onClick={() => soundFx.playClick()}
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-105"
              >
                Get In Touch →
              </Link>
              <Link
                to="/terminal"
                onClick={() => soundFx.playClick()}
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-mono text-xs sm:text-sm transition-all"
              >
                Run &apos;sudo hire&apos;
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
