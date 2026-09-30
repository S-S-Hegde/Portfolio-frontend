import React from 'react';
import { MoonKnightSky } from '../components/MoonKnightSky';
import { StaircaseGallery, JourneyItem } from '../components/StaircaseGallery';
import { PROJECTS, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';

export const JourneyPage: React.FC = () => {
  // We reverse education so it goes chronologically: 10th -> 12th -> Engineering
  const chronologicalEducation = [...EDUCATION_DATA].reverse();

  // Combine all data into a unified Journey timeline
  const journeyItems: JourneyItem[] = [
    // Education Phase
    ...chronologicalEducation.map((edu, i) => ({
      id: `edu-${i}`,
      title: edu.institution,
      subtitle: edu.degree,
      description: edu.highlights.join(" • "),
      tags: ["Education", edu.period, edu.score]
    })),
    // Project Phase
    ...PROJECTS.map(proj => ({
      id: proj.id,
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.description,
      tags: ["Project", ...proj.tags.slice(0, 3)]
    })),
    // Certification Phase
    ...CERTIFICATIONS_DATA.map(cert => ({
      id: cert.id,
      title: cert.title,
      subtitle: cert.issuer,
      description: cert.description,
      tags: ["Certification", cert.year, cert.badgeType]
    }))
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden text-white bg-transparent pt-24 pb-20 relative">
      {/* Background that phases back in time based on scroll */}
      <MoonKnightSky />
      
      {/* The 3D Staircase */}
      <div className="relative z-10">
        <StaircaseGallery items={journeyItems} />
      </div>
    </div>
  );
};
