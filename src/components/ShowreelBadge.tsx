import React, { useState } from 'react';
import { Play, X, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { projectsData, translations } from '../data/portfolioData';
import type { Language, Project } from '../types';

interface ShowreelBadgeProps {
  lang: Language;
  onSelectProject?: (project: Project) => void;
}

export const ShowreelBadge: React.FC<ShowreelBadgeProps> = ({ lang, onSelectProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Filter projects with video demos for the showreel
  const videoProjects = projectsData.filter(p => Boolean(p.video));
  const currentProject = videoProjects[activeVideoIndex] || videoProjects[0];

  const t = translations[lang].projects;

  const handleOpenShowreel = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* FLOATING CORNER WIDGET (Pacôme Pertant style rotating showreel badge) */}
      <div 
        onClick={handleOpenShowreel}
        className="fixed bottom-6 left-6 z-40 hidden md:flex items-center justify-center cursor-pointer group select-none transition-transform hover:scale-105 active:scale-95"
        title={lang === 'en' ? 'Click to watch project showreel' : 'Klik untuk menonton showreel proyek'}
      >
        {/* Rotating Circular SVG Text */}
        <div className="absolute w-28 h-28 pointer-events-none group-hover:[animation-play-state:paused] animate-[spin_14s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path
              id="showreelCirclePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[8.5px] uppercase font-mono font-bold tracking-[0.24em] fill-[var(--text)] opacity-75">
              <textPath href="#showreelCirclePath">
                • SHOWREEL • 2025 • PROYEK • FAJAR KUSUMA
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Thumbnail with Tilt Effect */}
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--border)] bg-[var(--card)] transform -rotate-6 group-hover:rotate-0 group-hover:border-[var(--accent)] transition-all duration-300 flex items-center justify-center">
          <img 
            src={videoProjects[0]?.img} 
            alt="Showreel Preview" 
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
            <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Play size={12} className="fill-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* SHOWREEL MODAL OVERLAY */}
      {isOpen && currentProject && (
        <div 
          onClick={handleClose}
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-[2rem] bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-[0_30px_90px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text)]">
                  Interactive Showreel • {currentProject.title}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">
                  ({activeVideoIndex + 1}/{videoProjects.length})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-full border transition-all text-[11px] font-bold ${
                    isMuted 
                      ? 'bg-amber-500/15 text-amber-500 border-amber-500/30' 
                      : 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                  }`}
                  title={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-full bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all hover:rotate-90"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <video
                key={currentProject.video}
                src={currentProject.video}
                poster={currentProject.img}
                autoPlay
                controls
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Chapter Scrubber Bar (Pacôme Pertant style visual chapter navigation) */}
            <div className="p-4 md:p-5 border-t border-[var(--border)] bg-[var(--card)]/95 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
                {videoProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveVideoIndex(idx)}
                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs transition-all flex-shrink-0 ${
                      activeVideoIndex === idx
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                        : 'bg-[var(--icon-bg)] text-[var(--text)] border-[var(--border)] hover:border-[var(--text)] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold opacity-80">0{idx + 1}</span>
                    <span className="font-semibold">{proj.title}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {onSelectProject && (
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onSelectProject(currentProject);
                    }}
                    className="px-4 py-2 rounded-xl bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] border border-[var(--border)] text-[10px] font-bold uppercase tracking-wider transition-all"
                  >
                    {t.viewDetails}
                  </button>
                )}
                {currentProject.demo && (
                  <a
                    href={currentProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all"
                  >
                    <ExternalLink size={12} /> Live Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ShowreelBadge;
