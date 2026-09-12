import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import siriAboutMain from '@/assets/images/about/siri-about-main.jpg';
import corporateTravelImg from '@/assets/images/services/corporate-travel.jpg';
import corporateLoansImg from '@/assets/images/services/corporate-loans.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * Enterprise Dual-Mode Showcase Cards Component (Option 1: Dark Glassmorphic 2D Cards)
 *
 * Design Improvements:
 * - 2D Perspective Tilt on Hover: Cards tilt smoothly based on mouse movement (matching Hero card).
 * - Vivid Image Visibility: Background images are clearly visible (opacity-85) with a bottom-weighted
 *   gradient scrim for crystal-clear text contrast.
 * - Eliminated Empty Spaces: Proportioned card height (h-[480px] - h-[500px]) with tight, balanced layout.
 * - Beautiful Typography: Frosted glass badges with glowing icons, refined headings, and pill CTA buttons.
 * - Desktop (>= 1024px): Option B sequential docking (Centered Card 1 -> 5-options morph -> Left dock ->
 *   Cards 2 & 3 dock to form balanced 3-card horizontal layout).
 * - Mobile (< 768px): Stacking deck where previous cards keep their title tabs visible.
 */
export default function ShowcaseCards({ onOpenServicesModal }) {
  const sectionRef = useRef(null);

  // Mobile Deck Refs
  const mobileDeckRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const mobileCard1InitialRef = useRef(null);
  const mobileCard1OptionsRef = useRef(null);
  const mobileOptionsItemsRef = useRef([]);

  // Desktop Refs (Option B Sequential Card Docking)
  const desktopContainerRef = useRef(null);
  const desktopCard1WrapperRef = useRef(null);
  const desktopCard2WrapperRef = useRef(null);
  const desktopCard3WrapperRef = useRef(null);
  const desktopCard1InnerRef = useRef(null);
  const desktopCard2InnerRef = useRef(null);
  const desktopCard3InnerRef = useRef(null);
  const desktopCard1InitialRef = useRef(null);
  const desktopCard1OptionsRef = useRef(null);
  const desktopOptionsItemsRef = useRef([]);

  // 5 Discrete Service Options (Full Body on Card 1)
  const serviceBadges = [
    {
      id: 'hr',
      icon: '👥',
      label: 'HR Solutions & Executive Search',
      sub: 'Permanent & leadership hiring',
      color: '#0072CE',
      href: '#services-hr',
    },
    {
      id: 'manpower',
      icon: '🏭',
      label: 'Industrial & Facility Manpower',
      sub: 'Skilled & industrial workforce',
      color: '#72BF44',
      href: '#services-manpower',
    },
    {
      id: 'csr',
      icon: '🌱',
      label: 'CSR Project Management',
      sub: 'Community development & compliance',
      color: '#10B981',
      href: '#services-csr',
    },
    {
      id: 'travel',
      icon: '✈️',
      label: 'Globe Corporate Travel',
      sub: 'Flights, hotel stays & visa desks',
      color: '#0284C7',
      href: '#services-travel',
    },
    {
      id: 'loans',
      icon: '💼',
      label: 'Siri Fin Hub B2B Loans',
      sub: 'Working capital & commercial finance',
      color: '#00A8E8',
      href: '#services-loans',
    },
  ];

  // 3 Core Enterprise Showcase Cards
  const showcaseCards = [
    {
      id: 'global-solutions',
      number: '01',
      label: 'Card 01',
      badge: 'Workforce & CSR',
      title: 'SIRI Global Solutions',
      description:
        'Delivering end-to-end talent acquisition, specialized industrial manpower, and structured Corporate Social Responsibility programs that drive measurable enterprise and social impact.',
      bgImage: siriAboutMain,
      accentColor: '#72BF44',
      accentGlow: 'from-[#72BF44]/30 to-transparent',
      ctaLabel: 'Explore Solutions',
      ctaHref: '#services-global',
    },
    {
      id: 'corporate-travel',
      number: '02',
      label: 'Card 02',
      badge: 'Corporate Mobility',
      title: 'SIRI Corporate Travel',
      description:
        'Smart corporate travel desks managing corporate flight reservations, premium hotel accommodations, express visa processing, and comprehensive 24/7 travel risk support.',
      bgImage: corporateTravelImg,
      accentColor: '#0072CE',
      accentGlow: 'from-[#0072CE]/30 to-transparent',
      ctaLabel: 'Manage Travel Desks',
      ctaHref: '#services-travel',
    },
    {
      id: 'fin-hub',
      number: '03',
      label: 'Card 03',
      badge: 'B2B Financing',
      title: 'SIRI Fin Hub',
      description:
        'Empowering enterprise scaling through structured commercial funding, flexible working capital lines, MSME loans, project financing, and collateral-backed credit.',
      bgImage: corporateLoansImg,
      accentColor: '#00A8E8',
      accentGlow: 'from-[#00A8E8]/30 to-transparent',
      ctaLabel: 'Apply for Financing',
      ctaHref: '#services-loans',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mm = gsap.matchMedia();

    // ─────────────────────────────────────────────────────────────
    // 1. Mobile Query (< 768px): Stacking Deck with Visible Header Tabs & Card 1 Morph
    // ─────────────────────────────────────────────────────────────
    mm.add('(max-width: 767px)', () => {
      if (!mobileDeckRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current)
        return;

      // Continuous gentle 2D float on the 5 service options
      if (!prefersReducedMotion) {
        const validMobileOptions = mobileOptionsItemsRef.current.filter(Boolean);
        validMobileOptions.forEach((item, index) => {
          gsap.to(item, {
            y: index % 2 === 0 ? -4 : 4,
            x: index % 2 === 0 ? 2 : -2,
            duration: 2.8 + index * 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.12,
          });
        });
      }

      if (prefersReducedMotion) return;

      // Master ScrollTrigger timeline for mobile deck
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileDeckRef.current,
          start: 'top 75px',
          end: '+=300%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Stage 1: Card 1 initial description + CTA fades out on scroll
      if (mobileCard1InitialRef.current) {
        tl.to(mobileCard1InitialRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            if (mobileCard1InitialRef.current) {
              mobileCard1InitialRef.current.style.pointerEvents = 'none';
            }
          },
          onReverseComplete: () => {
            if (mobileCard1InitialRef.current) {
              mobileCard1InitialRef.current.style.pointerEvents = 'auto';
            }
          },
        });
      }

      // Stage 1b: Card 1 5 Floating Service Options reveal and take full body
      if (mobileCard1OptionsRef.current) {
        tl.fromTo(
          mobileCard1OptionsRef.current,
          { opacity: 0, y: 25, pointerEvents: 'none' },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            pointerEvents: 'auto',
          },
          '<0.2'
        );

        const validMobileOptions = mobileOptionsItemsRef.current.filter(Boolean);
        if (validMobileOptions.length > 0) {
          tl.fromTo(
            validMobileOptions,
            { opacity: 0, scale: 0.9, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
            '<'
          );
        }
      }

      // Small pacing pause so user can clearly view the 5 options
      tl.to({}, { duration: 0.35 });

      // Stage 2: Card 2 slides up and locks at top: 64px (Card 1 tab header remains visible)
      tl.fromTo(
        card2Ref.current,
        { yPercent: 110, opacity: 0.95 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power2.inOut' }
      );
      tl.to(
        card1Ref.current,
        { scale: 0.97, duration: 0.5, ease: 'power2.out' },
        '<0.1'
      );

      // Small pacing pause
      tl.to({}, { duration: 0.3 });

      // Stage 3: Card 3 slides up and locks at top: 128px (Cards 1 & 2 tab headers remain visible)
      tl.fromTo(
        card3Ref.current,
        { yPercent: 110, opacity: 0.95 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power2.inOut' }
      );
      tl.to(
        card2Ref.current,
        { scale: 0.97, duration: 0.5, ease: 'power2.out' },
        '<0.1'
      );
    });

    // ─────────────────────────────────────────────────────────────
    // 2. Desktop Query (>= 1024px): Option B (Centered Start → Morph → Left Dock → Cards 2 & 3 Dock)
    // ─────────────────────────────────────────────────────────────
    mm.add('(min-width: 1024px)', () => {
      if (
        !sectionRef.current ||
        !desktopContainerRef.current ||
        !desktopCard1WrapperRef.current ||
        !desktopCard2WrapperRef.current ||
        !desktopCard3WrapperRef.current
      )
        return;

      // Continuous subtle 2D float on desktop options
      if (!prefersReducedMotion) {
        const validDesktopOptions = desktopOptionsItemsRef.current.filter(Boolean);
        validDesktopOptions.forEach((item, index) => {
          gsap.to(item, {
            y: index % 2 === 0 ? -3 : 3,
            duration: 3.5 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.15,
          });
        });
      }

      if (prefersReducedMotion) return;

      // Calculate distance between Column 1 and Column 2 to center Card 1 initially
      const getCardCenterOffset = () => {
        if (!desktopCard1WrapperRef.current || !desktopCard2WrapperRef.current) return 410;
        return (
          desktopCard2WrapperRef.current.offsetLeft - desktopCard1WrapperRef.current.offsetLeft
        );
      };

      // Desktop Master Timeline
      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60px',
          end: '+=280%',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Initial positions:
      // Card 1 starts centered (offset by distance to Column 2)
      // Cards 2 & 3 start hidden within container bounds (preventing horizontal scrollbar)
      gsap.set(desktopCard1WrapperRef.current, {
        x: () => getCardCenterOffset(),
      });
      gsap.set(desktopCard2WrapperRef.current, {
        opacity: 0,
        x: 24,
        scale: 0.97,
        pointerEvents: 'none',
      });
      gsap.set(desktopCard3WrapperRef.current, {
        opacity: 0,
        x: 24,
        scale: 0.97,
        pointerEvents: 'none',
      });

      // ── Step 1: Card 1 morphs in center (Initial Description + CTA fades out) ──
      if (desktopCard1InitialRef.current) {
        desktopTl.to(desktopCard1InitialRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.45,
          ease: 'power2.inOut',
          onComplete: () => {
            if (desktopCard1InitialRef.current) {
              desktopCard1InitialRef.current.style.pointerEvents = 'none';
            }
          },
          onReverseComplete: () => {
            if (desktopCard1InitialRef.current) {
              desktopCard1InitialRef.current.style.pointerEvents = 'auto';
            }
          },
        });
      }

      // ── Step 1b: Card 1 5 Floating Service Options fade in & take full body ──
      if (desktopCard1OptionsRef.current) {
        desktopTl.fromTo(
          desktopCard1OptionsRef.current,
          { opacity: 0, y: 20, pointerEvents: 'none' },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            pointerEvents: 'auto',
          },
          '<0.15'
        );

        const validDesktopOptions = desktopOptionsItemsRef.current.filter(Boolean);
        if (validDesktopOptions.length > 0) {
          desktopTl.fromTo(
            validDesktopOptions,
            { opacity: 0, scale: 0.9, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
            '<'
          );
        }
      }

      // Pacing pause on Card 1 with options centered
      desktopTl.to({}, { duration: 0.3 });

      // ── Step 2: Card 1 smoothly glides from center to Left Column position ──
      desktopTl.to(desktopCard1WrapperRef.current, {
        x: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      // Simultaneously, Card 2 slides in from right and docks in Center Column
      desktopTl.to(
        desktopCard2WrapperRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          onStart: () => {
            if (desktopCard2WrapperRef.current) {
              desktopCard2WrapperRef.current.style.pointerEvents = 'auto';
            }
          },
          onReverseComplete: () => {
            if (desktopCard2WrapperRef.current) {
              desktopCard2WrapperRef.current.style.pointerEvents = 'none';
            }
          },
        },
        '<0.15'
      );

      // Pacing pause on Cards 1 & 2
      desktopTl.to({}, { duration: 0.3 });

      // ── Step 3: Card 3 slides in from right and docks in Right Column ──
      desktopTl.to(desktopCard3WrapperRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        onStart: () => {
          if (desktopCard3WrapperRef.current) {
            desktopCard3WrapperRef.current.style.pointerEvents = 'auto';
          }
        },
        onReverseComplete: () => {
          if (desktopCard3WrapperRef.current) {
            desktopCard3WrapperRef.current.style.pointerEvents = 'none';
          }
        },
      });

      // Final pause: All 3 cards displayed side-by-side
      desktopTl.to({}, { duration: 0.4 });
    });

    return () => mm.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 3. Interactive 3D Perspective Tilt on Hover (Matching Hero Section Capsule)
  // ─────────────────────────────────────────────────────────────
  const handleCardMouseMove = (e, innerRef) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    if (!innerRef?.current) return;

    const rect = innerRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(innerRef.current, {
      rotateY: x * 3.5,
      rotateX: -y * 3.5,
      transformPerspective: 1200,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (innerRef) => {
    if (innerRef?.current) {
      gsap.to(innerRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  const smoothScrollTo = (targetSelector) => {
    if (typeof window === 'undefined' || !targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + (window.scrollY ?? window.pageYOffset ?? 0) - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      return true;
    }
    const fallback = document.querySelector('#services');
    if (fallback) {
      const headerOffset = 80;
      const elementPosition = fallback.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + (window.scrollY ?? window.pageYOffset ?? 0) - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      return true;
    }
    return false;
  };

  const handleCtaClick = (e, card) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    if (onOpenServicesModal && card?.id === 'global-solutions') {
      onOpenServicesModal();
    } else {
      const href = typeof card === 'string' ? card : card?.ctaHref;
      smoothScrollTo(href);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative w-full overflow-hidden pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-24 select-none bg-transparent"
    >

      {/* ─────────────────────────────────────────────────────────
          A. MOBILE VIEW (< 768px): Stacking Deck with Visible Header Tabs
      ───────────────────────────────────────────────────────── */}
      <div className="block md:hidden relative px-4 sm:px-6 w-full max-w-lg mx-auto">
        <div ref={mobileDeckRef} className="relative h-[620px] w-full">
          {/* ──────── CARD 1: SIRI Global Solutions (top: 0px) ──────── */}
          <div
            ref={card1Ref}
            style={{ top: '0px' }}
            className="absolute left-0 right-0 h-[470px] rounded-3xl border border-white/25 shadow-2xl overflow-hidden flex flex-col text-white will-change-transform bg-slate-900/95 z-10"
          >
            {/* Vivid Background Image with Bottom-Weighted Scrim */}
            <img
              src={siriAboutMain}
              alt="SIRI Global Solutions"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-95 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />

            {/* Folder Tab Header */}
            <div className="relative z-10 h-[60px] px-5 flex items-center justify-between border-b border-white/15 bg-slate-900/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#72BF44]/25 border border-[#72BF44]/60 text-[#72BF44] text-xs font-black flex items-center justify-center shrink-0">
                  {showcaseCards[0].number}
                </span>
                <h3 className="text-base font-black text-white tracking-tight truncate drop-shadow-sm">
                  {showcaseCards[0].title}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#72BF44]/20 text-[#72BF44] border border-[#72BF44]/40 uppercase tracking-wider shrink-0 backdrop-blur-sm">
                {showcaseCards[0].badge}
              </span>
            </div>

            {/* Card 1 Body with 2-State Morph */}
            <div className="relative z-10 flex-1 p-5 flex flex-col justify-between overflow-hidden">
              {/* State 1: Initial View (Description + Redirect Button) */}
              <div
                ref={mobileCard1InitialRef}
                className="absolute inset-x-5 inset-y-5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-[#72BF44] bg-[#72BF44]/15 border border-[#72BF44]/30 backdrop-blur-sm">
                    ✦ Core Ecosystem
                  </span>
                  <p className="text-sm text-slate-100 leading-relaxed font-medium drop-shadow-sm">
                    {showcaseCards[0].description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/20">
                  <button
                    type="button"
                    onClick={(e) => handleCtaClick(e, showcaseCards[0])}
                    className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#72BF44] to-[#10B981] hover:brightness-110 text-slate-950 font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span>{showcaseCards[0].ctaLabel}</span>
                    <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center text-current">
                      ↗
                    </span>
                  </button>
                </div>
              </div>

              {/* State 2: 5 Floating Service Options (Takes Full Body on Scroll) */}
              <div
                ref={mobileCard1OptionsRef}
                className="absolute inset-x-5 inset-y-4 flex flex-col justify-center gap-2 opacity-0 pointer-events-none"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#72BF44] flex items-center justify-between mb-0.5">
                  <span className="flex items-center gap-1.5">
                    <span>✦</span> 5 Core Verticals
                  </span>
                  <span className="text-[10px] text-slate-300 font-medium">Select to view</span>
                </div>
                {serviceBadges.map((badge, idx) => (
                  <a
                    key={badge.id}
                    href={badge.href}
                    onClick={(e) => handleCtaClick(e, badge.href)}
                    ref={(el) => (mobileOptionsItemsRef.current[idx] = el)}
                    className="w-full bg-slate-900/90 hover:bg-slate-800/95 border border-slate-700/90 hover:border-[#72BF44] text-white shadow-xl px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between active:scale-95 transition-all group backdrop-blur-md cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base shrink-0">{badge.icon}</span>
                      <span className="truncate">{badge.label}</span>
                    </div>
                    <span className="text-slate-400 group-hover:text-[#72BF44] text-xs transition-colors shrink-0">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ──────── CARD 2: SIRI Corporate Travel (top: 64px) ──────── */}
          <div
            ref={card2Ref}
            style={{ top: '64px' }}
            className="absolute left-0 right-0 h-[470px] rounded-3xl border border-white/25 shadow-2xl overflow-hidden flex flex-col text-white will-change-transform bg-slate-900/95 z-20"
          >
            {/* Vivid Background Image */}
            <img
              src={corporateTravelImg}
              alt="SIRI Corporate Travel"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-95 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />

            {/* Top Folder Tab Header */}
            <div
              onClick={(e) => handleCtaClick(e, showcaseCards[1])}
              className="relative z-10 h-[60px] px-5 flex items-center justify-between border-b border-white/15 bg-slate-900/90 backdrop-blur-md shrink-0 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#0072CE]/25 border border-[#0072CE]/60 text-[#38BDF8] text-xs font-black flex items-center justify-center shrink-0">
                  {showcaseCards[1].number}
                </span>
                <h3 className="text-base font-black text-white tracking-tight truncate drop-shadow-sm">
                  {showcaseCards[1].title}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0072CE]/20 text-[#38BDF8] border border-[#0072CE]/40 uppercase tracking-wider shrink-0 backdrop-blur-sm">
                {showcaseCards[1].badge}
              </span>
            </div>

            {/* Simple Card Body (Title, Description, CTA) */}
            <div className="relative z-10 p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-[#38BDF8] bg-[#0072CE]/15 border border-[#0072CE]/30 backdrop-blur-sm">
                  ✦ Global Mobility
                </span>
                <p className="text-sm text-slate-100 leading-relaxed font-medium drop-shadow-sm">
                  {showcaseCards[1].description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/20">
                <button
                  type="button"
                  onClick={(e) => handleCtaClick(e, showcaseCards[1])}
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#0072CE] to-[#0284C7] hover:brightness-110 text-white font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>{showcaseCards[1].ctaLabel}</span>
                  <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center text-current">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ──────── CARD 3: SIRI Fin Hub (top: 128px) ──────── */}
          <div
            ref={card3Ref}
            style={{ top: '128px' }}
            className="absolute left-0 right-0 h-[470px] rounded-3xl border border-white/25 shadow-2xl overflow-hidden flex flex-col text-white will-change-transform bg-slate-900/95 z-30"
          >
            {/* Vivid Background Image */}
            <img
              src={corporateLoansImg}
              alt="SIRI Fin Hub"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-95 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />

            {/* Top Folder Tab Header */}
            <div
              onClick={(e) => handleCtaClick(e, showcaseCards[2])}
              className="relative z-10 h-[60px] px-5 flex items-center justify-between border-b border-white/15 bg-slate-900/90 backdrop-blur-md shrink-0 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#00A8E8]/25 border border-[#00A8E8]/60 text-[#00A8E8] text-xs font-black flex items-center justify-center shrink-0">
                  {showcaseCards[2].number}
                </span>
                <h3 className="text-base font-black text-white tracking-tight truncate drop-shadow-sm">
                  {showcaseCards[2].title}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00A8E8]/20 text-[#00A8E8] border border-[#00A8E8]/40 uppercase tracking-wider shrink-0 backdrop-blur-sm">
                {showcaseCards[2].badge}
              </span>
            </div>

            {/* Simple Card Body (Title, Description, CTA) */}
            <div className="relative z-10 p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-[#00A8E8] bg-[#00A8E8]/15 border border-[#00A8E8]/30 backdrop-blur-sm">
                  ✦ Capital Solutions
                </span>
                <p className="text-sm text-slate-100 leading-relaxed font-medium drop-shadow-sm">
                  {showcaseCards[2].description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/20">
                <button
                  type="button"
                  onClick={(e) => handleCtaClick(e, showcaseCards[2])}
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#00A8E8] to-[#0284C7] hover:brightness-110 text-white font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>{showcaseCards[2].ctaLabel}</span>
                  <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center text-current">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          B. TABLET VIEW (768px - 1023px): Touch-Scroll Cards Deck
      ───────────────────────────────────────────────────────── */}
      <div className="hidden md:flex lg:hidden overflow-x-auto gap-6 px-6 pb-6 snap-x snap-mandatory">
        {showcaseCards.map((card, idx) => (
          <div
            key={card.id}
            onClick={(e) => handleCtaClick(e, card)}
            className="snap-center shrink-0 w-[400px] h-[460px] rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative p-7 flex flex-col justify-between text-white bg-slate-900/95 group cursor-pointer"
          >
            <img
              src={card.bgImage}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20 pointer-events-none" />

            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border mb-3 backdrop-blur-md"
                style={{
                  backgroundColor: `${card.accentColor}25`,
                  borderColor: `${card.accentColor}50`,
                  color: card.accentColor,
                }}
              >
                <span>✦ 0{idx + 1}</span>
                <span>•</span>
                <span>{card.badge}</span>
              </span>
              <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-sm">
                {card.title}
              </h3>
            </div>

            <div className="relative z-10 my-auto py-2">
              <p className="text-sm text-slate-100 leading-relaxed font-medium drop-shadow-sm">
                {card.description}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/20">
              <button
                type="button"
                onClick={(e) => handleCtaClick(e, card)}
                className="w-full py-3 px-5 rounded-full font-extrabold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95"
                style={{
                  backgroundColor: card.accentColor,
                  color: card.id === 'global-solutions' ? '#0f172a' : '#ffffff',
                }}
              >
                <span>{card.ctaLabel}</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────
          C. DESKTOP VIEW (>= 1024px): 2D Cards with Mouse Perspective Tilt (Matching Hero)
      ───────────────────────────────────────────────────────── */}
      <div className="hidden lg:block relative w-full px-4 sm:px-6 lg:px-8 xl:px-10 overflow-hidden">
        <div
          ref={desktopContainerRef}
          className="relative w-full max-w-7xl mx-auto flex items-center justify-center gap-4 xl:gap-6 will-change-transform"
        >
          {/* ──────── DESKTOP CARD 1: SIRI Global Solutions (Centered -> Left Dock) ──────── */}
          <div
            ref={desktopCard1WrapperRef}
            onMouseMove={(e) => handleCardMouseMove(e, desktopCard1InnerRef)}
            onMouseLeave={() => handleCardMouseLeave(desktopCard1InnerRef)}
            className="w-full max-w-[370px] xl:max-w-[400px] h-[480px] xl:h-[500px] relative will-change-transform shrink [perspective:1200px]"
          >
            {/* Inner Card Handling Perspective Tilt & Hover Effects (Matching Hero Section Capsule) */}
            <div
              ref={desktopCard1InnerRef}
              className="w-full h-full rounded-3xl border border-white/20 hover:border-[#72BF44]/60 shadow-2xl shadow-slate-950/40 hover:shadow-[#72BF44]/20 bg-slate-900/95 backdrop-blur-md relative overflow-hidden flex flex-col justify-between text-white transition-shadow duration-500 group will-change-transform cursor-default"
            >
              {/* Vivid Background Image with Smooth Scale Zoom on Hover */}
              <img
                src={siriAboutMain}
                alt="SIRI Global Solutions"
                className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              />
              {/* Gloss Vignette Overlay (Matching Hero Section Capsule) */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/10 pointer-events-none"
                aria-hidden="true"
              />
              {/* Bottom-Weighted High Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />
              {/* Accent Color Atmosphere Glow Intensified on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#72BF44]/20 to-transparent opacity-35 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

              {/* Header Area */}
              <div className="relative z-10 p-7 xl:p-8 pb-0 shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#72BF44]/60 bg-[#72BF44]/20 text-[#72BF44] backdrop-blur-md shadow-xs">
                    <span>✦ 01</span>
                    <span>•</span>
                    <span>{showcaseCards[0].badge}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-300">Card 01</span>
                </div>
                <h3 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                  {showcaseCards[0].title}
                </h3>
              </div>

              {/* Card 1 Body with 2-State Morph (Eliminating Extra Space) */}
              <div className="relative z-10 flex-1 p-7 xl:p-8 pt-3 overflow-hidden">
                {/* Layer A: Initial Description + CTA */}
                <div
                  ref={desktopCard1InitialRef}
                  className="absolute inset-x-7 xl:inset-x-8 inset-y-3 flex flex-col justify-between"
                >
                  <p className="text-sm xl:text-base text-slate-100 leading-relaxed font-medium mt-1 drop-shadow-sm">
                    {showcaseCards[0].description}
                  </p>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleCtaClick(e, showcaseCards[0])}
                      className="group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-black text-xs xl:text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 bg-[#72BF44] text-slate-950 hover:brightness-110"
                    >
                      <span>{showcaseCards[0].ctaLabel}</span>
                      <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center text-current group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform">
                        ↗
                      </span>
                    </button>
                    <span className="text-xs font-bold text-slate-300">Scroll to explore</span>
                  </div>
                </div>

                {/* Layer B: 5 Floating Service Options (Full Body) */}
                <div
                  ref={desktopCard1OptionsRef}
                  className="absolute inset-x-7 xl:inset-x-8 inset-y-2 flex flex-col justify-center gap-2 opacity-0 pointer-events-none"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#72BF44] flex items-center justify-between mb-0.5">
                    <span className="flex items-center gap-1.5">
                      <span>✦</span> 5 Core Verticals
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">Click to explore</span>
                  </div>
                  {serviceBadges.map((badge, idx) => (
                    <a
                      key={badge.id}
                      href={badge.href}
                      onClick={(e) => handleCtaClick(e, badge.href)}
                      ref={(el) => (desktopOptionsItemsRef.current[idx] = el)}
                      className="w-full bg-slate-900/90 hover:bg-slate-800/95 border border-slate-700/90 hover:border-[#72BF44] text-white shadow-xl px-4 py-2 rounded-2xl text-xs xl:text-sm font-bold flex items-center justify-between transition-all duration-300 hover:scale-[1.02] active:scale-95 group backdrop-blur-md cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base shrink-0">{badge.icon}</span>
                        <span className="font-bold text-white/95 truncate">{badge.label}</span>
                      </div>
                      <span className="text-slate-400 group-hover:text-[#72BF44] text-xs transition-colors shrink-0">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ──────── DESKTOP CARD 2: SIRI Corporate Travel (Docks in Center Column) ──────── */}
          <div
            ref={desktopCard2WrapperRef}
            onMouseMove={(e) => handleCardMouseMove(e, desktopCard2InnerRef)}
            onMouseLeave={() => handleCardMouseLeave(desktopCard2InnerRef)}
            className="w-full max-w-[370px] xl:max-w-[400px] h-[480px] xl:h-[500px] relative will-change-transform shrink [perspective:1200px]"
          >
            {/* Inner Card Handling Perspective Tilt & Hover Effects (Matching Hero Section Capsule) */}
            <div
              ref={desktopCard2InnerRef}
              onClick={(e) => handleCtaClick(e, showcaseCards[1])}
              className="w-full h-full rounded-3xl border border-white/20 hover:border-[#0072CE]/60 shadow-2xl shadow-slate-950/40 hover:shadow-[#0072CE]/20 bg-slate-900/95 backdrop-blur-md relative overflow-hidden p-7 xl:p-8 flex flex-col justify-between text-white transition-all duration-500 group will-change-transform cursor-pointer"
            >
              {/* Vivid Background Image with Smooth Scale Zoom on Hover */}
              <img
                src={corporateTravelImg}
                alt="SIRI Corporate Travel"
                className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              />
              {/* Gloss Vignette Overlay (Matching Hero Section Capsule) */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/10 pointer-events-none"
                aria-hidden="true"
              />
              {/* Bottom-Weighted High Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />
              {/* Accent Color Atmosphere Glow Intensified on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0072CE]/20 to-transparent opacity-35 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

              {/* Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#0072CE]/60 bg-[#0072CE]/20 text-[#38BDF8] backdrop-blur-md shadow-xs">
                    <span>✦ 02</span>
                    <span>•</span>
                    <span>{showcaseCards[1].badge}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-300">Card 02</span>
                </div>
                <h3 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                  {showcaseCards[1].title}
                </h3>
              </div>

              {/* Clean Description (No Extra Void) */}
              <div className="relative z-10 my-auto py-2">
                <p className="text-sm xl:text-base text-slate-100 leading-relaxed font-medium drop-shadow-sm">
                  {showcaseCards[1].description}
                </p>
              </div>

              {/* Redirect Button */}
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => handleCtaClick(e, showcaseCards[1])}
                  className="group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-black text-xs xl:text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 bg-[#0072CE] text-white hover:brightness-110"
                >
                  <span>{showcaseCards[1].ctaLabel}</span>
                  <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center text-current group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </button>
                <span className="text-xs font-bold text-slate-300">Mobility Desk</span>
              </div>
            </div>
          </div>

          {/* ──────── DESKTOP CARD 3: SIRI Fin Hub (Docks in Right Column) ──────── */}
          <div
            ref={desktopCard3WrapperRef}
            onMouseMove={(e) => handleCardMouseMove(e, desktopCard3InnerRef)}
            onMouseLeave={() => handleCardMouseLeave(desktopCard3InnerRef)}
            className="w-full max-w-[370px] xl:max-w-[400px] h-[480px] xl:h-[500px] relative will-change-transform shrink [perspective:1200px]"
          >
            {/* Inner Card Handling Perspective Tilt & Hover Effects (Matching Hero Section Capsule) */}
            <div
              ref={desktopCard3InnerRef}
              onClick={(e) => handleCtaClick(e, showcaseCards[2])}
              className="w-full h-full rounded-3xl border border-white/20 hover:border-[#00A8E8]/60 shadow-2xl shadow-slate-950/40 hover:shadow-[#00A8E8]/20 bg-slate-900/95 backdrop-blur-md relative overflow-hidden p-7 xl:p-8 flex flex-col justify-between text-white transition-all duration-500 group will-change-transform cursor-pointer"
            >
              {/* Vivid Background Image with Smooth Scale Zoom on Hover */}
              <img
                src={corporateLoansImg}
                alt="SIRI Fin Hub"
                className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              />
              {/* Gloss Vignette Overlay (Matching Hero Section Capsule) */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/10 pointer-events-none"
                aria-hidden="true"
              />
              {/* Bottom-Weighted High Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />
              {/* Accent Color Atmosphere Glow Intensified on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/20 to-transparent opacity-35 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

              {/* Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#00A8E8]/60 bg-[#00A8E8]/20 text-[#00A8E8] backdrop-blur-md shadow-xs">
                    <span>✦ 03</span>
                    <span>•</span>
                    <span>{showcaseCards[2].badge}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-300">Card 03</span>
                </div>
                <h3 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                  {showcaseCards[2].title}
                </h3>
              </div>

              {/* Clean Description (No Extra Void) */}
              <div className="relative z-10 my-auto py-2">
                <p className="text-sm xl:text-base text-slate-100 leading-relaxed font-medium drop-shadow-sm">
                  {showcaseCards[2].description}
                </p>
              </div>

              {/* Redirect Button */}
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => handleCtaClick(e, showcaseCards[2])}
                  className="group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-black text-xs xl:text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 bg-[#00A8E8] text-white hover:brightness-110"
                >
                  <span>{showcaseCards[2].ctaLabel}</span>
                  <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center text-current group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </button>
                <span className="text-xs font-bold text-slate-300">B2B Loans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
