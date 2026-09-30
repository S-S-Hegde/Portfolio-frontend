import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, CheckCircle2, Cpu, Brain, Boxes, Sparkles, ArrowRight, ExternalLink, MapPin, Calendar, Globe } from 'lucide-react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';
import { CertificateModal } from './CertificateModal';
import { CertificationItem } from '../types';
import { soundFx } from '../utils/audio';

export const Education: React.FC = () => {
  const [tab, setTab] = useState<'education' | 'certifications'>('education');
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const certIcons: Record<string, typeof Cpu> = {
    Cpu: Cpu,
    Brain: Brain,
    Boxes: Boxes,
    Sparkles: Sparkles,
  };

  const eduIcons: Record<string, typeof GraduationCap> = {
    GraduationCap,
    Award,
    BookOpen,
  };

  const handleCardClick = (cert: CertificationItem) => {
    soundFx.playClick();
    setSelectedCert(cert);
    setIsCertModalOpen(true);
  };

  return (
    <section id="education" className="py-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header & Tab Switcher */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC & PROFESSIONAL CREDENTIALS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Education & Certifications
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
            Rigorous engineering fundamentals from SDM-IT (CGPA 8.31) and verified specializations from IIT Kanpur & Infosys. Click any certification to inspect credential details and scores.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl mt-8">
            <button
              onClick={() => { soundFx.playClick(); setTab('education'); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                tab === 'education'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Academic Degrees (8.31 CGPA)</span>
            </button>
            <button
              onClick={() => { soundFx.playClick(); setTab('certifications'); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                tab === 'certifications'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Verified Certifications (4)</span>
            </button>
          </div>
        </div>

        {/* Education View — with campus photo */}
        {tab === 'education' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 max-w-5xl mx-auto"
          >
            {EDUCATION_DATA.map((edu, idx) => {
              const EduIcon = eduIcons[edu.icon] || GraduationCap;
              const hasImgError = imgErrors[idx];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="relative rounded-3xl bg-[#090D14] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-[0_10px_50px_rgba(0,240,255,0.10)] overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex flex-col lg:flex-row">
                    {/* Campus Photo Panel */}
                    {edu.image && !hasImgError && (
                      <div className="lg:w-72 xl:w-80 flex-shrink-0 relative overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                        <img
                          src={edu.image}
                          alt={`${edu.institution} campus`}
                          className="w-full h-52 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={() => setImgErrors((prev) => ({ ...prev, [idx]: true }))}
                        />
                        {/* Overlay gradient for readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#090D14]/60 lg:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090D14]/60 to-transparent lg:hidden" />
                      </div>
                    )}

                    {/* Content Panel */}
                    <div className="flex-1 p-6 md:p-8">
                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mt-0.5 flex-shrink-0">
                            <EduIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap gap-2 mb-1">
                              <span className="text-xs font-mono text-cyan-400 font-semibold">
                                {edu.period}
                              </span>
                              <span className="text-slate-500 text-xs font-mono flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {edu.location}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                              {edu.institution}
                            </h3>
                            <p className="text-sm text-slate-300 font-medium mt-0.5">
                              {edu.degree}
                            </p>
                          </div>
                        </div>

                        {/* Score Badge */}
                        <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-right self-start flex-shrink-0">
                          <span className="text-[10px] font-mono uppercase text-slate-400 block">
                            {edu.scoreLabel}
                          </span>
                          <span className="text-xl font-black text-cyan-300">
                            {edu.score}
                          </span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 pt-3 border-t border-white/5 mb-4">
                        {edu.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Visit Website Button */}
                      {edu.websiteUrl && (
                        <a
                          href={edu.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundFx.playClick()}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono font-semibold transition-all group/btn hover:scale-[1.02] mt-1"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Visit Official Website</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Certifications View */}
        {tab === 'certifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {CERTIFICATIONS_DATA.map((cert) => {
              const Icon = certIcons[cert.icon] || Award;
              const isElite = cert.badgeType === 'Elite';

              return (
                <div
                  key={cert.id}
                  onClick={() => handleCardClick(cert)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`cursor-pointer p-6 rounded-3xl bg-[#090D14] border transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden ${
                    isElite
                      ? 'border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_10px_40px_rgba(234,179,8,0.2)]'
                      : 'border-white/10 hover:border-purple-500/50 hover:shadow-[0_10px_40px_rgba(168,85,247,0.2)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`p-3 rounded-2xl border ${
                        isElite
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                          : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`px-3 py-1 text-[11px] font-mono font-bold rounded-full border ${
                        isElite
                          ? 'bg-yellow-500/15 border-yellow-500/50 text-yellow-300'
                          : 'bg-purple-500/15 border-purple-500/50 text-purple-300'
                      }`}
                    >
                      {cert.score || cert.badgeType}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                    <span className="text-cyan-400 font-semibold">{cert.issuer}</span>
                    <span>• {cert.year}</span>
                  </div>

                  {cert.credentialId && (
                    <div className="mb-3 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 w-fit">
                      Roll No: {cert.credentialId}
                    </div>
                  )}

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 mb-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/5 border border-white/10 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Action Prompt */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors pt-2">
                    <span>Inspect Credential Dossier</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Interactive Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={isCertModalOpen}
        onClose={() => {
          setIsCertModalOpen(false);
          setSelectedCert(null);
        }}
      />
    </section>
  );
};
