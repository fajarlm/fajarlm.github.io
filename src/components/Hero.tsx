import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { translations, projectsData, certificatesData, experiencesData } from '../data/portfolioData';
import imageProfil from '../assets/profil.png';
import cvFile from '../assets/CV Fajar Kusuma .pdf';
import StrokeText from './ui/StrokeText';
import TiltCard from './ui/TiltCard';
import ShinyText from './ui/ShinyText';
import type { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;

  return (
    <section id="home" className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-20 lg:pt-28 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.07] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[var(--accent)] opacity-[0.05] blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8" data-aos="fade-up">
           

            <div className="mb-4">
              <StrokeText 
                text="Fajar"
                fontSize={80}
                strokeWidth={1.5}
                strokeColor="var(--text)"
                fillColor="var(--text)"
                className="font-black"
              />
              <StrokeText 
                text="Kusuma."
                fontSize={80}
                strokeWidth={1.5}
                strokeColor="var(--accent)"
                fillColor="var(--accent)"
                className="font-black italic -mt-6"
              />
            </div>

            <div className="text-base md:text-lg max-w-xl font-medium leading-relaxed">
              <ShinyText text={t.tagline} speed={4} className="opacity-80" />
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#proyek" className="bg-[var(--text)] text-[var(--bg)] px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 hover:shadow-lg">
                {lang === 'en' ? 'View Projects' : 'Lihat Proyek'}
              </a>
              <a
                href={cvFile}
                download="CV-Fajar-Kusuma.pdf"
                className="border border-[var(--border)] px-8 py-4 rounded-full font-bold transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-3 group"
              >
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                {lang === 'en' ? 'Download CV' : 'Unduh CV'}
              </a>
              <a href='#contact' className="border border-[var(--border)] px-8 py-4 rounded-full font-bold transition-all hover:border-[var(--text)] flex items-center gap-3 group">
                {lang === 'en' ? 'Hire Me' : 'Hubungi Saya'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[var(--border)] max-w-sm">
              {[
                { value: `${experiencesData.length}+`, label: lang === 'en' ? 'Experience' : 'Pengalaman' },
                { value: `${projectsData.length}+`, label: lang === 'en' ? 'Projects' : 'Proyek' },
                { value: `${certificatesData.length}+`, label: lang === 'en' ? 'Certs' : 'Sertifikat' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-black tracking-tight accent-text">{stat.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block" data-aos="zoom-in" data-aos-delay="200">
            <TiltCard className="relative group">
              <div 
                className="relative aspect-[4/5] overflow-hidden border-2 border-[var(--border)] shadow-2xl bg-[var(--card)]"
                style={{ borderRadius: '3.5rem', isolation: 'isolate' }}
              >
                <div className="absolute inset-0 bg-black/5 z-10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                <img 
                  src={imageProfil} 
                  alt="Fajar Kusuma" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ borderRadius: '3.5rem' }}
                />
              </div>
              {/* glow ring */}
              <div className="absolute -inset-4 bg-[var(--accent)] opacity-[0.08] blur-2xl rounded-full -z-10 group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none"></div>
            </TiltCard>
            <div className='flex justify-center items-center mt-10'>
              {/* badge */}
              <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 border border-[var(--border)] text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 bg-[var(--card)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
                <span>fajar kusuma • {t.role}</span>
              </div>
            </div>
 
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;