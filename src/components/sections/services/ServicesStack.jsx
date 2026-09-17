import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiriGlobalSolutions from './SiriGlobalSolutions';
import SiriCorporateTravel from './SiriCorporateTravel';
import SiriFinHub from './SiriFinHub';

gsap.registerPlugin(ScrollTrigger);

/**
 * 3 Core Industry Verticals: Natural Sequential Flow
 * 
 * Features:
 * - Natural, sequential document flow with zero sticky overlap
 * - Clean section boundaries and comfortable vertical spacing
 * - Smooth scroll-triggered entrance reveals
 * - Full visibility of all cards, metrics, and CTAs on all screen sizes
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

    // Smooth subtle entrance reveals for each vertical section as it scrolls into view
    mm.add('(min-width: 0px)', () => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.92, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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
          SECTION 01: SIRI Global Solutions
      ───────────────────────────────────────────────────────── */}
      <div
        ref={card1Ref}
        className="relative w-full bg-transparent overflow-x-hidden pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-6 lg:pb-10"
      >
        <SiriGlobalSolutions onOpenContact={onOpenContact} />
      </div>

      {/* ─────────────────────────────────────────────────────────
          SECTION 02: SIRI Corporate Travel
      ───────────────────────────────────────────────────────── */}
      <div
        ref={card2Ref}
        className="relative w-full bg-[#F8FAFC] hero-animated-gradient-bg border-t border-slate-200/60 shadow-xs overflow-x-hidden py-6 sm:py-8 lg:py-10"
      >
        <SiriCorporateTravel onOpenContact={onOpenContact} />
      </div>

      {/* ─────────────────────────────────────────────────────────
          SECTION 03: SIRI Fin Hub
      ───────────────────────────────────────────────────────── */}
      <div
        ref={card3Ref}
        className="relative w-full bg-[#F8FAFC] hero-animated-gradient-bg border-t border-slate-200/60 shadow-xs overflow-x-hidden py-6 sm:py-8 lg:py-10"
      >
        <SiriFinHub onOpenContact={onOpenContact} />
      </div>
    </div>
  );
}


