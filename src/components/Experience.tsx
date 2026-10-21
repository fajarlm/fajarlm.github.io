import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import { experiencesData } from '../data/portfolioData';
import type { Language } from '../types';

interface ExperienceProps {
  lang: Language;
}

const Experience: React.FC<ExperienceProps> = ({ lang }) => {
  return (
    <section id="pengalaman" className="py-24 md:py-32 border-t border-[var(--border)] relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-[var(--accent)] opacity-[0.04] blur-[80px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto max-w-5xl px-6 md:px-12 lg:px-24">
        <div className="mb-16 md:mb-20" data-aos="fade-up">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-30 text-[var(--text)]">
            {lang === 'en' ? 'Career' : 'Karier'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic text-[var(--text)]">
            {lang === 'en' ? '' : ''}
            <span className="accent-text opacity-70">
              {lang === 'en' ? 'Experience.' : 'Pengalaman.'}
            </span>
          </h3>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border)] hidden md:block"></div>
          <div className="space-y-10">
            {experiencesData.map((exp, idx) => (
              <div key={idx} className="relative md:pl-20" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="absolute left-0 top-3 hidden md:flex w-12 h-12 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] items-center justify-center text-[var(--accent)]">
                  <Briefcase size={20} />
                </div>
                <div className="card-minimal rounded-3xl p-8 hover:border-[var(--accent)] hover:shadow-xl transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div>
                      <h4 className="text-lg md:text-xl font-black tracking-tight text-[var(--text)]">{exp.role[lang]}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[var(--text-muted)]">{exp.company}</span>
                        {exp.companyUrl && (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:opacity-70 transition-opacity">
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] bg-[var(--icon-bg)] px-3 py-1 rounded-full border border-[var(--border)]">
                        {exp.period[lang]}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 text-[var(--text)]">{exp.type[lang]}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.points[lang].map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--text)] opacity-70 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;