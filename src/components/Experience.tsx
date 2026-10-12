import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import type { Language } from '../types';

interface ExperienceProps {
  lang: Language;
}

interface ExperienceItem {
  role: { en: string; id: string };
  company: string;
  companyUrl?: string;
  period: { en: string; id: string };
  type: { en: string; id: string };
  points: { en: string[]; id: string[] };
}

const experiences: ExperienceItem[] = [
  {
    role: { en: 'Frontend Developer (Internship)', id: 'Frontend Developer (Magang)' },
    company: 'PT. Petik Teknologi Nusantara',
    period: { en: 'Jul 2025 - Oct 2025', id: 'Jul 2025 - Okt 2025' },
    type: { en: 'Hybrid - Internship', id: 'Hybrid - Magang' },
    points: {
      en: [
        'Built and maintained modular Vue 3 components using the Composition API and TypeScript.',
        'Implemented UI localization (i18n) across multiple modules for EN/ID support.',
        'Collaborated with backend team integrating REST APIs for booking and facility management.',
      ],
      id: [
        'Membangun dan memelihara komponen Vue 3 modular menggunakan Composition API dan TypeScript.',
        'Mengimplementasikan lokalisasi UI (i18n) pada berbagai modul untuk dukungan EN/ID.',
        'Berkolaborasi dengan tim backend dalam integrasi REST API untuk manajemen pemesanan dan fasilitas.',
      ],
    },
  },
  {
    role: { en: 'Fullstack Web Developer (Freelance)', id: 'Fullstack Web Developer (Freelance)' },
    company: 'Independent',
    period: { en: '2024 - Present', id: '2024 - Sekarang' },
    type: { en: 'Remote - Freelance', id: 'Remote - Freelance' },
    points: {
      en: [
        'Developed custom web applications using Laravel, Next.js, and React for various clients.',
        'Designed and implemented responsive UIs with Tailwind CSS and component libraries.',
        'Deployed applications on VPS, Vercel, and managed MySQL/PostgreSQL databases.',
      ],
      id: [
        'Membangun aplikasi web kustom menggunakan Laravel, Next.js, dan React untuk berbagai klien.',
        'Merancang dan mengimplementasikan UI responsif dengan Tailwind CSS dan library komponen.',
        'Men-deploy aplikasi di VPS, Vercel, dan mengelola database MySQL/PostgreSQL.',
      ],
    },
  },
];

const Experience: React.FC<ExperienceProps> = ({ lang }) => {
  return (
    <section id="pengalaman" className="py-24 md:py-32 border-t border-[var(--border)] relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-[var(--accent)] opacity-[0.04] blur-[80px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto max-w-5xl px-6 md:px-12 lg:px-24">
        <div className="mb-16 md:mb-20" data-aos="fade-up">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-30 text-[var(--text)]">
            {lang === 'en' ? 'Work History' : 'Riwayat Kerja'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic text-[var(--text)]">
            {lang === 'en' ? 'Work ' : 'Pengalaman '}
            <span className="accent-text opacity-70">
              {lang === 'en' ? 'Experience.' : 'Kerja.'}
            </span>
          </h3>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border)] hidden md:block"></div>
          <div className="space-y-10">
            {experiences.map((exp, idx) => (
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