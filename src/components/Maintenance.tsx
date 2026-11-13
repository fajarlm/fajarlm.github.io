import React, { useState } from 'react';
import { Wrench, Mail, MessageSquare, ArrowRight, ShieldCheck, Sun, Moon, Palette, Languages } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { Language, Theme } from '../types';

interface MaintenanceProps {
  lang: Language;
  setLang: (l: Language) => void;
  theme: string;
  setTheme: (t: Theme) => void;
  onBypass?: () => void;
}

const Maintenance: React.FC<MaintenanceProps> = ({ lang, setLang, theme, setTheme, onBypass }) => {
  const [showBypassInput, setShowBypassInput] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const t = siteConfig.maintenanceInfo;

  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default preview passcode: "fajar" or "admin"
    if (secretKey === 'fajar' || secretKey === 'admin') {
      if (onBypass) onBypass();
    } else {
      setErrorMsg(lang === 'en' ? 'Invalid secret key' : 'Kunci akses salah');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden selection:bg-[var(--accent)] selection:text-[var(--bg)]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar in Maintenance Mode */}
      <header className="container mx-auto max-w-5xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-[var(--text)]">
            fajarlm<span className="accent-text">.</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            Maintenance
          </span>
        </div>

        {/* Controls: Language & Theme */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--icon-bg)] text-[10px] font-bold uppercase tracking-wider border border-[var(--border)] hover:text-[var(--accent)] transition-colors"
          >
            <Languages size={12} className="opacity-60" />
            <span>{lang === 'en' ? 'EN' : 'ID'}</span>
          </button>

          <div className="flex items-center gap-1 bg-[var(--icon-bg)] p-1 rounded-full border border-[var(--border)]">
            {(['light', 'dark', 'cyan'] as Theme[]).map((tMode) => (
              <button
                key={tMode}
                onClick={() => setTheme(tMode)}
                className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${
                  theme === tMode ? 'scale-110 shadow-sm ring-1 ring-[var(--accent)]' : 'opacity-40 hover:opacity-100'
                }`}
                title={`${tMode} mode`}
              >
                {tMode === 'light' && <Sun size={12} className="text-amber-500" />}
                {tMode === 'dark' && <Moon size={12} className="text-indigo-400" />}
                {tMode === 'cyan' && <Palette size={12} className="text-cyan-400" />}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Center Maintenance Card */}
      <main className="container mx-auto max-w-2xl my-auto py-12 text-center z-10">
        <div className="card-minimal rounded-[3rem] p-8 sm:p-14 shadow-2xl border border-[var(--border)] relative bg-[var(--card)]/90 backdrop-blur-2xl">
          {/* Animated Icon */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mb-8 shadow-inner animate-bounce">
            <Wrench size={36} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-3 block">
            {lang === 'en' ? 'System Upgrade' : 'Pembaruan Sistem'}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text)] mb-4">
            {t.title[lang]}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto mb-8">
            {t.message[lang]}
          </p>

          {/* Quick Direct Contacts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                lang === 'en'
                  ? 'Hello Fajar, I visited your portfolio website while it is in maintenance.'
                  : 'Halo Fajar, saya melihat website portofolio Anda saat sedang pemeliharaan.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[var(--text)] text-[var(--bg)] text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>

          {/* Estimated Back Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--icon-bg)] border border-[var(--border)] text-[11px] font-semibold text-[var(--text-muted)]">
            <ShieldCheck size={14} className="text-[var(--accent)]" />
            <span>
              {lang === 'en' ? 'Estimated return:' : 'Estimasi kembali:'} <strong className="text-[var(--text)]">{t.estimatedBack}</strong>
            </span>
          </div>

          {/* Admin Bypass Toggle */}
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            {!showBypassInput ? (
              <button
                onClick={() => setShowBypassInput(true)}
                className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] opacity-60 hover:opacity-100 transition-opacity"
              >
                {lang === 'en' ? 'Owner Preview Mode' : 'Mode Pratinjau Pemilik'}
              </button>
            ) : (
              <form onSubmit={handleBypassSubmit} className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                <input
                  type="password"
                  placeholder="Secret key..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[var(--icon-bg)] text-xs text-[var(--text)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
            {errorMsg && <p className="text-rose-500 text-[10px] mt-1 font-semibold">{errorMsg}</p>}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto max-w-5xl text-center z-10 text-[11px] text-[var(--text-muted)] opacity-60">
        <p>&copy; {new Date().getFullYear()} {siteConfig.contact.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Maintenance;
