import React from 'react';
import {
  GraduationCap,
  Award,
  Terminal,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
} from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const AboutEditorial: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Masthead */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 text-accent-lime" />
            <span className="uppercase tracking-wider">04 // ABOUT &amp; VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineering Background &amp; Philosophy
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            A developer who loves the craft of writing clean code, understanding low-level fundamentals, and building products with genuine architectural integrity.
          </p>
        </div>

        {/* Narrative & Philosophy 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Authentic Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/[0.08] space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Building with curiosity, precision, and practical purpose.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I am an Information Science &amp; Engineering student at <strong className="text-white">SDM Institute of Technology, Ujire</strong>, specializing in scalable web backends, type-safe frontend systems, and practical AI integrations.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                My approach to software engineering centers on understanding how systems work from first principles. Rather than relying solely on high-level abstractions, I study how memory, pointers, and data structures operate under the hood—demonstrated by my <strong className="text-accent-lime font-semibold">IIT Kanpur Elite certification in C</strong>—while building high-velocity production platforms using React 18, Node.js, Express, MongoDB, and Python.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether architecting <strong className="text-white font-semibold">VeriProof</strong> to solve technical hiring verification bottlenecks or engineering <strong className="text-white font-semibold">TourEase</strong> for multi-modal travel discovery, I focus on software that is reliable, secure, and genuinely useful.
              </p>

              {/* Personal Highlights Bar */}
              <div className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 uppercase block mb-0.5">Location</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent-lime" />
                    Karnataka, India
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block mb-0.5">Languages</span>
                  <span className="text-white font-medium">English &bull; Kannada &bull; Hindi</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block mb-0.5">Availability</span>
                  <span className="text-accent-lime font-medium">Full-Time &bull; Internships</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Academic Track */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0E1117] border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-accent-lime">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Undergraduate Degree
                  </span>
                  <h4 className="text-base font-bold text-white">
                    Bachelor of Engineering
                  </h4>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-white font-semibold">
                  SDM Institute of Technology, Ujire
                </p>
                <p className="text-slate-400">
                  Information Science &amp; Engineering &bull; Class of 2027
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Rigorous curriculum covering Data Structures &amp; Algorithms, Database Management Systems, Computer Networks, Operating Systems, and Object-Oriented Software Engineering.
              </p>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Academic Standing:</span>
                <span className="text-accent-lime font-bold">8.31 / 10 CGPA</span>
              </div>
            </div>

            {/* IIT Kanpur Elite Certification Spotlight */}
            <div className="p-5 rounded-2xl bg-[#0E1117] border border-accent-lime/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-lime" />
                  <span className="text-xs font-mono font-bold text-accent-lime uppercase">
                    Featured Certification
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-lime text-black font-bold">
                  Elite Tier
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">
                Programming in C &bull; IIT Kanpur / NPTEL
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nationwide proctored examination covering pointers, dynamic heap memory management, recursive algorithmic paradigms, and low-level data structures.
              </p>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Score: <strong className="text-white">73% (Assignments 25/25)</strong></span>
                <span className="text-[10px]">ID: NPTEL25CS119S541500128</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Certifications Ledger */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-accent-lime" />
              <span>Verified Specializations &amp; Certifications</span>
            </div>
            <span className="text-xs font-mono text-slate-500">
              4 Verifiable Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-accent-lime font-bold uppercase">
                      {cert.badgeType}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {cert.year}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {cert.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    {cert.issuer}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-300 font-semibold">{cert.score}</span>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="text-accent-lime hover:underline flex items-center gap-1 text-[10px]"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEditorial;
