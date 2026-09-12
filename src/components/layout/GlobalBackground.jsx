import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Global Fixed Background Canvas
 * 
 * Replicates the EXACT Hero section background as a persistent, fixed canvas
 * behind all sections across the entire website.
 * 
 * Specifications:
 * - Base surface: #F8FAFC
 * - Gradient: SIRI Blue (#0072CE @ 24%), Sky Blue (#E0F2FE @ 88%), Mint (#F0FDF4 @ 88%), Lime Green (#72BF44 @ 26%)
 * - Animation: heroGradientFloat 16s ease-in-out infinite alternate (200% 200% background size)
 * - Dot-Grid: 24px x 24px radial-gradient(#0072CE 1px, transparent 1px) at 30% opacity
 * - 4 Atmospheric Luminous Mesh Orbs with identical GSAP trajectories and easing
 * - NO dark-mode color overrides: always maintains this luminous, radiant brand look
 */
export default function GlobalBackground() {
  const topOrbRef = useRef(null);
  const bottomOrbRef = useRef(null);
  const centerOrbRef = useRef(null);
  const leftOrbRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Orb 1: Core SIRI Blue Top-Right
      if (topOrbRef.current) {
        gsap.to(topOrbRef.current, {
          x: 55,
          y: -45,
          scale: 1.15,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Orb 2: Core SIRI Lime Green Bottom-Left
      if (bottomOrbRef.current) {
        gsap.to(bottomOrbRef.current, {
          x: -45,
          y: 50,
          scale: 1.18,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Orb 3: Brand Combo Gradient Mid-Right
      if (centerOrbRef.current) {
        gsap.to(centerOrbRef.current, {
          x: 40,
          y: 35,
          rotate: 140,
          scale: 1.12,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Orb 4: Luminous Blue Top-Left
      if (leftOrbRef.current) {
        gsap.to(leftOrbRef.current, {
          x: -35,
          y: -35,
          scale: 1.1,
          duration: 9.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden bg-[#F8FAFC] hero-animated-gradient-bg"
      aria-hidden="true"
    >
      {/* ─────────────────────────────────────────────────────────
          Styles: Exact Shifting Gradient Background from Hero Section
      ───────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes heroGradientFloat {
          0% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 30%;
          }
          50% {
            background-position: 80% 100%;
          }
          75% {
            background-position: 0% 70%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .hero-animated-gradient-bg {
          background-image: linear-gradient(
            135deg,
            rgba(0, 114, 206, 0.24) 0%,
            rgba(224, 242, 254, 0.88) 28%,
            rgba(240, 253, 244, 0.88) 62%,
            rgba(114, 191, 68, 0.26) 100%
          );
          background-size: 200% 200%;
          animation: heroGradientFloat 16s ease-in-out infinite alternate;
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────
          1. Subtle Raycast-Style Canvas Dot-Grid Background Overlay
      ───────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#0072CE 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────
          2. Atmospheric Infinitely Floating Primary Color Mesh Orbs
      ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Orb 1: Core SIRI Blue (#0072CE) Top-Right */}
        <div
          ref={topOrbRef}
          className="absolute -top-12 -right-12 sm:top-0 sm:right-0 w-84 h-84 sm:w-[560px] sm:h-[560px] lg:w-[740px] lg:h-[740px] rounded-full bg-gradient-to-br from-[#0072CE] to-[#0284C7] opacity-45 blur-[75px] sm:blur-[115px] will-change-transform"
        />

        {/* Orb 2: Core SIRI Lime Green (#72BF44) Bottom-Left */}
        <div
          ref={bottomOrbRef}
          className="absolute top-1/2 -left-16 sm:top-1/3 sm:left-2 w-76 h-76 sm:w-[520px] sm:h-[520px] lg:w-[680px] lg:h-[680px] rounded-full bg-gradient-to-tr from-[#72BF44] to-[#84CC16] opacity-40 blur-[70px] sm:blur-[110px] will-change-transform"
        />

        {/* Orb 3: Brand Combo Gradient (#72BF44 to #0072CE) Mid-Right */}
        <div
          ref={centerOrbRef}
          className="absolute top-1/4 right-1/8 w-68 h-68 sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-br from-[#72BF44] via-[#00A3E0] to-[#0072CE] opacity-35 blur-[65px] sm:blur-[100px] will-change-transform"
        />

        {/* Orb 4: Luminous Blue-Cyan Top-Left */}
        <div
          ref={leftOrbRef}
          className="absolute -top-10 -left-10 w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-br from-[#0072CE] to-[#38BDF8] opacity-30 blur-[65px] sm:blur-[95px] will-change-transform"
        />
      </div>
    </div>
  );
}
