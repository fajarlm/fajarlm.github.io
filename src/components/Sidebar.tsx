import React from 'react';
import { 
  X, Globe, User as UserIcon, Terminal, Mail, 
  Home, User, Briefcase, Code2, FolderGit2, Award, MessageSquareQuote 
} from 'lucide-react';
import { translations } from '../data/portfolioData';
import type { Language } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang].nav;
  
  const menuItems = [
    { num: '01', name: lang === 'en' ? 'Home' : 'Beranda', id: 'home', icon: Home },
    { num: '02', name: t.about, id: 'tentang', icon: User },
    { num: '03', name: lang === 'en' ? 'Experience' : 'Pengalaman', id: 'pengalaman', icon: Briefcase },
    { num: '04', name: lang === 'en' ? 'Skills' : 'Keahlian', id: 'keahlian', icon: Code2 },
    { num: '05', name: t.projects, id: 'proyek', icon: FolderGit2 },
    { num: '06', name: t.certificates, id: 'sertifikat', icon: Award },
    { num: '07', name: t.reviews, id: 'reviews', icon: MessageSquareQuote },
    { num: '08', name: t.contact, id: 'contact', icon: Mail }
  ];

  const socialLinks = [
    { icon: <Globe size={18} />, url: 'https://github.com/fajarlm', label: 'GitHub' },
    { icon: <UserIcon size={18} />, url: 'https://www.linkedin.com/in/fajar-kusuma-2f88/', label: 'LinkedIn' },
    { icon: <Terminal size={18} />, url: 'https://www.instagram.com/fajarkusuma_lm/', label: 'Instagram' },
    { icon: <Mail size={18} />, url: 'mailto:kusumafajar080802@gmail.com', label: 'Email' }
  ];

  return (
    <>
      {/* Backdrop overlay (shadcn Sheet style) */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[65] animate-in fade-in duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sheet Drawer Panel */}
      <aside 
        className={`fixed top-0 left-0 h-full w-80 card-minimal z-[70] transition-transform duration-500 ease-out shadow-2xl flex flex-col bg-[var(--card)]/95 backdrop-blur-xl border-r border-[var(--border)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar Menu"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 flex justify-between items-center border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[var(--text)] tracking-tight">
              fajarlm<span className="accent-text">.</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--icon-bg)] text-[var(--text-muted)] border border-[var(--border)]">
              Menu
            </span>
          </div>

          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-[var(--icon-bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] opacity-70 hover:opacity-100 transition-all active:scale-95 border border-[var(--border)]"
            title="Tutup Menu"
            aria-label="Tutup Menu"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Navigation list */}
        <nav className="p-6 sm:p-8 flex-grow overflow-y-auto no-scrollbar">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-60 mb-6">
            {lang === 'en' ? 'Navigation' : 'Navigasi'}
          </p>

          <ul className="space-y-3 font-semibold text-[var(--text)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    onClick={() => onClose()} 
                    className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[var(--icon-bg)] transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[var(--icon-bg)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors text-[var(--text)]">
                        <Icon size={16} />
                      </div>
                      <span className="text-sm tracking-wide text-[var(--text)]">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)]">
                      {item.num}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / Socials */}
        <div className="p-6 sm:p-8 border-t border-[var(--border)] bg-[var(--icon-bg)]/40">
          <p className="text-[10px] uppercase font-bold opacity-50 mb-4 tracking-[0.25em] text-[var(--text)]">
            {lang === 'en' ? 'Connect with Fajar' : 'Terhubung dengan Fajar'}
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all text-[var(--text)] hover:text-[var(--accent)] shadow-xs"
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
