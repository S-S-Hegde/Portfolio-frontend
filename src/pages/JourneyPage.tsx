import React from 'react';
import { MoonKnightSky } from '../components/MoonKnightSky';
import { StaircaseGallery } from '../components/StaircaseGallery';
import { PROJECTS } from '../data/portfolioData';

export const JourneyPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden text-white bg-transparent pt-24 pb-20 relative">
      {/* Background that phases back in time based on scroll */}
      <MoonKnightSky />
      
      {/* The 3D Staircase */}
      <div className="relative z-10">
        <StaircaseGallery items={PROJECTS} />
      </div>
    </div>
  );
};
