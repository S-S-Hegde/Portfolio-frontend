import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Wallet, ArrowUpRight, ChevronLeft, ChevronRight, Layers, Sparkles, Check } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectMockupVisual } from './ProjectMockupVisual';
import { Project } from '../types';
import { soundFx } from '../utils/audio';

interface AugeShowcaseReelProps {
  onSelectProject: (project: Project) => void;
}

export const AugeShowcaseReel: React.FC<AugeShowcaseReelProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredProjects = PROJECTS.slice(0, 3);

  const handleSelect = (idx: number) => {
    soundFx.playClick();
    setActiveIndex(idx);
  };

  const handlePrev = () => {
    soundFx.playClick();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : featuredProjects.length - 1));
  };

  const handleNext = () => {
    soundFx.playClick();
    setActiveIndex((prev) => (prev < featuredProjects.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="showcase-reel" className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 select-none scroll-mt-28">
      {/* Background ambient aurora lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* AUGE-Style Header with Coordinates & Active Project Tracker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUGE EXPERIENCE GALLERY // ARCHITECTURE SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Selected Works</span>
              <span className="text-cyan-400 font-mono text-xl sm:text-2xl font-normal">
                [{String(activeIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}]
              </span>
            </h2>
          </div>

          {/* Interactive Project Switcher Pills & Prev/Next Arrows */}
          <div className="flex flex-wrap items-center gap-2.5">
            {featuredProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleSelect(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeIndex === idx
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                0{idx + 1} {p.title.split(' ')[0]}
              </button>
            ))}

            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl border border-white/10 hover:border-cyan-500/50 bg-white/[0.03] text-white hover:bg-cyan-500/10 transition-all"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl border border-white/10 hover:border-cyan-500/50 bg-white/[0.03] text-white hover:bg-cyan-500/10 transition-all"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic 3-Card Deck with Spotlight (AUGE-Style Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project, idx) => {
            const isVeriProof = project.id === 'veriproof';
            const isTourEase = project.id === 'tourease';
            const Icon = isVeriProof ? ShieldCheck : isTourEase ? Compass : Wallet;
            const isSpotlight = activeIndex === idx;

            return (
              <motion.div
                key={project.id}
                onClick={() => handleSelect(idx)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 relative overflow-hidden backdrop-blur-xl border cursor-pointer ${
                  isSpotlight
                    ? 'bg-gradient-to-b from-[#0D1527] to-[#070A14] border-cyan-500/60 shadow-[0_15px_60px_rgba(0,240,255,0.2)] ring-1 ring-cyan-500/40'
                    : 'bg-[#080B12]/80 border-white/10 hover:border-white/25 opacity-85 hover:opacity-100 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Top Accent Gradient Rim */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                    opacity: isSpotlight ? 1 : 0.4,
                  }}
                />

                <div className="space-y-4">
                  {/* AUGE Visual Cover Mockup */}
                  <div className="overflow-hidden rounded-2xl">
                    <ProjectMockupVisual
                      projectId={project.id}
                      accentColor={project.accentColor}
                      category={project.category}
                    />
                  </div>

                  {/* Header: Status Pill & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="p-2 rounded-xl border"
                        style={{
                          backgroundColor: `${project.accentColor}15`,
                          borderColor: `${project.accentColor}40`,
                          color: project.accentColor,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className="text-[11px] font-mono uppercase tracking-wider font-bold"
                        style={{ color: project.accentColor }}
                      >
                        {project.category}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      [0{idx + 1} / 03]
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-200/80 font-medium line-clamp-1 mt-1">
                      {project.subtitle}
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mt-2.5">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 hover:text-cyan-100 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Architecture Spec</span>
                  </button>

                  <Link
                    to="/projects"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                    }}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
                    title="View Full Case Study"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AUGE-Style Monumental Statement Section */}
        <div className="pt-10 sm:pt-14 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
              ENGINEERING PHILOSOPHY // 2026
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Building bulletproof distributed backends and autonomous AI pipelines with forensic precision.
            </h3>
          </div>
          <div className="lg:col-span-5 space-y-4 text-slate-400 text-sm leading-relaxed">
            <p>
              Combining multi-LLM orchestration, edge computer vision (YOLOv10 & MediaPipe), and server-authoritative submission firewalls. Designed for enterprise rigor, verifiable trust, and sub-second response times.
            </p>
            <div className="pt-1">
              <Link
                to="/journey"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-cyan-200 uppercase tracking-wider font-bold"
              >
                <span>Read Full Engineering Journey</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
