import React from 'react';
import { techStack, translations } from '../data/portfolioData';
import type { Language } from '../types';

interface TechStackProps {
  lang: Language;
}

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const t = translations[lang].tech;

  // Bagi techStack jadi 2 baris yang seimbang (8 item per baris)
  const half = Math.ceil(techStack.length / 2);
  const firstHalf = techStack.slice(0, half);
  const secondHalf = techStack.slice(half);

  // Duplikasi konten buat efek infinite scroll yang mulus
  const row1 = [...firstHalf, ...firstHalf, ...firstHalf];
  const row2 = [...secondHalf, ...secondHalf, ...secondHalf];

  return (
    <section id="keahlian" className="py-24 md:py-32 overflow-hidden relative bg-shape-grid">
      <div className="container mx-auto px-6 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-30 text-[var(--text)]">{lang === 'en' ? 'Core Technologies' : 'Teknologi Utama'}</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic text-nowrap text-[var(--text)]">
              {t.title} <span className="accent-text opacity-70">{t.subtitle}</span>
            </h3>
          </div>
          <p className="max-w-md text-sm md:text-base text-[var(--text)] opacity-50 font-medium text-center md:text-right leading-relaxed">
            {lang === 'en' ? 'Transforming ideas into reality using the most advanced and reliable digital tools.' : 'Mentransformasi ide menjadi kenyataan menggunakan alat digital paling canggih dan andal.'}
          </p>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="flex overflow-hidden group py-8 -my-8 z-10 relative">
          <div className="animate-marquee flex gap-4 md:gap-6 px-4">
            {row1.map((tech, index) => (
              <div key={`row1-${index}`} className="group/item tech-icon-container p-6 md:p-8 hover:z-10 relative">
                <div className="flex flex-col items-center gap-4 transition-transform duration-500 group-hover/item:-translate-y-2">
                  <img src={tech.icon} alt={tech.name} className="w-10 h-10 md:w-12 md:h-12 grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                  <div className="text-center">
                    <h4 className="font-black text-[10px] md:text-xs tracking-tight">{tech.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden group py-8 -my-8 z-10 relative mt-4 md:mt-6">
          <div className="animate-marquee-reverse flex gap-4 md:gap-6 px-4">
            {row2.map((tech, index) => (
              <div key={`row2-${index}`} className="group/item tech-icon-container p-6 md:p-8 hover:z-10 relative">
                <div className="flex flex-col items-center gap-4 transition-transform duration-500 group-hover/item:-translate-y-2">
                  <img src={tech.icon} alt={tech.name} className="w-10 h-10 md:w-12 md:h-12 grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                  <div className="text-center">
                    <h4 className="font-black text-[10px] md:text-xs tracking-tight">{tech.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;