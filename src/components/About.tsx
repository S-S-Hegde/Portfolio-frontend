import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Code2, Globe, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { KineticText } from './KineticText';
import { TiltCard } from './TiltCard';

export const About: React.FC = () => {
  const philosophies = [
    {
      title: "Evidence-Based Verification",
      description: "Pioneered in VeriProof—replacing unverified claims with verifiable GitHub commit histories and tailored technical assessments.",
      icon: ShieldCheck,
      color: "#00F0FF"
    },
    {
      title: "Multi-Model AI Orchestration",
      description: "Leveraging specialized LLMs (Gemini, NVIDIA NIMs, Cohere, Mistral, Grok) for precise structured JSON extraction and adaptive evaluation.",
      icon: Sparkles,
      color: "#8A2BE2"
    },
    {
      title: "Defense-In-Depth Security",
      description: "Architecting stateless JWT authentication, rolling refresh tokens, argon2/bcrypt password hashing, and granular multi-tenant RBAC.",
      icon: Code2,
      color: "#10B981"
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story & Profile */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>ENGINEERING BACKGROUND & PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              <KineticText text="Building Resilient Full-Stack Systems with Practical AI Integration." />
            </h2>

            <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am an Information Science & Engineering undergraduate at <strong className="text-white">SDM Institute of Technology, Ujire</strong> (maintaining an <strong className="text-cyan-300 font-semibold">8.31 CGPA</strong>). My core focus lies at the intersection of scalable backend engineering and intelligent LLM-driven workflows.
              </p>
              <p>
                Whether it is engineering <strong className="text-cyan-300 font-semibold">VeriProof</strong>—an autonomous platform that analyzes candidates&apos; actual GitHub repository activity against resume claims using Gemini, NVIDIA NIMs, and Mistral—or architecting <strong className="text-emerald-300 font-semibold">TourEase</strong> with AI itinerary synthesis, I build software that solves real-world trust and efficiency bottlenecks.
              </p>
            </div>

            {/* Spoken Languages & Highlights */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono">
              <div>
                <span className="text-slate-500 block uppercase">Languages Spoken</span>
                <span className="text-slate-200 font-semibold">{PERSONAL_INFO.languages.join(' • ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase">Academic Focus</span>
                <span className="text-slate-200 font-semibold">ISE (BE 2023 - 2027)</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase">Location</span>
                <span className="text-slate-200 font-semibold">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Engineering Pillars */}
          <div className="lg:col-span-5 space-y-3.5">
            {philosophies.map((item, idx) => {
              const Icon = item.icon;
              return (
                <TiltCard
                  key={idx}
                  maxTilt={8}
                  glareOpacity={0.16}
                  glareColor={`${item.color}40`}
                  cursorText="PILLAR"
                  className="p-5 rounded-3xl bg-[#090D14] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="p-2 rounded-2xl border"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}40`,
                        color: item.color,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

