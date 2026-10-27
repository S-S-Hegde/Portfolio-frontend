import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

// Global / Background Components
import { ShaderCanvas } from './components/ShaderCanvas';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ProjectModal } from './components/ProjectModal';
import { PageTransition } from './components/PageTransition';
import { AugeIntro } from './components/AugeIntro';

// Primary Home Page (Eagerly loaded for immediate interaction)
import { Home } from './pages/Home';

// Dedicated Sub-Pages: Lazy Loaded with React.lazy for high performance
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const SkillsPage = React.lazy(() => import('./pages/SkillsPage').then((m) => ({ default: m.SkillsPage })));
const EducationPage = React.lazy(() => import('./pages/EducationPage').then((m) => ({ default: m.EducationPage })));
const TerminalPage = React.lazy(() => import('./pages/TerminalPage').then((m) => ({ default: m.TerminalPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const JourneyPage = React.lazy(() => import('./pages/JourneyPage').then((m) => ({ default: m.JourneyPage })));

import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

// AUGE-style Glassmorphic Lazy Loading Module Fallback
const AugeSuspenseFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-cyan-400 font-mono text-xs select-none">
    <div className="relative w-14 h-14 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
      <div className="w-8 h-8 rounded-full border-2 border-t-cyan-400 border-r-purple-500 border-b-transparent border-l-transparent animate-spin" />
    </div>
    <div className="flex flex-col items-center gap-1">
      <span className="tracking-[0.2em] uppercase font-bold text-slate-300">STREAMING VIEW // AUGE ARCH</span>
      <span className="text-[10px] text-cyan-500/80">LAT 12.97° N // SHRIDHAR.IO</span>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Top scroll progress indicator with synchronized high-refresh spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  // Initialize Ultra-Smooth High-FPS Lenis Smooth Scrolling Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).lenisInstance = lenis;

    // Attach lenis class to html
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
      (window as any).lenisInstance = null;
    };
  }, []);

  // Lock scroll and pause Lenis during intro to prevent any frame drops or layout thrashing
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [showIntro]);

  // Smooth reset to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleOpenProjectModal = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
      setIsModalOpen(true);
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#05070B] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* AUGE Cinematic Intro Preloader */}
      <AnimatePresence>
        {showIntro && <AugeIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Top Scroll-driven dynamic progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-sky-300 via-purple-500 to-emerald-400 origin-left z-[120] shadow-[0_0_12px_#00F0FF]"
        style={{ scaleX }}
      />

      {/* 3D WebGL GLSL Shader Background (60-144 FPS GPU Accelerated) */}
      <ShaderCanvas />

      {/* Interactive Constellation Particle Mesh */}
      <BackgroundCanvas />

      {/* Fluid Magnetic Glowing Cursor */}
      <CustomCursor />

      {/* Multi-Page Navigation Header */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Dynamic Multi-Page Router Outlet with AnimatePresence & Suspense Lazy Loading */}
      <main className="relative z-10">
        <Suspense fallback={<AugeSuspenseFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home onSelectProject={handleSelectProject} />
                  </PageTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageTransition>
                    <ProjectsPage onSelectProject={handleSelectProject} />
                  </PageTransition>
                }
              />
              <Route
                path="/skills"
                element={
                  <PageTransition>
                    <SkillsPage />
                  </PageTransition>
                }
              />
              <Route
                path="/education"
                element={
                  <PageTransition>
                    <EducationPage />
                  </PageTransition>
                }
              />
              <Route
                path="/terminal"
                element={
                  <PageTransition>
                    <TerminalPage />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <ContactPage />
                  </PageTransition>
                }
              />
              <Route
                path="/journey"
                element={
                  <PageTransition>
                    <JourneyPage />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenProjectModal={handleOpenProjectModal}
      />

      {/* Interactive System Architecture / Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
