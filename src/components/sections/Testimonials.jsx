import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 't-hr',
    vertical: 'Executive Search & Staffing',
    accentColor: '#72BF44',
    tagBg: 'bg-[#72BF44]/15 border-[#72BF44]/35 text-[#72BF44]',
    quote:
      'SIRI Group transformed our pan-India engineering recruitment. Their multi-stage screening ensured every candidate was rigorously vetted and aligned with our leadership culture. They filled critical executive mandates in record time.',
    author: 'Rajesh Sharma',
    role: 'VP — Human Resources & Talent Strategy',
    company: 'Leading Automotive & Industrial Conglomerate',
    stat: '1,200+ Verified Placements',
    rating: 5,
  },
  {
    id: 't-travel',
    vertical: 'Corporate Travel & Mobility',
    accentColor: '#0072CE',
    tagBg: 'bg-[#0072CE]/15 border-[#0072CE]/35 text-[#0072CE]',
    quote:
      'Centralizing our multi-city executive mobility with SIRI Corporate Travel eliminated all logistics friction. From dynamic flight desks to urgent visa processing and premium hotel partnerships, their 24/7 dedicated support is exceptional.',
    author: 'Ananya Deshmukh',
    role: 'Director — Procurement & Global Operations',
    company: 'Enterprise Consulting & Cloud Solutions',
    stat: '24/7 Global Desk SLA',
    rating: 5,
  },
  {
    id: 't-loans',
    vertical: 'B2B Financing & Credit',
    accentColor: '#0284C7',
    tagBg: 'bg-[#0284C7]/15 border-[#0284C7]/35 text-[#0284C7]',
    quote:
      'SIRI Fin Hub orchestrated our working capital consortium syndication effortlessly. Their deep institutional network, fast-track documentation, and transparent terms saved us critical months during a key operational expansion.',
    author: 'Vikram Malhotra',
    role: 'Managing Director & Founder',
    company: 'National Logistics & Freight Solutions',
    stat: 'Fast-Track Credit Sanction',
    rating: 5,
  },
  {
    id: 't-manpower',
    vertical: 'Industrial & Facility Manpower',
    accentColor: '#10B981',
    tagBg: 'bg-[#10B981]/15 border-[#10B981]/35 text-[#10B981]',
    quote:
      'Deploying over 450 certified technical and facility personnel across three manufacturing plants was handled seamlessly by SIRI Groups. 100% statutory compliance, payroll precision, and zero shift disruptions from Day 1.',
    author: 'Suresh Nambiar',
    role: 'Chief Operating Officer',
    company: 'Precision Engineering & Infrastructure Ltd.',
    stat: '100% Statutory Compliant',
    rating: 5,
  },
  {
    id: 't-csr',
    vertical: 'CSR Project Governance',
    accentColor: '#38BDF8',
    tagBg: 'bg-[#38BDF8]/15 border-[#38BDF8]/35 text-[#38BDF8]',
    quote:
      'Their end-to-end CSR project management delivered measurable outcomes for our rural skill development and environmental initiatives. Transparent execution, verified NGO partners, and flawless regulatory documentation throughout.',
    author: 'Pooja Kulkarni',
    role: 'Head of Corporate Affairs & Sustainability',
    company: 'Renewable Power & Clean Energy Corp',
    stat: 'Measurable Impact Metrics',
    rating: 5,
  },
];

