import React, { useState, useEffect } from 'react';
import { 
  Star, 
  StarHalf, 
  MessageSquarePlus, 
  Quote, 
  X, 
  CheckCircle2, 
  User, 
  Building, 
  Briefcase, 
  HeartHandshake, 
  AlertCircle, 
  Sparkles, 
  Loader2,
  Eye
} from 'lucide-react';
import { translations } from '../data/portfolioData';
import SpotlightCard from './ui/SpotlightCard';
import { subscribeToReviews, submitReview } from '../services/reviewService';
import type { Language, Review } from '../types';

interface ReviewsProps {
  lang: Language;
}

const RELATION_OPTIONS = [
  { value: 'Colleague', label: { en: 'Colleague / Coworker', id: 'Rekan Kerja' } },
  { value: 'Client', label: { en: 'Client / Customer', id: 'Klien' } },
  { value: 'Project Partner', label: { en: 'Project Partner', id: 'Rekan Proyek' } },
  { value: 'Mentor', label: { en: 'Mentor / Teacher', id: 'Mentor / Pembimbing' } },
  { value: 'Peer', label: { en: 'Peer / Classmate', id: 'Teman / Rekan Belajar' } }
];

export const renderStars = (rating: number, size = 15) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star
          key={i}
          size={size}
          className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <StarHalf
          key={i}
          size={size}
          className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={size}
          className="text-zinc-500/25 dark:text-zinc-600/30"
        />
      );
    }
  }
  return stars;
};

