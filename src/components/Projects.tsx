import React, { useState, useEffect } from 'react';
import { projectsData, translations } from '../data/portfolioData';
import { 
  Globe, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Image as ImageIcon, 
  Download,
  Play,
  Maximize2,
  CheckCircle2,
  Film,
  Sparkles,
  Volume2,
  VolumeX,
  LayoutGrid,
  List,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './ui/SpotlightCard';
import MagneticButton from './ui/MagneticButton';
import AOS from 'aos';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import type { Language, Project } from '../types';

interface ProjectsProps {
  lang: Language;
}

const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'desktop'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'gallery'>('video');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Lock body scroll and pause Lenis while project detail modal is open
  useBodyScrollLock(selectedProject !== null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const itemsPerPage = 6;
  const t = translations[lang].projects;

  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter(p => p.type === filter);
  
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = (cat: 'all' | 'web' | 'mobile' | 'desktop') => {
    setFilter(cat);
    setCurrentPage(1);
  };

  useEffect(() => {
    AOS.refresh();
  }, [currentPage]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // When a project is selected, default tab to video if video exists, otherwise gallery
  useEffect(() => {
    if (selectedProject) {
      setActiveMediaTab(selectedProject.video ? 'video' : 'gallery');
      setActiveGalleryIndex(0);
    }
  }, [selectedProject]);

  const filterMap: Record<string, string> = {
    all: t.filterAll,
    web: 'Web',
    mobile: 'Mobile',
    desktop: 'Desktop'
  };

  const currentProjectIndex = selectedProject 
    ? filteredProjects.findIndex(p => p.id === selectedProject.id) 
    : -1;

  const handlePrevProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProjectIndex > 0) {
      setSelectedProject(filteredProjects[currentProjectIndex - 1]);
    } else {
      setSelectedProject(filteredProjects[filteredProjects.length - 1]);
    }
  };

  const handleNextProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProjectIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentProjectIndex + 1]);
    } else {
      setSelectedProject(filteredProjects[0]);
    }
  };

  return (
    <section id="proyek" className="py-24 md:py-32 border-t border-[var(--border)] relative bg-shape-grid">
      <div className="container mx-auto text-[var(--text)]">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-20 gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40 text-nowrap">
              {lang === 'en' ? 'Portfolio' : 'Portofolio'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic text-nowrap">
              {t.title} <span className="accent-text opacity-85">{t.subtitle}</span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Category Filter Pills (Always visible, distinct active color) */}
            <div className="flex flex-wrap justify-center gap-2">
              {(['all', 'web', 'mobile', 'desktop'] as const).map(cat => {
                const isActive = filter === cat;
                return (
                  <button 
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-5 md:px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200 border ${
                      isActive 
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md shadow-[var(--accent)]/30 scale-105' 
                        : 'bg-[var(--card)]/80 text-[var(--text)]/85 border-[var(--border)] hover:border-[var(--text)] hover:text-[var(--text)] hover:bg-[var(--card)] shadow-xs'
                    }`}
                  >
                    {filterMap[cat]}
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle with Smooth Sliding Motion */}
            <div className="flex items-center p-1 rounded-full bg-[var(--icon-bg)] border border-[var(--border)] shadow-xs relative">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  viewMode === 'grid' ? 'text-[var(--bg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                title="Grid Cards View"
              >
                {viewMode === 'grid' && (
                  <motion.span
                    layoutId="activeViewModePill"
                    transition={{ type: 'spring', damping: 22, stiffness: 240 }}
                    className="absolute inset-0 bg-[var(--text)] rounded-full -z-10 shadow-sm"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5"><LayoutGrid size={12} /> Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  viewMode === 'list' ? 'text-[var(--bg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                title="Typography List View"
              >
                {viewMode === 'list' && (
                  <motion.span
                    layoutId="activeViewModePill"
                    transition={{ type: 'spring', damping: 22, stiffness: 240 }}
                    className="absolute inset-0 bg-[var(--text)] rounded-full -z-10 shadow-sm"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5"><List size={12} /> List</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {currentItems.map((p) => {
                const hasVideo = Boolean(p.video);

                return (
                  <SpotlightCard 
                    key={p.id} 
                    className="group card-minimal rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-[var(--border)] bg-[var(--card)] text-[var(--text)]" 
                    spotlightColor="rgba(120, 120, 120, 0.12)"
                  >
                    {/* Media Container: Photo image only (crisp, fast, with comfortable badge spacing) */}
                    <div 
                      className="relative overflow-hidden rounded-2xl aspect-video mb-6 cursor-pointer group/media z-10 bg-[var(--icon-bg)] border border-[var(--border)]"
                      onClick={() => setSelectedProject(p)}
                    >
                      <img 
                        src={p.img} 
                        alt={p.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                      />

                      {/* Hover Overlay with View Details prompt */}
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-5 py-2.5 rounded-full bg-[var(--card)]/95 text-[var(--text)] text-[10px] font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover/media:translate-y-0 transition-all border border-[var(--border)]">
                          <Maximize2 size={13} className="text-[var(--accent)]" /> {t.viewDetails}
                        </div>
                      </div>

                      {/* Top-Right Type Badge: Generous padding, not cramped */}
                      <div className="absolute top-4 right-4 bg-[var(--card)]/95 backdrop-blur-md text-[var(--text)] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[var(--border)] shadow-md pointer-events-none z-20">
                        {p.type}
                      </div>

                      {/* Top-Left Video / Photo Count Badges: Generous padding */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-20">
                        {hasVideo && (
                          <span className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 border border-purple-400/40 shadow-md">
                            <Play size={10} className="fill-white" /> {t.videoBadge}
                          </span>
                        )}
                        {p.gallery && p.gallery.length > 0 && (
                          <span className="bg-black/85 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 border border-white/20 shadow-md">
                            <ImageIcon size={11} /> {p.gallery.length + 1} {t.screenshots}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content: High contrast text matching theme */}
                    <div className="px-1 flex flex-col flex-grow z-10">
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <h4 
                          onClick={() => setSelectedProject(p)}
                          className="text-xl md:text-2xl font-black tracking-tight leading-snug cursor-pointer text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
                        >
                          {p.title}
                        </h4>
                      </div>
                      
                      {/* High Contrast Description */}
                      <p className="text-xs md:text-[13px] text-[var(--text)]/80 dark:text-zinc-300 mb-5 line-clamp-2 leading-relaxed font-normal">
                        {p.description[lang]}
                      </p>
                      
                      {/* Tech Stack Badges: Generous breathing room, rounded-xl, no cramped text */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.tech.map((techName, idx) => (
                          <span 
                            key={idx} 
                            className="px-3.5 py-1.5 rounded-xl bg-[var(--icon-bg)] text-[var(--text)] border border-[var(--border)] text-[10px] font-semibold tracking-wide shadow-xs transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          >
                            {techName}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(p)}
                          className="flex-1 min-w-[85px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[var(--accent)]/15 hover:bg-[var(--accent)] text-[var(--accent)] hover:text-white border border-[var(--accent)]/30 text-[10px] font-bold uppercase tracking-wider transition-all shadow-xs"
                        >
                          <Film size={13} /> {t.viewDetails}
                        </button>
                        {p.github && (
                          <a 
                            href={p.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[var(--icon-bg)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[10px] font-bold uppercase tracking-wider transition-all shadow-xs"
                          >
                            <Globe size={13} /> Repo
                          </a>
                        )}
                        {p.demo && (
                          <a 
                            href={p.demo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 text-[10px] font-bold uppercase tracking-wider transition-all shadow-md"
                          >
                            <ExternalLink size={13} /> Demo
                          </a>
                        )}
                        {p.apk && (
                          <a 
                            href={p.apk} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            download 
                            className="flex-1 min-w-[85px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-900/20"
                          >
                            <Download size={13} /> APK
                          </a>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-8">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)} 
                  className="p-4 rounded-full border border-[var(--border)] hover:border-[var(--text)] disabled:opacity-20 transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentPage(i + 1)} 
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentPage === i + 1 
                          ? 'bg-[var(--text)] scale-150 shadow-md' 
                          : 'bg-[var(--border)] hover:bg-[var(--text-muted)]'
                      }`} 
                    />
                  ))}
                </div>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  className="p-4 rounded-full border border-[var(--border)] hover:border-[var(--text)] disabled:opacity-20 transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* LIST VIEW (Pacôme Pertant Editorial Typography Showcase) */
          <div 
            onMouseMove={handleMouseMove}
            className="relative flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)] my-6"
          >
            {filteredProjects.map((p, idx) => {
              const isHovered = hoveredProject?.id === p.id;
              const isOtherHovered = hoveredProject !== null && !isHovered;

              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredProject(p)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(p)}
                  className={`py-7 md:py-9 px-4 md:px-8 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 group rounded-2xl ${
                    isOtherHovered 
                      ? 'opacity-25 blur-[0.3px]' 
                      : 'opacity-100 hover:bg-[var(--icon-bg)]/40'
                  }`}
                >
                  {/* Left: Index & Giant Title */}
                  <div className="flex items-start md:items-center gap-5 md:gap-8 flex-1">
                    <span className="font-mono text-xs md:text-sm text-[var(--accent)] font-bold tracking-widest opacity-80 pt-1 md:pt-0">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-3">
                        {p.title}
                        <ArrowUpRight 
                          size={24} 
                          className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[var(--accent)] flex-shrink-0" 
                        />
                      </h4>
                      <p className="text-xs md:text-sm text-[var(--text)]/75 dark:text-zinc-300 line-clamp-1 mt-1 max-w-2xl font-normal">
                        {p.description[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Right: Badges & Tech Stack */}
                  <div className="flex items-center gap-2.5 flex-wrap md:flex-nowrap justify-start md:justify-end">
                    {p.video && (
                      <span className="bg-purple-600/15 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 shadow-xs">
                        <Play size={10} className="fill-current" /> Video
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--icon-bg)] text-[var(--text)] border border-[var(--border)]">
                      {p.type}
                    </span>
                    <div className="hidden lg:flex items-center gap-1.5 ml-2">
                      {p.tech.slice(0, 3).map((tName, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 rounded-lg bg-[var(--icon-bg)] text-[var(--text-muted)] text-[10px] font-medium border border-[var(--border)]"
                        >
                          {tName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* FLOATING PROJECT PREVIEW CARD (Cursor follower with spring physics) */}
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 1.5,
                    x: mousePos.x + 24,
                    y: mousePos.y - 120,
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -4 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.4 }}
                  style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 120 }}
                  className="hidden md:block w-80 rounded-2xl overflow-hidden bg-black/90 border border-[var(--border)] shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={hoveredProject.img} 
                      alt={hoveredProject.title} 
                      className="w-full h-full object-cover scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {hoveredProject.video && (
                      <div className="absolute top-2.5 left-2.5 bg-purple-600 text-white px-2.5 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-md">
                        <Play size={9} className="fill-white" /> 🎬 Video Demo
                      </div>
                    )}
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/10">
                      {hoveredProject.type}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <p className="text-xs font-bold truncate drop-shadow-sm">{hoveredProject.title}</p>
                      <p className="text-[10px] text-white/80 truncate drop-shadow-sm">{hoveredProject.tech.slice(0, 3).join(' • ')}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* PROJECT DETAIL MODAL (Theme-Aware, High Contrast Deep Dive View) */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          data-lenis-prevent
          className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto lg:overflow-hidden no-scrollbar"
        >
          <div 
            onClick={e => e.stopPropagation()}
            data-lenis-prevent
            className="relative w-full max-w-5xl max-h-[92vh] lg:h-[88vh] flex flex-col rounded-[2rem] md:rounded-[2.5rem] bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Modal Top Bar: Fixed at top */}
            <div className="flex items-center justify-between px-6 py-3.5 md:px-8 border-b border-[var(--border)] bg-[var(--card)] z-30 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[var(--text-muted)] uppercase">
                  {currentProjectIndex + 1 < 10 ? `0${currentProjectIndex + 1}` : currentProjectIndex + 1} / {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--icon-bg)] text-[var(--text)] border border-[var(--border)]">
                  {selectedProject.type}
                </span>
              </div>

              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all hover:rotate-90"
                title={t.closeModal || 'Tutup'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Left column is FIXED/STATIC, Right column is ONLY scrollable */}
            <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden p-5 md:px-8 md:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:h-full lg:min-h-0">
                
                {/* Left Column: Media Player / Video Showcase (FIXED, NON-SCROLLABLE) */}
                <div className="lg:col-span-7 flex flex-col space-y-3.5 self-start select-none flex-shrink-0">
                  {/* Media Tab Selector: Using 'Video Demo' and 'Foto/Images' */}
                  {selectedProject.video && selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div className="inline-flex p-1 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] backdrop-blur-md w-fit">
                      <button
                        onClick={() => setActiveMediaTab('video')}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                          activeMediaTab === 'video'
                            ? 'bg-[var(--text)] text-[var(--bg)] shadow-md'
                            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                      >
                        <Play size={11} className="fill-current" /> {t.videoShowcase}
                      </button>
                      <button
                        onClick={() => setActiveMediaTab('gallery')}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                          activeMediaTab === 'gallery'
                            ? 'bg-[var(--text)] text-[var(--bg)] shadow-md'
                            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                      >
                        <ImageIcon size={12} /> {t.screenshots} ({selectedProject.gallery.length + 1})
                      </button>
                    </div>
                  )}

                  {/* Video Viewer */}
                  {selectedProject.video && activeMediaTab === 'video' ? (
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-[var(--border)] shadow-2xl group flex flex-col">
                      {/* Browser Mockup Chrome Header */}
                      <div className="flex items-center justify-between px-4 py-2 bg-black/85 border-b border-white/10 text-white/60 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        </div>
                        <span className="font-mono text-[9px] tracking-widest text-zinc-300 truncate max-w-[200px]">
                          {selectedProject.demo ? new URL(selectedProject.demo).hostname : `${selectedProject.title.toLowerCase()}.local`}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                          App Testing Demo
                        </span>
                      </div>
                      
                      <div className="relative aspect-video bg-black">
                        <video
                          key={`${selectedProject.id}-${selectedProject.video}`}
                          src={selectedProject.video}
                          poster={selectedProject.poster || selectedProject.img}
                          controls
                          autoPlay
                          loop
                          muted={isVideoMuted}
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Audio & Sound Status Bar */}
                      <div className="flex items-center justify-between px-4 py-2 bg-[var(--icon-bg)] border-t border-[var(--border)] text-[11px] text-[var(--text)]">
                        <div className="flex items-center gap-2">
                          <Volume2 size={14} className="text-purple-500 animate-pulse flex-shrink-0" />
                          <span className="font-medium text-[11px] text-[var(--text)]">
                            {lang === 'en' ? 'Tutorial BGM & Audio Included' : 'Walkthrough Dilengkapi Musik Latar & Audio'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsVideoMuted(!isVideoMuted)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide transition-all border ${
                            isVideoMuted
                              ? 'bg-amber-500/15 text-amber-500 border-amber-500/30 hover:bg-amber-500/25'
                              : 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/25'
                          }`}
                        >
                          {isVideoMuted ? (
                            <><VolumeX size={12} /> {t.soundOn || 'Bunyikan'}</>
                          ) : (
                            <><Volume2 size={12} /> {t.soundOff || 'Senyapkan'}</>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Image / Foto Gallery Viewer */
                    <div className="flex flex-col space-y-2.5">
                      {(() => {
                        const galleryList = [selectedProject.img, ...(selectedProject.gallery || [])];
                        return (
                          <>
                            <div className="relative rounded-2xl overflow-hidden bg-black border border-[var(--border)] shadow-2xl">
                              {/* Browser Mockup Chrome Header */}
                              <div className="flex items-center justify-between px-4 py-2 bg-black/85 border-b border-white/10 text-white/60 text-[10px]">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                                </div>
                                <span className="font-mono text-[9px] tracking-widest text-zinc-300">
                                  {t.screenshots} {activeGalleryIndex + 1} / {galleryList.length}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-300 truncate max-w-[180px]">
                                  {selectedProject.title}
                                </span>
                              </div>

                              <div className="relative aspect-video bg-black/70 flex items-center justify-center">
                                <img 
                                  src={galleryList[activeGalleryIndex] || selectedProject.img} 
                                  alt={`${selectedProject.title} ${activeGalleryIndex}`}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>

                            {galleryList.length > 1 && (
                              <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                                {galleryList.map((thumb, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setActiveGalleryIndex(idx)}
                                    className={`relative w-16 h-10 md:w-20 md:h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                                      activeGalleryIndex === idx
                                        ? 'border-[var(--accent)] scale-105 shadow-lg'
                                        : 'border-[var(--border)] opacity-60 hover:opacity-100'
                                    }`}
                                  >
                                    <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                  </button>
                                ))}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Right Column: Project Metadata, Highlights & CTAs (INDEPENDENTLY SCROLLABLE ONLY) */}
                <div 
                  data-lenis-prevent 
                  className="lg:col-span-5 flex flex-col space-y-5 lg:h-full lg:min-h-0 lg:overflow-y-auto pr-3 sm:pr-4 pb-8 [scrollbar-width:thin] [scrollbar-color:var(--accent)_rgba(128,128,128,0.2)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/10 dark:[&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--accent)] [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2.5 text-[var(--text)]">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text)]/85 dark:text-zinc-200 leading-relaxed font-normal">
                      {selectedProject.description[lang]}
                    </p>
                  </div>

                  {/* Highlights / Keunggulan Utama */}
                  {selectedProject.highlights && selectedProject.highlights[lang] && (
                    <div className="p-4 md:p-5 rounded-2xl bg-[var(--icon-bg)]/80 border border-[var(--border)] space-y-3 shadow-xs">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text)] flex items-center gap-2">
                        <Sparkles size={14} className="text-[var(--accent)]" /> {t.keyHighlights}
                      </p>
                      <ul className="space-y-2">
                        {selectedProject.highlights[lang].map((point, idx) => (
                          <li key={idx} className="text-xs md:text-[13px] leading-relaxed text-[var(--text)] font-normal flex items-start gap-2.5">
                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((techName, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-[var(--icon-bg)] text-[var(--text)] text-[11px] font-semibold tracking-wide border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                        >
                          {techName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Buttons with Magnetic Motion */}
                  <div className="pt-2 pb-4 flex flex-wrap gap-2.5">
                    {selectedProject.demo && (
                      <MagneticButton className="flex-1 min-w-[120px]">
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg hover:opacity-90"
                        >
                          <ExternalLink size={14} /> {t.visitLive}
                        </a>
                      </MagneticButton>
                    )}
                    {selectedProject.github && (
                      <MagneticButton className="flex-1 min-w-[120px]">
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest transition-all"
                        >
                          <Globe size={14} /> {t.viewRepo}
                        </a>
                      </MagneticButton>
                    )}
                    {selectedProject.apk && (
                      <MagneticButton className="flex-1 min-w-[120px]">
                        <a
                          href={selectedProject.apk}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-md shadow-emerald-900/30"
                        >
                          <Download size={14} /> {t.downloadApk}
                        </a>
                      </MagneticButton>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Bottom Navigation Bar (Prev / Next Project) */}
            <div className="flex items-center justify-between px-6 py-3.5 md:px-8 border-t border-[var(--border)] bg-[var(--card)] z-30 flex-shrink-0">
              <button
                type="button"
                onClick={handlePrevProject}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all"
              >
                <ChevronLeft size={14} /> {t.prevProject}
              </button>

              <div className="hidden sm:flex items-center gap-2">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className={`h-2 rounded-full transition-all ${
                      p.id === selectedProject.id
                        ? 'w-7 bg-[var(--accent)]'
                        : 'w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]'
                    }`}
                    title={p.title}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextProject}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all"
              >
                {t.nextProject} <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
