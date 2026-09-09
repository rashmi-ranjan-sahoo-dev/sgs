import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * FunFacts Component (Lower Hero Section)
 *
 * Inspired by Corpox template "Our Fun Facts" / "TRUSTED" cards:
 * - Guaranteed 100% visible at all times (safe from StrictMode / scroll issues)
 * - Realistic 2D tactile cards with depth, gradient surface, and top-edge light sheen
 * - Hover on ANY part of the card triggers an illuminated glowing green border & radiant green shadow
 * - Signature bottom-right rounded corner tab accent that scales and glows on hover
 * - Slow, cool opening animation on first load or every refresh
 * - Dynamic counting number animations (0 -> 199K, 0 -> 575+, 0 -> 500+)
 * - 100% responsive across all screen sizes
 */
const FACTS_DATA = [
  {
    id: 1,
    targetValue: 199,
    suffix: 'K',
    label: 'Happy Clients.',
    sublabel: 'Organizations served across multiple sectors',
  },
  {
    id: 2,
    targetValue: 575,
    suffix: '+',
    label: 'Employees',
    sublabel: 'Dedicated workforce and staffing placements',
  },
  {
    id: 3,
    targetValue: 500,
    suffix: '+',
    label: 'Useful Programs',
    sublabel: 'Tailored HR, CSR and corporate travel solutions',
  },
];

export default function FunFacts() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const numberRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Slow, cool entrance animation synchronized with page opening
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          stagger: 0.16,
          delay: 1.15, // coordinates seamlessly with PageLoader
          ease: 'power3.out',
          clearProps: 'opacity,transform', // Guarantees cards remain 100% visible
        }
      );

      // Slow dynamic counter number animations
      FACTS_DATA.forEach((fact, idx) => {
        const numEl = numberRefs.current[idx];
        if (!numEl) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: fact.targetValue,
          duration: 2.4,
          delay: 1.3 + idx * 0.12,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.innerText = `${Math.floor(counter.val)}${fact.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full mt-4 sm:mt-6 lg:mt-7 pt-1 sm:pt-2"
      aria-label="Our Fun Facts and Key Statistics"
    >
      {/* ─────────────────────────────────────────────────────────────
          Section Subtitle Header: TRUSTED
      ───────────────────────────────────────────────────────────── */}
      <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 sm:w-14 h-[1.5px] bg-gradient-to-r from-transparent to-secondary" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-secondary">
            TRUSTED
          </span>
          <span className="w-8 sm:w-14 h-[1.5px] bg-gradient-to-l from-transparent to-secondary" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3-Column Realistic 2D Cards Grid (Corpox Style with Green Glow Border)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-6xl mx-auto">
        {FACTS_DATA.map((fact, index) => (
          <div
            key={fact.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="trust-card-2d p-7 sm:p-8 md:p-9 flex flex-col justify-between select-none"
          >
            {/* Top-edge realistic light sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300"
            />

            {/* Subtle ambient green radial back-glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-secondary/15 blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
            />

            {/* Card Content */}
            <div className="relative z-10">
              {/* Dynamic Animated Number */}
              <div
                ref={(el) => (numberRefs.current[index] = el)}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3 font-sans transition-colors duration-300"
              >
                {fact.targetValue}{fact.suffix}
              </div>

              {/* Stat Label */}
              <h3 className="trust-card-label text-base sm:text-lg font-bold text-slate-200 transition-colors duration-300 mb-1.5">
                {fact.label}
              </h3>

              {/* Sublabel / Description */}
              <p className="trust-card-desc text-xs sm:text-caption text-slate-400 leading-relaxed transition-colors duration-300">
                {fact.sublabel}
              </p>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                Signature Bottom-Right Corner Tab Accent (Corpox Reference)
            ───────────────────────────────────────────────────────────── */}
            <span
              aria-hidden="true"
              className="trust-card-corner absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-tl-md sm:rounded-tl-lg bg-secondary transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
