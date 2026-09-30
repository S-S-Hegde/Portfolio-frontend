import React from 'react';
import { Sparkles } from 'lucide-react';
import { Skills } from '../components/Skills';

export const SkillsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 block w-fit">
            <Sparkles className="w-3.5 h-3.5 inline mr-1" />
            <span>FULL TECHNICAL MATRIX & CAPABILITIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Technical Stack & Skills
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            Detailed proficiency overview spanning programming languages, backend architecture, database schemas, authorization security, and multi-model AI integration.
          </p>
        </div>

        <Skills />
      </div>
    </div>
  );
};