export default function Testimonials({ onOpenContact }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const innerCardRefs = useRef([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Track responsive screen width for dynamic 3D positioning
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. GSAP ScrollTrigger Section Entrance
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (carouselTrackRef.current) {
        gsap.fromTo(
          carouselTrackRef.current,
          { opacity: 0, scale: 0.95, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselTrackRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 2. Infinite Auto-Scroll Carousel Timer (Left to Right)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      // Continuous infinite progression: cards glide from right to left
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // ─────────────────────────────────────────────────────────────
  // 3. Navigation Handlers
  // ─────────────────────────────────────────────────────────────
  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 4. Desktop 3D Mouse Parallax Tilt for Active Middle Card
  // ─────────────────────────────────────────────────────────────
  const handleCardMouseMove = (e, index) => {
    if (windowWidth < 1024) return;
    const cardEl = innerCardRefs.current[index];
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardEl, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (index) => {
    const cardEl = innerCardRefs.current[index];
    if (cardEl) {
      gsap.to(cardEl, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 5. Compute Card Position Across 3 Distinct Positions (Left, Middle, Right)
  // ─────────────────────────────────────────────────────────────
  const getDiff = (index) => {
    let diff = index - activeIndex;
    const n = TESTIMONIALS.length;
    while (diff > n / 2) diff -= n;
    while (diff < -n / 2) diff += n;
    return diff;
  };

  const getCardStyle = (diff) => {
    const isWideDesktop = windowWidth >= 1280;
    const isDesktop = windowWidth >= 1024 && windowWidth < 1280;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    if (diff === 0) {
      // MIDDLE (Active Focal Card)
      return {
        transform: 'translate(-50%, -50%) translateX(0px) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto',
        cursor: 'default',
        filter: 'none',
      };
    }

    if (diff === -1) {
      // LEFT POSITION (Previous Card - Separated with clean space)
      const xOffset = isWideDesktop ? -480 : isDesktop ? -430 : isTablet ? -340 : -340;
      const opacity = isWideDesktop || isDesktop || isTablet ? 0.75 : 0;
      const rotateY = isWideDesktop || isDesktop ? 8 : isTablet ? 5 : 0;
      const scale = isWideDesktop ? 0.88 : isDesktop ? 0.86 : isTablet ? 0.84 : 0.8;
      return {
        transform: `translate(-50%, -50%) translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex: 20,
        pointerEvents: isWideDesktop || isDesktop || isTablet ? 'auto' : 'none',
        cursor: 'pointer',
        filter: isWideDesktop || isDesktop || isTablet ? 'none' : 'blur(4px)',
      };
    }

    if (diff === 1) {
      // RIGHT POSITION (Next Card - Separated with clean space)
      const xOffset = isWideDesktop ? 480 : isDesktop ? 430 : isTablet ? 340 : 340;
      const opacity = isWideDesktop || isDesktop || isTablet ? 0.75 : 0;
      const rotateY = isWideDesktop || isDesktop ? -8 : isTablet ? -5 : 0;
      const scale = isWideDesktop ? 0.88 : isDesktop ? 0.86 : isTablet ? 0.84 : 0.8;
      return {
        transform: `translate(-50%, -50%) translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex: 20,
        pointerEvents: isWideDesktop || isDesktop || isTablet ? 'auto' : 'none',
        cursor: 'pointer',
        filter: isWideDesktop || isDesktop || isTablet ? 'none' : 'blur(4px)',
      };
    }

    if (diff === -2) {
      // FAR LEFT (Hidden Offstage, Entering)
      const xOffset = isWideDesktop ? -780 : isDesktop ? -700 : -520;
      return {
        transform: `translate(-50%, -50%) translateX(${xOffset}px) scale(0.72)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(6px)',
      };
    }

    // FAR RIGHT (Hidden Offstage, Entering)
    const xOffset = isWideDesktop ? 780 : isDesktop ? 700 : 520;
    return {
      transform: `translate(-50%, -50%) translateX(${xOffset}px) scale(0.72)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'blur(6px)',
    };
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative pt-6 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 lg:pb-16 w-full overflow-hidden select-none scroll-mt-24"
      aria-label="Client Testimonials - SIRI Groups"
    >
      {/* Ambient Radial Background Glows */}
      <div
        className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-[#0072CE]/8 blur-3xl pointer-events-none -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#72BF44]/8 blur-3xl pointer-events-none translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Generous Mobile Clearance */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0072CE]/30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md text-[#0072CE] text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-xs mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0072CE] animate-pulse" />
            <span>Client Endorsements</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight leading-tight px-2">
            Trusted by Leaders Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0072CE] via-[#0284C7] to-[#72BF44]">
              India&apos;s Core Industries
            </span>
          </h2>
        </div>

        {/* ─────────────────────────────────────────────────────────
            3D PERSPECTIVE 3-CARD SPOTLIGHT STAGE (LEFT, MIDDLE, RIGHT)
        ───────────────────────────────────────────────────────── */}
        <div
          ref={carouselTrackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[300px] sm:h-[290px] lg:h-[280px] flex items-center justify-center [perspective:1400px] my-2 sm:my-4"
        >
          {TESTIMONIALS.map((item, idx) => {
            const diff = getDiff(idx);
            const isCenter = diff === 0;
            const style = getCardStyle(diff);

            return (
              <div
                key={item.id}
                onClick={() => !isCenter && goToSlide(idx)}
                className="absolute top-1/2 left-1/2 will-change-transform select-none w-[90vw] max-w-[340px] sm:max-w-[390px] md:max-w-[340px] lg:max-w-[390px] xl:max-w-[420px]"
                style={{
                  ...style,
                  transition:
                    'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s ease, filter 0.7s ease',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Inner Card wrapper that receives 3D mouse parallax on middle card */}
                <div
                  ref={(el) => (innerCardRefs.current[idx] = el)}
                  onMouseMove={(e) => isCenter && handleCardMouseMove(e, idx)}
                  onMouseLeave={() => isCenter && handleCardMouseLeave(idx)}
                  className={`relative w-full rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 bg-white/95 backdrop-blur-xl border text-slate-900 transition-all duration-300 flex flex-col justify-between ${
                    isCenter
                      ? 'border-[#0072CE]/35 shadow-2xl shadow-slate-900/15 ring-1 ring-[#0072CE]/20'
                      : 'border-slate-200/90 shadow-lg shadow-slate-900/5 hover:border-[#0072CE]/40 hover:opacity-100 hover:shadow-xl'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Decorative Watermark Quote */}
                  <div
                    className="absolute top-2 right-4 sm:top-3 sm:right-5 text-3xl sm:text-5xl font-serif text-slate-200/40 select-none pointer-events-none leading-none -z-10"
                    aria-hidden="true"
                  >
                    “
                  </div>

                  {/* Top Badge: Vertical & Star Rating */}
                  <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider border shrink-0 ${item.tagBg}`}
                    >
                      <span>✦</span>
                      <span>{item.vertical}</span>
                    </span>

                    <div className="flex items-center gap-0.5 text-amber-400 text-[10px] sm:text-xs shrink-0">
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-[11px] sm:text-[13.5px] lg:text-sm text-slate-700 font-medium leading-relaxed mb-2.5 sm:mb-3.5 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author Footer & Credential */}
                  <div className="pt-2 sm:pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <div className="min-w-0 pr-1">
                      <h3 className="text-[11px] sm:text-sm font-black text-[#1E293B] tracking-tight truncate leading-tight">
                        {item.author}
                      </h3>
                      <div className="text-[9px] sm:text-[11px] text-slate-500 font-medium truncate leading-tight mt-0.5">
                        {item.role}
                      </div>
                      <div className="text-[8.5px] sm:text-[10.5px] font-bold text-[#0072CE] truncate leading-tight mt-0.5">
                        {item.company}
                      </div>
                    </div>

                    {/* Impact Metric Chip */}
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg sm:rounded-xl bg-slate-100/90 border border-slate-200 text-[8px] sm:text-[10px] font-black text-slate-700 whitespace-nowrap shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]" />
                        <span>{item.stat}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────
            CAROUSEL CONTROLS & DOTS
        ───────────────────────────────────────────────────────── */}
        <div className="mt-4 sm:mt-7 flex items-center justify-center gap-3 sm:gap-6">
          {/* Previous Arrow Button (Glide Left-to-Right) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white border border-slate-200 text-slate-700 shadow-sm hover:shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer hover:border-[#0072CE] hover:text-[#0072CE]"
          >
            <span className="text-xs sm:text-base font-bold">←</span>
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 sm:w-8 h-1.5 sm:h-2.5 bg-gradient-to-r from-[#0072CE] to-[#72BF44]'
                    : 'w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white border border-slate-200 text-slate-700 shadow-sm hover:shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer hover:border-[#0072CE] hover:text-[#0072CE]"
          >
            <span className="text-xs sm:text-base font-bold">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

