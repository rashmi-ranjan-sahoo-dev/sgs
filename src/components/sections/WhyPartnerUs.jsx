import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHY_PARTNER_DATA } from '@/data/whyPartnerData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * WhyPartnerUs Component (Compact 6 Pillars & Cinematic Scroll Animations)
 *
 * Visual Reference: Consulo Home-2 "Why Choose Us" (.why-choose-us)
 * Content Source of Truth: sirigroup.pdf (Page 11 & Page 15)
 *
 * Features:
 * - Coordinates with PageLoader: animates smoothly on initial load after loader curtain finishes
 * - ScrollTrigger animations trigger as user scrolls to the section and cards
 * - Sleek, compact 6-pillar cards with structured layout and high-contrast typography
 * - Dynamic interactive synchronization: hovering/tapping any card updates the visual stage
 * - Desktop 3D mouse parallax tilt on the visual stage
 * - Fully responsive across mobile, tablet, and desktop
 */
export default function WhyPartnerUs({ loaderComplete = false }) {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const activeBarRef = useRef(null);
  const visualCardRef = useRef(null);
  const floatingBadgeRef = useRef(null);
  const processCardRef = useRef(null);
  const underlinePathRef = useRef(null);
  const triangleRef = useRef(null);
  const gridContainerRef = useRef(null);
  const gridHeaderRef = useRef(null);
  const gridCardsRef = useRef([]);

  // Active pillar selection (0 to 5)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Sync with PageLoader curtain completion
  const [loaderDone, setLoaderDone] = useState(
    () => (typeof window !== 'undefined' && Boolean(window.__pageLoaderDone)) || loaderComplete
  );

  useEffect(() => {
    if (loaderComplete) {
      setLoaderDone(true);
    }
  }, [loaderComplete]);

  useEffect(() => {
    if (loaderDone) return;

    const handleDone = () => setLoaderDone(true);
    window.addEventListener('pageLoaderDone', handleDone);

    // Fallback: in case loader completes or is skipped
    const timer = setTimeout(() => setLoaderDone(true), 2300);

    return () => {
      window.removeEventListener('pageLoaderDone', handleDone);
      clearTimeout(timer);
    };
  }, [loaderDone]);

  // Auto-advance through the 6 reasons every 5.5s unless paused by user interaction
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WHY_PARTNER_DATA.reasons.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSelectCard = useCallback((idx) => {
    setActiveIndex(idx);
    setIsPaused(true);
  }, []);

  // 3D Mouse Parallax Tilt on the visual container (Desktop only)
  const handleMouseMove = useCallback((e) => {
    if (!visualCardRef.current || window.innerWidth < 1024) return;
    const card = visualCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!visualCardRef.current) return;
    visualCardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  // GSAP ScrollTrigger Animations on Scroll
  useEffect(() => {
    if (!loaderDone) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // Refresh ScrollTrigger so all trigger offsets match post-loader layout
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────
      // 1. Entrance timeline for Top Editorial Composition on Scroll
      // ─────────────────────────────────────────────────────────────
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      // Eyebrow badge
      if (eyebrowRef.current) {
        heroTl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: 'opacity,transform' }
        );
      }

      // Heading
      if (headingRef.current) {
        heroTl.fromTo(
          headingRef.current,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.85, clearProps: 'opacity,transform' },
          '-=0.45'
        );
      }

      // Curved underline stroke draw
      if (underlinePathRef.current) {
        heroTl.fromTo(
          underlinePathRef.current,
          { strokeDashoffset: 120 },
          { strokeDashoffset: 0, duration: 0.95, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // Narrative paragraph
      if (textRef.current) {
        heroTl.fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: 'opacity,transform' },
          '-=0.6'
        );
      }

      // Active focus bar
      if (activeBarRef.current) {
        heroTl.fromTo(
          activeBarRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65, clearProps: 'opacity,transform' },
          '-=0.5'
        );
      }

      // Right Visual Box
      if (visualCardRef.current) {
        heroTl.fromTo(
          visualCardRef.current,
          { opacity: 0, scale: 0.93, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: 'power3.out', clearProps: 'opacity,transform' },
          '-=0.7'
        );
      }

      // Triangle accent
      if (triangleRef.current) {
        heroTl.fromTo(
          triangleRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)', clearProps: 'opacity,transform' },
          '-=0.75'
        );
      }

      // Floating process card
      if (processCardRef.current) {
        heroTl.fromTo(
          processCardRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.4)', clearProps: 'opacity,transform' },
          '-=0.6'
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 2. Six Pillars Structured Grid Entrance on Scroll
      // ─────────────────────────────────────────────────────────────
      if (gridContainerRef.current) {
        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        });

        if (gridHeaderRef.current) {
          gridTl.fromTo(
            gridHeaderRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, clearProps: 'opacity,transform' }
          );
        }

        const validCards = gridCardsRef.current.filter(Boolean);
        if (validCards.length > 0) {
          gridTl.fromTo(
            validCards,
            { opacity: 0, y: 35, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
            },
            '-=0.4'
          );
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 3. Gentle continuous floating bob for the top-left badge
      // ─────────────────────────────────────────────────────────────
      if (floatingBadgeRef.current) {
        gsap.to(floatingBadgeRef.current, {
          y: -6,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loaderDone]);

  const activeReason = WHY_PARTNER_DATA.reasons[activeIndex];

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative pt-2 sm:pt-4 lg:pt-6 pb-14 sm:pb-18 lg:pb-20 bg-background overflow-hidden selection:bg-secondary/20 selection:text-primary"
      aria-label="Why Partner With Us - SIRI Group"
    >
      {/* Ambient Radial Lighting */}
      <div
        className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* ============================================================ */}
        {/* TOP EDITORIAL HERO: Left Content & Right Large Visual Stage  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mb-10 sm:mb-12 lg:mb-14">
          {/* Left Column: Eyebrow, Heading, Description & Active Spotlight */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Eyebrow Pill */}
            <div ref={eyebrowRef} className="will-change-transform">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface border border-border text-primary text-xs sm:text-sm font-bold tracking-wider uppercase shadow-subtle">
                <span className="text-secondary shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286" />
                  </svg>
                </span>
                <span>{WHY_PARTNER_DATA.badge}</span>
                <span className="text-secondary shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Display Heading with Signature Curved Animated Highlight */}
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-foreground leading-[1.18] tracking-tight will-change-transform"
            >
              {WHY_PARTNER_DATA.titleParts.before}{' '}
              <span className="relative inline-block text-secondary">
                {WHY_PARTNER_DATA.titleParts.highlight}
                {/* Consulo curved artistic underline */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-secondary/60"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    ref={underlinePathRef}
                    d="M1 9.5C28 2.5 72 2.5 99 9.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    style={{ strokeDasharray: 120, strokeDashoffset: 0 }}
                  />
                </svg>
              </span>
            </h2>

            {/* Supporting Narrative Paragraph from sirigroup.pdf */}
            <p
              ref={textRef}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal max-w-2xl will-change-transform"
            >
              {WHY_PARTNER_DATA.description}
            </p>

            {/* Dynamic Active Spotlight Bar */}
            <div
              ref={activeBarRef}
              className="pt-1 flex items-center justify-between text-xs font-semibold text-muted-foreground will-change-transform"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/15 text-secondary-dark dark:text-secondary-light font-bold text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  Active Focus:
                </span>
                <span className="text-foreground font-bold text-sm">
                  {activeReason.number} — {activeReason.title}
                </span>
              </div>
              <span className="hidden sm:inline text-muted-light text-[11px]">
                (Hover any card below to preview)
              </span>
            </div>
          </div>

          {/* Right Column: High-Resolution Visual Stage & Floating Process Card */}
          <div className="lg:col-span-5 relative">
            <div
              ref={visualCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mx-auto max-w-[480px] lg:max-w-none transition-transform duration-200 ease-out will-change-transform"
            >
              {/* Consulo Decorative Solid Triangle Accent (Bottom Left) */}
              <div
                ref={triangleRef}
                className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-primary z-0 rounded-sm shadow-lg pointer-events-none will-change-transform"
                style={{
                  clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)',
                }}
                aria-hidden="true"
              />

              {/* Secondary Accent Triangle in SIRI Green (Top Right) */}
              <div
                className="absolute -top-3.5 -right-3.5 w-14 h-14 sm:w-18 sm:h-18 bg-secondary/80 z-0 pointer-events-none"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
                }}
                aria-hidden="true"
              />

              {/* Main Image Frame with 6 Layered Crossfading Photos */}
              <div className="relative z-10 overflow-hidden bg-surface shadow-2xl rounded-3xl border border-border">
                <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-muted/20">
                  {WHY_PARTNER_DATA.reasons.map((reason, idx) => {
                    const isCur = idx === activeIndex;

                    return (
                      <div
                        key={reason.number}
                        className={`absolute inset-0 transition-all duration-700 ease-out ${
                          isCur ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                        }`}
                      >
                        <img
                          src={reason.image}
                          alt={reason.alt}
                          loading="lazy"
                          className="w-full h-full object-cover object-center"
                        />
                        {/* Subtle soft gradient overlay so photo remains bright, clean, and visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/50 via-transparent to-black/15 pointer-events-none" />
                      </div>
                    );
                  })}

                  {/* Top-Left Floating Badge (High Contrast & Animated Float) */}
                  <div
                    ref={floatingBadgeRef}
                    className="absolute top-3.5 left-3.5 z-20 will-change-transform"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl text-xs font-extrabold text-slate-900 dark:text-white">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                      <span>{activeReason.badge}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  Consulo-Inspired Floating Process Accent Card (High Contrast)
                  Source of truth: sirigroup.pdf (Page 15)
              ───────────────────────────────────────────────────────────── */}
              <div
                ref={processCardRef}
                className="absolute -bottom-5 -right-2 sm:-bottom-7 sm:-right-5 z-20 w-[240px] sm:w-[265px] p-3.5 sm:p-4 rounded-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.18)] select-none group/card"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">
                    {WHY_PARTNER_DATA.processCard.tag} • {activeReason.number}
                  </span>
                </div>

                <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-300 group-hover/card:text-secondary-dark">
                  {activeReason.highlightStat}
                </div>

                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                  {activeReason.caption}
                </div>

                {/* Bottom Verification Seal */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 text-secondary-dark font-bold">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Reliable & Transparent</span>
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">SIRI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM STRUCTURED GRID: Six Pillars Cards (Compact & Sleek)  */}
        {/* ============================================================ */}
        <div ref={gridContainerRef}>
          {/* Section Divider & Grid Title */}
          <div
            ref={gridHeaderRef}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-5 pb-2.5 border-b border-border/80 will-change-transform"
          >
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
                The Six Pillars of Our Partnership
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Comprehensive B2B capabilities from recruitment to corporate mobility and financing.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-secondary">
              <span>01 — 06 STRATEGIC PILLARS</span>
            </div>
          </div>

          {/* Fully Responsive Compact 3x2 Structured Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5">
            {WHY_PARTNER_DATA.reasons.map((reason, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={reason.number}
                  ref={(el) => (gridCardsRef.current[idx] = el)}
                  onClick={() => handleSelectCard(idx)}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer select-none group will-change-transform ${
                    isActive
                      ? 'bg-surface border-2 border-secondary shadow-lg shadow-secondary/10 -translate-y-1'
                      : 'bg-surface/80 hover:bg-surface border border-border shadow-xs hover:shadow-md hover:border-secondary/60 hover:-translate-y-1'
                  }`}
                  role="article"
                  aria-label={`${reason.number} ${reason.title}`}
                >
                  {/* Top Bar: Number + Category Badge + Arrow Pill */}
                  <div>
                    <div className="flex items-center justify-between gap-2.5 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xl sm:text-2xl font-black text-secondary group-hover:scale-105 transition-transform">
                          {reason.number}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/15 text-secondary-dark dark:text-secondary-light border border-secondary/20">
                          {reason.badge}
                        </span>
                      </div>

                      {/* Circular Expand Button */}
                      <span
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs ${
                          isActive
                            ? 'bg-secondary text-dark border-secondary'
                            : 'bg-surface border border-border/80 text-muted-foreground group-hover:bg-secondary group-hover:text-dark group-hover:border-secondary'
                        }`}
                      >
                        <svg
                          className={`w-3 h-3 fill-current transition-transform duration-300 ${
                            isActive ? 'rotate-90' : 'group-hover:translate-x-0.5'
                          }`}
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>

                    {/* Reason Title */}
                    <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {reason.title}
                    </h4>

                    {/* Reason Narrative from sirigroup.pdf */}
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {reason.description}
                    </p>
                  </div>

                  {/* Bottom: Capability Tags & Strategic Seal */}
                  <div className="pt-3 mt-3 border-t border-border/60">
                    {/* Capability Tags (Compact & High Contrast) */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {reason.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-semibold bg-muted/15 dark:bg-slate-800/90 border border-border/80 text-slate-700 dark:text-slate-200"
                        >
                          ✦ {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Feature Seal */}
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 text-secondary-dark font-bold">
                        <svg className="w-3 h-3 fill-current text-secondary" viewBox="0 0 20 20" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{reason.highlightStat}</span>
                      </span>
                      <span className="font-mono text-[9px] text-muted-light">SIRI Group</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}