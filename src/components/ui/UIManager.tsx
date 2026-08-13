import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bioData } from '../../data/bioData';
import { projectsData } from '../../data/projectsData';
import type { SystemState } from '../3d/RocketScene';

interface UIManagerProps {
  systemState: SystemState;
  activeHub: string | null;
  onReturnToUniverse: () => void;
}

export const UIManager: React.FC<UIManagerProps> = ({
  systemState,
  activeHub,
  onReturnToUniverse,
}) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [dismissedModal, setDismissedModal] = useState(false);

  React.useEffect(() => {
    setDismissedModal(false);
  }, [activeHub]);

  return (
    <div className="w-full h-full relative pointer-events-none p-6 md:p-8 flex flex-col justify-between select-none">
      
      {/* Top Header Controls */}
      <header className="flex justify-between items-center w-full pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-2xl shadow-xl">
          <h1 className="font-sans text-base font-bold tracking-wider text-amber-400">
            AKSHAT LAKHERA
          </h1>
          <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase mt-0.5">
            LOCATION: {systemState.replace('_', ' ')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {systemState !== 'UNIVERSE_MAP' && (
            <button
              onClick={onReturnToUniverse}
              className="bg-amber-400 hover:bg-amber-300 text-black font-sans text-xs font-semibold px-4 py-2 rounded-xl tracking-wider uppercase transition-all shadow-lg cursor-pointer"
            >
              ← RETURN TO MAP
            </button>
          )}

          <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2.5 text-xs text-gray-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>WASD (STEER) • SPACE (UP) • C/Q (DOWN)</span>
          </div>
        </div>
      </header>

      {/* ELEGANT CENTERED MODAL */}
      <div className="w-full flex justify-center items-center my-auto pointer-events-auto z-50 px-4">
        <AnimatePresence mode="wait">
          
          {/* BIO HORIZON MODAL */}
          {activeHub === 'bio_horizon' && !dismissedModal && (
            <motion.div 
              key="bio"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-xl bg-gray-950/90 backdrop-blur-2xl border border-amber-500/30 p-7 rounded-3xl shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setDismissedModal(true)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer border border-white/10"
                title="Close"
              >
                ✕
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  CORE ARCHIVE
                </span>
                <h2 className="font-sans text-2xl font-bold text-white mt-3">
                  Supermassive Black Hole
                </h2>
              </div>

              <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6">
                {bioData.bio}
              </p>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-3">
                  FEATURED OPEN SOURCE ACHIEVEMENTS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['DevDash', 'OpenOnyx', 'Keystroke Lab', 'Hopper v2', 'DEEPFAKE Detector'].map(item => (
                    <span key={item} className="bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono px-3 py-1.5 rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* PROJECT DETAILS MODAL */}
          {activeHub?.startsWith('proj_') && !dismissedModal && (
            <motion.div 
              key="project_modal"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-2xl bg-gray-950/90 backdrop-blur-2xl border border-amber-500/30 p-7 rounded-3xl shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setDismissedModal(true)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer border border-white/10"
                title="Close"
              >
                ✕
              </button>

              <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto pr-10 custom-scrollbar">
                {projectsData.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProjectIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-xl font-sans text-xs tracking-wide transition-all whitespace-nowrap cursor-pointer ${selectedProjectIndex === idx ? 'bg-amber-400 text-black font-semibold shadow-md' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              {(() => {
                const proj = projectsData[selectedProjectIndex] || projectsData[0];
                return (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-mono text-amber-400 tracking-wider uppercase">
                        {proj.tags.join(' • ')}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {selectedProjectIndex + 1} / {projectsData.length}
                      </span>
                    </div>

                    <h2 className="font-sans text-2xl font-bold text-white mb-3">
                      {proj.title}
                    </h2>
                    
                    <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                      {proj.longDescription || proj.description}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex justify-between items-center flex-wrap gap-4">
                      <div className="flex flex-wrap gap-2">
                        {proj.metrics && Object.entries(proj.metrics).map(([key, val]) => (
                          <span key={key} className="bg-white/5 border border-white/10 text-gray-300 text-xs font-mono px-3 py-1 rounded-lg">
                            {key}: <strong className="text-amber-400 font-normal">{val}</strong>
                          </span>
                        ))}
                      </div>

                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-amber-400 hover:bg-amber-300 text-black font-sans text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                      >
                        GITHUB REPO →
                      </a>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* SKILLS MODAL */}
          {activeHub?.startsWith('skill_') && !dismissedModal && (
            <motion.div 
              key={activeHub}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-lg bg-gray-950/90 backdrop-blur-2xl border border-blue-500/30 p-7 rounded-3xl shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setDismissedModal(true)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer border border-white/10"
              >
                ✕
              </button>

              <div className="mb-5">
                <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
                  SKILLS SYSTEM
                </span>
                <h2 className="font-sans text-2xl font-bold text-white mt-3">
                  {activeHub === 'skill_languages' ? 'Languages' : activeHub === 'skill_tech' ? 'Technologies' : 'CS Foundations'}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {activeHub === 'skill_languages' && ['Python', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript', 'SQL'].map(s => (
                  <span key={s} className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono px-3.5 py-2 rounded-xl">
                    {s}
                  </span>
                ))}
                {activeHub === 'skill_tech' && ['React', 'Next.js', 'Node.js', 'FastAPI', 'Kafka', 'PostgreSQL', 'MongoDB', 'Redis', 'LangGraph', 'RAG', 'Agentic AI'].map(s => (
                  <span key={s} className="bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono px-3.5 py-2 rounded-xl">
                    {s}
                  </span>
                ))}
                {activeHub === 'skill_cs' && ['Data Structures', 'Algorithms', 'Operating Systems', 'Computer Networks', 'Parallel Programming', 'Distributed Systems', 'Machine Learning'].map(s => (
                  <span key={s} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono px-3.5 py-2 rounded-xl">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE MODAL */}
          {activeHub?.startsWith('exp_') && !dismissedModal && (
            <motion.div 
              key={activeHub}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-lg bg-gray-950/90 backdrop-blur-2xl border border-emerald-500/30 p-7 rounded-3xl shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setDismissedModal(true)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer border border-white/10"
              >
                ✕
              </button>

              {activeHub === 'exp_drdo' && (
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    JUN – JUL 2025
                  </span>
                  <h2 className="font-sans text-2xl font-bold text-white mt-3 mb-1">DRDO — ISSA Lab</h2>
                  <div className="text-xs font-mono text-gray-400 mb-4">Software Developer Intern</div>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    Engineered Kafka-based asynchronous communication between Spring Boot and C++ microservices over TCP/IP in a defense system — improving processing efficiency by 60%. Trained YOLOv8 maritime vessel-detection model to 0.83 mAP.
                  </p>
                </div>
              )}

              {activeHub === 'exp_grove' && (
                <div>
                  <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                    JAN – APR 2026
                  </span>
                  <h2 className="font-sans text-2xl font-bold text-white mt-3 mb-1">Grove Growth</h2>
                  <div className="text-xs font-mono text-gray-400 mb-4">Software Developer Intern</div>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    Shipped a production gamified campus-ambassador platform for 100+ users — 20+ REST APIs in TypeScript & Next.js on a 17-table Supabase schema. Gated every release behind 433 automated tests.
                  </p>
                </div>
              )}

              {activeHub === 'exp_codeforces' && (
                <div>
                  <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md">
                    COMPETITIVE PROGRAMMING
                  </span>
                  <h2 className="font-sans text-2xl font-bold text-white mt-3 mb-1">Codeforces Specialist & IMC Finalist</h2>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    Max rating 1458 on Codeforces. Finalist in IMC Prosperity 4 — World Rank 823, All India Rank 175. Solved 750+ algorithmic problems across LeetCode & Codeforces.
                  </p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full flex justify-between items-center text-[10px] font-mono text-gray-500 tracking-widest uppercase pointer-events-none">
        <div>SUPERMASSIVE COSMOS</div>
        <div>SPACE WARP NAV ONLINE</div>
      </footer>
    </div>
  );
};
