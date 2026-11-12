import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, Quote, X, CheckCircle2, User, Building, HeartHandshake } from 'lucide-react';
import { initialReviewsData, translations } from '../data/portfolioData';
import SpotlightCard from './ui/SpotlightCard';
import type { Language, Review } from '../types';

interface ReviewsProps {
  lang: Language;
}

const LOCAL_STORAGE_KEY = 'fajar_portfolio_reviews';

const Reviews: React.FC<ReviewsProps> = ({ lang }) => {
  const t = translations[lang].reviews;

  // Load reviews from localStorage merged with defaults
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return initialReviewsData;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    relation: 'Colleague',
    rating: 5,
    message: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  }, [reviews]);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const fiveStarPercentage = reviews.length > 0
    ? Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)
    : 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    const now = new Date();
    const dateStr = now.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.role.trim() || (lang === 'en' ? 'Peer / Collaborator' : 'Rekan Kolaborasi'),
      company: formData.company.trim() || undefined,
      relation: formData.relation,
      rating: formData.rating,
      message: formData.message.trim(),
      date: dateStr
    };

    setTimeout(() => {
      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({
        name: '',
        role: '',
        company: '',
        relation: 'Colleague',
        rating: 5,
        message: ''
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4500);
    }, 400);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-600 text-white shadow-2xl backdrop-blur-xl border border-emerald-400/40 text-xs md:text-sm font-semibold">
            <CheckCircle2 size={18} className="text-white shrink-0" />
            <span>{t.successToast}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" data-aos="fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--icon-bg)] border border-[var(--border)] text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent)] mb-4">
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
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)]">
              <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <span>{avgRating}</span>
              </div>
              <div className="h-6 w-px bg-[var(--border)]" />
              <div className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider leading-tight">
                <div>{reviews.length} {t.totalReviews}</div>
                <div className="text-emerald-500 font-bold">{fiveStarPercentage}% {lang === 'en' ? 'Satisfaction' : 'Puas'}</div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[var(--text)] text-[var(--bg)] text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-[var(--accent)]/15"
            >
              <MessageSquarePlus size={16} />
              <span>{t.writeReview}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <SpotlightCard
              key={r.id}
              className="group card-minimal rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
              spotlightColor="rgba(245, 158, 11, 0.08)"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <Quote className="absolute right-6 top-6 text-[var(--border)] opacity-30 group-hover:text-[var(--accent)] group-hover:opacity-20 transition-all duration-500 pointer-events-none" size={48} />
              
              <div>
                {/* Rating Stars & Relation Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}
                      />
                    ))}
                  </div>

                  {r.relation && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--icon-bg)] text-[var(--text-muted)] border border-[var(--border)]">
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-amber-500 text-white flex items-center justify-center font-black text-xs shadow-md">
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
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg card-minimal rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-[var(--border)] relative bg-[var(--bg)] text-[var(--text)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[var(--icon-bg)] text-[var(--text)] hover:opacity-70 transition-opacity"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t.badge}
              </span>
              <h3 className="text-2xl font-black tracking-tight mt-1">
                {t.modalTitle}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {t.modalDesc}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                  {t.nameLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User size={14} className="absolute left-3.5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    {t.roleLabel}
                  </label>
                  <div className="relative flex items-center">
                    <HeartHandshake size={14} className="absolute left-3.5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      placeholder={t.rolePlaceholder}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    {t.companyLabel}
                  </label>
                  <div className="relative flex items-center">
                    <Building size={14} className="absolute left-3.5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t.companyPlaceholder}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                  {t.ratingLabel}
                </label>
                <div className="flex items-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating !== null ? hoverRating : formData.rating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 hover:scale-125 transition-transform"
                        aria-label={`${star} star`}
                      >
                        <Star
                          size={24}
                          className={active ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-bold text-amber-500 ml-2">
                    {formData.rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Message */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                  {t.messageLabel} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.messagePlaceholder}
                  className="w-full p-3.5 rounded-xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? t.submittingBtn : t.submitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
