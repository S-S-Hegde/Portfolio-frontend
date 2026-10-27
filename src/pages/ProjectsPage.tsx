import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Layers,
  ShieldCheck,
  Compass,
  Wallet,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  ChevronDown,
  ChevronUp,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/audio';
import { TiltCard } from '../components/TiltCard';
import { KineticText } from '../components/KineticText';
import { VeriProofSandbox } from '../components/VeriProofSandbox';
import { ProjectMockupVisual } from '../components/ProjectMockupVisual';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'AI & Backend' | 'Full-Stack Web'>('All');
  const [showSandbox, setShowSandbox] = useState(false);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  const getProjectIcon = (id: string) => {
    if (id === 'veriproof') return ShieldCheck;
    if (id === 'tourease') return Compass;
    if (id === 'expense-tracker') return Wallet;
    return Layers;
  };

  const getProjectAccent = (id: string, defaultColor: string) => {
    if (id === 'veriproof') return '#CCFF00';
    if (id === 'tourease') return '#10B981';
    if (id === 'expense-tracker') return '#F59E0B';
    return defaultColor || '#CCFF00';
  };

  return (
    <div className="pt-32 pb-28 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-xs font-mono mb-3 shadow-[0_0_15px_rgba(204,255,0,0.15)]">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>PRODUCTION CASE STUDIES & ARCHITECTURES</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                <KineticText text="Engineering Projects" />
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
                Autonomous verification engines, multi-LLM orchestrations (Gemini, Groq Llama, Mistral), real-time optical proctoring, and full-stack distributed systems built by Shridhar Hegde.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl self-start">
              {(['All', 'AI & Backend', 'Full-Stack Web'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playClick();
                    setFilter(cat);
                  }}
                  data-cursor-text="FILTER"
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    filter === cat
                      ? 'bg-accent-lime text-black font-bold shadow-[0_0_20px_rgba(204,255,0,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive VeriProof Sandbox Toggle Drawer */}
        <div className="rounded-3xl frosted-glass p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-accent-lime/10 border border-accent-lime/30 text-accent-lime">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-accent-lime uppercase tracking-wider">
                    Interactive Forensic Engine
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-accent-lime/20 text-accent-lime font-mono">
                    LIVE DEMO
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  VeriProof Live Audit Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Execute simulated candidate AST AST audits, YOLOv10 optical edge proctoring, and 6-tier LLM failover.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setShowSandbox(!showSandbox);
              }}
              data-cursor-text={showSandbox ? 'CLOSE' : 'EXPAND'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-lime/15 hover:bg-accent-lime/25 border border-accent-lime/40 text-accent-lime font-mono text-xs font-bold transition-all self-start sm:self-center whitespace-nowrap shadow-[0_0_15px_rgba(204,255,0,0.15)]"
            >
              <span>{showSandbox ? 'Close Simulator' : 'Launch Live Simulator'}</span>
              {showSandbox ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {showSandbox && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden pt-6"
              >
                <VeriProofSandbox />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Bespoke Case Study Cards List */}
        <div className="grid grid-cols-1 gap-12">
          {filteredProjects.map((project) => {
            const Icon = getProjectIcon(project.id);
            const accent = getProjectAccent(project.id, project.accentColor);

            return (
              <TiltCard
                key={project.id}
                maxTilt={3}
                glareOpacity={0.12}
                glareColor={`${accent}30`}
                cursorText="CASE STUDY"
                className="group relative rounded-3xl frosted-glass hover:border-white/20 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Hairline top accent gradient rim */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 opacity-80 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Project Narrative & Technical Highlights (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: `${accent}15`,
                            borderColor: `${accent}40`,
                            color: accent,
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-mono font-bold uppercase tracking-wider"
                              style={{ color: accent }}
                            >
                              {project.category}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">• {project.period}</span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-0.5">
                            {project.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base font-semibold leading-snug" style={{ color: accent }}>
                      {project.subtitle}
                    </p>

                    {/* Overview Paragraph */}
                    <p className="text-slate-300 text-sm leading-relaxed bg-white/[0.02] p-4 sm:p-5 rounded-2xl border border-white/5">
                      {project.fullOverview}
                    </p>

                    {/* Core Features / Bullet Highlights */}
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                        <span>Core Engineering Architecture</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {project.bulletPoints.slice(0, 4).map((bp, bpIdx) => (
                          <div
                            key={bpIdx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.015] border border-white/5 text-xs text-slate-300 leading-relaxed"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: accent }}
                            />
                            <span>{bp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.03] border border-white/10 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup Preview & Telemetry Metrics (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">
                    {/* Bespoke Interactive Visual Mockup */}
                    <div>
                      <ProjectMockupVisual
                        projectId={project.id}
                        accentColor={accent}
                        category={project.category}
                      />
                    </div>

                    {/* Key Telemetry Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                            {m.label}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Architecture Deep Dive Trigger */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onSelectProject(project);
                      }}
                      data-magnetic="true"
                      data-cursor-text="ARCHITECTURE"
                      className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-mono text-xs font-semibold transition-all group/btn"
                    >
                      <Layers className="w-4 h-4 text-accent-lime group-hover/btn:scale-110 transition-transform" />
                      <span>Inspect Topology & System Diagrams</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span>PRODUCTION REPO // HIGH AVAILABILITY</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        data-magnetic="true"
                        data-cursor-text="REPO"
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white transition-all text-xs font-mono flex items-center gap-2"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        data-magnetic="true"
                        data-cursor-text="DEMO"
                        style={{
                          backgroundColor: accent,
                          color: '#000000',
                          boxShadow: `0 0 25px ${accent}40`,
                        }}
                        className="px-5 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition-all hover:brightness-110 hover:scale-[1.02]"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
