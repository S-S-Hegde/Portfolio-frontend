import React from 'react';
import { Mail } from 'lucide-react';
import { Contact } from '../components/Contact';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono mb-3 block w-fit">
            <Mail className="w-3.5 h-3.5 inline mr-1" />
            <span>GET IN TOUCH & COLLABORATE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Contact & Collaboration
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            Interested in discussing full-stack engineering roles, AI system integrations, or backend infrastructure? Reach out directly below.
          </p>
        </div>

        <Contact />
      </div>
    </div>
  );
};
