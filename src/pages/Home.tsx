import React from 'react';
import { Hero } from '../components/Hero';
import { ScrollNumberMarquee } from '../components/ScrollNumberMarquee';
import { VeriProofCaseStudy } from '../components/VeriProofCaseStudy';
import { SelectedWorks } from '../components/SelectedWorks';
import { SkillsEditorial } from '../components/SkillsEditorial';
import { AboutEditorial } from '../components/AboutEditorial';
import { Contact } from '../components/Contact';
import { Project } from '../types';

interface HomeProps {
  onSelectProject?: (project: Project) => void;
}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="pb-16 space-y-8 sm:space-y-12">
      {/* ─── 1. EDITORIAL HERO OPENING ─── */}
      <Hero />

      {/* ─── 2. PARALLAX ARCHITECTURAL MARQUEE ─── */}
      <ScrollNumberMarquee />

      {/* ─── 3. FLAGSHIP CASE STUDY: VERIPROOF ─── */}
      <VeriProofCaseStudy />

      {/* ─── 4. SELECTED FULL-STACK APPLICATIONS: TOUREASE & EXPENSE TRACKER ─── */}
      <SelectedWorks />

      {/* ─── 5. ARCHITECTURAL SKILLS & DOMAIN BREAKDOWN ─── */}
      <SkillsEditorial />

      {/* ─── 6. ABOUT, DEGREE & VERIFIED CERTIFICATIONS ─── */}
      <AboutEditorial />

      {/* ─── 7. DIRECT CONTACT & DISPATCH CHANNELS ─── */}
      <Contact />
    </div>
  );
};

export default Home;
