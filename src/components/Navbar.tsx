import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Search, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleSound = () => {
    const next = soundFx.toggle();
    setSoundEnabled(next);
  };

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'VeriProof', path: '/#veriproof' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Education', path: '/education' },
    { label: 'Terminal', path: '/terminal' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    soundFx.playClick();
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#08090C]/85 border border-white/10 backdrop-blur-xl py-2 px-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-[#0D0F14]/60 border border-white/10 backdrop-blur-md py-3 px-6'
        } flex items-center justify-between`}
      >
        {/* Left: Brand / Monogram */}
        <Link
          to="/"
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-accent-lime"
          aria-label="Shridhar Hegde Portfolio Home"
        >
          <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center font-mono text-xs font-bold text-white group-hover:border-accent-lime group-hover:text-accent-lime transition-colors">
            SH
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-accent-lime transition-colors">
              {PERSONAL_INFO.shortName}
            </span>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400">
                Available for Roles
              </span>
            </div>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1">
          {navLinks.map((link) => {
            const isAnchor = link.path.startsWith('/#');
            if (isAnchor) {
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }
                  }}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/[0.05]"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => soundFx.playHover()}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 text-xs font-medium transition-all rounded-full relative ${
                    isActive
                      ? 'text-black bg-accent-lime font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Quick Tools (Command Palette, Audio, Contact CTA) */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger (Ctrl+K) */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            title="Open Command Palette (Ctrl+K)"
            aria-label="Open Command Palette"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-accent-lime/40 text-slate-400 hover:text-white text-xs font-mono transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded text-slate-300 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable Synthesized Audio' : 'Enable Audio'}
            aria-label={soundEnabled ? 'Disable Synthesized Audio' : 'Enable Audio'}
            className="p-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-slate-400 hover:text-white transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-accent-lime" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {/* Quick Contact CTA Button */}
          <Link
            to="/contact"
            onClick={() => soundFx.playClick()}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-accent-lime hover:shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 max-w-6xl mx-auto rounded-2xl bg-[#0B0D13]/95 border border-white/15 backdrop-blur-2xl p-5 shadow-2xl flex flex-col gap-2"
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
                      ? 'bg-accent-lime text-black font-bold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{PERSONAL_INFO.email}</span>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-accent-lime font-bold"
              >
                Let&apos;s Connect →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
