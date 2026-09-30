import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, ShieldAlert, Cpu, Sparkles, CheckCircle } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: number;
    description: string;
    highlight?: string;
  } | null>(SKILL_CATEGORIES[0].skills[0]);

  const categoryIcons = [Code2, Layout, Server, Database, ShieldAlert, Cpu];

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY & STACK</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Skills & Engineering Arsenal
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
            Hands-on expertise across frontend, backend micro-services, database schemas, security protocols, and multi-LLM orchestration.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            const isActive = activeCategory === idx;

            return (
              <button
                key={cat.category}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(idx);
                  setSelectedSkill(cat.skills[0]);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skills list of active category */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3.5"
            >
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-4">
                <p className="text-xs font-mono text-cyan-400">
                  {SKILL_CATEGORIES[activeCategory].category}
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  {SKILL_CATEGORIES[activeCategory].description}
                </p>
              </div>

              {SKILL_CATEGORIES[activeCategory].skills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;

                return (
                  <div
                    key={skill.name}
                    onClick={() => {
                      soundFx.playHover();
                      setSelectedSkill(skill);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/25 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.15)]'
                        : 'bg-[#090D14] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
                            {skill.highlight}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Skill Inspector Deep-Dive Box */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-6 md:p-8 rounded-3xl bg-[#090D14] border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-4">
                <Sparkles className="w-4 h-4" />
                <span>SKILL INSPECTOR</span>
              </div>

              {selectedSkill ? (
                <div>
                  <h4 className="text-2xl font-black text-white mb-1">
                    {selectedSkill.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-purple-400">
                      Proficiency Level: {selectedSkill.level}%
                    </span>
                    {selectedSkill.highlight && (
                      <span className="text-[11px] font-mono text-slate-400">
                        • {selectedSkill.highlight}
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                    <p className="text-xs uppercase font-mono text-slate-500 mb-1">
                      Technical Implementation
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedSkill.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase font-mono text-slate-500">
                      Verified Applied Experience
                    </p>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Applied in production-ready full-stack projects</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Integrated with modern CI/CD & Cloud APIs</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 text-sm">Select a skill to inspect implementation details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
