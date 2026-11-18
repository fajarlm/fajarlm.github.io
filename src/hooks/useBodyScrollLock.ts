import { useEffect } from 'react';

/**
 * Custom hook to lock body & html scrolling and pause Lenis smooth scroll
 * whenever a modal with scrollable content is opened.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    // Save existing overflow values
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    // Lock page scrolling completely
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Pause Lenis smooth scroll instance if initialized on window
    const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
    if (win.__lenis && typeof win.__lenis.stop === 'function') {
      win.__lenis.stop();
    }

    return () => {
      // Restore previous overflow values
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;

      // Resume Lenis smooth scroll
      if (win.__lenis && typeof win.__lenis.start === 'function') {
        win.__lenis.start();
      }
    };
  }, [isLocked]);
}
