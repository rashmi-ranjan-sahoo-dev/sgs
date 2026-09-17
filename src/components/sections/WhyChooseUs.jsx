import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import siriAboutThumb from '@/assets/images/about/siri-about-thumb.jpg';
import siriAboutMain from '@/assets/images/about/siri-about-main.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * WhyChooseUs Component
 *
 * Inspired by Consulo Template "Why Choose Us" section (home-2 / .why-choose-us)
 * Authentic Content from sirigroup.pdf (Pages 1, 2, 6, 10, 11, 14, 15)
 *
 * Key Architecture:
 * - Mobile-First priority: Clean vertical stack, touch-friendly, generous contrast
 * - Top Editorial Split (choose-top):
 *   - Left: 3D Perspective Visual Card with floating trust chips (100% Statutory Compliant)
 *   - Right: Eyebrow badge, High-impact headline ("One Partner. Multiple Strategic Solutions."),
 *     concise narrative, Consultation CTA, and Consulo-signature rotating circular seal badge
 * - Bottom Strategic Pillars (choose-bottom):
 *   - 3 Horizontal Icon-Text Cards with 3D hover tilt:
 *     1. Unified HR & Industrial Manpower Network
 *     2. Smart Corporate Travel & Global Mobility
 *     3. Social Impact & Structured Commercial Financing
 * - GSAP ScrollTrigger slow cinematic entrance animations on scroll and refresh
 */
