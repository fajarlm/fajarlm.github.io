import React from 'react';
import { Menu, Languages } from 'lucide-react';
import type { Theme, Language } from '../types';
import { translations } from '../data/portfolioData';

interface NavbarProps {
  theme: string;
  setTheme: (t: Theme) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onOpenSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, lang, setLang, onOpenSidebar, isSidebarOpen }) => {
  const nav = translations[lang].nav;
  
  const navLinks = [
    { name: nav.about, href: '#tentang' },
    { name: lang === 'en' ? 'Experience' : 'Pengalaman', href: '#pengalaman' },
    { name: lang === 'en' ? 'Skills' : 'Keahlian', href: '#keahlian' },
    { name: nav.projects, href: '#proyek' },
    { name: nav.certificates, href: '#sertifikat' },
    { name: nav.contact, href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 right-0 z-50 p-4 transition-all duration-500 ${isSidebarOpen ? 'lg:left-72' : 'left-0'}`}>
      <nav className="container mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4 text-[var(--text)]">
          {!isSidebarOpen && (
            <button onClick={onOpenSidebar} className="p-2 opacity-70 hover:opacity-100 transition-opacity lg:hidden">
              <Menu size={20} />
            </button>
          )}
          {isSidebarOpen && (
            <button onClick={onOpenSidebar} className="p-2 opacity-70 hover:opacity-100 transition-opacity lg:hidden">
              <Menu size={20} />
            </button>
          )}
          <a href="#home" className="text-xl font-bold tracking-tighter text-[var(--text)]">
            fajarlm<span className="accent-text">.</span>
          </a>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-[var(--accent)] transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[var(--icon-bg)] p-1 rounded-full border border-[var(--border)]">
            <button 
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-all"
            >
              <Languages size={14} className="opacity-50" />
              {lang === 'en' ? 'EN' : 'ID'}
            </button>
          </div>

          <div className="flex items-center gap-2 bg-black/5 p-1 rounded-full border border-[var(--border)]">
            {(['light', 'dark', 'cyan'] as Theme[]).map((t) => (
              <button 
                key={t}
                onClick={() => setTheme(t)}
                className={`w-7 h-7 rounded-full transition-all ${theme === t ? 'scale-110 shadow-lg ring-2 ring-[var(--accent)]' : 'scale-90 opacity-50'} ${t === 'light' ? 'bg-white border border-gray-200' : t === 'dark' ? 'bg-slate-800' : 'bg-cyan-400'}`}
                title={t.charAt(0).toUpperCase() + t.slice(1) + ' mode'}
              />
            ))}
          </div>

          {/* Mobile menu button */}
          {!isSidebarOpen && (
            <button onClick={onOpenSidebar} className="p-2 opacity-70 hover:opacity-100 transition-opacity hidden lg:block">
              <Menu size={20} />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;