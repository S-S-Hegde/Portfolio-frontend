import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, Sparkles, FolderGit2, GraduationCap, Award, Mail, Terminal as TerminalIcon, FileText, ExternalLink, Home as HomeIcon } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenProjectModal,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Prevent background scrolling while Command Palette is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      (window as any).lenisInstance?.stop();
    } else {
      document.body.style.overflow = '';
      (window as any).lenisInstance?.start();
    }
    return () => {
      document.body.style.overflow = '';
      (window as any).lenisInstance?.start();
    };
  }, [isOpen]);

  const commands = [
    {
      id: 'page-home',
      title: 'Home & Cinematic Overview',
      category: 'Navigation',
      icon: HomeIcon,
      action: () => navigate('/'),
      shortcut: 'HOME',
    },
    {
      id: 'page-projects',
      title: 'Explore All Projects & Architecture',
      category: 'Projects',
      icon: FolderGit2,
      action: () => navigate('/projects'),
      shortcut: 'PROJECTS',
    },
    {
      id: 'proj-veriproof',
      title: 'VeriProof — AI Skill Verification Platform (Modal)',
      category: 'Projects',
      icon: FolderGit2,
      action: () => onOpenProjectModal('veriproof'),
      shortcut: 'VERIPROOF',
    },
    {
      id: 'proj-tourease',
      title: 'TourEase — AI-Assisted Travel Platform (Modal)',
      category: 'Projects',
      icon: FolderGit2,
      action: () => onOpenProjectModal('tourease'),
      shortcut: 'TOUREASE',
    },
    {
      id: 'page-skills',
      title: 'Skills & Technical Matrix',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigate('/skills'),
      shortcut: 'SKILLS',
    },
    {
      id: 'page-education',
      title: 'Education & Certifications (SDM-IT 8.31, IIT Kanpur)',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => navigate('/education'),
      shortcut: 'EDUCATION',
    },
    {
      id: 'page-terminal',
      title: 'Interactive CLI Terminal Console',
      category: 'Tools',
      icon: TerminalIcon,
      action: () => navigate('/terminal'),
      shortcut: 'TERMINAL',
    },
    {
      id: 'page-contact',
      title: 'Contact & Hire Shridhar Hegde',
      category: 'Contact',
      icon: Mail,
      action: () => navigate('/contact'),
      shortcut: 'CONTACT',
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile (S-S-Hegde)',
      category: 'External',
      icon: ExternalLink,
      action: () => window.open('https://github.com/S-S-Hegde', '_blank'),
      shortcut: 'GITHUB',
    },
    {
      id: 'act-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      icon: ExternalLink,
      action: () => window.open('https://linkedin.com/in/shridhar-s-hegde-5655jmm', '_blank'),
      shortcut: 'LINKEDIN',
    },
    {
      id: 'act-email',
      title: 'Send Direct Email (shridharhhegde@gmail.com)',
      category: 'Contact',
      icon: FileText,
      action: () => window.open('mailto:shridharhhegde@gmail.com'),
      shortcut: 'EMAIL',
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    c.shortcut.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playClick();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overscroll-contain"
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#0b0e14]/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden z-10 overscroll-contain"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, projects, skills, certifications, contacts..."
                className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of actions */}
            <div
              data-lenis-prevent
              className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5 custom-scrollbar overscroll-contain"
            >
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        soundFx.playClick();
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-purple-500/15 group text-left transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/40 text-cyan-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </p>
                          <span className="text-[11px] text-slate-500 font-mono uppercase">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40">
                          {item.shortcut}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-300">ESC</kbd> to close</span>
              <span>Quick Navigation: <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-300">Ctrl + K</kbd></span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