export default function WhyChooseUs({ onOpenContact }) {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);
  const badgeSpinRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Continuous slow 360 spin for circular seal badge
      if (badgeSpinRef.current) {
        gsap.to(badgeSpinRef.current, {
          rotation: 360,
          duration: 22,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      }

      // 2. Slow cinematic scroll-triggered entrance for Top Section
      const topTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
        defaults: { ease: 'power3.out' },
      });

      if (mediaRef.current) {
        topTl.fromTo(
          mediaRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 }
        );
      }

      if (contentRef.current) {
        topTl.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          '-=0.6'
        );
      }

      // 3. Stagger reveal for the 3 Strategic Pillar Cards
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 35, rotateX: 8, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: validCards[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  // Desktop 3D Mouse Perspective Tilt on Visual Media Card
  const handleMediaMouseMove = (e) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024 || !mediaRef.current) return;
    const rect = mediaRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(mediaRef.current, {
      rotateY: x * 4,
      rotateX: -y * 4,
      transformPerspective: 1200,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMediaMouseLeave = () => {
    if (mediaRef.current) {
      gsap.to(mediaRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.55,
        ease: 'power2.out',
      });
    }
  };

  // Desktop 3D Mouse Perspective Tilt on Pillar Cards
  const handleCardMouseMove = (e, index) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(card, {
      rotateY: x * 5,
      rotateX: -y * 5,
      transformPerspective: 1000,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const pillarCards = [
    {
      id: 'hr-manpower',
      badge: 'Workforce Solutions',
      badgeColor: 'text-[#0072CE] bg-[#0072CE]/10 border-[#0072CE]/25',
      iconBg: 'bg-gradient-to-br from-[#0072CE]/15 to-[#0072CE]/5 text-[#0072CE] border border-[#0072CE]/20',
      icon: '👥',
      title: 'Unified Talent & Industrial Staffing',
      description:
        'End-to-end executive search, permanent staffing, and skilled & unskilled industrial manpower deployable with rapid turnaround and full payroll compliance.',
      highlight: '15,000+ Placed Candidates',
      statLabel: 'Statutory Compliant',
    },
    {
      id: 'corporate-travel',
      badge: 'Corporate Mobility',
      badgeColor: 'text-[#72BF44] bg-[#72BF44]/15 border-[#72BF44]/30',
      iconBg: 'bg-gradient-to-br from-[#72BF44]/20 to-[#72BF44]/5 text-slate-900 border border-[#72BF44]/30',
      icon: '✈️',
      title: 'Centralized Travel Desks & Duty of Care',
      description:
        'Dedicated corporate desks managing flight bookings, preferred 5-star hotel tariffs, fast-track visas, and insurance with an 18–25% average cost reduction.',
      highlight: '< 15 Min Rapid Ticketing',
      statLabel: '24/7 Mobility Support',
    },
    {
      id: 'csr-financing',
      badge: 'Capital & Impact',
      badgeColor: 'text-[#0284C7] bg-[#0284C7]/10 border-[#0284C7]/25',
      iconBg: 'bg-gradient-to-br from-[#0284C7]/15 to-[#0284C7]/5 text-[#0284C7] border border-[#0284C7]/20',
      icon: '💼',
      title: 'Commercial Credit & CSR Governance',
      description:
        'Fast-track structured B2B loans with leading banks, coupled with impactful CSR project management ensuring 100% regulatory compliance and measurable outcomes.',
      highlight: '₹25L – ₹100Cr+ Credit Lines',
      statLabel: 'Transparent SLA',
    },
  ];

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 lg:py-16 select-none bg-transparent overflow-hidden scroll-mt-24"
      aria-label="Why Choose SIRI Group"
    >
      {/* Anchor for backward compatibility with #why-partner */}
      <div id="why-partner" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* Subtle Ambient Radial Lighting */}
      <div
        className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-[#0072CE]/8 blur-3xl pointer-events-none -translate-x-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-[#72BF44]/8 blur-3xl pointer-events-none translate-x-1/3"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ============================================================ */}
        {/* TOP EDITORIAL SECTION (choose-top): Visual Card & Editorial  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mb-10 sm:mb-12 lg:mb-14">
          {/* ─────────────────────────────────────────────────────────
              Left Column: Visual Composition with 3D Tilt & Floating Badges
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 w-full flex justify-center [perspective:1200px]">
            <div
              ref={mediaRef}
              onMouseMove={handleMediaMouseMove}
              onMouseLeave={handleMediaMouseLeave}
              className="relative w-full max-w-lg lg:max-w-none will-change-transform"
            >
              {/* Primary Visual Card with Rounded Glass Edges */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden border border-white/40 shadow-2xl shadow-slate-950/20 bg-slate-900/90 group">
                <img
                  src={siriAboutThumb}
                  alt="SIRI Group Business Excellence"
                  className="w-full h-full object-cover object-center opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  loading="lazy"
                />

                {/* Subtle Gradient Scrim for Readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top-Left Floating Badge: Certified & Compliant */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/25 text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#72BF44] animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase">
                      NSIC Certified • 100% Statutory Compliant
                    </span>
                  </div>
                </div>

                {/* Bottom Card Summary Snippet */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                  <div className="p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-xl flex items-center justify-between gap-3 text-slate-900">
                    <div>
                      <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#0072CE]">
                        Enterprise SLA Fulfillment
                      </div>
                      <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                        250+ Corporate Partners Across India
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#72BF44]/20 border border-[#72BF44]/40 flex items-center justify-center text-[#1E293B] font-black text-xs shrink-0">
                      ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              Right Column: Editorial Content + Rotating Seal Badge
          ───────────────────────────────────────────────────────── */}
          <div ref={contentRef} className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#72BF44]/40 bg-[#F2FBF0]/95 text-[#72BF44] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs backdrop-blur-xs mb-3 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-ping" />
              <span>04 • WHY CHOOSE SIRI GROUP</span>
            </div>

            {/* Main Headline (From sirigroup.pdf Page 11) */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E293B] tracking-tight leading-tight mb-3 sm:mb-4">
              One Partner.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0072CE] to-[#72BF44]">
                Multiple Strategic Solutions.
              </span>
            </h2>

            {/* Narrative Paragraph from sirigroup.pdf */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-5 sm:mb-6 max-w-xl">
              We empower growing enterprises by unifying executive recruitment, industrial workforce,
              impactful CSR governance, 24/7 corporate travel desks, and tailored commercial financing
              under one reliable, audit-compliant partnership.
            </p>

        
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM FEATURE CARDS (choose-bottom): 3 Core Pillars         */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch [perspective:1200px]">
          {pillarCards.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseMove={(e) => handleCardMouseMove(e, idx)}
              onMouseLeave={() => handleCardMouseLeave(idx)}
              className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white/95 border border-slate-200/90 shadow-xl shadow-slate-900/5 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:border-[#0072CE]/40 will-change-transform cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div>
                {/* Top Row: Icon Badge & Category Pill */}
                <div className="flex items-center justify-between gap-2.5 mb-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xs transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
                  >
                    {card.icon}
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Pillar Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E293B] tracking-tight leading-snug mb-2 group-hover:text-[#0072CE] transition-colors">
                  {card.title}
                </h3>

                {/* Pillar Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                  {card.description}
                </p>
              </div>

              {/* Bottom Feature Highlight Tag */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 text-[#0072CE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]" />
                  <span>{card.highlight}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{card.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
