import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Sparkles, FolderGit2, ShieldCheck, Compass, Wallet, GraduationCap, Award, Mail, Cpu } from 'lucide-react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { AugeShowcaseReel } from '../components/AugeShowcaseReel';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { ProjectMockupVisual } from '../components/ProjectMockupVisual';
import { Project } from '../types';
import { soundFx } from '../utils/audio';
import { TiltCard } from '../components/TiltCard';
import { KineticText } from '../components/KineticText';
import { VeriProofSandbox } from '../components/VeriProofSandbox';

interface HomeProps {
  onSelectProject: (project: Project) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectProject }) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Cinematic Hero */}
      <Hero />

      {/* AUGE-Style Showcase Reel with Spotlight Switcher & Philosophy */}
      <AugeShowcaseReel onSelectProject={onSelectProject} />

      {/* Live VeriProof Forensic Sandbox Engine */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <VeriProofSandbox />
      </section>

      {/* Engineering Philosophy & About */}
      <About />

      {/* Quick Navigation Cards Hub with 3D Tilt */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/skills"
            onClick={() => soundFx.playClick()}
            className="block"
          >
            <TiltCard
              maxTilt={10}
              glareOpacity={0.15}
              glareColor="rgba(0, 240, 255, 0.3)"
              cursorText="SKILLS"
              className="p-5 sm:p-6 rounded-3xl bg-[#090D14] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 h-full"
            >
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-3.5 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Skills & Radar
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Inspect backend frameworks, MongoDB queries, and multi-LLM pipelines.
              </p>
            </TiltCard>
          </Link>

          <Link
            to="/education"
            onClick={() => soundFx.playClick()}
            className="block"
          >
            <TiltCard
              maxTilt={10}
              glareOpacity={0.15}
              glareColor="rgba(168, 85, 247, 0.3)"
              cursorText="CERTS"
              className="p-5 sm:p-6 rounded-3xl bg-[#090D14] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1 h-full"
            >
              <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit mb-3.5 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                SDM-IT & Certs
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                8.31 CGPA, IIT Kanpur NPTEL Elite & Infosys Springboard certifications.
              </p>
            </TiltCard>
          </Link>

          <Link
            to="/terminal"
            onClick={() => soundFx.playClick()}
            className="block"
          >
            <TiltCard
              maxTilt={10}
              glareOpacity={0.15}
              glareColor="rgba(16, 185, 129, 0.3)"
              cursorText="TERMINAL"
              className="p-5 sm:p-6 rounded-3xl bg-[#090D14] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 h-full"
            >
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-3.5 group-hover:scale-110 transition-transform">
                <TerminalIcon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                CLI Console
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Run interactive developer commands, matrix mode & inspect system state.
              </p>
            </TiltCard>
          </Link>

          <Link
            to="/contact"
            onClick={() => soundFx.playClick()}
            className="block"
          >
            <TiltCard
              maxTilt={10}
              glareOpacity={0.15}
              glareColor="rgba(56, 189, 248, 0.3)"
              cursorText="CONTACT"
              className="p-5 sm:p-6 rounded-3xl bg-[#090D14] border border-white/10 hover:border-sky-500/40 transition-all duration-300 group hover:-translate-y-1 h-full"
            >
              <div className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit mb-3.5 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                Connect Hub
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Direct email, phone copy with confetti celebrations, and social profiles.
              </p>
            </TiltCard>
          </Link>
        </div>
      </section>

      {/* Recruiter Fast-Track Callout */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-black border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-mono mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>RECRUITER FAST-TRACK</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              Ready for Full-Stack & AI Systems Engineering
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Expected Graduation: May 2027 from SDM Institute of Technology. Available for internship and full-time engineering roles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              onClick={() => soundFx.playClick()}
              data-magnetic="true"
              data-cursor-text="HIRE"
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-105"
            >
              Get In Touch →
            </Link>
            <Link
              to="/terminal"
              onClick={() => soundFx.playClick()}
              data-magnetic="true"
              data-cursor-text="SUDO"
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-mono text-xs sm:text-sm transition-all"
            >
              Run &apos;sudo hire&apos;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
