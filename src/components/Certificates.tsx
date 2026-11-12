import React, { useState, useEffect } from 'react';
import { certificatesData, translations } from '../data/portfolioData';
import { Award, X, FileText, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import type { Language } from '../types';

interface CertificatesProps {
  lang: Language;
}

const Certificates: React.FC<CertificatesProps> = ({ lang }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [animDir, setAnimDir] = useState('fade-up');
  const itemsPerPage = 6;
  const t = translations[lang].certificates;

  const isPDF = (url: string) => url.toLowerCase().endsWith('.pdf');

  // Logic Pagination
  const totalPages = Math.ceil(certificatesData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = certificatesData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    AOS.refresh();
  }, [currentPage]);

  return (
    <section id="sertifikat" className="py-24 md:py-32 border-t border-[var(--border)] relative overflow-hidden bg-shape-grid">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center lg:text-left mb-16 md:mb-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-30 text-[var(--text)]">{lang === 'en' ? 'Achievements' : 'Pencapaian'}</h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic text-[var(--text)]">{t.title} <span className="accent-text opacity-70">{t.subtitle}</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentItems.map((cert, i) => (
            <div 
              key={`${cert.id}-${currentPage}`} 
              data-aos={animDir} 
              data-aos-delay={i * 50}
              onClick={() => setSelectedFile(cert.file)}
              className="group card-minimal rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-[var(--text)] transition-all duration-500 shadow-sm hover:shadow-xl relative overflow-hidden cursor-pointer bg-white dark:bg-zinc-900/20"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)] opacity-[0.03] -mr-8 -mt-8 rounded-full"></div>
              
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[var(--icon-bg)] flex items-center justify-center text-[var(--accent)] mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {isPDF(cert.file) ? <FileText size={28} /> : <Award size={28} />}
                </div>
                <h4 className="text-xl font-bold mb-2 tracking-tight text-[var(--text)] leading-tight">{cert.title}</h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-[var(--text)] mb-8">
                  {cert.issuer} • {cert.date}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text)] opacity-40 group-hover:opacity-100 hover:text-[var(--accent)] transition-all">
                {lang === 'en' ? 'Preview Document' : 'Lihat Dokumen'} <Eye size={12} className="ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-8">
            <button 
              disabled={currentPage === 1} 
              onClick={() => {
                setAnimDir('fade-right');
                setCurrentPage(p => p - 1);
              }} 
              className="p-4 rounded-full border border-[var(--border)] hover:border-[var(--text)] disabled:opacity-20 transition-all shadow-sm group bg-[var(--card)]"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex gap-4">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    setAnimDir(i + 1 > currentPage ? 'fade-left' : 'fade-right');
                    setCurrentPage(i + 1);
                  }} 
                  className={`w-2 h-2 rounded-full transition-all ${currentPage === i + 1 ? 'bg-[var(--text)] scale-150 shadow-md' : 'bg-[var(--border)] hover:bg-[var(--text-muted)]'}`} 
                />
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages} 
              onClick={() => {
                setAnimDir('fade-left');
                setCurrentPage(p => p + 1);
              }} 
              className="p-4 rounded-full border border-[var(--border)] hover:border-[var(--text)] disabled:opacity-20 transition-all shadow-sm group bg-[var(--card)]"
            >
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {selectedFile && (
        <div 
          onClick={() => setSelectedFile(null)}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div className="absolute top-0 w-full flex justify-between items-center p-8 z-30">
            <div className="flex items-center gap-4 text-white/60">
              {isPDF(selectedFile) ? <FileText size={20} /> : <Award size={20} />}
              <span className="text-[10px] font-bold uppercase tracking-widest">{lang === 'en' ? 'Credential Viewer' : 'Peninjau Kredensial'}</span>
            </div>
            <button 
              onClick={() => setSelectedFile(null)}
              className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="w-full h-full max-w-6xl p-6 md:p-20 flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {isPDF(selectedFile) ? (
              <iframe 
                src={selectedFile} 
                className="w-full h-full rounded-2xl shadow-2xl border border-white/10 bg-white"
                title="PDF Preview"
              />
            ) : (
              <div className="relative group max-h-full">
                <img 
                  src={selectedFile} 
                  alt="Certificate Preview" 
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
                />
              </div>
            )}
          </div>
          
          <p className="absolute bottom-8 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
            {lang === 'en' ? 'Official Credential Preview' : 'Pratinjau Kredensial Resmi'}
          </p>
        </div>
      )}
    </section>
  );
};

export default Certificates;