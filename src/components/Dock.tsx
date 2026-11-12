import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimatePresence,
  type MotionValue 
} from 'framer-motion';
import { 
  Home, 
  User, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  Award, 
  MessageSquareQuote, 
  Mail 
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/portfolioData';

interface DockProps {
  lang: Language;
}

interface DockItemData {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const DockItem = ({
  mouseX,
  item,
  isActive
}: {
  mouseX: MotionValue<number>;
  item: DockItemData;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // React Bits / macOS Dock magnification physics
  const widthTransform = useTransform(distance, [-120, 0, 120], [42, 62, 42]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [42, 62, 42]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 220, damping: 14 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 220, damping: 14 });

  const Icon = item.icon;

  return (
    <a
      href={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center focus:outline-none"
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        className={`relative rounded-full flex items-center justify-center transition-colors duration-200 ${
          isActive 
            ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30' 
            : 'bg-[var(--icon-bg)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] border border-[var(--border)]'
        }`}
        whileTap={{ scale: 0.9 }}
      >
        <Icon size={18} className="shrink-0" />

        {/* Active Section Dot */}
        {isActive && (
          <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
        )}
      </motion.div>

      {/* React Bits Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -48, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-xl bg-black/80 dark:bg-white/90 text-white dark:text-black text-[10px] font-bold uppercase tracking-widest pointer-events-none shadow-xl border border-white/10 dark:border-black/10 backdrop-blur-md whitespace-nowrap z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
};

const Dock: React.FC<DockProps> = ({ lang }) => {
  const mouseX = useMotionValue(Infinity);
  const [activeSection, setActiveSection] = useState<string>('home');
  const nav = translations[lang].nav;

  const dockItems: DockItemData[] = [
    { id: 'home', label: lang === 'en' ? 'Home' : 'Beranda', href: '#home', icon: Home },
    { id: 'tentang', label: lang === 'en' ? 'About' : 'Tentang', href: '#tentang', icon: User },
    { id: 'pengalaman', label: lang === 'en' ? 'Experience' : 'Pengalaman', href: '#pengalaman', icon: Briefcase },
    { id: 'keahlian', label: lang === 'en' ? 'Skills' : 'Keahlian', href: '#keahlian', icon: Code2 },
    { id: 'proyek', label: nav.projects || (lang === 'en' ? 'Projects' : 'Proyek'), href: '#proyek', icon: FolderGit2 },
    { id: 'sertifikat', label: nav.certificates || (lang === 'en' ? 'Certificates' : 'Sertifikat'), href: '#sertifikat', icon: Award },
    { id: 'reviews', label: nav.reviews || (lang === 'en' ? 'Reviews' : 'Ulasan'), href: '#reviews', icon: MessageSquareQuote },
    { id: 'contact', label: nav.contact || (lang === 'en' ? 'Contact' : 'Kontak'), href: '#contact', icon: Mail },
  ];

  // Active section scroll detection
  useEffect(() => {
    const sectionIds = ['home', 'tentang', 'pengalaman', 'keahlian', 'proyek', 'sertifikat', 'reviews', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside aria-label="Dock Navigation" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass flex items-end gap-2 px-3 py-2.5 rounded-full border border-[var(--border)] shadow-2xl backdrop-blur-2xl bg-[var(--card)]/80"
      >
        {dockItems.map((item) => (
          <DockItem
            key={item.id}
            mouseX={mouseX}
            item={item}
            isActive={activeSection === item.id}
          />
        ))}
      </motion.div>
    </aside>
  );
};

export default Dock;
