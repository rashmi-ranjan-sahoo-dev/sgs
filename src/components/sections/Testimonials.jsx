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

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ─────────────────────────────────────────────────────────────
  // 1. GSAP ScrollTrigger Section Entrance
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
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

      // Carousel entrance
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
  // 2. Infinite Auto-Scroll Carousel Timer (Every 5 Seconds)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  // Reset any desktop mouse parallax GSAP inline props when active slide changes
  useEffect(() => {
    cardRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, { clearProps: 'rotateX,rotateY' });
      }
    });
  }, [activeIndex]);

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
  // 4. Desktop 3D Mouse Parallax Tilt for Active Card
  // ─────────────────────────────────────────────────────────────
  const handleCardMouseMove = (e, index) => {
    if (index !== activeIndex) return;
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    const cardEl = cardRefs.current[index];
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
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (index) => {
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      gsap.to(cardEl, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative pt-2 sm:pt-4 lg:pt-6 pb-4 sm:pb-6 lg:pb-8 w-full overflow-hidden select-none scroll-mt-24"
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
        {/* Header - Compact Spacing */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#0072CE]/30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md text-[#0072CE] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-xs mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0072CE] animate-pulse" />
            <span>Client Endorsements</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight leading-tight">
            Trusted by Leaders Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0072CE] via-[#0284C7] to-[#72BF44]">
              India&apos;s Core Industries
            </span>
          </h2>
        </div>

        {/* ─────────────────────────────────────────────────────────
            3D PERSPECTIVE SPOTLIGHT CAROUSEL TRACK
        ───────────────────────────────────────────────────────── */}
        <div
          ref={carouselTrackRef}
          className="relative w-full max-w-4xl mx-auto min-h-[300px] sm:min-h-[330px] lg:min-h-[360px] flex items-center justify-center [perspective:1400px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {TESTIMONIALS.map((item, idx) => {
            // Position offset relative to active slide
            const offset = (idx - activeIndex + TESTIMONIALS.length) % TESTIMONIALS.length;
            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === TESTIMONIALS.length - 1;

            let cardStyles = '';
            let zIndex = 0;

            if (isCenter) {
              cardStyles =
                'translate-x-0 scale-100 opacity-100 z-30 rotate-y-0 pointer-events-auto cursor-default shadow-2xl shadow-slate-900/15';
              zIndex = 30;
            } else if (isRight) {
              cardStyles =
                'translate-x-[105%] md:translate-x-[68%] scale-90 opacity-0 md:opacity-45 z-10 md:rotate-y-[-18deg] pointer-events-none md:pointer-events-auto md:hover:opacity-75 cursor-pointer';
              zIndex = 10;
            } else if (isLeft) {
              cardStyles =
                'translate-x-[-105%] md:translate-x-[-68%] scale-90 opacity-0 md:opacity-45 z-10 md:rotate-y-[18deg] pointer-events-none md:pointer-events-auto md:hover:opacity-75 cursor-pointer';
              zIndex = 10;
            } else {
              const isFarRight = offset <= Math.floor(TESTIMONIALS.length / 2);
              cardStyles = `${
                isFarRight ? 'translate-x-[140%]' : 'translate-x-[-140%]'
              } scale-75 opacity-0 z-0 pointer-events-none`;
              zIndex = 0;
            }

            return (
              <div
                key={item.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => !isCenter && goToSlide(idx)}
                onMouseMove={(e) => handleCardMouseMove(e, idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                className={`absolute w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[620px] rounded-3xl p-4 sm:p-6 lg:p-7 bg-white/95 backdrop-blur-xl border border-white/80 shadow-slate-900/15 text-slate-900 transition-all duration-700 ease-out flex flex-col justify-between will-change-transform ${cardStyles}`}
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Decorative Giant Watermark Quote */}
                <div
                  className="absolute top-2.5 right-4 sm:top-4 sm:right-6 text-6xl sm:text-7xl lg:text-8xl font-serif text-slate-200/60 select-none pointer-events-none leading-none -z-10"
                  aria-hidden="true"
                >
                  “
                </div>

                {/* Top Badge: Vertical & Star Rating */}
                <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border ${item.tagBg}`}
                  >
                    <span>✦</span>
                    <span>{item.vertical}</span>
                  </span>

                  <div className="flex items-center gap-0.5 text-amber-400 text-xs sm:text-sm">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed mb-3 sm:mb-4 italic drop-shadow-2xs">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author Footer & Credential */}
                <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#1E293B] tracking-tight">
                      {item.author}
                    </h3>
                    <div className="text-xs text-slate-500 font-medium">
                      {item.role}
                    </div>
                    <div className="text-[11px] font-bold text-[#0072CE] mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  {/* Impact Metric Chip */}
                  <div className="self-start sm:self-center shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-black text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]" />
                      <span>{item.stat}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────
            CAROUSEL CONTROLS & DOTS - Compact Margin
        ───────────────────────────────────────────────────────── */}
        <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-4 sm:gap-6">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer hover:border-[#0072CE] hover:text-[#0072CE]"
          >
            <span className="text-sm sm:text-base font-bold">←</span>
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 h-2.5 bg-gradient-to-r from-[#0072CE] to-[#72BF44]'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer hover:border-[#0072CE] hover:text-[#0072CE]"
          >
            <span className="text-sm sm:text-base font-bold">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
