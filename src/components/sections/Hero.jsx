import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import siriAboutMain from '@/assets/images/about/siri-about-main.jpg';
import siriLogo from '@/assets/images/siri-logo.png';

/**
 * Mobile-First, Highly Responsive Hero Section (Raycast-Style Aesthetic)
 *
 * Updates:
 * - High-visibility animated SIRI Blue to Lime Green gradient canvas moving top-to-bottom and left-to-right infinitely
 * - 4 luminous atmospheric orbs oscillating smoothly in 2D
 * - Sculpted curved cutout on the image with exact concentric socket fitting for the ring
 * - Ring color and background redesigned to harmoniously match the hero gradient background
 * - Official SIRI Group logo centered inside the rotating ring
 * - Mobile category cards styled like reference screenshot with continuous smooth floating 2D animations
 * - Header left untouched
 */
export default function Hero({ onOpenServicesModal, onOpenContact }) {
  const heroRef = useRef(null);
  const tagRef = useRef(null);
  const headlineLinesRef = useRef([]);
  const ctaGroupRef = useRef(null);
  const capsuleContainerRef = useRef(null);
  const capsuleRef = useRef(null);
  const badgeSpinRef = useRef(null);
  const desktopChipsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {


      // ─────────────────────────────────────────────────────────────
      // 2. Rotating Circular Ring Infinite Spin (20s linear loop)
      // ─────────────────────────────────────────────────────────────
      if (badgeSpinRef.current) {
        gsap.to(badgeSpinRef.current, {
          rotation: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      }

      // ─────────────────────────────────────────────────────────────
      // 3. Desktop Floating Service Chips Oscillation
      // ─────────────────────────────────────────────────────────────
      if (!prefersReducedMotion) {
        const validDesktopChips = desktopChipsRef.current.filter(Boolean);
        if (validDesktopChips.length > 0) {
          validDesktopChips.forEach((chip, index) => {
            gsap.to(chip, {
              y: index % 2 === 0 ? -7 : 7,
              duration: 3.2 + index * 0.3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.2,
            });
          });
        }
      }



      // ─────────────────────────────────────────────────────────────
      // 5. Entrance Sequence (PageLoader-Aware)
      // ─────────────────────────────────────────────────────────────
      const runEntrance = () => {
        if (prefersReducedMotion) return;

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        // 5a. Pill Tagline: y: -15 -> 0, opacity: 0 -> 1, duration: 1.0s
        if (tagRef.current) {
          tl.fromTo(
            tagRef.current,
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0 }
          );
        }

        // 5b. Headline lines: y: 35 -> 0, opacity: 0 -> 1, stagger: 0.12s, duration: 1.2s
        const validHeadlineLines = headlineLinesRef.current.filter(Boolean);
        if (validHeadlineLines.length > 0) {
          tl.fromTo(
            validHeadlineLines,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.12 },
            '-=0.7'
          );
        }

        // 5c. Action Buttons: y: 25 -> 0, opacity: 0 -> 1, duration: 1.0s
        if (ctaGroupRef.current) {
          tl.fromTo(
            ctaGroupRef.current,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0 },
            '-=0.7'
          );
        }

        // 5d. Showcase Capsule: scale: 0.94 -> 1.0, y: 40 -> 0, opacity: 0 -> 1, duration: 1.4s
        if (capsuleContainerRef.current) {
          tl.fromTo(
            capsuleContainerRef.current,
            { scale: 0.94, y: 40, opacity: 0 },
            { scale: 1.0, y: 0, opacity: 1, duration: 1.4 },
            '-=0.8'
          );
        }

        // 5e. Desktop Floating Chips: scale: 0.8 -> 1.0, opacity: 0 -> 1, stagger: 0.15s, duration: 0.8s
        const allChips = desktopChipsRef.current.filter(Boolean);
        if (allChips.length > 0) {
          tl.fromTo(
            allChips,
            { scale: 0.8, opacity: 0 },
            { scale: 1.0, opacity: 1, duration: 0.8, stagger: 0.15 },
            '-=0.7'
          );
        }
      };

      // Synchronization with PageLoader
      if (typeof window !== 'undefined') {
        if (window.__pageLoaderDone) {
          runEntrance();
        } else {
          let hasRun = false;
          const handleLoaderDone = () => {
            if (!hasRun) {
              hasRun = true;
              runEntrance();
            }
          };

          window.addEventListener('pageLoaderDone', handleLoaderDone);
          const safetyTimer = setTimeout(() => {
            if (!hasRun) {
              hasRun = true;
              runEntrance();
            }
          }, 800);

          return () => {
            window.removeEventListener('pageLoaderDone', handleLoaderDone);
            clearTimeout(safetyTimer);
          };
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 6. Interactive 3D Mouse Perspective Tilt on Showcase Capsule
  // ─────────────────────────────────────────────────────────────
  const handleMouseMove = (e) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    if (!capsuleRef.current) return;

    const rect = capsuleRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(capsuleRef.current, {
      rotateY: x * 3.5,
      rotateX: -y * 3.5,
      transformPerspective: 1200,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (capsuleRef.current) {
      gsap.to(capsuleRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  // Primary CTA Click Handler
  const handlePrimaryCtaClick = (e) => {
    if (onOpenServicesModal) {
      e.preventDefault();
      onOpenServicesModal();
    } else {
      const target = document.querySelector('#services');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-start pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12 overflow-x-clip select-none transition-colors duration-500 bg-transparent"
    >
      {/* Styles: Fitted Image Mask Cutout */}
      <style>{`
        .siri-hero-capsule-socket {
          --cutout-r: 48px;
          --cutout-x: 44px;
          --cutout-y: 20px;
        }
        @media (min-width: 640px) {
          .siri-hero-capsule-socket {
            --cutout-r: 66px;
            --cutout-x: 58px;
            --cutout-y: 26px;
          }
        }
        @media (min-width: 1024px) {
          .siri-hero-capsule-socket {
            --cutout-r: 74px;
            --cutout-x: 66px;
            --cutout-y: 30px;
          }
        }

        .siri-hero-image-curve {
          -webkit-mask-image: radial-gradient(circle var(--cutout-r) at calc(100% - var(--cutout-x)) var(--cutout-y), transparent 98%, #000 100%);
          mask-image: radial-gradient(circle var(--cutout-r) at calc(100% - var(--cutout-x)) var(--cutout-y), transparent 98%, #000 100%);
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────
          3. Centered Content Container (Strict Zero Horizontal Overflow)
      ───────────────────────────────────────────────────────── */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* 3a. Pill Badge Tag */}
        <div ref={tagRef} className="inline-flex items-center justify-center mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#72BF44]/40 bg-[#F2FBF0]/95 text-[#72BF44] text-xs font-bold tracking-wide shadow-xs backdrop-blur-xs transition-transform hover:scale-105 cursor-default">
            <span className="font-black text-[13px] leading-none">+</span>
            <span>Business Solutions Partner</span>
            <span className="font-black text-[13px] leading-none">+</span>
          </span>
        </div>

        {/* 3b. Main Heading with Distinct Lines */}
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.18] sm:leading-[1.15] text-[#1E293B] tracking-tight max-w-4xl mx-auto"
        >
          <span
            ref={(el) => (headlineLinesRef.current[0] = el)}
            className="inline-block"
          >
            Empowering Business Through{' '}
          </span>{' '}
          <span
            ref={(el) => (headlineLinesRef.current[1] = el)}
            className="inline-block text-[#72BF44]"
          >
            People, Purpose{' '}
          </span>{' '}
          <span
            ref={(el) => (headlineLinesRef.current[2] = el)}
            className="inline-block"
          >
            &amp;{' '}
          </span>{' '}
          <span
            ref={(el) => (headlineLinesRef.current[3] = el)}
            className="inline-block text-[#0072CE]"
          >
            Seamless Travel
          </span>
        </h1>

        {/* 3c. Dual Action CTAs */}
        <div
          ref={ctaGroupRef}
          className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6 pt-1"
        >
          {/* Primary CTA: Explore Services */}
          <a
            href="#services"
            onClick={handlePrimaryCtaClick}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0072CE] hover:bg-[#005FA8] active:bg-[#005FA8] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#0072CE] focus:ring-offset-2"
          >
            <span>Explore Services</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </a>

          {/* Secondary CTA: Need Help? Consultation Desk */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenContact) {
                onOpenContact('General Enterprise Consultation');
              } else {
                window.dispatchEvent(
                  new CustomEvent('openContactModal', {
                    detail: { service: 'General Enterprise Consultation' },
                  })
                );
              }
            }}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center sm:justify-start gap-3 px-5 py-2.5 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 hover:bg-[#F0F7FD] dark:hover:bg-slate-800/80 transition-all duration-200 group text-left shadow-xs cursor-pointer"
            aria-label="Open SIRI Group Consultation Desk"
          >
            <span className="w-8 h-8 rounded-full bg-[#F0F7FD] dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center text-[#0072CE] group-hover:scale-105 transition-transform shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.37-.67.25-1.02A11.36 11.36 0 019 4.31c0-.55-.45-1-1-1H4.5c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
            </span>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Need Help?
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#1E293B] dark:text-slate-100 group-hover:text-[#0072CE] transition-colors">
                Consultation Desk
              </span>
            </div>
          </button>
        </div>

        {/* ───────────────────────────────────────────────────────
            4. Interactive Showcase Capsule with Fitted Curved Cutout & Background-Matched Ring
        ─────────────────────────────────────────────────────── */}
        <div
          ref={capsuleContainerRef}
          className="w-full max-w-4xl lg:max-w-5xl mx-auto mt-7 sm:mt-9 relative siri-hero-capsule-socket"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 4a. Capsule Card */}
          <div
            ref={capsuleRef}
            className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-black/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 sm:p-3 transition-shadow duration-500 group"
          >
            {/* Main Showcase Image with Curved Corner Cutout */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden siri-hero-image-curve">
              <img
                src={siriAboutMain}
                alt="SIRI Group Corporate Operations and Excellence"
                className="h-52 sm:h-76 lg:h-[25rem] object-cover w-full object-center transition-transform duration-700 ease-out group-hover:scale-102"
                loading="eager"
              />

              {/* Gloss Vignette Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-white/10 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* 4b. Desktop Anchored Floating Glassmorphic Service Chips (lg+ only) */}
            {/* Chip 1: Top-Left */}
            <a
              href="#services-hr"
              ref={(el) => (desktopChipsRef.current[0] = el)}
              className="hidden lg:flex absolute top-6 -left-5 z-20 items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-xl shadow-slate-900/10 text-xs font-bold text-[#1E293B] dark:text-slate-100 hover:border-[#0072CE] transition-all hover:scale-105"
            >
              <span className="text-base">👥</span>
              <span>HR &amp; Manpower Solutions</span>
            </a>

            {/* Chip 2: Bottom-Left */}
            <a
              href="#services-csr"
              ref={(el) => (desktopChipsRef.current[1] = el)}
              className="hidden lg:flex absolute bottom-8 -left-4 z-20 items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-xl shadow-slate-900/10 text-xs font-bold text-[#1E293B] dark:text-slate-100 hover:border-[#72BF44] transition-all hover:scale-105"
            >
              <span className="text-base">🌱</span>
              <span>CSR Project Management</span>
            </a>

            {/* Chip 3: Bottom-Right */}
            <a
              href="#services-travel"
              ref={(el) => (desktopChipsRef.current[2] = el)}
              className="hidden lg:flex absolute bottom-8 -right-4 z-20 items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-xl shadow-slate-900/10 text-xs font-bold text-[#1E293B] dark:text-slate-100 hover:border-[#0072CE] transition-all hover:scale-105"
            >
              <span className="text-base">✈️</span>
              <span>Globe Corporate Travel</span>
            </a>

            {/* Chip 4: Center-Right */}
            <a
              href="#services-loans"
              ref={(el) => (desktopChipsRef.current[3] = el)}
              className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-6 z-20 items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 shadow-xl shadow-slate-900/10 text-xs font-bold text-[#1E293B] dark:text-slate-100 hover:border-[#72BF44] transition-all hover:scale-105"
            >
              <span className="text-base">💼</span>
              <span>Siri Fin Hub B2B Loans</span>
            </a>

            {/* 4c. Top-Right Rotating Badge with Centered SIRI Logo, Nestled Directly into the Image Cutout Curve */}
            <div
              className="absolute z-30 select-none pointer-events-none"
              style={{
                top: 'calc(var(--cutout-y) + 8px)',
                right: 'calc(var(--cutout-x) + 8px)',
                transform: 'translate(50%, -50%)',
              }}
              aria-hidden="true"
            >
              {/* Ring styled with crisp pure white background & deep blue rotating text */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-2xl shadow-blue-950/20 border-2 border-[#002D62]/20 flex items-center justify-center p-1 backdrop-blur-xl ring-2 ring-white/90">
                {/* Rotating Circular SVG Text in Deep Blue (Spaced evenly with zero collision) */}
                <svg
                  ref={badgeSpinRef}
                  viewBox="0 0 100 100"
                  className="w-full h-full will-change-transform"
                >
                  <defs>
                    <path
                      id="siriHeroRingPath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="text-[10px] sm:text-[9.5px] lg:text-[9px] font-black uppercase tracking-[0.12em] fill-[#002D62]">
                    <textPath
                      href="#siriHeroRingPath"
                      xlinkHref="#siriHeroRingPath"
                      textLength="225"
                      lengthAdjust="spacing"
                    >
                      ✦ SIRI GROUPS ✦ 5+ VERTICALS ✦ ONE PARTNER
                    </textPath>
                  </text>
                </svg>

                {/* Center Static SIRI Group Logo Badge Plate (Pure White Background like Header Logo) */}
                <div className="absolute inset-0 flex items-center justify-center p-2.5 sm:p-3 pointer-events-none">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white shadow-md border border-slate-200/90 flex items-center justify-center p-1 sm:p-1.5 ring-1 ring-black/5">
                    <img
                      src={siriLogo}
                      alt="SIRI Group Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
