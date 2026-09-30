import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Education } from '../components/Education';

export const EducationPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3 block w-fit">
            <GraduationCap className="w-3.5 h-3.5 inline mr-1" />
            <span>ACADEMIC FOUNDATIONS & VERIFIED CREDENTIALS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Education & Certifications
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            Academic degree track at SDM Institute of Technology (CGPA 8.31) alongside verified specializations from IIT Kanpur and Infosys Springboard.
          </p>
        </div>

        <Education />
      </div>
    </div>
  );
};
