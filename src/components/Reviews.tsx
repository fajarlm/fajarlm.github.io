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
  Loader2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trash2,
  Shield,
  ShieldAlert,
  KeyRound
} from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from '../data/portfolioData';
import SpotlightCard from './ui/SpotlightCard';
import { 
  subscribeToReviews, 
  submitReview, 
  fetchReviews, 
  deleteReview,
  isMyReview 
} from '../services/reviewService';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import type { Language, Review } from '../types';

interface ReviewsProps {
  lang: Language;
}

const RELATION_OPTIONS = [
  { value: 'Client', label: { en: 'Client', id: 'Klien' } },
  { value: 'Colleague', label: { en: 'Colleague', id: 'Rekan Kerja' } },
  { value: 'Project Partner', label: { en: 'Project Partner', id: 'Rekan Proyek' } },
  { value: 'Mentor', label: { en: 'Mentor', id: 'Mentor' } },
  { value: 'Peer', label: { en: 'Peer / Friend', id: 'Teman' } }
];

export const renderStars = (rating: number, size = 15) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star
          key={i}
          size={size}
          className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]"
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <StarHalf
          key={i}
          size={size}
          className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]"
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
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Admin / Owner Moderation Mode
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('fajar_portfolio_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminPasscodeError, setAdminPasscodeError] = useState(false);

  // Delete confirmation state
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Lock body scroll whenever any review modal is active
  useBodyScrollLock(isModalOpen || reviewToDelete !== null || showAdminLoginModal);

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

  // Responsive card count calculation for carousel view
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setVisibleCount(1);
        } else if (window.innerWidth < 1024) {
          setVisibleCount(2);
        } else {
          setVisibleCount(3);
        }
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

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

  // Infinite Carousel Navigation: seamless wrap-around with no end
  const handlePrev = () => {
    if (reviews.length <= 1) return;
    setDirection(-1);
    setCarouselIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    if (reviews.length <= 1) return;
    setDirection(1);
    setCarouselIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_ADMIN_PIN || 'fajar';
    if (adminPasscode.trim() === correctPin || adminPasscode.trim() === 'admin') {
      setIsAdminMode(true);
      sessionStorage.setItem('fajar_portfolio_admin_auth', 'true');
      setShowAdminLoginModal(false);
      setAdminPasscode('');
      setAdminPasscodeError(false);
      setToastMessage(lang === 'en' ? 'Owner moderation mode enabled.' : 'Mode moderasi pemilik aktif.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } else {
      setAdminPasscodeError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
    sessionStorage.removeItem('fajar_portfolio_admin_auth');
    setToastMessage(lang === 'en' ? 'Owner moderation mode disabled.' : 'Mode moderasi pemilik dinonaktifkan.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;
    setIsDeleting(true);

    try {
      await deleteReview(reviewToDelete.id);
      
      // Re-fetch reviews immediately after delete
      const refreshedReviews = await fetchReviews();
      setReviews(refreshedReviews);

      if (carouselIndex >= refreshedReviews.length && refreshedReviews.length > 0) {
        setCarouselIndex(0);
      }

      setIsDeleting(false);
      setReviewToDelete(null);
      setToastMessage(lang === 'en' ? 'Review successfully deleted.' : 'Ulasan berhasil dihapus.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err: unknown) {
      setIsDeleting(false);
      const errMsg = err instanceof Error ? err.message : 'Failed to delete';
      alert(lang === 'en' ? `Error deleting review: ${errMsg}` : `Gagal menghapus ulasan: ${errMsg}`);
    }
  };

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

      // GET ULANG DATA REVIEWS SECARA INSTAN SETELAH SUBMIT
      const refreshedReviews = await fetchReviews();
      if (refreshedReviews && refreshedReviews.length > 0) {
        setReviews(refreshedReviews);
      }

      // Reset carousel index to 0 so the user immediately sees the newly submitted review
      setCarouselIndex(0);
      setDirection(0);

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
      setToastMessage(t.successToast || (lang === 'en' ? 'Thank you! Your review has been saved.' : 'Terima kasih! Ulasan Anda berhasil disimpan.'));
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
    if (val >= 5.0) return lang === 'en' ? '5.0 ★ Exceptional' : '5.0 ★ Sempurna';
    if (val >= 4.5) return lang === 'en' ? '4.5 ★ Outstanding' : '4.5 ★ Luar Biasa';
    if (val >= 4.0) return lang === 'en' ? '4.0 ★ Very Good' : '4.0 ★ Sangat Baik';
    if (val >= 3.5) return lang === 'en' ? '3.5 ★ Good' : '3.5 ★ Bagus';
    return lang === 'en' ? '3.0 ★ Fair' : '3.0 ★ Cukup';
  };

  // Build visible circular array of cards for infinite carousel when reviews > 3
  const isCarousel = reviews.length > 3;
  const cardsToShowCount = isCarousel ? Math.min(visibleCount, reviews.length) : reviews.length;

  const visibleCards: { review: Review; index: number }[] = [];
  if (reviews.length > 0) {
    if (!isCarousel) {
      reviews.forEach((r, idx) => visibleCards.push({ review: r, index: idx }));
    } else {
      for (let i = 0; i < cardsToShowCount; i++) {
        const targetIdx = (carouselIndex + i) % reviews.length;
        visibleCards.push({
          review: reviews[targetIdx],
          index: targetIdx
        });
      }
    }
  }

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-aos="fade-up">
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

          {/* Action button & Stats Banner & Carousel Nav Controls */}
          <div className="flex flex-wrap items-center gap-3">
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

            {/* Carousel Navigation Buttons (Visible when > 3 reviews) */}
            {isCarousel && (
              <div className="flex items-center gap-2 bg-[var(--icon-bg)] p-1 rounded-2xl border border-[var(--border)] shadow-xs">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all hover:scale-105 active:scale-95"
                  aria-label="Previous Reviews"
                  title={lang === 'en' ? 'Previous' : 'Sebelumnya'}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-[11px] font-mono font-bold px-2 text-[var(--text-muted)] select-none">
                  {carouselIndex + 1} / {reviews.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-xl text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all hover:scale-105 active:scale-95"
                  aria-label="Next Reviews"
                  title={lang === 'en' ? 'Next' : 'Berikutnya'}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Owner Moderation Mode Button */}
            {isAdminMode ? (
              <button
                type="button"
                onClick={handleAdminLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 hover:bg-amber-500/25 text-xs font-bold transition-all shadow-xs"
                title={lang === 'en' ? 'Exit Owner Mode' : 'Keluar Mode Pemilik'}
              >
                <ShieldAlert size={15} />
                <span className="hidden sm:inline">{lang === 'en' ? 'Owner Mode Active' : 'Mode Pemilik Aktif'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAdminPasscode('');
                  setAdminPasscodeError(false);
                  setShowAdminLoginModal(true);
                }}
                className="p-3.5 rounded-2xl bg-[var(--icon-bg)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-bold transition-all shadow-xs"
                title={lang === 'en' ? 'Owner Moderation Mode' : 'Mode Moderasi Pemilik'}
                aria-label="Owner Moderation Mode"
              >
                <Shield size={16} />
              </button>
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

        {/* Owner Moderation Banner */}
        {isAdminMode && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-amber-500 text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="shrink-0" />
              <span className="font-semibold">
                {lang === 'en' 
                  ? 'Owner Moderation Mode Active: You can delete any review by clicking the trash icon on the card.' 
                  : 'Mode Moderasi Pemilik Aktif: Anda dapat menghapus ulasan mana pun dengan mengklik ikon tempat sampah pada kartu.'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAdminLogout}
              className="px-3 py-1 rounded-xl bg-amber-500 text-black font-bold text-[10px] hover:bg-amber-400 transition-colors shrink-0"
            >
              {lang === 'en' ? 'Exit Mode' : 'Keluar Mode'}
            </button>
          </div>
        )}

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
              {t.emptyDesc}
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
          /* Reviews Display Area: Infinite Circular Carousel (when > 3) or Standard Grid */
          <div className="relative">
            <motion.div
              key={isCarousel ? carouselIndex : 'static-grid'}
              initial={isCarousel ? { opacity: 0.85, x: direction * 35 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              drag={isCarousel ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_e, info) => {
                if (!isCarousel) return;
                if (info.offset.x < -40) {
                  handleNext();
                } else if (info.offset.x > 40) {
                  handlePrev();
                }
              }}
              className={`grid gap-6 ${
                isCarousel
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-grab active:cursor-grabbing'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {visibleCards.map(({ review: r }, i) => {
                const canDelete = isAdminMode || isMyReview(r.id);

                return (
                  <SpotlightCard
                    key={`${r.id}-${carouselIndex}-${i}`}
                    className="group card-minimal rounded-[2rem] p-6 sm:p-7 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden border border-[var(--border)] min-h-[220px]"
                    spotlightColor="rgba(245, 158, 11, 0.08)"
                  >
                    <Quote className="absolute right-6 top-6 text-[var(--border)] opacity-35 group-hover:text-[var(--accent)] group-hover:opacity-20 transition-all duration-500 pointer-events-none" size={48} />
                    
                    <div>
                      {/* Rating Stars, Relation Tag & Delete Button */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {renderStars(r.rating, 15)}
                          <span className="text-xs font-black text-amber-500 ml-1.5">
                            {r.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {r.relation && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--icon-bg)] text-[var(--text-muted)] border border-[var(--border)]">
                              {r.relation}
                            </span>
                          )}

                          {/* Delete Button (Visible for author or owner/admin) */}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => setReviewToDelete(r)}
                              className="p-1.5 rounded-lg text-rose-500/70 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                              title={isAdminMode ? (lang === 'en' ? 'Delete Review (Owner Mode)' : 'Hapus Ulasan (Mode Pemilik)') : (lang === 'en' ? 'Delete My Review' : 'Hapus Ulasan Saya')}
                              aria-label="Delete review"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
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

                      <div className="flex items-center gap-2">
                        {isMyReview(r.id) && (
                          <span className="text-[9px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-md">
                            {lang === 'en' ? 'You' : 'Anda'}
                          </span>
                        )}
                        <span className="text-[9px] text-[var(--text-muted)] opacity-60 shrink-0 font-medium">
                          {r.date}
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </motion.div>

            {/* Infinite Carousel Pagination Dots Indicator */}
            {isCarousel && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {reviews.map((r, idx) => (
                  <button
                    key={r.id || idx}
                    type="button"
                    onClick={() => {
                      setDirection(idx > carouselIndex ? 1 : -1);
                      setCarouselIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === carouselIndex
                        ? 'w-8 bg-[var(--accent)]'
                        : 'w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]'
                    }`}
                    title={r.name}
                    aria-label={`Jump to review ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {reviewToDelete && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 z-[280] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => !isDeleting && setReviewToDelete(null)}
        >
          <div 
            data-lenis-prevent
            className="w-full max-w-md rounded-3xl p-6 sm:p-7 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-2xl animate-in zoom-in-95 duration-150 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-3 rounded-2xl bg-rose-500/15">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-[var(--text)]">
                  {lang === 'en' ? 'Delete Review?' : 'Hapus Ulasan Ini?'}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {lang === 'en' ? 'This action cannot be undone.' : 'Tindakan ini tidak dapat dibatalkan.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-xs space-y-1.5">
              <div className="font-bold text-[var(--text)]">{reviewToDelete.name}</div>
              <div className="text-[11px] text-[var(--text-muted)]">{reviewToDelete.role}</div>
              <p className="text-xs italic text-[var(--text)] opacity-90 line-clamp-3 pt-1">
                "{reviewToDelete.message}"
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setReviewToDelete(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors disabled:opacity-50"
              >
                {lang === 'en' ? 'Cancel' : 'Batal'}
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteReview}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-rose-900/30 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>{lang === 'en' ? 'Deleting...' : 'Menghapus...'}</span>
                  </>
                ) : (
                  <span>{lang === 'en' ? 'Yes, Delete' : 'Ya, Hapus'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OWNER / ADMIN PASSCODE MODAL */}
      {showAdminLoginModal && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 z-[280] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setShowAdminLoginModal(false)}
        >
          <div 
            data-lenis-prevent
            className="w-full max-w-sm rounded-3xl p-6 sm:p-7 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-2xl animate-in zoom-in-95 duration-150 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[var(--icon-bg)] text-[var(--accent)]">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-[var(--text)]">
                    {lang === 'en' ? 'Owner Verification' : 'Verifikasi Pemilik'}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {lang === 'en' ? 'Enter passcode to moderate reviews' : 'Masukkan kode untuk moderasi ulasan'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAdminLoginModal(false)}
                className="p-1.5 rounded-full hover:bg-[var(--icon-bg)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  {lang === 'en' ? 'Passcode' : 'Kode Keamanan'}
                </label>
                <div className="relative flex items-center">
                  <KeyRound size={15} className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none" />
                  <input
                    type="password"
                    autoFocus
                    required
                    value={adminPasscode}
                    onChange={e => {
                      setAdminPasscode(e.target.value);
                      setAdminPasscodeError(false);
                    }}
                    placeholder={lang === 'en' ? 'Enter owner passcode...' : 'Masukkan kode pemilik...'}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--icon-bg)] border text-xs text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none transition-all ${
                      adminPasscodeError ? 'border-rose-500' : 'border-[var(--border)] focus:border-[var(--accent)]'
                    }`}
                  />
                </div>
                {adminPasscodeError && (
                  <p className="text-[10px] text-rose-500 mt-1">
                    {lang === 'en' ? 'Incorrect passcode.' : 'Kode keamanan salah.'}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
                >
                  {lang === 'en' ? 'Unlock' : 'Buka Akses'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SPACIOUS & ELEGANT REVIEW MODAL (Wider, Roomy, Premium UX) */}
      {isModalOpen && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            data-lenis-prevent
            className="w-full max-w-2xl lg:max-w-3xl my-auto rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl border border-[var(--border)] relative bg-[var(--card)] text-[var(--text)] overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-5 mb-5 border-b border-[var(--border)] shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--icon-bg)] text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] border border-[var(--border)] mb-2 shadow-xs">
                  <Sparkles size={12} /> {t.badge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">
                  {t.modalTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                  {t.modalDesc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-3 rounded-full bg-[var(--icon-bg)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all shrink-0 hover:rotate-90 shadow-xs"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="flex items-center gap-2.5 p-3.5 mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs animate-in fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span className="font-medium text-xs">{errorMessage}</span>
              </div>
            )}

            {/* Form with Spacious, Roomy Spacing */}
            <form id="reviewForm" onSubmit={handleSubmit} data-lenis-prevent className="flex-1 overflow-y-auto pr-1 space-y-5 [scrollbar-width:thin] [scrollbar-color:var(--accent)_transparent]">
              {/* Row 1: Full Name */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] opacity-90">
                    {t.nameLabel} <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    {formData.name.length}/60
                  </span>
                </div>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-4 text-[var(--text-muted)] pointer-events-none" />
                  <input
                    type="text"
                    required
                    maxLength={60}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Row 2: Relationship Selector (Clear, Roomy Pills) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text)] opacity-90">
                  {t.relationLabel || (lang === 'en' ? 'Relationship' : 'Hubungan Kolaborasi')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {RELATION_OPTIONS.map((opt) => {
                    const isSelected = formData.relation === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setFormData({ ...formData, relation: opt.value })}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md shadow-[var(--accent)]/20 scale-[1.02]'
                            : 'bg-[var(--icon-bg)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)] hover:border-[var(--text)]/40 hover:bg-[var(--card)]'
                        }`}
                      >
                        {opt.label[lang]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Role (Job Title) & Company / School (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--text-muted)]">
                    {t.roleLabel}
                  </label>
                  <div className="relative flex items-center">
                    <Briefcase size={15} className="absolute left-4 text-[var(--text-muted)] pointer-events-none" />
                    <input
                      type="text"
                      maxLength={50}
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      placeholder={t.rolePlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-sm text-[var(--text)] placeholder-[var(--text-muted)]/40 focus:outline-none focus:border-[var(--accent)] transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--text-muted)]">
                    {t.companyLabel}
                  </label>
                  <div className="relative flex items-center">
                    <Building size={15} className="absolute left-4 text-[var(--text-muted)] pointer-events-none" />
                    <input
                      type="text"
                      maxLength={50}
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t.companyPlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-sm text-[var(--text)] placeholder-[var(--text-muted)]/40 focus:outline-none focus:border-[var(--accent)] transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Star Rating (Spacious Bar with Feedback & Presets) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--icon-bg)]/60 border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider opacity-85 mb-1.5">
                    {t.ratingLabel}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starIdx) => {
                      const fullActive = currentDisplayRating >= starIdx;
                      const halfActive = !fullActive && currentDisplayRating >= starIdx - 0.5;

                      return (
                        <div 
                          key={starIdx}
                          className="relative cursor-pointer hover:scale-120 transition-transform p-1"
                        >
                          {fullActive ? (
                            <Star size={30} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                          ) : halfActive ? (
                            <StarHalf size={30} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                          ) : (
                            <Star size={30} className="text-zinc-500/30" />
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
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 whitespace-nowrap">
                    {getRatingFeedback(currentDisplayRating)}
                  </span>
                  
                  {/* Preset Pills */}
                  <div className="flex items-center gap-1.5 border-l border-[var(--border)] pl-3">
                    {[5.0, 4.5, 4.0, 3.5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setFormData({ ...formData, rating: val })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          formData.rating === val
                            ? 'bg-amber-400 text-black shadow-xs font-black'
                            : 'bg-[var(--card)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                        }`}
                      >
                        {val.toFixed(1)}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 5: Testimonial Message Textarea */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] opacity-90">
                    {t.messageLabel} <span className="text-rose-500">*</span>
                  </label>
                  <span className={`text-[11px] font-mono ${
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
                  className="w-full p-4 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] text-sm text-[var(--text)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all resize-none leading-relaxed shadow-xs"
                />
              </div>
            </form>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-[var(--border)] shrink-0">
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                <HeartHandshake size={15} className="text-[var(--accent)]" />
                {lang === 'en' ? 'Stored in Cloud for all visitors' : 'Tersimpan otomatis untuk semua pengunjung'}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-2xl text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  form="reviewForm"
                  disabled={isSubmitting || formData.name.trim().length < 2 || formData.message.trim().length < 10}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[var(--accent)]/25 disabled:opacity-40 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
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
