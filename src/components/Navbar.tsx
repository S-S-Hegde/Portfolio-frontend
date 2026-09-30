import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Search, Menu, X, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleSound = () => {
    const next = soundFx.toggle();
    setSoundEnabled(next);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Education', path: '/education' },
    { label: 'Terminal', path: '/terminal' },
    { label: 'Journey', path: '/journey' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'bg-[#090C12]/85 border-cyan-500/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-2.5 px-4'
            : 'bg-[#090C12]/40 border-white/10 backdrop-blur-md py-3.5 px-5'
        } flex items-center justify-between`}
      >
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            SH
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {PERSONAL_INFO.shortName}
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 -mt-0.5">
              Full-Stack & AI Systems
            </span>
          </div>
        </Link>

        {/* Desktop Route Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full px-2 py-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => soundFx.playHover()}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Live Status Radar Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>2027 Grad • Open to Roles</span>
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all text-xs font-mono"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1 bg-white/10 rounded text-[10px] text-slate-400">⌘K</kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
            title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Contact Button */}
          <Link
            to="/contact"
            onClick={() => soundFx.playClick()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Connect</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#0b0e14]/95 border border-cyan-500/20 backdrop-blur-2xl shadow-2xl flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-cyan-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>CGPA: 8.31 / 10 @ SDM-IT</span>
              <Link
                to="/contact"
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-cyan-400 font-bold"
              >
                Hire Shridhar →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
