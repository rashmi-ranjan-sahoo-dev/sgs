import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import siriLogo from '@/assets/images/siri-logo.png';

/**
 * PageLoader Component
 *
 * Provides a cinematic, slow, high-end opening curtain reveal animation
 * on first page load or every browser refresh.
 *
 * Sequence:
 * 1. Deep blue luxury curtain veil with glowing SIRI monogram
 * 2. Animated emerald progress accent line sweeps across
 * 3. Curtain smoothly wipes upward with power4.inOut ease
 * 4. Triggers synchronized Header and Hero entrance sequence
 */
export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    // Safety fallback: guaranteed to dismiss loader even if GSAP timeline is stalled
    const fallbackTimer = setTimeout(() => {
      setIsDone(true);
      if (typeof window !== 'undefined') {
        window.__pageLoaderDone = true;
        window.dispatchEvent(new CustomEvent('pageLoaderDone'));
      }
      if (onComplete) onComplete();
    }, 2500);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(fallbackTimer);
          setIsDone(true);
          if (typeof window !== 'undefined') {
            window.__pageLoaderDone = true;
            window.dispatchEvent(new CustomEvent('pageLoaderDone'));
          }
          if (onComplete) onComplete();
        },
      });

      // 1. Logo and container emerge slowly and gracefully
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 18, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }
      )
        // 2. Emerald accent progress line sweeps across
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
          },
          '-=0.25'
        )
        // 3. Subtitle tag gently fades in
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.45'
        )
        // 4. Content elements dissolve upward
        .to(
          contentRef.current,
          { opacity: 0, y: -18, duration: 0.45, ease: 'power2.in' },
          '+=0.15'
        )
        // 5. Luxury curtain smoothly wipes upward to reveal the website
        .to(
          loaderRef.current,
          {
            yPercent: -100,
            duration: 1.0,
            ease: 'power4.inOut',
            onStart: () => {
              if (typeof window !== 'undefined') {
                window.__pageLoaderOpening = true;
                window.dispatchEvent(new CustomEvent('pageLoaderOpening'));
              }
            },
          },
          '-=0.1'
        );
    }, loaderRef);

    return () => {
      clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <aside
      ref={loaderRef}
      role="status"
      aria-live="polite"
      aria-label="Loading SIRI Group website"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0F172A] text-white select-none overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Ambient soft glow inside loader */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-[#0072CE]/15 blur-3xl opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[300px] h-[300px] rounded-full bg-[#72BF44]/10 blur-2xl opacity-40 translate-x-20 translate-y-20"
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center gap-5 px-6 max-w-sm text-center"
      >
        {/* SIRI Logo with original colors on clean white plate */}
        <div className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-white shadow-2xl shadow-blue-950/40 border border-white/30 ring-1 ring-black/5 flex items-center justify-center">
          <img
            src={siriLogo}
            alt="SIRI Group"
            width="180"
            height="68"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        {/* Animated Progress Line in Brand Colors (Green to Blue) */}
        <div className="w-48 sm:w-56 h-[3px] bg-white/15 rounded-full overflow-hidden relative">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-gradient-to-r from-[#72BF44] via-[#0284C7] to-[#0072CE] rounded-full"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
          />
        </div>

        {/* Brand Name & Motto in Original Colors */}
        <div
          ref={subtitleRef}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase">
            <span className="text-[#72BF44]">SIRI</span>{' '}
            <span className="text-[#0072CE]">GROUP</span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400">
            People &bull; Purpose &bull; Travel
          </span>
        </div>
      </div>
    </aside>
  );
}
