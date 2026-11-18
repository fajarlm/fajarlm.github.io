import { 
  collection, 
  addDoc, 
  onSnapshot, 
  getDocs,
  deleteDoc,
  doc,
  query, 
  orderBy, 
  serverTimestamp,
  type Unsubscribe 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type { Review } from '../types';

const LOCAL_STORAGE_KEY = 'fajar_portfolio_reviews';
const AUTHORED_STORAGE_KEY = 'fajar_portfolio_my_authored_reviews';

/**
 * Get IDs of reviews authored by the current user on this device
 */
export const getMyAuthoredReviewIds = (): string[] => {
  try {
    const saved = localStorage.getItem(AUTHORED_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading authored review ids:', err);
  }
  return [];
};

/**
 * Record a review ID as authored by current user
 */
export const addAuthoredReviewId = (id: string): void => {
  try {
    const current = getMyAuthoredReviewIds();
    if (!current.includes(id)) {
      const updated = [id, ...current];
      localStorage.setItem(AUTHORED_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Error adding authored review id:', err);
  }
};

/**
 * Remove a review ID from authored list
 */
export const removeAuthoredReviewId = (id: string): void => {
  try {
    const current = getMyAuthoredReviewIds();
    const updated = current.filter(item => item !== id);
    localStorage.setItem(AUTHORED_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error removing authored review id:', err);
  }
};

/**
 * Check if a review was authored by current user
 */
export const isMyReview = (id: string): boolean => {
  return getMyAuthoredReviewIds().includes(id);
};

/**
 * Get cached reviews from localStorage
 */
export const getCachedReviews = (): Review[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter(r => !['rev-1', 'rev-2', 'rev-3'].includes(r.id));
      }
    }
  } catch (err) {
    console.error('Error reading cached reviews:', err);
  }
  return [];
};

/**
 * Save reviews to localStorage cache
 */
export const setCachedReviews = (reviews: Review[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Error saving cached reviews:', err);
  }
};

/**
 * Fetch reviews immediately from Firebase Firestore or local cache
 */
export const fetchReviews = async (): Promise<Review[]> => {
  if (isFirebaseConfigured() && db) {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched: Review[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetched.push({
          id: docSnap.id,
          name: data.name || 'Anonymous',
          role: data.role || 'Peer / Collaborator',
          company: data.company || undefined,
          relation: data.relation || 'Colleague',
          rating: typeof data.rating === 'number' ? data.rating : 5.0,
          message: data.message || '',
          date: data.date || ''
        });
      });

      if (fetched.length > 0) {
        setCachedReviews(fetched);
        return fetched;
      }
    } catch (err) {
      console.warn('[Firebase Firestore] fetchReviews error, falling back to cache:', err);
    }
  }

  return getCachedReviews();
};

/**
 * Subscribe to realtime reviews from Firebase Firestore
 * Falls back to local cache if Firebase is not configured.
 */
export const subscribeToReviews = (
  onReviewsUpdated: (reviews: Review[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  // If Firebase is not configured, supply cached data
  if (!isFirebaseConfigured() || !db) {
    onReviewsUpdated(getCachedReviews());
    return () => {};
  }

  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedReviews: Review[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetchedReviews.push({
            id: docSnap.id,
            name: data.name || 'Anonymous',
            role: data.role || 'Peer / Collaborator',
            company: data.company || undefined,
            relation: data.relation || 'Colleague',
            rating: typeof data.rating === 'number' ? data.rating : 5.0,
            message: data.message || '',
            date: data.date || ''
          });
        });

        // Update local cache
        setCachedReviews(fetchedReviews);
        onReviewsUpdated(fetchedReviews);
      },
      (error) => {
        console.warn('[Firebase Firestore] Realtime listener error, falling back to cache:', error);
        if (onError) onError(error);
        onReviewsUpdated(getCachedReviews());
      }
    );

    return unsubscribe;
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to subscribe to reviews');
    console.error('[Firebase Firestore] Subscription failed:', error);
    if (onError) onError(error);
    onReviewsUpdated(getCachedReviews());
    return () => {};
  }
};

/**
 * Submit a new review
 * Saves to Firestore when configured, and always keeps local cache up to date.
 */
export const submitReview = async (reviewInput: {
  name: string;
  role?: string;
  company?: string;
  relation: string;
  rating: number;
  message: string;
  date: string;
}): Promise<Review> => {
  const newReview: Review = {
    id: `rev-${Date.now()}`,
    name: reviewInput.name.trim(),
    role: reviewInput.role?.trim() || 'Peer / Collaborator',
    company: reviewInput.company?.trim() || undefined,
    relation: reviewInput.relation,
    rating: reviewInput.rating,
    message: reviewInput.message.trim(),
    date: reviewInput.date
  };

  if (isFirebaseConfigured() && db) {
    const reviewsRef = collection(db, 'reviews');
    const docRef = await addDoc(reviewsRef, {
      name: newReview.name,
      role: newReview.role,
      company: newReview.company || null,
      relation: newReview.relation,
      rating: newReview.rating,
      message: newReview.message,
      date: newReview.date,
      createdAt: serverTimestamp()
    });
    newReview.id = docRef.id;
  } else {
    // Save to local cache as fallback
    const cached = getCachedReviews();
    const updated = [newReview, ...cached];
    setCachedReviews(updated);
  }

  // Record this ID as authored by this device
  addAuthoredReviewId(newReview.id);

  return newReview;
};

/**
 * Delete a review (by author or admin/owner)
 */
export const deleteReview = async (reviewId: string): Promise<boolean> => {
  try {
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, 'reviews', reviewId);
      await deleteDoc(docRef);
    }

    // Always update local cache
    const cached = getCachedReviews();
    const updated = cached.filter(r => r.id !== reviewId);
    setCachedReviews(updated);
    removeAuthoredReviewId(reviewId);

    return true;
  } catch (err) {
    console.error('[Firebase Firestore] Error deleting review:', err);
    throw err;
  }
};
