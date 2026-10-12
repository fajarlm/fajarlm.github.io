import { Mail, Send, ArrowRight, CheckCircle2, Copy, Globe, User, Camera, Phone } from 'lucide-react';
import { socialLinks, translations } from '../data/portfolioData';
import { useState } from 'react';
import type { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const email = "kusumafajar080802@gmail.com";
  const t = translations[lang].contact;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-40 px-6 border-t border-[var(--border)] relative overflow-hidden">
      <div className="container mx-auto max-w-5xl text-center mb-24" data-aos="fade-up">
        <h2 className="text-xs font-bold uppercase tracking-[0.5em] opacity-30 mb-6 text-center">{t.available}</h2>
        <h3 className="text-xl md:text-3xl font-black tracking-tighter mb-8 leading-none">
          {t.title} <span className="accent-text italic">{t.subtitle}</span>
        </h3>
        
        <div className="relative inline-flex flex-col items-center group">
          <button 
            onClick={copyEmail}
            className="text-2xl italic md:text-2xl font-light hover:opacity-50 transition-opacity border-b border-[var(--border)] pb-2 inline-flex items-center gap-4 text-nowrap"
          >
            <Mail size={32} className="opacity-50" />
            {email}
            <Copy size={20} className="opacity-0 group-hover:opacity-50 transition-all ml-2" />
          </button>
          
          <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[var(--text)] text-[var(--bg)] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-500 ${copied ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-90'}`}>
            <CheckCircle2 size={14} className="text-emerald-400" /> {lang === 'en' ? 'Copied to clipboard!' : 'Tersalin ke papan klip!'}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-12" data-aos="fade-right">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest opacity-30">{t.social}</p>
            <div className="flex flex-col gap-4 font-bold text-lg text-nowrap">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#333] dark:hover:text-white transition-all w-max flex items-center gap-3 group">
                <Globe size={18} /> GitHub <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077B5] transition-all w-max flex items-center gap-3 group">
                <User size={18} /> LinkedIn <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition-all w-max flex items-center gap-3 group">
                <Camera size={18} /> Instagram <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-all w-max flex items-center gap-3 group">
                <Phone size={18} /> WhatsApp <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3" data-aos="fade-left">
          <form action="https://formspree.io/f/xlezlowg" method="POST" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <input type="text" name="name" required placeholder={lang === 'en' ? 'NAME' : 'NAMA'} className="w-full bg-transparent border-b border-[var(--border)] py-4 outline-none focus:border-[var(--text)] transition-all font-bold text-sm uppercase tracking-widest" />
              <input type="email" name="email" required placeholder="EMAIL" className="w-full bg-transparent border-b border-[var(--border)] py-4 outline-none focus:border-[var(--text)] transition-all font-bold text-sm uppercase tracking-widest" />
            </div>
            <textarea name="message" rows={4} required placeholder={lang === 'en' ? 'MESSAGE' : 'PESAN'} className="w-full bg-transparent border-b border-[var(--border)] py-4 outline-none focus:border-[var(--text)] transition-all font-bold text-sm uppercase tracking-widest resize-none"></textarea>
            <button type="submit" className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:accent-text transition-all pt-4">
              {t.send}
              <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--text)] group-hover:translate-x-2 transition-all">
                <Send size={16} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;