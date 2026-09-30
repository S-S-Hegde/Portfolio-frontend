import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Sparkles, Layers, ShieldCheck, Compass, ArrowUpRight, Cpu, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/audio';
import { TiltCard } from './TiltCard';
import { KineticText } from './KineticText';
import { VeriProofSandbox } from './VeriProofSandbox';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  showSandbox?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, showSandbox = true }) => {
  const [filter, setFilter] = useState<'All' | 'AI & Backend' | 'Full-Stack Web'>('All');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PRODUCTION SYSTEMS & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              <KineticText text="Featured Engineering Work" />
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
              Autonomous AI verification pipelines, multi-LLM orchestration, and full-stack web applications.
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
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

        {/* Project 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const isVeriProof = project.id === 'veriproof';
            const Icon = isVeriProof ? ShieldCheck : Compass;

            return (
              <TiltCard
                key={project.id}
                maxTilt={6}
                glareOpacity={0.18}
                glareColor={project.accentColor ? `${project.accentColor}40` : 'rgba(0, 240, 255, 0.4)'}
                cursorText="INSPECT"
                className="group relative rounded-3xl bg-[#090D14] border border-white/10 hover:border-cyan-500/40 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_50px_rgba(0,240,255,0.12)] overflow-hidden h-full"
              >
                {/* Accent top gradient rim */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                  }}
                />

                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-2xl border transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${project.accentColor}15`,
                          borderColor: `${project.accentColor}40`,
                          color: project.accentColor,
                        }}
                      >
                        <Icon className="w-6 h-6" />
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
                        <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-200 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onSelectProject(project);
                      }}
                      title="Inspect System Architecture"
                      data-magnetic="true"
                      data-cursor-text="DEEP DIVE"
                      className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all flex-shrink-0"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-cyan-300/90 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics preview grid */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {project.metrics.slice(0, 4).map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">
                          {m.label}
                        </span>
                        <span className="text-xs font-bold text-slate-200">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bullet Highlights Preview */}
                  <div className="space-y-2 mb-6 text-xs text-slate-300">
                    {project.bulletPoints.slice(0, 2).map((bp, bpIdx) => (
                      <div key={bpIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span className="line-clamp-2">{bp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onSelectProject(project);
                    }}
                    data-cursor-text="ARCHITECTURE"
                    className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View System Architecture</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        data-magnetic="true"
                        data-cursor-text="REPO"
                        className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
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
                        className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Live Interactive VeriProof Mini-Sandbox */}
        {showSandbox && (
          <div className="pt-8">
            <VeriProofSandbox />
          </div>
        )}
      </div>
    </section>
  );
};

