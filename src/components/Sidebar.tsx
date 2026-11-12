import React from 'react';
import { X, Globe, User, Terminal, Mail } from 'lucide-react';
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
    { name: lang === 'en' ? 'Home' : 'Beranda', id: 'home' },
    { name: t.about, id: 'tentang' },
    { name: lang === 'en' ? 'Experience' : 'Pengalaman', id: 'pengalaman' },
    { name: lang === 'en' ? 'Skills' : 'Keahlian', id: 'keahlian' },
    { name: t.projects, id: 'proyek' },
    { name: t.certificates, id: 'sertifikat' },
    { name: t.reviews, id: 'reviews' },
    { name: t.contact, id: 'contact' }
  ];

  const socialLinks = [
    { icon: <Globe size={18} />, url: 'https://github.com/fajarlm', label: 'GitHub' },
    { icon: <User size={18} />, url: 'https://www.linkedin.com/in/fajar-kusuma-2f88/', label: 'LinkedIn' },
    { icon: <Terminal size={18} />, url: 'https://www.instagram.com/fajarkusuma_lm/', label: 'Instagram' },
    { icon: <Mail size={18} />, url: 'mailto:kusumafajar080802@gmail.com', label: 'Email' }
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full w-72 card-minimal z-[70] transition-transform duration-500 shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 flex justify-between items-center border-b border-[var(--border)]">
        <span className="text-xl font-bold text-[var(--text)] tracking-tight text-nowrap">fajarlm<span className="accent-text">.</span></span>
        <button onClick={onClose} className="p-2 opacity-50 hover:opacity-100 text-[var(--text)] transition-all">
          <X size={24} />
        </button>
      </div>
      
      <nav className="p-8 flex-grow">
        <ul className="space-y-6 font-medium text-[var(--text)]">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                onClick={() => onClose()} 
                className="block py-2 text-sm uppercase tracking-widest hover:text-[var(--accent)] hover:translate-x-2 transition-all"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-8 border-t border-[var(--border)]">
        <p className="text-[10px] uppercase font-bold opacity-40 mb-6 tracking-[0.3em] text-[var(--text)]">Connect</p>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((social, i) => (
            <a 
              key={i} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="opacity-50 hover:opacity-100 transition-all text-[var(--text)] hover:text-[var(--accent)]"
              title={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;