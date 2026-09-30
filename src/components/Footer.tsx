import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-white/10 relative bg-[#06080D]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-base text-white">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs font-mono text-cyan-400">
              • BE ISE &apos;27
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Crafting high-integrity full-stack systems, multi-LLM workflows, and secure web applications.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 transition-all"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-300 transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all ml-2"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
        <span>© {new Date().getFullYear()} Shridhar Sharatkumar Hegde. All rights reserved.</span>
        <span>Awwwards-Tier Engineering Showcase</span>
      </div>
    </footer>
  );
};
