import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { Terminal } from '../components/Terminal';

export const TerminalPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3 block w-fit">
            <TerminalIcon className="w-3.5 h-3.5 inline mr-1" />
            <span>DEVELOPER CLI SYSTEM CONSOLE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Interactive CLI Shell
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            Execute terminal commands to inspect resume data, project parameters, educational scores, or trigger recruiter fast-track actions directly in-browser.
          </p>
        </div>

        <Terminal />
      </div>
    </div>
  );
};
