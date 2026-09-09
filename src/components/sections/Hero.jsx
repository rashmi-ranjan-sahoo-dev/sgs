import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import {
  HERO_SLIDES,
  HERO_BRAND_TAGLINE,
  HERO_SUPPORT_CONTACT,
} from '@/data/heroSlides';
import FunFacts from './FunFacts';

/**
 * SIRI Group Hero Section Component
 *
 * Inspired by Consulo Home-2 Layout & Aesthetics:
 * - Subheading badge with sparkle accents
 * - Display typography with custom curved decorative highlight
 * - Dual action: Primary 'Get Started' CTA + Consulo-style Phone consultation link
 * - Infinite 2D rotating stamp badge (Consulo signature '.banner-badge')
 * - 2D floating glassmorphic metric card with continuous subtle floating animation
 * - 3-slide automatic rotation every 8 seconds (rock-solid timer with infinite loop)
 * - Interactive Next/Prev arrows and segmented thumbnail progress indicators
 * - Fully responsive across mobile, tablet, laptop, and 4K desktop
 */
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation and timer refs
  const heroRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const isInitialMountRef = useRef(true);
  const timerTweenRef = useRef(null);
  const rotatingBadgeRef = useRef(null);
  const floatingMetricRef = useRef(null);
  const underlinePathRef = useRef(null);
  const imageCardRef = useRef(null);
  const controlsRef = useRef(null);
  const bottomBarRef = useRef(null);

  // Content refs for slide transitions
  const categoryRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRefs = useRef([]);
  const progressRefs = useRef([]);

  const SLIDE_DURATION = 8; // 8 seconds per slide

  /**
   * Transition cleanly to target slide index
   */
  const goToSlide = useCallback(
    (targetIndex) => {
      if (isAnimatingRef.current || targetIndex === activeIndex) return;

      isAnimatingRef.current = true;
      const prevIndex = activeIndex;

      // Kill and reset timer tween
      if (timerTweenRef.current) {
        timerTweenRef.current.kill();
        timerTweenRef.current = null;
      }

      // Reset all progress bars
      progressRefs.current.forEach((bar, idx) => {
        if (bar) {
          gsap.set(bar, { scaleX: idx === targetIndex ? 0 : 0 });
        }
      });

      // Check motion preference
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        if (imageRefs.current[prevIndex]) {
          gsap.to(imageRefs.current[prevIndex], { opacity: 0, duration: 0.2 });
        }
        if (imageRefs.current[targetIndex]) {
          gsap.to(imageRefs.current[targetIndex], { opacity: 1, duration: 0.2 });
        }
        setActiveIndex(targetIndex);
        isAnimatingRef.current = false;
        return;
      }

      // Step 1: Smoothly animate outgoing text elements
      const outgoingElements = [
        categoryRef.current,
        titleRef.current,
        subtitleRef.current,
        ctaRef.current,
      ].filter(Boolean);

      gsap.to(outgoingElements, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        stagger: 0.02,
        ease: 'power2.in',
        onComplete: () => {
          // Step 2: Cross-fade images
          const prevImg = imageRefs.current[prevIndex];
          const nextImg = imageRefs.current[targetIndex];

          if (prevImg) {
            gsap.to(prevImg, {
              opacity: 0,
              duration: 0.75,
              ease: 'power2.inOut',
            });
          }

          if (nextImg) {
            gsap.fromTo(
              nextImg,
              { opacity: 0, scale: 1.05 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.85,
                ease: 'power2.out',
              }
            );
          }

          // Step 3: Update React state to mount new text
          setActiveIndex(targetIndex);

          // Step 4: Animate incoming text in with fresh stagger
          requestAnimationFrame(() => {
            const incomingElements = [
              categoryRef.current,
              titleRef.current,
              subtitleRef.current,
              ctaRef.current,
            ].filter(Boolean);

            gsap.fromTo(
              incomingElements,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.52,
                stagger: 0.07,
                ease: 'power3.out',
                onComplete: () => {
                  isAnimatingRef.current = false;
                },
              }
            );
          });
        },
      });
    },
    [activeIndex]
  );

  const handleNext = useCallback(() => {
    goToSlide((activeIndex + 1) % HERO_SLIDES.length);
  }, [activeIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((activeIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [activeIndex, goToSlide]);

  /**
   * Initial Opening Entrance Animation (Slow, Cool, Cinematic for all screens)
   */
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 1.15, // Starts gracefully as the PageLoader curtain reveals
        defaults: { ease: 'power3.out' },
      });

      // 1. Subheading pill with sparkles
      if (categoryRef.current) {
        tl.fromTo(
          categoryRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85 }
        );
      }

      // 2. Display Title
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.05 },
          '-=0.65'
        );
      }

      // 3. Draw curved brush underline SVG path
      if (underlinePathRef.current) {
        tl.fromTo(
          underlinePathRef.current,
          { strokeDasharray: 100, strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 0.95, ease: 'power2.out' },
          '-=0.55'
        );
      }

      // 4. Subtitle paragraph
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.6'
        );
      }

      // 5. Actions wrap (CTA + Phone Consultation)
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 22, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85 },
          '-=0.5'
        );
      }

      // 6. Right Visual Image Card (zooms smoothly from scale 1.12 to 1.0)
      if (imageCardRef.current) {
        tl.fromTo(
          imageCardRef.current,
          { opacity: 0, scale: 1.12, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'power3.out' },
          '-=1.2'
        );
      }

      // 7. Rotating Stamp Badge (pops in with spring and begins continuous 360° rotation)
      if (rotatingBadgeRef.current) {
        tl.fromTo(
          rotatingBadgeRef.current,
          { opacity: 0, scale: 0, rotation: -60 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1.0, ease: 'back.out(1.6)' },
          '-=0.8'
        );
      }

      // 8. Floating Metric Card (settles into position)
      if (floatingMetricRef.current) {
        tl.fromTo(
          floatingMetricRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.7'
        );
      }

      // 9. Slide navigation controls & bottom status strip
      if (controlsRef.current) {
        tl.fromTo(
          controlsRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.5'
        );
      }

      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.4'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /**
   * 8-Second Progress Bar and Automatic Carousel Cycle
   */
  useEffect(() => {
    const activeProgressBar = progressRefs.current[activeIndex];
    if (!activeProgressBar) return;

    // Set origin to left and scale to 0
    gsap.set(activeProgressBar, { scaleX: 0, transformOrigin: 'left center' });

    // For first slide on initial mount, delay timer by 2.2s so user enjoys the opening animation
    const delay = isInitialMountRef.current ? 2.2 : 0;
    isInitialMountRef.current = false;

    // Tween the progress bar continuously for 8 seconds
    const tween = gsap.to(activeProgressBar, {
      scaleX: 1,
      duration: SLIDE_DURATION,
      delay,
      ease: 'none',
      transformOrigin: 'left center',
      onComplete: () => {
        // Automatically advance to the next slide in infinite loop
        handleNext();
      },
    });

    timerTweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [activeIndex, handleNext]);

  /**
   * 2D Continuous Animations (Consulo Signature Elements)
   */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Consulo Infinite 2D Rotating Stamp Badge
      if (rotatingBadgeRef.current) {
        gsap.to(rotatingBadgeRef.current, {
          rotation: 360,
          duration: 22,
          repeat: -1,
          ease: 'none',
        });
      }

      // 2. Floating 2D Metric Card (gentle organic bobbing)
      if (floatingMetricRef.current) {
        gsap.to(floatingMetricRef.current, {
          y: -8,
          duration: 2.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="SIRI Group Key Solutions"
      aria-roledescription="carousel"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-28 pb-2 sm:pt-32 sm:pb-3 lg:pt-36 lg:pb-4 overflow-hidden bg-background"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. Layered Background Aesthetics (Consulo Inspiration)
      ───────────────────────────────────────────────────────────── */}
      {/* Architectural Dot Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0A2E5C_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035]"
      />

      {/* Ambient Gradient Light Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] w-[650px] h-[650px] rounded-full bg-primary-soft/70 blur-3xl opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[-15%] w-[550px] h-[550px] rounded-full bg-secondary-soft/60 blur-3xl opacity-55"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. Main Content Grid (Two-Column Desktop, Stacked Mobile)
      ───────────────────────────────────────────────────────────── */}
      <div className="container relative z-10 mx-auto my-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Content, Display Typography, Actions            */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Consulo Subheading Pill with Sparkle Accents */}
            <div
              ref={categoryRef}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface border border-border text-xs sm:text-caption font-bold tracking-wider text-primary w-fit mb-5 shadow-subtle will-change-transform"
            >
              {/* Left sparkle star */}
              <svg
                className="w-3.5 h-3.5 text-secondary shrink-0"
                viewBox="0 0 14 14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286" />
              </svg>

              <span className="uppercase text-secondary font-extrabold tracking-widest">
                {currentSlide.category}
              </span>
              <span className="text-muted/60">&bull;</span>
              <span className="text-muted-foreground font-semibold">
                {currentSlide.badge}
              </span>

              {/* Right sparkle star */}
              <svg
                className="w-3.5 h-3.5 text-secondary shrink-0"
                viewBox="0 0 14 14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286" />
              </svg>
            </div>

            {/* Consulo-Style Display Title with Custom Curved Highlight */}
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-[3.9rem] font-bold text-primary tracking-tight leading-[1.12] mb-5 min-h-[2.35em] flex items-center will-change-transform"
            >
              <span>
                {currentSlide.titleParts.before}{' '}
                <span className="relative inline-block text-secondary">
                  <span>{currentSlide.titleParts.highlight}</span>
                  {/* Consulo artistic curved brush underline */}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-secondary/70 overflow-visible"
                    viewBox="0 0 100 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      ref={underlinePathRef}
                      d="M2 9C28 2.5 72 2.5 98 8.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                {currentSlide.titleParts.after}
              </span>
            </h1>

            {/* Slide Subtitle (Stable vertical bounding box) */}
            <p
              ref={subtitleRef}
              className="text-muted-foreground text-base sm:text-lg md:text-[1.1rem] leading-relaxed max-w-xl mb-8 min-h-[3.8em] flex items-start will-change-transform"
            >
              {currentSlide.subtitle}
            </p>

            {/* Consulo-Style Actions Wrap: Primary CTA + Phone Consultation */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-5 sm:gap-6 mb-10 sm:mb-12 will-change-transform"
            >
              {/* Primary Get Started Button with Circular Arrow Container */}
              <a
                href={currentSlide.href}
                className="group relative inline-flex items-center gap-3.5 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-button shadow-card hover:bg-primary-light hover:shadow-hover transition-all duration-300 transform active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <span>{currentSlide.ctaText}</span>
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </a>

              {/* Consulo-Style Direct Consultation Phone Call Element */}
              <a
                href={HERO_SUPPORT_CONTACT.href}
                className="group flex items-center gap-3.5 text-foreground hover:text-primary transition-colors duration-200"
                aria-label={`Call SIRI Group at ${HERO_SUPPORT_CONTACT.phone}`}
              >
                <div className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center shadow-subtle group-hover:border-secondary group-hover:bg-secondary-soft transition-all duration-200">
                  <svg
                    className="w-5 h-5 text-secondary transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-semibold text-muted uppercase tracking-wider">
                    {HERO_SUPPORT_CONTACT.label}
                  </span>
                  <span className="block text-sm sm:text-base font-bold text-primary group-hover:text-secondary transition-colors duration-200">
                    {HERO_SUPPORT_CONTACT.phone}
                  </span>
                </div>
              </a>
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Consulo-Style Slide Controls: Arrows + Thumbnails          */}
            {/* ────────────────────────────────────────────────────────── */}
            <div
              ref={controlsRef}
              className="pt-6 border-t border-border/85 will-change-transform"
              role="tablist"
              aria-label="SIRI Group service solutions"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Solutions Overview ({activeIndex + 1} of {HERO_SLIDES.length})
                </span>

                {/* Next & Previous Interactive Arrow Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Slide"
                    className="w-8 h-8 rounded-full border border-border bg-surface flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:scale-95"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Slide"
                    className="w-8 h-8 rounded-full border border-border bg-surface flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:scale-95"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 3 Interactive Slide Tab Cards with 8s Progress Bars */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                {HERO_SLIDES.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Slide ${slide.id}: ${slide.category}`}
                      tabIndex={0}
                      onClick={() => goToSlide(index)}
                      className={`group text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                        isActive
                          ? 'bg-surface border-secondary shadow-card'
                          : 'bg-surface/50 border-border hover:bg-surface hover:border-border/80'
                      }`}
                    >
                      {/* Segmented Progress Track */}
                      <div className="w-full h-1 bg-border/70 rounded-full overflow-hidden mb-2 relative">
                        <div
                          ref={(el) => (progressRefs.current[index] = el)}
                          className={`absolute inset-0 h-full w-full rounded-full ${
                            isActive ? 'bg-secondary' : 'bg-transparent'
                          }`}
                          style={{
                            transform: 'scaleX(0)',
                            transformOrigin: 'left center',
                          }}
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-bold transition-colors duration-200 ${
                            isActive ? 'text-secondary' : 'text-muted'
                          }`}
                        >
                          {slide.id}
                        </span>
                        <span
                          className={`text-xs font-semibold tracking-tight truncate hidden sm:inline transition-colors duration-200 ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {slide.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Consulo Visual Card, Rotating Stamp, Float 2D  */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            {/* Consulo's Infinite 2D Rotating Circular Stamp Badge */}
            <div
              ref={rotatingBadgeRef}
              className="absolute -top-7 -left-5 sm:-top-8 sm:-left-7 z-30 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none drop-shadow-lg"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full text-primary"
              >
                {/* Circular path for the text */}
                <path
                  id="siriStampCircle"
                  d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                  fill="none"
                />
                {/* White circular background disc with border */}
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                />
                {/* Rotating curved text around perimeter */}
                <text className="text-[9.5px] font-extrabold uppercase tracking-[0.24em] fill-primary">
                  <textPath href="#siriStampCircle">
                    &bull; SIRI GROUP &bull; PEOPLE &bull; PURPOSE &bull; TRAVEL
                  </textPath>
                </text>
                {/* Central Star Emblem */}
                <g transform="translate(48, 48)">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-secondary"
                  >
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </g>
              </svg>
            </div>

            {/* Main Visual Image Card */}
            <div
              ref={imageCardRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] xl:aspect-[1/1] max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-border/85 bg-surface will-change-transform"
            >
              {/* Stacked Images for instantaneous cross-fade without layout shift */}
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={slide.id}
                    ref={(el) => (imageRefs.current[index] = el)}
                    className="absolute inset-0 w-full h-full transition-opacity duration-300"
                    style={{
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 10 : 1,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    aria-hidden={!isActive}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}

              {/* Bottom Subtle Gradient for contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-transparent pointer-events-none z-20"
              />

              {/* Top-Right: Slide Counter Pill Badge */}
              <div className="absolute top-5 right-5 z-30 px-3.5 py-1.5 rounded-full bg-dark/65 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-subtle">
                <span className="text-secondary-light font-bold">
                  {currentSlide.id}
                </span>
                <span className="text-white/60">/</span>
                <span className="text-white/80">03</span>
              </div>

              {/* Consulo-Style Floating 2D Metric Card (bottom-left) */}
              <div
                ref={floatingMetricRef}
                className="absolute bottom-6 left-6 right-6 sm:right-auto z-30 bg-surface/95 backdrop-blur-md border border-white/40 p-3.5 sm:p-4 rounded-2xl shadow-dark-card flex items-center gap-3.5 max-w-xs will-change-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-secondary">
                    {activeIndex === 0 ? '🏆' : activeIndex === 1 ? '🌱' : '✈️'}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold text-primary leading-none">
                      {currentSlide.metric.value}
                    </span>
                    <span className="text-xs font-semibold text-foreground truncate">
                      {currentSlide.metric.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-muted truncate block mt-0.5">
                    {currentSlide.metric.tag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. Lower Hero: "Our Fun Facts" 2D Cards Section (Corpox Style)
        ───────────────────────────────────────────────────────────── */}
        <FunFacts />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Bottom Brand Status Strip & Scroll Indicator
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={bottomBarRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mt-3 sm:mt-4 flex items-center justify-between text-caption text-muted border-t border-border/60 pt-3 will-change-transform"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="hidden sm:inline font-medium">
            {HERO_BRAND_TAGLINE}
          </span>
          <span className="sm:hidden font-medium">SIRI Group Solutions</span>
        </div>

        <a
          href="#services"
          className="hover:text-primary font-medium transition-colors duration-200 flex items-center gap-1.5"
          aria-label="Scroll down to explore all services"
        >
          <span>Discover More</span>
          <svg
            className="w-3.5 h-3.5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
