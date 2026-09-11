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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
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

    return () => ctx.revert();
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
        {/* SIRI Logo with frosted plate */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <img
            src={siriLogo}
            alt="SIRI Group"
            width="180"
            height="68"
            className="h-11 sm:h-13 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Animated Progress Accent Line */}
        <div className="w-48 sm:w-56 h-[3px] bg-white/15 rounded-full overflow-hidden relative">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-secondary rounded-full"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
          />
        </div>

        {/* Brand Motto Subtitle */}
        <span
          ref={subtitleRef}
          className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/80"
        >
          People &bull; Purpose &bull; Travel
        </span>
      </div>
    </aside>
  );
}
