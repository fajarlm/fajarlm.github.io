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
  VolumeX
} from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import AOS from 'aos';
import type { Language, Project } from '../types';

interface ProjectsProps {
  lang: Language;
}

const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'desktop'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'gallery'>('video');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

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

          <div className="flex flex-wrap justify-center gap-2">
            {(['all', 'web', 'mobile', 'desktop'] as const).map(cat => (
              <button 
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-5 md:px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  filter === cat 
                    ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)] shadow-lg scale-105' 
                    : 'border-[var(--border)] hover:border-[var(--text)] text-[var(--text-muted)] hover:text-[var(--text)] opacity-80 hover:opacity-100'
                }`}
              >
                {filterMap[cat]}
              </button>
            ))}
          </div>
        </div>

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
      </div>

      {/* PROJECT DETAIL MODAL (Theme-Aware, High Contrast Deep Dive View) */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto no-scrollbar"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-[2rem] md:rounded-[2.5rem] bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Modal Top Bar: Generous badge padding */}
            <div className="flex items-center justify-between px-6 py-4 md:px-8 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md z-30">
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
                className="p-2.5 rounded-full bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all hover:rotate-90"
                title={t.closeModal || 'Tutup'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Two-Column Responsive Layout */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Media Player / Video Showcase */}
                <div className="lg:col-span-7 flex flex-col space-y-4">
                  {/* Media Tab Selector: Using 'Video Demo' and 'Foto/Images' */}
                  {selectedProject.video && selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div className="inline-flex p-1 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] backdrop-blur-md w-fit">
                      <button
                        onClick={() => setActiveMediaTab('video')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                          activeMediaTab === 'video'
                            ? 'bg-[var(--text)] text-[var(--bg)] shadow-md'
                            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                      >
                        <Play size={11} className="fill-current" /> {t.videoShowcase}
                      </button>
                      <button
                        onClick={() => setActiveMediaTab('gallery')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
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
                      <div className="flex items-center justify-between px-4 py-2.5 bg-black/85 border-b border-white/10 text-white/60 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        </div>
                        <span className="font-mono text-[9px] tracking-widest text-zinc-300 truncate max-w-[200px]">
                          {selectedProject.demo ? new URL(selectedProject.demo).hostname : `${selectedProject.title.toLowerCase()}.local`}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/15 px-3 py-1 rounded-full border border-purple-500/30">
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
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--icon-bg)] border-t border-[var(--border)] text-[11px] text-[var(--text)]">
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
                    <div className="flex flex-col space-y-3">
                      {(() => {
                        const galleryList = [selectedProject.img, ...(selectedProject.gallery || [])];
                        return (
                          <>
                            <div className="relative rounded-2xl overflow-hidden bg-black border border-[var(--border)] shadow-2xl">
                              {/* Browser Mockup Chrome Header */}
                              <div className="flex items-center justify-between px-4 py-2.5 bg-black/85 border-b border-white/10 text-white/60 text-[10px]">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                                </div>
                                <span className="font-mono text-[9px] tracking-widest text-zinc-300">
                                  {t.screenshots} {activeGalleryIndex + 1} / {galleryList.length}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">
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
                                    className={`relative w-20 h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
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

                {/* Right Column: Project Metadata, Highlights & CTAs */}
                <div className="lg:col-span-5 flex flex-col space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-[var(--text)]">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text)]/85 dark:text-zinc-200 leading-relaxed font-normal">
                      {selectedProject.description[lang]}
                    </p>
                  </div>

                  {/* Highlights / Keunggulan Utama */}
                  {selectedProject.highlights && selectedProject.highlights[lang] && (
                    <div className="p-5 md:p-6 rounded-2xl bg-[var(--icon-bg)]/80 border border-[var(--border)] space-y-3.5 shadow-xs">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text)] flex items-center gap-2">
                        <Sparkles size={14} className="text-[var(--accent)]" /> {t.keyHighlights}
                      </p>
                      <ul className="space-y-2.5">
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2.5">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((techName, idx) => (
                        <span 
                          key={idx}
                          className="px-3.5 py-1.5 rounded-xl bg-[var(--icon-bg)] text-[var(--text)] text-[11px] font-semibold tracking-wide border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                        >
                          {techName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="pt-2 flex flex-wrap gap-2.5">
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg hover:opacity-90"
                      >
                        <ExternalLink size={14} /> {t.visitLive}
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        <Globe size={14} /> {t.viewRepo}
                      </a>
                    )}
                    {selectedProject.apk && (
                      <a
                        href={selectedProject.apk}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-md shadow-emerald-900/30"
                      >
                        <Download size={14} /> {t.downloadApk}
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Bottom Navigation Bar (Prev / Next Project) */}
            <div className="flex items-center justify-between px-6 py-4 md:px-8 border-t border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md">
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
