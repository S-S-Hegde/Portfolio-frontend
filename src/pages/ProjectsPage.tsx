import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Sparkles, Layers, ShieldCheck, Compass, ArrowUpRight, Cpu, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon } from '../components/SocialIcons';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/audio';
import { TiltCard } from '../components/TiltCard';
import { KineticText } from '../components/KineticText';
import { VeriProofSandbox } from '../components/VeriProofSandbox';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'AI & Backend' | 'Full-Stack Web'>('All');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>DEEP DIVE PRODUCTION CASE STUDIES</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                <KineticText text="Engineering Projects" />
              </h1>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
                Autonomous verification engines, multi-LLM orchestrations (Gemini, NVIDIA NIMs, Cohere, Mistral), and interactive full-stack web applications built by Shridhar Hegde.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl self-start">
              {(['All', 'AI & Backend', 'Full-Stack Web'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playClick();
                    setFilter(cat);
                  }}
                  data-cursor-text="FILTER"
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    filter === cat
                      ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive VeriProof Mini-Sandbox */}
        <div className="py-2">
          <VeriProofSandbox />
        </div>

        {/* Project 3D Tilt Cards List */}
        <div className="grid grid-cols-1 gap-10">
          {filteredProjects.map((project, idx) => {
            const isVeriProof = project.id === 'veriproof';
            const Icon = isVeriProof ? ShieldCheck : Compass;

            return (
              <TiltCard
                key={project.id}
                maxTilt={4}
                glareOpacity={0.16}
                glareColor={project.accentColor ? `${project.accentColor}35` : 'rgba(0, 240, 255, 0.35)'}
                cursorText="CASE STUDY"
                className="group relative rounded-3xl bg-[#090D14] border border-white/10 hover:border-cyan-500/40 p-6 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_50px_rgba(0,240,255,0.12)] overflow-hidden"
              >
                {/* Accent top gradient rim */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                  }}
                />

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${project.accentColor}15`,
                          borderColor: `${project.accentColor}40`,
                          color: project.accentColor,
                        }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-mono font-semibold uppercase tracking-wider"
                            style={{ color: project.accentColor }}
                          >
                            {project.category}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">• {project.period}</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-white group-hover:text-cyan-200 transition-colors">
                          {project.title}
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onSelectProject(project);
                      }}
                      title="Inspect System Architecture"
                      data-magnetic="true"
                      data-cursor-text="ARCHITECTURE"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all self-start text-xs font-mono"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Architecture Diagram</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-base font-semibold text-cyan-300/90 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                    {project.fullOverview}
                  </p>

                  {/* Metrics preview grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {project.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5"
                      >
                        <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">
                          {m.label}
                        </span>
                        <span className="text-sm font-bold text-slate-100">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bullet Highlights Full List */}
                  <div className="space-y-3 mb-8">
                    <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Core Engineering Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.bulletPoints.map((bp, bpIdx) => (
                        <div
                          key={bpIdx}
                          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs sm:text-sm text-slate-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onSelectProject(project);
                    }}
                    data-magnetic="true"
                    data-cursor-text="ARCHITECTURE"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 font-mono text-xs sm:text-sm transition-all"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Explore Multi-Stage Architecture Flow</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        data-magnetic="true"
                        data-cursor-text="REPO"
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white transition-all text-xs flex items-center gap-2"
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
                        className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)]"
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

