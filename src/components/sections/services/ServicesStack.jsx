import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiriGlobalSolutions from './SiriGlobalSolutions';
import SiriCorporateTravel from './SiriCorporateTravel';
import SiriFinHub from './SiriFinHub';

gsap.registerPlugin(ScrollTrigger);

/**
 * Enterprise 3D Stacking Deck for the 3 Core Industry Verticals
 * 
 * Features:
 * - GSAP ScrollTrigger hardware-accelerated scrub stacking animation
 * - 3D perspective depth: previous cards scale down and dim as new sections stack over them
 * - Full-width screen layout with fixed hero background color (no "big card" borders or notches)
 * - Responsive layout: 3D stacking deck on desktop, natural flowing full visibility on mobile phones
 */
export default function ServicesStack({ onOpenContact }) {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // ─────────────────────────────────────────────────────────────
    // Desktop & Tablet (>= 768px): 3D ScrollTrigger Scrub Stacking Deck
    // ─────────────────────────────────────────────────────────────
    mm.add('(min-width: 768px)', () => {
      // 1. As Card 2 stacks over Card 1:
      if (card1Ref.current && card2Ref.current) {
        gsap.to(card1Ref.current, {
          scale: 0.95,
          opacity: 0.9,
          transformPerspective: 1200,
          ease: 'none',
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.5,
          },
        });
      }

      // 2. As Card 3 stacks over Card 2:
      if (card2Ref.current && card3Ref.current) {
        gsap.to(card2Ref.current, {
          scale: 0.95,
          opacity: 0.9,
          transformPerspective: 1200,
          ease: 'none',
          scrollTrigger: {
            trigger: card3Ref.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.5,
          },
        });

        // Card 1 recedes further into background depth
        if (card1Ref.current) {
          gsap.to(card1Ref.current, {
            scale: 0.9,
            opacity: 0.75,
            ease: 'none',
            scrollTrigger: {
              trigger: card3Ref.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.5,
            },
          });
        }
      }
    });

    // ─────────────────────────────────────────────────────────────
    // Mobile Devices (< 768px): Smooth ScrollTrigger Entrance Reveals
    // ─────────────────────────────────────────────────────────────
    mm.add('(max-width: 767px)', () => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.88, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
    };
  }, []);

  return (
    <div id="services" ref={containerRef} className="relative w-full select-none bg-transparent">
      {/* ─────────────────────────────────────────────────────────
          CARD 01: SIRI Global Solutions (Base Stacking Card)
      ───────────────────────────────────────────────────────── */}
      <div
        ref={card1Ref}
        className="relative md:sticky top-0 z-10 w-full min-h-auto md:min-h-[100dvh] origin-top bg-transparent transition-all duration-300 flex flex-col justify-center overflow-x-hidden pt-1 sm:pt-2 pb-2 sm:pb-4"
      >
        <SiriGlobalSolutions onOpenContact={onOpenContact} />
      </div>

      {/* ─────────────────────────────────────────────────────────
          CARD 02: SIRI Corporate Travel (Second Stacking Card)
          Full-width screen with fixed hero background color (no big card sheet)
      ───────────────────────────────────────────────────────── */}
      <div
        ref={card2Ref}
        className="relative md:sticky top-0 z-20 w-full min-h-auto md:min-h-[100dvh] origin-top bg-[#F8FAFC] hero-animated-gradient-bg border-t border-slate-200/60 shadow-[0_-20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-center overflow-x-hidden py-3 sm:py-4 lg:py-6"
      >
        <SiriCorporateTravel onOpenContact={onOpenContact} />
      </div>

      {/* ─────────────────────────────────────────────────────────
          CARD 03: SIRI Fin Hub (Top Stacking Card)
          Full-width screen with fixed hero background color (no big card sheet)
      ───────────────────────────────────────────────────────── */}
      <div
        ref={card3Ref}
        className="relative md:sticky top-0 z-30 w-full min-h-auto md:min-h-[100dvh] origin-top bg-[#F8FAFC] hero-animated-gradient-bg border-t border-slate-200/60 shadow-[0_-25px_50px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-center overflow-x-hidden py-3 sm:py-4 lg:py-6"
      >
        <SiriFinHub onOpenContact={onOpenContact} />
      </div>
    </div>
  );
}


