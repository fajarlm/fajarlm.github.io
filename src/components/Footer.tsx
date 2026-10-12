import React from 'react';
import { translations, socialLinks } from '../data/portfolioData';
import { Globe, User, Camera, Mail, Phone } from 'lucide-react';
import type { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  const socials = [
    { icon: <Globe size={18} />, url: socialLinks.github, label: 'GitHub', hoverClass: 'hover:text-[#333] hover:border-[#333] dark:hover:text-white dark:hover:border-white' },
    { icon: <User size={18} />, url: socialLinks.linkedin, label: 'LinkedIn', hoverClass: 'hover:text-[#0077B5] hover:border-[#0077B5]' },
    { icon: <Camera size={18} />, url: socialLinks.instagram, label: 'Instagram', hoverClass: 'hover:text-[#E1306C] hover:border-[#E1306C]' },
    { icon: <Phone size={18} />, url: socialLinks.whatsapp, label: 'WhatsApp', hoverClass: 'hover:text-[#25D366] hover:border-[#25D366]' },
    { icon: <Mail size={18} />, url: 'mailto:kusumafajar080802@gmail.com', label: 'Email', hoverClass: 'hover:text-[#EA4335] hover:border-[#EA4335]' },
  ];

  const navLinks = [
    { name: lang === 'en' ? 'Home' : 'Beranda', href: '#home' },
    { name: nav.about, href: '#tentang' },
    { name: lang === 'en' ? 'Skills' : 'Keahlian', href: '#keahlian' },
    { name: nav.projects, href: '#proyek' },
    { name: nav.certificates, href: '#sertifikat' },
    { name: nav.contact, href: '#contact' },
  ];

  return (
    <footer className="border-t border-[var(--border)] mt-auto bg-[var(--card)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="text-2xl font-black tracking-tighter text-[var(--text)] block mb-4">
              fajarlm<span className="accent-text">.</span>
            </a>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              {lang === 'en'
                ? 'Fullstack developer passionate about building modern, fast, and beautiful web experiences.'
                : 'Fullstack developer yang bersemangat membangun pengalaman web modern, cepat, dan indah.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-6 text-[var(--text)]">{lang === 'en' ? 'Navigation' : 'Navigasi'}</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-6 text-[var(--text)]">{lang === 'en' ? 'Connect' : 'Terhubung'}</p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`w-10 h-10 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:-translate-y-1 transition-all duration-300 ${s.hoverClass}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-6 font-medium">
              kusumafajar080802@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-[var(--text)]">
            {t.copyright}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-[var(--text)]">
            {lang === 'en' ? 'Made with ♥ in Bogor, Indonesia' : 'Dibuat dengan ♥ di Bogor, Indonesia'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;