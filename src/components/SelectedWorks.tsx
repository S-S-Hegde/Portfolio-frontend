import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Wallet,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { soundFx } from '../utils/audio';

export const SelectedWorks: React.FC = () => {
  return (
    <section id="selected-works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-accent-lime" />
            <span className="uppercase tracking-wider">02 // SELECTED FULL-STACK APPLICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineered Systems &amp; Practical Applications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            In addition to VeriProof, I design and build full-stack web products addressing real user workflows—from AI-guided travel discovery to financial stream aggregation.
          </p>
        </div>

        {/* Project 1: TourEase (Cinematic Split Layout with Map & AI Workflow) */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-all space-y-8">
          {/* Masthead */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  TourEase
                </h3>
                <span className="text-xs font-mono text-emerald-400">
                  AI-Assisted Travel Discovery &amp; Itinerary Orchestration
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://tourease-six.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-2 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <span>Live Application</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
              <a
                href="https://github.com/S-S-Hegde"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-3.5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            </div>
          </div>

          {/* Details & Architecture Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Problem, Solution & Technical Contributions */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  The Problem &amp; Core Challenge
                </span>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Travel planning typically requires juggling hotel search engines, restaurant reviews, tourist attraction catalogs, and manual map navigation. TourEase solves this friction with an end-to-end platform that automates multi-day itinerary generation and interactive spatial visualization.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  Key Technical Implementation
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span><strong>Hybrid Itinerary Engine:</strong> Leverages Grok AI to synthesize high-context custom schedules for the first 48 hours of a trip, transitioning into rule-based algorithmic planning for subsequent days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span><strong>Interactive Map Waypoint Plotting:</strong> Seamless coordinate rendering of tourist destinations, restaurants, and hotels with live route filtering.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span><strong>Full-Stack MERN Architecture:</strong> Express RESTful endpoints, secured session handling, and MongoDB persistence for collaborative, shareable trip plans.</span>
                  </li>
                </ul>
              </div>

              {/* Technologies Pill Row */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Grok AI', 'Map Visualization', 'REST APIs', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Architecture Diagram / Telemetry Card */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-[#12151D] border border-white/[0.06] space-y-4">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                Itinerary Synthesis Pipeline
              </span>

              <div className="space-y-2.5">
                {[
                  { step: '01', title: 'User Parameters', desc: 'Destination, budget tier, dates & traveler preferences' },
                  { step: '02', title: 'Grok AI Day 1-2 Synthesis', desc: 'Generates high-context, curated cultural & dining recommendations' },
                  { step: '03', title: 'Algorithmic Schedule Expansion', desc: 'Optimizes travel time, geographic clusters & activity duration' },
                  { step: '04', title: 'Geospatial Route Mapping', desc: 'Plots interactive waypoint nodes across interactive map layers' },
                  { step: '05', title: 'MongoDB Persistence', desc: 'Stores shareable trip itineraries with collaborative link access' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-start gap-3">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-white">{item.title}</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: Expense Tracker (Analytical Card Layout) */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-all space-y-8">
          {/* Masthead */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Expense Tracker &amp; Analytics
                </h3>
                <span className="text-xs font-mono text-amber-400">
                  Full-Stack Personal Finance &amp; Stream Aggregation Dashboard
                </span>
              </div>
            </div>

            <a
              href="https://github.com/S-S-Hegde"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Inspect Codebase</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Problem, Solution & Contributions */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  The Problem &amp; Core Challenge
                </span>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Individuals struggle to track multi-category transactions and visualize financial spending habits over time. Traditional spreadsheets require tedious manual formula maintenance and lack automated categorization and trend forecasting.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  Key Technical Implementation
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">&bull;</span>
                    <span><strong>MongoDB Aggregation Pipelines:</strong> Engineered server-side aggregation pipelines to compute monthly category breakdowns, spending velocity, and income-to-expense ratios directly inside the database engine.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">&bull;</span>
                    <span><strong>JWT Multi-User Authentication:</strong> Implemented stateless JSON Web Token sessions with hashed credentials, middleware route protection, and isolated user data scoping.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">&bull;</span>
                    <span><strong>Interactive Visualization Dashboard:</strong> Built reactive visual dashboards using Chart.js to render monthly budget comparisons and category expense breakdowns.</span>
                  </li>
                </ul>
              </div>

              {/* Technologies Pill Row */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB Aggregation', 'Chart.js', 'JWT Auth', 'REST APIs', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Metrics & Capabilities */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#12151D] border border-white/[0.06] space-y-1">
                <PieChart className="w-4 h-4 text-amber-400 mb-2" />
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Analytics</span>
                <h5 className="text-sm font-bold text-white">MongoDB Aggregation</h5>
                <p className="text-[11px] text-slate-400 mt-1">Multi-stage category group &amp; sort pipelines</p>
              </div>

              <div className="p-4 rounded-xl bg-[#12151D] border border-white/[0.06] space-y-1">
                <ShieldCheck className="w-4 h-4 text-amber-400 mb-2" />
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Security</span>
                <h5 className="text-sm font-bold text-white">JWT Authentication</h5>
                <p className="text-[11px] text-slate-400 mt-1">Protected bearer token session headers</p>
              </div>

              <div className="p-4 rounded-xl bg-[#12151D] border border-white/[0.06] space-y-1">
                <TrendingUp className="w-4 h-4 text-amber-400 mb-2" />
                <span className="text-[10px] font-mono text-slate-400 uppercase block">UI Visuals</span>
                <h5 className="text-sm font-bold text-white">Chart.js Dashboards</h5>
                <p className="text-[11px] text-slate-400 mt-1">Real-time expenditure trends and graphs</p>
              </div>

              <div className="p-4 rounded-xl bg-[#12151D] border border-white/[0.06] space-y-1">
                <Code2 className="w-4 h-4 text-amber-400 mb-2" />
                <span className="text-[10px] font-mono text-slate-400 uppercase block">API Layer</span>
                <h5 className="text-sm font-bold text-white">Express REST Endpoints</h5>
                <p className="text-[11px] text-slate-400 mt-1">Validated CRUD operations with error middleware</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
