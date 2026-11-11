import React, { useState, useEffect } from 'react';
import { projectsData, translations } from '../data/portfolioData';
import { Globe, ExternalLink, ChevronLeft, ChevronRight, X, Image as ImageIcon, Download } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import AOS from 'aos';
import type { Language } from '../types';

interface ProjectsProps {
  lang: Language;
}

const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'desktop'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
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

  const filterMap: Record<string, string> = {
    all: t.filterAll,
    web: 'Web',
    mobile: 'Mobile',
    desktop: 'Desktop'
  };

  return (
    <section id="proyek" className="py-24 md:py-32 border-t border-[var(--border)] relative bg-shape-grid">
      <div className="container mx-auto text-[var(--text)]">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-20 gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-30 text-nowrap">{lang === 'en' ? 'Portfolio' : 'Portofolio'}</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic text-nowrap">{t.title} <span className="accent-text opacity-70">{t.subtitle}</span></h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {(['all', 'web', 'mobile', 'desktop'] as const).map(cat => (
              <button 
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-5 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-[var(--border)] transition-all ${filter === cat ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)] shadow-lg' : 'hover:border-[var(--text)] opacity-60 hover:opacity-100'}`}
              >
                {filterMap[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {currentItems.map((p) => (
            <SpotlightCard key={p.id} className="group card-minimal rounded-[2.5rem] p-4 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col" spotlightColor="rgba(120, 120, 120, 0.1)">
              <div 
                className="relative overflow-hidden rounded-2xl aspect-video mb-6 cursor-zoom-in group/img z-10"
                onClick={() => setSelectedGallery([p.img, ...(p.gallery || [])])}
              >
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-3 rounded-full text-black shadow-2xl translate-y-2 group-hover/img:translate-y-0 transition-all">
                    <ImageIcon size={20} />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 text-[var(--text)] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/20 pointer-events-none">
                  {p.type}
                </div>
                {p.gallery && p.gallery.length > 0 && (
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider flex items-center gap-1 border border-white/20 shadow-sm pointer-events-none">
                    <ImageIcon size={11} /> {p.gallery.length + 1} {lang === 'en' ? 'Photos' : 'Foto'}
                  </div>
                )}
              </div>

              <div className="px-2 flex flex-col flex-grow z-10">
                <h4 className="text-lg md:text-xl font-bold mb-2 tracking-tight leading-tight">{p.title}</h4>
                <p className="text-[11px] text-[var(--text-muted)] mb-6 line-clamp-2 leading-relaxed italic opacity-80">{p.description[lang]}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-md bg-[var(--icon-bg)] text-[var(--text)] text-[9px] font-bold uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--icon-bg)] text-[var(--text)] text-[9px] font-bold uppercase tracking-widest hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all">
                      <Globe size={13} /> Repo
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-[9px] font-bold uppercase tracking-widest hover:opacity-80 transition-all">
                      <ExternalLink size={13} /> Demo
                    </a>
                  )}
                  {p.apk && (
                    <a href={p.apk} target="_blank" rel="noopener noreferrer" download className="flex-1 min-w-[95px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest transition-all shadow-sm shadow-emerald-900/20">
                      <Download size={13} /> Unduh APK
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-8">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-4 rounded-full border border-[var(--border)] hover:border-[var(--text)] disabled:opacity-20 transition-all shadow-sm"><ChevronLeft size={20} /></button>
            <div className="flex gap-4">
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-2 h-2 rounded-full transition-all ${currentPage === i + 1 ? 'bg-[var(--text)] scale-150 shadow-md' : 'bg-[var(--border)] hover:bg-[var(--text-muted)]'}`} />
              ))}
            </div>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-4 rounded-full border border-[var(--border)] hover:border-[var(--text)] disabled:opacity-20 transition-all shadow-sm"><ChevronRight size={20} /></button>
          </div>
        )}
      </div>

      {selectedGallery && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
          <div className="sticky top-0 w-full flex justify-end p-8 z-30">
            <button 
              onClick={() => setSelectedGallery(null)}
              className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="container mx-auto max-w-5xl px-6 pb-20 space-y-12">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-4">{lang === 'en' ? 'Project Documentation' : 'Dokumentasi Proyek'}</p>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{lang === 'en' ? 'Gallery View.' : 'Tampilan Galeri.'}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedGallery.map((img, idx) => (
                <div key={idx} className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 group">
                  <img src={img} alt={`Documentation ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;