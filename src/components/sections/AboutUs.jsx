import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import siriAboutMain from '@/assets/images/about/siri-about-main.jpg';
import siriAboutThumb from '@/assets/images/about/siri-about-thumb.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutUs Section Component
 * 
 * Inspired by Consulo Template "Our Company" section (home-2)
 * Authentic Content from sigigroup.pdf
 * 
 * Key Features:
 * - Mobile-first priority: Perfectly responsive typography, spacing, and touch interactions
 * - Left Media Composition: Rounded main image + overlapping secondary card with 3D depth
 * - Right Content Composition: Capsule eyebrow, high-impact headline, lead paragraph,
 *   two core value pillars ("Our Ambition" & "Our Purpose"), enterprise differentiator chips,
 *   and interactive WhatsApp consultation CTA
 * - GSAP ScrollTrigger slow, cinematic animations that play on scroll / refresh
 * - Desktop 3D mouse perspective tilt effect on media composition
 */
export default function AboutUs({ onOpenContact }) {
  const sectionRef = useRef(null);
  const mediaWrapRef = useRef(null);
  const mediaCardRef = useRef(null);
  const mediaBadgeRef = useRef(null);
  const contentColRef = useRef(null);

  // ─────────────────────────────────────────────────────────────
  // 1. GSAP ScrollTrigger Entrance Animations
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left Media Entrance (Slide from left with slight scale)
      if (mediaWrapRef.current) {
        gsap.fromTo(
          mediaWrapRef.current,
          { opacity: 0, x: -40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Right Content Staggered Entrance
      if (contentColRef.current) {
        const animatableChildren = contentColRef.current.querySelectorAll('.about-anim-item');
        if (animatableChildren.length > 0) {
          gsap.fromTo(
            animatableChildren,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 2. Desktop 3D Mouse Perspective Tilt Handlers
  // ─────────────────────────────────────────────────────────────
  const handleMediaMouseMove = (e) => {
    if (!mediaCardRef.current) return;
    const rect = mediaCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(mediaCardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Parallax shift for overlapping badge on separate depth plane
    if (mediaBadgeRef.current) {
      const badgeShiftX = ((x - centerX) / centerX) * 12;
      const badgeShiftY = ((y - centerY) / centerY) * 12;
      gsap.to(mediaBadgeRef.current, {
        x: badgeShiftX,
        y: badgeShiftY,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMediaMouseLeave = () => {
    if (mediaCardRef.current) {
      gsap.to(mediaCardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
    if (mediaBadgeRef.current) {
      gsap.to(mediaBadgeRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onOpenContact) {
      onOpenContact('Corporate Advisory Consultation');
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 w-full overflow-hidden scroll-mt-24"
      aria-label="About Us - SIRI Groups"
    >
      {/* Decorative Atmosphere Glow */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#0072CE]/10 blur-3xl pointer-events-none -translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#72BF44]/10 blur-3xl pointer-events-none translate-x-1/3"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* ─────────────────────────────────────────────────────────
              LEFT COLUMN: Media Composition with Layered 3D Card
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div
              ref={mediaWrapRef}
              className="relative w-full max-w-lg lg:max-w-none [perspective:1200px]"
              onMouseMove={handleMediaMouseMove}
              onMouseLeave={handleMediaMouseLeave}
            >
              {/* Primary Visual Card */}
              <div
                ref={mediaCardRef}
                className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden border border-white/40 shadow-2xl shadow-slate-950/20 bg-slate-900/90 will-change-transform group transition-shadow duration-500 hover:shadow-[#0072CE]/15"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Boardroom Image */}
                <img
                  src={siriAboutMain}
                  alt="SIRI Groups Strategic Boardroom"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
                  loading="lazy"
                />

                {/* Subtle Multi-Layer Vignette Scrim */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#0072CE]/20 via-transparent to-white/10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Corner Glass Badge (Mobile-Safe Top Left) */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#72BF44] animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase">
                      One Partner • Multiple Solutions
                    </span>
                  </div>
                </div>

                {/* Bottom Image Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                  <div className="text-white">
                    <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#72BF44] mb-1">
                      SIRI Groups Ecosystem
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug drop-shadow-sm max-w-sm">
                      Integrating Talent Acquisition, Social Impact Governance, Global Mobility, and Strategic Capital.
                    </p>
                  </div>
                </div>
              </div>

              {/* Overlapping Secondary Card / Floating Trust Badge (Consulo Style) */}
              <div
                ref={mediaBadgeRef}
                className="absolute -bottom-5 right-2 sm:-bottom-8 sm:right-4 z-20 w-[230px] sm:w-[270px] rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl shadow-slate-950/25 p-3 sm:p-4 will-change-transform flex items-center gap-3 text-slate-900"
              >
                {/* Secondary Thumbnail Image */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-inner">
                  <img
                    src={siriAboutThumb}
                    alt="Corporate Partnership"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Trust Metrics Details */}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#0072CE] bg-[#0072CE]/10 px-2 py-0.5 rounded-md mb-1">
                    <span>★</span> NSIC Certified
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    Govt. Registered
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate">
                    Enterprise Partner Network
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              RIGHT COLUMN: Editorial Content & Value Pillars
          ───────────────────────────────────────────────────────── */}
          <div ref={contentColRef} className="lg:col-span-6 flex flex-col pt-6 sm:pt-4 lg:pt-0">
            
            {/* 1. Capsule Subheading (Matching Consulo Sparkles Style) */}
            <div className="about-anim-item inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full border border-[#0072CE]/30 bg-white/80 backdrop-blur-md shadow-xs mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                fill="currentColor"
                className="w-3.5 h-3.5 text-[#0072CE]"
                aria-hidden="true"
              >
                <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286z" />
              </svg>
              <span className="text-xs font-black uppercase tracking-wider text-[#1E293B]">
                About Us
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                fill="currentColor"
                className="w-3.5 h-3.5 text-[#72BF44]"
                aria-hidden="true"
              >
                <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286z" />
              </svg>
            </div>

            {/* 2. Main Title */}
            <h2 className="about-anim-item text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-[#1E293B] tracking-tight leading-tight mb-4">
              Empowering Business Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0072CE] via-[#0284C7] to-[#72BF44]">
                People, Purpose & Seamless Growth
              </span>
            </h2>

            {/* 3. Authentic Lead Description (sigigroup.pdf Page 2) */}
            <p className="about-anim-item text-sm sm:text-base text-slate-600 leading-relaxed font-normal sm:font-medium mb-6">
              We are a trusted business solutions partner delivering comprehensive services across{' '}
              <strong className="text-[#1E293B] font-extrabold">Human Resources</strong>,{' '}
              <strong className="text-[#1E293B] font-extrabold">Corporate Social Responsibility (CSR)</strong>,{' '}
              <strong className="text-[#1E293B] font-extrabold">Corporate Travel</strong>,{' '}
              <strong className="text-[#1E293B] font-extrabold">Industrial Manpower</strong>, and{' '}
              <strong className="text-[#1E293B] font-extrabold">Commercial Financing</strong>. Our mission is to help organizations build high-performing teams, create lasting social impact, and manage enterprise operations efficiently.
            </p>

            {/* 4. Two Value Pillars: Ambition & Purpose (Matching Consulo Layout) */}
            <div className="about-anim-item grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* Pillar A: Our Ambition */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-[#72BF44]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#72BF44]/15 text-[#72BF44] flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                    ✦
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#1E293B] tracking-tight">
                    Our Ambition
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  To be the nation&apos;s premier single-window enterprise ecosystem—driving organizational excellence from workforce mobilization to strategic capital financing.
                </p>
              </div>

              {/* Pillar B: Our Purpose */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-[#0072CE]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0072CE]/15 text-[#0072CE] flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                    ⚖
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#1E293B] tracking-tight">
                    Our Purpose
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  To empower organizations with ethical talent acquisition, generate measurable community impact via CSR governance, and ensure frictionless corporate mobility.
                </p>
              </div>
            </div>


            {/* 6. Call To Action Button (Connecting with WhatsApp Modal) */}
            <div className="about-anim-item flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto min-h-[46px] px-7 py-3 rounded-full bg-gradient-to-r from-[#0072CE] via-[#0284C7] to-[#0072CE] hover:brightness-110 text-white font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer"
              >
                <span>Consult With Our Advisors</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-current text-xs">
                  ↗
                </span>
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
