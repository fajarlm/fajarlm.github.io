import React from 'react';
import { Menu, Languages } from 'lucide-react';
import type { Theme, Language } from '../types';

interface NavbarProps {
  theme: string;
  setTheme: (t: Theme) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onOpenSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  setTheme, 
  lang, 
  setLang, 
  onOpenSidebar, 
  isSidebarOpen 
}) => {
  return (
    <header className={`fixed top-0 right-0 z-50 p-4 transition-all duration-500 ${isSidebarOpen ? 'lg:left-72' : 'left-0'}`}>
      <nav className="container mx-auto glass rounded-2xl px-5 sm:px-6 py-3 flex justify-between items-center shadow-sm">
        {/* Brand Logo & Menu Trigger */}
        <div className="flex items-center gap-4 text-[var(--text)]">
          <button 
            onClick={onOpenSidebar} 
            className="p-2 rounded-xl bg-[var(--icon-bg)] text-[var(--text)] hover:opacity-100 opacity-80 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all active:scale-95 flex items-center gap-2 border border-[var(--border)]"
            title="Menu"
            aria-label="Buka Menu"
          >
            <Menu size={18} />
            <span className="hidden sm:inline uppercase tracking-widest text-[10px] font-bold">Menu</span>
          </button>

          <a href="#home" className="text-xl font-bold tracking-tighter text-[var(--text)] group flex items-center gap-2">
            <span>fajarlm</span><span className="accent-text">.</span>
          </a>
        </div>

        {/* Right Action Controls: Language & Theme */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-[var(--icon-bg)] px-3 py-1.5 rounded-full border border-[var(--border)]">
            <button 
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors"
              title={lang === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
            >
              <Languages size={13} className="opacity-60" />
              <span>{lang === 'en' ? 'EN' : 'ID'}</span>
            </button>
          </div>

          {/* Theme Selector 3-State Picker */}
          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-[var(--border)]">
            {(['light', 'dark', 'cyan'] as Theme[]).map((t) => (
              <button 
                key={t}
                onClick={() => setTheme(t)}
                className={`w-6 h-6 rounded-full transition-all ${
                  theme === t 
                    ? 'scale-110 shadow-md ring-2 ring-[var(--accent)]' 
                    : 'scale-90 opacity-40 hover:opacity-100'
                } ${
                  t === 'light' 
                    ? 'bg-white border border-gray-200' 
                    : t === 'dark' 
                      ? 'bg-slate-800' 
                      : 'bg-cyan-400'
                }`}
                title={t.charAt(0).toUpperCase() + t.slice(1) + ' mode'}
                aria-label={`${t} mode`}
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
