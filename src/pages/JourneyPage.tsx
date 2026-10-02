import React from 'react';
import { MoonKnightSky } from '../components/MoonKnightSky';
import { StaircaseGallery, JourneyItem } from '../components/StaircaseGallery';
import { PROJECTS, EDUCATION_DATA } from '../data/portfolioData';

export const JourneyPage: React.FC = () => {
  // Build the unified chronological journey:
  // Phase 1: School (10th — CBSE)
  // Phase 2: PU College (12th — Science)
  // Phase 3: Engineering (B.E. ISE)
  // Phase 4: Projects (VeriProof, TourEase, Expense Tracker)

  // Education data is stored in reverse chronological order (Engineering first, School last)
  // We reverse it to get: School → PU College → Engineering
  const chronologicalEducation = [...EDUCATION_DATA].reverse();

  const phaseConfig: Record<number, { phase: 'school' | 'pucollege' | 'engineering'; phaseLabel: string; phaseIcon: string; accentColor: string }> = {
    0: { phase: 'school', phaseLabel: 'School', phaseIcon: '🏫', accentColor: '#F59E0B' },
    1: { phase: 'pucollege', phaseLabel: 'PU College', phaseIcon: '📚', accentColor: '#10B981' },
    2: { phase: 'engineering', phaseLabel: 'Engineering Degree', phaseIcon: '🎓', accentColor: '#6366F1' },
  };

  const journeyItems: JourneyItem[] = [
    // Education Phases (School → PU College → Engineering)
    ...chronologicalEducation.map((edu, i) => ({
      id: `edu-${i}`,
      title: edu.institution,
      subtitle: edu.degree,
      description: edu.highlights.join(" • "),
      tags: ["Education", edu.period, edu.score],
      phase: phaseConfig[i].phase,
      phaseLabel: phaseConfig[i].phaseLabel,
      phaseIcon: phaseConfig[i].phaseIcon,
      accentColor: phaseConfig[i].accentColor,
    })),

    // Projects Phase (VeriProof, TourEase, Expense Tracker)
    ...PROJECTS.map(proj => ({
      id: proj.id,
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.description,
      tags: ["Project", ...proj.tags.slice(0, 3)],
      phase: 'projects' as const,
      phaseLabel: 'Projects',
      phaseIcon: '🚀',
      accentColor: proj.accentColor || '#00F0FF',
    })),
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden text-white bg-transparent pt-24 pb-20 relative">
      {/* Background that phases back in time based on scroll */}
      <MoonKnightSky />
      
      {/* The Staircase */}
      <div className="relative z-10">
        <StaircaseGallery items={journeyItems} />
      </div>
    </div>
  );
};
