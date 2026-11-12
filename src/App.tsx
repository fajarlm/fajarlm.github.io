import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ChevronUp } from 'lucide-react';
import type { Theme, Language } from './types';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dock from './components/Dock';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'light');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'en' || saved === 'id') ? (saved as Language) : 'en';
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-quad' });
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen transition-all duration-500 bg-[var(--bg)] overflow-x-hidden text-[var(--text)] selection:bg-[var(--accent)] selection:text-[var(--bg)]">
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        lang={lang}
        setLang={setLang}
        onOpenSidebar={() => setSidebarOpen(true)} 
        isSidebarOpen={isSidebarOpen} 
      />
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} lang={lang} />

      <div className={`transition-all duration-700 min-h-screen flex flex-col ${isSidebarOpen ? 'lg:pl-72' : 'pl-0'}`}>
        
        <main className="flex-grow">
          <Hero lang={lang} />
          <About lang={lang} />
          <Experience lang={lang} />
          
          <div className="px-6 md:px-12 lg:px-24">
            <TechStack lang={lang} />
            <Projects lang={lang} />
            <Certificates lang={lang} />
            <Reviews lang={lang} />
          </div>

          <Contact lang={lang} />
        </main>

        <Footer lang={lang} />
        
        <ChatAssistant lang={lang} />

        <Dock lang={lang} />

        <button 
          onClick={scrollToTop} 
          className={`fixed bottom-24 right-6 p-3.5 rounded-full bg-[var(--text)] text-[var(--bg)] shadow-2xl transition-all duration-700 z-50 hover:scale-110 active:scale-90 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </div>
  );
}
