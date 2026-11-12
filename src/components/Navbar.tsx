import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Menu, X, Languages, Sun, Moon, Palette,
  User, Briefcase, Code2, FolderGit2, Award, MessageSquareQuote, Mail, ArrowUpRight, Sparkles
} from 'lucide-react';
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

const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  setTheme, 
  lang, 
  setLang, 
  onOpenSidebar, 
  isSidebarOpen 
}) => {
  const nav = translations[lang].nav;
  
  const navLinks = [
    { name: lang === 'en' ? 'About' : 'Tentang', href: '#tentang', id: 'tentang', icon: User },
    { name: lang === 'en' ? 'Experience' : 'Pengalaman', href: '#pengalaman', id: 'pengalaman', icon: Briefcase },
    { name: lang === 'en' ? 'Skills' : 'Keahlian', href: '#keahlian', id: 'keahlian', icon: Code2 },
    { name: nav.projects || (lang === 'en' ? 'Projects' : 'Proyek'), href: '#proyek', id: 'proyek', icon: FolderGit2 },
    { name: nav.certificates || (lang === 'en' ? 'Certificates' : 'Sertifikat'), href: '#sertifikat', id: 'sertifikat', icon: Award },
    { name: nav.reviews || (lang === 'en' ? 'Reviews' : 'Ulasan'), href: '#reviews', id: 'reviews', icon: MessageSquareQuote },
    { name: nav.contact || (lang === 'en' ? 'Contact' : 'Kontak'), href: '#contact', id: 'contact', icon: Mail },
  ];

  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Scroll progress calculation
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (latest / totalHeight) * 100)));
    }

    // Smart auto-hide on scroll down, show on scroll up
    if (latest > 160 && latest > previous && !isMobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ['home', 'tentang', 'pengalaman', 'keahlian', 'proyek', 'sertifikat', 'reviews', 'contact'];
    
    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    handleScrollObserver();
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  return (
    <header className={`fixed top-0 right-0 z-50 p-3 sm:p-4 transition-all duration-500 pointer-events-none ${isSidebarOpen ? 'lg:left-72' : 'left-0'}`}>
      <motion.nav 
        animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-6xl glass rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/40 border border-[var(--border)] relative pointer-events-auto backdrop-blur-xl"
      >
        {/* Brand Logo & Availability Status */}
        <div className="flex items-center gap-3">
          <a 
            href="#home" 
            onClick={() => setActiveSection('home')}
            className="group flex items-center gap-2 text-lg sm:text-xl font-black tracking-tighter text-[var(--text)] transition-transform active:scale-95"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-[var(--accent)]/20 group-hover:rotate-6 transition-transform">
              FK
            </div>
            <span className="hidden sm:inline">
              fajarlm<span className="accent-text">.</span>
            </span>
          </a>

          {/* Availability Status Badge (Interactive Pill) */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{lang === 'en' ? 'Open to Work' : 'Siap Kerja'}</span>
          </div>
        </div>

        {/* Desktop React Bits Pill Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-[var(--icon-bg)]/80 p-1 rounded-full border border-[var(--border)]/70 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onMouseEnter={() => setHoveredSection(link.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => setActiveSection(link.id)}
                className="relative px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors duration-200 select-none"
                style={{
                  color: isActive ? 'var(--bg)' : 'var(--text)',
                  opacity: isActive ? 1 : 0.75
                }}
              >
                {/* Active Sliding Capsule (Pill Nav effect) */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill-active"
                    className="absolute inset-0 rounded-full bg-[var(--text)] shadow-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}

                {/* Hover Indicator */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="navbar-pill-hover"
                    className="absolute inset-0 rounded-full bg-[var(--text)]/10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Controls: Language, Theme, CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Segment Pill */}
          <div className="flex items-center gap-1 bg-[var(--icon-bg)] px-2 py-1 rounded-full border border-[var(--border)] text-[10px] font-bold">
            <Languages size={12} className="opacity-50 shrink-0 hidden sm:inline" />
            <div className="flex items-center">
              <button
                onClick={() => setLang('en')}
                className={`relative px-2 py-0.5 rounded-full transition-colors ${lang === 'en' ? 'text-[var(--bg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
                title="English"
              >
                {lang === 'en' && (
                  <motion.div 
                    layoutId="lang-pill" 
                    className="absolute inset-0 rounded-full bg-[var(--text)] shadow-xs" 
                    transition={{ type: "spring", stiffness: 420, damping: 30 }} 
                  />
                )}
                <span className="relative z-10">EN</span>
              </button>
              <button
                onClick={() => setLang('id')}
                className={`relative px-2 py-0.5 rounded-full transition-colors ${lang === 'id' ? 'text-[var(--bg)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
                title="Bahasa Indonesia"
              >
                {lang === 'id' && (
                  <motion.div 
                    layoutId="lang-pill" 
                    className="absolute inset-0 rounded-full bg-[var(--text)] shadow-xs" 
                    transition={{ type: "spring", stiffness: 420, damping: 30 }} 
                  />
                )}
                <span className="relative z-10">ID</span>
              </button>
            </div>
          </div>

          {/* Theme Selector 3-State Picker */}
          <div className="flex items-center gap-1 bg-[var(--icon-bg)] p-1 rounded-full border border-[var(--border)]">
            {(['light', 'dark', 'cyan'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`relative w-6 h-6 rounded-full transition-transform flex items-center justify-center ${theme === t ? 'scale-105' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
                title={`${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
              >
                {t === 'light' && (
                  <span className="w-full h-full rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-500">
                    <Sun size={12} />
                  </span>
                )}
                {t === 'dark' && (
                  <span className="w-full h-full rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400">
                    <Moon size={12} />
                  </span>
                )}
                {t === 'cyan' && (
                  <span className="w-full h-full rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                    <Palette size={12} />
                  </span>
                )}

                {theme === t && (
                  <motion.div
                    layoutId="theme-active-ring"
                    className="absolute -inset-0.5 rounded-full border-2 border-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Direct CTA 'Hire Me' (Desktop) */}
          <a
            href="#contact"
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[var(--accent)]/20"
          >
            <span>{lang === 'en' ? 'Hire' : 'Kontak'}</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-[var(--icon-bg)] text-[var(--text)] border border-[var(--border)] opacity-80 hover:opacity-100 active:scale-90 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Reading Scroll Progress Indicator (React Bits style) */}
        <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-transparent overflow-hidden rounded-full pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-[var(--accent)] via-cyan-400 to-indigo-500 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.nav>

      {/* Mobile Floating Drawer (React Bits / shadcn animated card) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="container mx-auto max-w-6xl mt-2 px-2 pointer-events-auto lg:hidden"
          >
            <div className="glass rounded-[2rem] p-6 shadow-2xl border border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    Navigation Menu
                  </span>
                </div>
                <button
                  onClick={onOpenSidebar}
                  className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                  <Sparkles size={12} /> {lang === 'en' ? 'Open Full Sidebar' : 'Buka Sidebar'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => {
                        setActiveSection(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                          : 'bg-[var(--icon-bg)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]'
                      }`}
                    >
                      <Icon size={15} />
                      <span className="truncate">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-3">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-[var(--text)] text-[var(--bg)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
                >
                  {lang === 'en' ? 'Get In Touch' : 'Hubungi Saya'}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