const Reviews: React.FC<ReviewsProps> = ({ lang }) => {
  const t = translations[lang].reviews;

  // Realtime reviews state synced with Firebase Firestore / local cache
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    relation: 'Colleague',
    rating: 5.0,
    message: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Subscribe to realtime reviews
  useEffect(() => {
    const unsubscribe = subscribeToReviews((updatedReviews) => {
      setReviews(updatedReviews);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const satisfactionPercentage = reviews.length > 0
    ? Math.round((reviews.filter(r => r.rating >= 4.0).length / reviews.length) * 100)
    : 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    if (formData.name.trim().length < 2) {
      setErrorMessage(lang === 'en' ? 'Please enter a valid name (at least 2 characters).' : 'Mohon masukkan nama yang valid (minimal 2 karakter).');
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage(lang === 'en' ? 'Please provide a more descriptive message (at least 10 characters).' : 'Pesan ulasan terlalu singkat (minimal 10 karakter).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const now = new Date();
    const dateStr = now.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    try {
      await submitReview({
        name: formData.name.trim(),
        role: formData.role.trim() || (lang === 'en' ? 'Peer / Collaborator' : 'Rekan Kolaborasi'),
        company: formData.company.trim() || undefined,
        relation: formData.relation,
        rating: formData.rating,
        message: formData.message.trim(),
        date: dateStr
      });

      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({
        name: '',
        role: '',
        company: '',
        relation: 'Colleague',
        rating: 5.0,
        message: ''
      });
      setShowPreview(false);
      setToastMessage(t.successToast || (lang === 'en' ? 'Thank you! Your review has been saved.' : 'Terima kasih! Ulasan Anda telah tersimpan.'));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const errMsg = err instanceof Error ? err.message : 'Failed to save review';
      setErrorMessage(
        lang === 'en'
          ? `Could not submit review: ${errMsg}. Please try again.`
          : `Gagal mengirim ulasan: ${errMsg}. Silakan coba beberapa saat lagi.`
      );
    }
  };

  const getInitials = (name: string) => {
    if (!name.trim()) return 'FK';
    return name
      .trim()
      .split(' ')
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');
  };

  const currentDisplayRating = hoverRating !== null ? hoverRating : formData.rating;

  const getRatingFeedback = (val: number) => {
    if (val >= 5.0) return lang === 'en' ? 'Exceptional (5.0/5.0) ★★★★★' : 'Sempurna & Sangat Puas (5.0/5.0) ★★★★★';
    if (val >= 4.5) return lang === 'en' ? 'Outstanding (4.5/5.0) ★★★★½' : 'Luar Biasa (4.5/5.0) ★★★★½';
    if (val >= 4.0) return lang === 'en' ? 'Very Good (4.0/5.0) ★★★★☆' : 'Sangat Baik (4.0/5.0) ★★★★☆';
    if (val >= 3.5) return lang === 'en' ? 'Good (3.5/5.0) ★★★½☆' : 'Bagus & Memuaskan (3.5/5.0) ★★★½☆';
    return lang === 'en' ? 'Fair (3.0/5.0) ★★★☆☆' : 'Cukup Baik (3.0/5.0) ★★★☆☆';
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-600 text-white shadow-2xl backdrop-blur-xl border border-emerald-400/40 text-xs md:text-sm font-bold">
            <CheckCircle2 size={20} className="text-white shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" data-aos="fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--icon-bg)] border border-[var(--border)] text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent)] mb-4 shadow-xs">
              <Quote size={12} /> {t.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              {t.title}
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] mt-2 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Action button & Stats Banner */}
          <div className="flex flex-wrap items-center gap-4">
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] shadow-xs">
                <div className="flex items-center gap-1.5 text-amber-500 font-black text-lg">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  <span>{avgRating}</span>
                </div>
                <div className="h-6 w-px bg-[var(--border)]" />
                <div className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider leading-tight">
                  <div className="text-[var(--text)] font-bold">{reviews.length} {t.totalReviews}</div>
                  <div className="text-emerald-500 font-bold">{satisfactionPercentage}% {lang === 'en' ? 'Satisfaction' : 'Puas'}</div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setErrorMessage(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[var(--text)] text-[var(--bg)] text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-[var(--accent)]/20"
            >
              <MessageSquarePlus size={16} />
              <span>{t.writeReview}</span>
            </button>
          </div>
        </div>

        {/* Empty State when no reviews */}
        {reviews.length === 0 ? (
          <div 
            className="text-center py-20 px-6 card-minimal rounded-[2.5rem] border border-dashed border-[var(--border)] max-w-xl mx-auto shadow-sm"
            data-aos="fade-up"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--icon-bg)] text-[var(--accent)] flex items-center justify-center mx-auto mb-4 border border-[var(--border)]">
              <MessageSquarePlus size={28} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
              {t.emptyTitle}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-2 mb-8 max-w-sm mx-auto leading-relaxed">
              {t.emptyDesc || (lang === 'en' ? 'Be the first to leave a review and share your experience working with Fajar!' : 'Jadilah yang pertama menuliskan ulasan dan pengalaman berkolaborasi bersama Fajar!')}
            </p>
            <button
              onClick={() => {
                setErrorMessage(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[var(--accent)]/20"
            >
              <Star size={15} className="fill-white text-white" />
              <span>{t.writeReview}</span>
            </button>
          </div>
        ) : (
          /* Reviews Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <SpotlightCard
                key={r.id || idx}
                className="group card-minimal rounded-[2rem] p-6 sm:p-7 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden border border-[var(--border)]"
                spotlightColor="rgba(245, 158, 11, 0.08)"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <Quote className="absolute right-6 top-6 text-[var(--border)] opacity-35 group-hover:text-[var(--accent)] group-hover:opacity-20 transition-all duration-500 pointer-events-none" size={48} />
                
                <div>
                  {/* Rating Stars & Relation Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(r.rating, 15)}
                      <span className="text-xs font-black text-amber-500 ml-1.5">
                        {r.rating.toFixed(1)}
                      </span>
                    </div>

                    {r.relation && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--icon-bg)] text-[var(--text-muted)] border border-[var(--border)]">
                        {r.relation}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <p className="text-xs md:text-sm text-[var(--text)] leading-relaxed italic opacity-90 mb-6">
                    "{r.message}"
                  </p>
                </div>

                {/* Author footer */}
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--accent)] to-amber-500 text-white flex items-center justify-center font-black text-xs shadow-md shrink-0">
                      {getInitials(r.name)}
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold tracking-tight text-[var(--text)] line-clamp-1">
                        {r.name}
                      </h4>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                        {r.role} {r.company ? `• ${r.company}` : ''}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] text-[var(--text-muted)] opacity-60 shrink-0 font-medium">
                    {r.date}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>

      {/* REFINED REVIEW MODAL (Clean, Polished, Responsive) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-xl my-auto rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-[var(--border)] relative bg-[var(--card)] text-[var(--text)] overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[var(--border)] shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--icon-bg)] text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] border border-[var(--border)] mb-2">
                  <Sparkles size={11} /> {t.badge}
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-[var(--text)]">
                  {t.modalTitle}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {t.modalDesc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2.5 rounded-full bg-[var(--icon-bg)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all shrink-0 hover:rotate-90"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto py-5 space-y-5 pr-1 [scrollbar-width:thin] [scrollbar-color:var(--accent)_transparent]">
              {/* Error Banner */}
              {errorMessage && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span className="font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form id="reviewForm" onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                      {t.nameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      {formData.name.length}/60
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <User size={15} className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <input
                      type="text"
                      required
                      maxLength={60}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Role & Company Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-85">
                      {t.roleLabel}
                    </label>
                    <div className="relative flex items-center">
                      <Briefcase size={15} className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none" />
                      <input
                        type="text"
                        maxLength={60}
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        placeholder={t.rolePlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-85">
                      {t.companyLabel}
                    </label>
                    <div className="relative flex items-center">
                      <Building size={15} className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none" />
                      <input
                        type="text"
                        maxLength={60}
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t.companyPlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Relationship Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 opacity-85">
                    {lang === 'en' ? 'Collaboration Context' : 'Hubungan / Konteks Kerja Sama'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {RELATION_OPTIONS.map((opt) => {
                      const isSelected = formData.relation === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => setFormData({ ...formData, relation: opt.value })}
                          className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                            isSelected
                              ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md shadow-[var(--accent)]/20 scale-[1.02]'
                              : 'bg-[var(--icon-bg)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)] hover:border-[var(--text)]/40'
                          }`}
                        >
                          {opt.label[lang]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating Selector */}
                <div className="p-4 rounded-2xl bg-[var(--icon-bg)]/60 border border-[var(--border)] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                      {t.ratingLabel}
                    </label>
                    <span className="text-xs font-extrabold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      {getRatingFeedback(currentDisplayRating)}
                    </span>
                  </div>

                  {/* Interactive Stars Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starIdx) => {
                        const fullActive = currentDisplayRating >= starIdx;
                        const halfActive = !fullActive && currentDisplayRating >= starIdx - 0.5;

                        return (
                          <div 
                            key={starIdx}
                            className="relative cursor-pointer hover:scale-125 transition-transform p-1"
                          >
                            {fullActive ? (
                              <Star size={30} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                            ) : halfActive ? (
                              <StarHalf size={30} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                            ) : (
                              <Star size={30} className="text-zinc-600/30" />
                            )}

                            {/* Left Half Hit Area for .5 */}
                            <div
                              className="absolute inset-y-0 left-0 w-1/2 z-10"
                              onMouseEnter={() => setHoverRating(starIdx - 0.5)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => setFormData({ ...formData, rating: starIdx - 0.5 })}
                              title={`${starIdx - 0.5} Stars`}
                            />

                            {/* Right Half Hit Area for .0 */}
                            <div
                              className="absolute inset-y-0 right-0 w-1/2 z-10"
                              onMouseEnter={() => setHoverRating(starIdx)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => setFormData({ ...formData, rating: starIdx })}
                              title={`${starIdx} Stars`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-1.5">
                      {[5.0, 4.5, 4.0, 3.5].map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => setFormData({ ...formData, rating: val })}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            formData.rating === val
                              ? 'bg-amber-400 text-black shadow-sm font-black'
                              : 'bg-[var(--card)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                          }`}
                        >
                          {val.toFixed(1)}★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Message Textarea */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                      {t.messageLabel} <span className="text-rose-500">*</span>
                    </label>
                    <span className={`text-[10px] font-mono ${
                      formData.message.trim().length >= 10 ? 'text-emerald-500' : 'text-[var(--text-muted)]'
                    }`}>
                      {formData.message.length}/500 (min. 10)
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                    className="w-full p-4 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 transition-all resize-none shadow-xs leading-relaxed"
                  />
                </div>

                {/* Live Card Preview Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2 text-[11px] font-bold text-[var(--accent)] hover:underline"
                  >
                    <Eye size={13} />
                    <span>{showPreview ? (lang === 'en' ? 'Hide Live Preview' : 'Sembunyikan Pratinjau') : (lang === 'en' ? 'Preview Your Review Card' : 'Lihat Pratinjau Kartu Ulasan')}</span>
                  </button>

                  {showPreview && (
                    <div className="mt-3 p-5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-md animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(formData.rating, 14)}
                          <span className="text-xs font-black text-amber-500 ml-1">
                            {formData.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--icon-bg)] text-[var(--text-muted)] border border-[var(--border)]">
                          {formData.relation}
                        </span>
                      </div>
                      <p className="text-xs italic text-[var(--text)] opacity-90 mb-4 leading-relaxed">
                        "{formData.message.trim() || (lang === 'en' ? 'Your feedback message will appear here...' : 'Pesan ulasan Anda akan tampil di sini...')}"
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-amber-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
                          {getInitials(formData.name)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[var(--text)]">
                            {formData.name.trim() || (lang === 'en' ? 'Your Name' : 'Nama Anda')}
                          </div>
                          <div className="text-[9px] text-[var(--text-muted)]">
                            {formData.role.trim() || 'Role'} {formData.company ? `• ${formData.company}` : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Modal Footer Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] shrink-0 gap-3">
              <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1.5">
                <HeartHandshake size={14} className="text-[var(--accent)]" />
                {lang === 'en' ? 'Shared with all visitors' : 'Tersimpan untuk semua pengunjung'}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  form="reviewForm"
                  disabled={isSubmitting || formData.name.trim().length < 2 || formData.message.trim().length < 10}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[var(--accent)]/20 disabled:opacity-40 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>{t.submittingBtn}</span>
                    </>
                  ) : (
                    <span>{t.submitBtn}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
