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
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#06080C] text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Colophon */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">
              {PERSONAL_INFO.shortName}
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="text-xs font-mono text-accent-lime">
              Full-Stack &amp; AI Systems Engineer
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Architecting high-throughput distributed web systems, repository AST auditing, and practical multi-modal AI integrations.
          </p>
        </div>

        {/* Right: Social Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all"
            title="Direct Email"
            aria-label="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to Top"
            className="p-2.5 rounded-full bg-accent-lime text-black hover:bg-[#B8E600] transition-all ml-2 font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
        <span>&copy; {new Date().getFullYear()} Shridhar Sharatkumar Hegde. All rights reserved.</span>
        <span>Built with React 18 &bull; Vite &bull; Tailwind CSS &bull; Motion</span>
      </div>
    </footer>
  );
};

export default Footer;
