import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  ExternalLink, 
  PhoneCall
} from 'lucide-react';
import { translations } from '../data/portfolioData';
import type { Language, ChatMessage } from '../types';

interface ChatAssistantProps {
  lang: Language;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ lang }) => {
  const t = translations[lang].chat;
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'wa'>('ai');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // WhatsApp compose state
  const [waName, setWaName] = useState('');
  const [waMessage, setWaMessage] = useState('');

  // Initial messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: t.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'ai') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, activeTab]);

  // Knowledge base answers engine
  const generateAssistantReply = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Skills / Keahlian
    if (q.includes('skill') || q.includes('keahlian') || q.includes('teknologi') || q.includes('stack') || q.includes('tech')) {
      const webSkills = 'React, Next.js, Vue 3, Laravel, Tailwind CSS, TypeScript, Express.js';
      const mobileSkills = 'Flutter, Dart (Android & iOS)';
      const dbSkills = 'MySQL, PostgreSQL, MongoDB, Prisma ORM, Supabase';
      if (lang === 'en') {
        return `Fajar's core tech stack covers both web and mobile engineering:\n• **Frontend & Web:** ${webSkills}\n• **Mobile Development:** ${mobileSkills}\n• **Backend & Database:** ${dbSkills}\n• **Tools:** Git, Postman, Figma, Docker basics.`;
      } else {
        return `Keahlian teknis utama Fajar mencakup pengembangan web dan mobile:\n• **Frontend & Web:** ${webSkills}\n• **Mobile Development:** ${mobileSkills}\n• **Backend & Database:** ${dbSkills}\n• **Tools:** Git, Postman, Figma, dan Docker basics.`;
      }
    }

    // 2. Mobile projects (Quranic & AeroWeather & GOTOH)
    if (q.includes('mobile') || q.includes('flutter') || q.includes('apk') || q.includes('quran') || q.includes('weather') || q.includes('cuaca')) {
      if (lang === 'en') {
        return `Fajar has built several production-ready Flutter mobile applications with direct APK downloads:\n1. **Quranic Mobile**: Authentic Uthmani scripture, audio recitations by global Qari, Kemenag Indonesian translation, and SQLite offline bookmarking.\n2. **AeroWeather Mobile**: Real-time atmospheric & AQI telemetry powered by OpenWeather API with glassmorphism UI.\n3. **GOTOH Mobile**: Community workout streak tracking, calorie expenditure, and trainer consultation.\n\nYou can download the APKs directly from the Projects section!`;
      } else {
        return `Fajar memiliki beberapa proyek aplikasi mobile Flutter dengan rilis file APK yang bisa diunduh langsung:\n1. **Quranic Mobile**: Aplikasi Al-Quran dengan tipografi Utsmani, streaming murattal audio, terjemahan resmi Kemenag RI, dan bookmarking offline SQLite.\n2. **AeroWeather Mobile**: Pemantau cuaca dan kualitas udara (AQI) real-time dengan OpenWeather API dan UI glassmorphism.\n3. **GOTOH Mobile**: Aplikasi pelacak kalori, streak olahraga komunitas, dan konsultasi trainer.\n\nAnda bisa langsung mengunduh APK-nya di bagian kartu Proyek!`;
      }
    }

    // 3. Web Projects (Wishora, Moneta, DocMorph, AbsensiKu, Chen ERD)
    if (q.includes('web') || q.includes('proyek') || q.includes('project') || q.includes('moneta') || q.includes('wishora') || q.includes('docmorph') || q.includes('chen')) {
      if (lang === 'en') {
        return `Key web projects by Fajar include:\n• **Wishora** (Next.js, Tailwind, Framer Motion) — Interactive storytelling & virtual candle blowing platform.\n• **Moneta** (Next.js, Supabase, Gemini AI) — AI-driven personal finance & expense tracking dashboard.\n• **DocMorph Studio** (WASM, Next.js) — In-browser local document converter without server uploads.\n• **Chen ERD Generator** (React, Canvas/SVG) — Interactive SQL to Peter Chen notation diagram modeler.\n• **AbsensiKu v2.0** (Laravel, Livewire, MySQL) — Role-based school attendance telemetry system.`;
      } else {
        return `Beberapa proyek web unggulan Fajar antara lain:\n• **Wishora** (Next.js, Tailwind, Framer Motion) — Platform kartu ucapan interaktif dengan tiup lilin virtual.\n• **Moneta** (Next.js, Supabase, Gemini AI) — Dashboard keuangan pribadi bertenaga kecerdasan buatan.\n• **DocMorph Studio** (WASM, Next.js) — Pengonversi dokumen lokal di browser bertenaga WebAssembly.\n• **Chen ERD Generator** (React, Canvas/SVG) — Generator diagram ERD notasi Peter Chen dari skema SQL.\n• **AbsensiKu v2.0** (Laravel, Livewire, MySQL) — Sistem absensi sekolah terintegrasi dengan hak akses peran.`;
      }
    }

    // 4. Internship / Experience
    if (q.includes('magang') || q.includes('intern') || q.includes('pengalaman') || q.includes('experience') || q.includes('surya') || q.includes('kerja')) {
      if (lang === 'en') {
        return `Fajar completed a Frontend Developer Internship at **PT. Surya Manggala Informatika** (Jul 2025 - Dec 2025). During his tenure, he built modular Vue 3 Composition API components and implemented dual-language (EN/ID) internationalization across key enterprise modules. He also works on various freelance fullstack client projects.`;
      } else {
        return `Fajar telah menyelesaikan program Magang sebagai Frontend Developer di **PT. Surya Manggala Informatika** (Juli 2025 - Desember 2025). Tanggung jawab utamanya meliputi pengembangan komponen modular Vue 3 dengan Composition API dan implementasi lokalisasi UI internasional (i18n EN/ID) untuk modul enterprise. Fajar juga aktif mengerjakan proyek freelance klien.`;
      }
    }

    // 5. Contact / Hire / WhatsApp
    if (q.includes('kontak') || q.includes('contact') || q.includes('hubungi') || q.includes('hire') || q.includes('wa') || q.includes('whatsapp') || q.includes('email') || q.includes('kerja sama') || q.includes('freelance') || q.includes('rate')) {
      if (lang === 'en') {
        return `Fajar is currently open for **internship, junior software engineering roles, and freelance opportunities**!\nYou can reach out directly:\n• **WhatsApp:** +62 857-7903-9757 (or switch to the "WhatsApp Direct" tab above)\n• **Email:** kusumafajar080802@gmail.com\n• **LinkedIn:** in/fajar-kusuma-2f88`;
      } else {
        return `Fajar saat ini sangat terbuka untuk **posisi magang, junior developer, maupun proyek freelance**!\nAnda bisa langsung menghubungi Fajar melalui:\n• **WhatsApp:** +62 857-7903-9757 (atau klik tab "WhatsApp Langsung" di atas)\n• **Email:** kusumafajar080802@gmail.com\n• **LinkedIn:** in/fajar-kusuma-2f88`;
      }
    }

    // 6. About Fajar & School
    if (q.includes('siapa') || q.includes('who') || q.includes('tentang') || q.includes('about') || q.includes('sekolah') || q.includes('school') || q.includes('wikrama')) {
      if (lang === 'en') {
        return `Fajar Kusuma is a Software Engineering student at SMK Wikrama Bogor with a strong focus on real-world web and mobile development. He possesses practical experience with Laravel, React, Next.js, Vue 3, and Flutter.`;
      } else {
        return `Fajar Kusuma adalah siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMK Wikrama Bogor yang berfokus pada pengembangan produk nyata (web dan mobile). Fajar memiliki keahlian praktis dalam Laravel, React, Next.js, Vue 3, dan Flutter.`;
      }
    }

    // Default polite response
    if (lang === 'en') {
      return `Thank you for asking! Fajar is a Fullstack & Mobile Developer skilled in React, Next.js, Laravel, and Flutter. You can explore his projects, download mobile APKs, or contact him directly via the WhatsApp tab above. Feel free to ask about his skills, projects, or background!`;
    } else {
      return `Terima kasih atas pertanyaannya! Fajar adalah Fullstack & Mobile Developer yang menguasai React, Next.js, Laravel, dan Flutter. Anda bisa melihat karya proyeknya di portofolio ini, mengunduh file APK mobile, atau langsung chat Fajar via tab WhatsApp di atas. Ada hal spesifik lain yang ingin Anda ketahui?`;
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAssistantReply(text);
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const namePart = waName.trim() ? `Halo Fajar, perkenalkan saya ${waName.trim()}.\n\n` : 'Halo Fajar,\n\n';
    const messagePart = waMessage.trim() || 'Saya melihat portofolio Anda dan tertarik untuk mendiskusikan peluang kerja sama / proyek.';
    const fullText = encodeURIComponent(`${namePart}${messagePart}`);
    window.open(`https://wa.me/6285779039757?text=${fullText}`, '_blank');
  };

  const promptPills = [
    t.prompt1,
    t.prompt2,
    t.prompt3,
    t.prompt4
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[80] flex items-center gap-3">
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer group flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-full bg-[var(--text)] text-[var(--bg)] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-[var(--border)]"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <Bot size={20} className="text-[var(--accent)] group-hover:rotate-12 transition-transform" />
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider leading-none text-[var(--accent)]">
                Fajar AI
              </p>
              <p className="text-[11px] font-extrabold tracking-tight mt-0.5">
                {t.triggerBadge}
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center ml-1 shadow-sm">
              <MessageSquare size={15} />
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] card-minimal rounded-[2.5rem] shadow-2xl border border-[var(--border)] flex flex-col bg-[var(--bg)] text-[var(--text)] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[var(--icon-bg)] border-b border-[var(--border)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--accent)] to-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  <Bot size={22} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[var(--bg)] rounded-full"></span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                  {t.headerTitle}
                  <Sparkles size={13} className="text-[var(--accent)]" />
                </h4>
                <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t.headerStatus}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)]/40 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1.5 bg-[var(--icon-bg)]/50 border-b border-[var(--border)] shrink-0 text-xs font-bold">
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${activeTab === 'ai' ? 'bg-[var(--bg)] text-[var(--text)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              <Sparkles size={14} className={activeTab === 'ai' ? 'text-[var(--accent)]' : ''} />
              <span>{t.tabAi}</span>
            </button>
            <button
              onClick={() => setActiveTab('wa')}
              className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${activeTab === 'wa' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              <PhoneCall size={14} />
              <span>{t.tabWa}</span>
            </button>
          </div>

          {/* Tab Content 1: AI Chat */}
          {activeTab === 'ai' && (
            <div className="flex flex-col flex-grow overflow-hidden">
              {/* Message List */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-line ${
                        m.sender === 'user'
                          ? 'bg-[var(--accent)] text-white font-medium rounded-br-sm shadow-md'
                          : 'bg-[var(--icon-bg)] text-[var(--text)] border border-[var(--border)] rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-[var(--text-muted)] opacity-60 mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[var(--icon-bg)] text-[var(--text)] border border-[var(--border)] w-20">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Prompt Suggestions Pills */}
              {messages.length <= 3 && !isTyping && (
                <div className="px-4 py-2 border-t border-[var(--border)]/60 bg-[var(--icon-bg)]/30 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                  {promptPills.map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(pill)}
                      className="px-3 py-1.5 rounded-full bg-[var(--icon-bg)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[10px] font-semibold whitespace-nowrap transition-colors"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[var(--icon-bg)] border-t border-[var(--border)] flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  className="flex-grow px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--accent)] transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-[var(--accent)] text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

          {/* Tab Content 2: WhatsApp Direct */}
          {activeTab === 'wa' && (
            <div className="flex-grow p-5 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <h5 className="text-xs font-bold flex items-center gap-2">
                    <PhoneCall size={14} />
                    {t.waTitle}
                  </h5>
                  <p className="text-[11px] mt-1 opacity-90 leading-relaxed">
                    {t.waDesc}
                  </p>
                </div>

                <form onSubmit={handleOpenWhatsApp} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[var(--text-muted)]">
                      {t.waNameLabel}
                    </label>
                    <input
                      type="text"
                      value={waName}
                      onChange={(e) => setWaName(e.target.value)}
                      placeholder={t.waNamePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[var(--text-muted)]">
                      {t.waMsgLabel}
                    </label>
                    <textarea
                      rows={4}
                      value={waMessage}
                      onChange={(e) => setWaMessage(e.target.value)}
                      placeholder={t.waMsgPlaceholder}
                      className="w-full p-3 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all mt-4"
                  >
                    <span>{t.waBtn}</span>
                    <ExternalLink size={14} />
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-[var(--border)] text-center">
                <p className="text-[10px] text-[var(--text-muted)]">
                  Nomor Terverifikasi: <span className="font-bold text-[var(--text)]">+62 857-7903-9757</span>
                </p>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default ChatAssistant;
