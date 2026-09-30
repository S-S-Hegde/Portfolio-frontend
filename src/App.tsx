import React, { useState, useEffect, useRef } from 'react';
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

// Dedicated Pages
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { EducationPage } from './pages/EducationPage';
import { TerminalPage } from './pages/TerminalPage';
import { ContactPage } from './pages/ContactPage';
import { JourneyPage } from './pages/JourneyPage';

import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

const AppContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Top scroll progress indicator with synchronized high-refresh spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  // Initialize Ultra-Smooth High-FPS Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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
      {/* Top Scroll-driven dynamic progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 origin-left z-[120] shadow-[0_0_12px_#00F0FF]"
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

      {/* Dynamic Multi-Page Router Outlet with AnimatePresence */}
      <main className="relative z-10">
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
