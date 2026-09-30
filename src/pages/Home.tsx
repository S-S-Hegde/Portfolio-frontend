import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Sparkles, FolderGit2, ShieldCheck, Compass, GraduationCap, Award, Mail, Cpu } from 'lucide-react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
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

      {/* Engineering Philosophy & About */}
      <About />

      {/* Featured Projects Showcase Teaser with 3D Tilt */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2.5">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PRODUCTION SYSTEMS & HIGHLIGHTS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              <KineticText text="Featured Case Studies" />
            </h2>
            <p className="text-slate-400 mt-1.5 max-w-xl text-xs sm:text-sm">
              Autonomous candidate verification pipelines, multi-LLM orchestration, and smart travel systems.
            </p>
          </div>

          <Link
            to="/projects"
            onClick={() => soundFx.playClick()}
            data-magnetic="true"
            data-cursor-text="ALL PROJECTS"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 font-mono text-xs transition-all self-start"
          >
            <span>View All Deep Dives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project, idx) => {
            const isVeriProof = project.id === 'veriproof';
            const Icon = isVeriProof ? ShieldCheck : Compass;

            return (
              <TiltCard
                key={project.id}
                maxTilt={6}
                glareOpacity={0.16}
                glareColor={project.accentColor ? `${project.accentColor}40` : 'rgba(0, 240, 255, 0.4)'}
                cursorText="INSPECT"
                className="group relative rounded-3xl bg-[#090D14] border border-white/10 hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_50px_rgba(0,240,255,0.12)] overflow-hidden h-full"
              >
                {/* Accent top gradient rim */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                  }}
                />

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="p-2.5 rounded-2xl border"
                      style={{
                        backgroundColor: `${project.accentColor}15`,
                        borderColor: `${project.accentColor}40`,
                        color: project.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className="text-[11px] font-mono font-semibold uppercase tracking-wider block"
                        style={{ color: project.accentColor }}
                      >
                        {project.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-cyan-300/90 mb-2.5">
                    {project.subtitle}
                  </p>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onSelectProject(project);
                    }}
                    data-cursor-text="ARCHITECTURE"
                    className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <span>System Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to="/projects"
                    onClick={() => soundFx.playClick()}
                    data-magnetic="true"
                    data-cursor-text="CASE STUDY"
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
                  >
                    Explore Case Study
                  </Link>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Live VeriProof Forensic Sandbox Engine */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <VeriProofSandbox />
      </section>

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
