import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_DATA } from '@/data/aboutData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * AboutUs Section Component
 *
 * Exact Layout Reference: Consulo Home-2 "Our Company" (.image-text mt-100)
 * Content Source of Truth: sirigroup.pdf (Page 1, 2, 11, 15)
 *
 * Consulo Elements Replicated Exactly:
 * 1. .media-wrap with geometric/chevron angular composition & dark solid triangle accent
 * 2. .image-small frosted glass card with 98% metric & 5 overlapping circular avatars
 * 3. Continuous 2D vertical floating animation (yoyo loop)
 * 4. Subheading pill with 4-point sparkle star icons: ✦ Our Company ✦
 * 5. Display heading with signature curved highlight
 * 6. Consulo's exact .list-block: 2 horizontal columns with 60x60 circular outline SVG icons
 * 7. Consulo's exact .button--primary: Pill button with circular arrow disc translating on hover
 * 8. Zero gap/space between Hero section and About Us section
 */
export default function AboutUs() {
  const sectionRef = useRef(null);
  const mediaWrapRef = useRef(null);
  const mainImageRef = useRef(null);
  const floatingCardRef = useRef(null);
  const triangleRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const listItemsRef = useRef([]);
  const buttonRef = useRef(null);
  const floatTweenRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────
      // 1. Continuous 2D Floating Animations
      // ─────────────────────────────────────────────────────────────
      if (floatingCardRef.current) {
        floatTweenRef.current = gsap.to(floatingCardRef.current, {
          y: -10,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      if (triangleRef.current) {
        gsap.to(triangleRef.current, {
          y: -6,
          rotation: 3,
          duration: 4.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // ─────────────────────────────────────────────────────────────
      // 2. ScrollTrigger & Initial Open Staggered Reveal
      // ─────────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      // Media Wrap Entrance (Consulo data-aos="zoom-in-up")
      if (mediaWrapRef.current) {
        tl.fromTo(
          mediaWrapRef.current,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.15 }
        );
      }

      // Small Card Entrance (Consulo data-aos="zoom-in-down")
      if (floatingCardRef.current) {
        tl.fromTo(
          floatingCardRef.current,
          { opacity: 0, scale: 0.85, y: 45 },
          { opacity: 1, scale: 1, y: 0, duration: 0.95, ease: 'back.out(1.5)' },
          '-=0.7'
        );
      }

      // Right Column: Badge (data-aos="fade-up")
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.8'
        );
      }

      // Heading (data-aos="fade-up" data-aos-delay="50")
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.6'
        );
      }

      // Text (data-aos="fade-up" data-aos-delay="80")
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.6'
        );
      }

      // Consulo .list-block Items (Our Ambition & Our Purpose)
      const validItems = listItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        tl.fromTo(
          validItems,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.18,
            ease: 'power2.out',
          },
          '-=0.45'
        );
      }

      // Primary Button (data-aos="fade-up")
      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.45'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (floatTweenRef.current) floatTweenRef.current.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative pt-2 pb-16 sm:pt-4 sm:pb-20 lg:pt-6 lg:pb-28 bg-background overflow-hidden"
      aria-label="Our Company - SIRI Group"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Consulo .media-wrap with Geometric Cutout       */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 relative">
            <div
              ref={mediaWrapRef}
              className="relative mx-auto max-w-[500px] lg:max-w-none will-change-transform"
            >
              {/* Consulo Signature Decorative Solid Triangle Accent (Bottom Left) */}
              <div
                ref={triangleRef}
                className="absolute -bottom-5 -left-5 sm:-bottom-8 sm:-left-8 w-28 h-28 sm:w-36 sm:h-36 bg-primary z-0 rounded-sm shadow-lg pointer-events-none will-change-transform"
                style={{
                  clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)',
                }}
                aria-hidden="true"
              />

              {/* Secondary Accent Triangle in SIRI Green */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-secondary/80 z-0 pointer-events-none"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
                }}
                aria-hidden="true"
              />

              {/* Main Corporate Image with Consulo Chevron/Polygon Cut */}
              <div
                ref={mainImageRef}
                className="relative z-10 overflow-hidden bg-surface shadow-2xl transition-transform duration-700 hover:scale-[1.01]"
                style={{
                  clipPath: 'polygon(14% 0%, 100% 0%, 100% 86%, 86% 100%, 0% 100%, 0% 14%)',
                }}
              >
                <div className="relative aspect-[4/3.4] w-full overflow-hidden bg-muted/20">
                  <img
                    src={ABOUT_DATA.images.main}
                    alt={ABOUT_DATA.images.altMain}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle glass gradient sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/30 via-transparent to-white/10 pointer-events-none" />
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  Consulo Signature .image-small Overlapping Card
                  Features: 98% metric, retention label, 5 overlapping avatars,
                  and radiant glowing green border on hover!
              ───────────────────────────────────────────────────────────── */}
              <div
                ref={floatingCardRef}
                className="image-small absolute bottom-2 -right-2 sm:bottom-6 sm:-right-6 md:bottom-8 md:-right-8 z-20 w-[190px] sm:w-[215px] p-4 sm:p-5 rounded-xl backdrop-blur-[60px] bg-white/95 border border-white/80 shadow-[0_25px_70px_rgba(4,31,31,0.22)] transition-all duration-300 hover:border-secondary hover:shadow-[0_20px_50px_rgba(101,183,65,0.35)] cursor-pointer group/card will-change-transform select-none"
              >
                {/* 98% Large Bold Metric */}
                <div className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-none group-hover/card:text-secondary-dark transition-colors duration-300">
                  {ABOUT_DATA.floatingCard.percentage}
                </div>

                {/* Metric Label */}
                <div className="text-xs sm:text-[13px] font-semibold text-muted-foreground mt-1.5 mb-3.5 leading-snug">
                  {ABOUT_DATA.floatingCard.label}
                </div>

                {/* Consulo Signature Overlapping 5 Avatar Circles */}
                <div className="flex items-center -space-x-2 transition-all duration-300 group-hover/card:-space-x-1">
                  {/* Avatar 1 */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0 bg-muted/20">
                    <img
                      src={ABOUT_DATA.floatingCard.avatars}
                      alt="Team member 1"
                      className="w-full h-full object-cover scale-[5] object-[10%_25%]"
                    />
                  </div>
                  {/* Avatar 2 */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0 bg-muted/20">
                    <img
                      src={ABOUT_DATA.floatingCard.avatars}
                      alt="Team member 2"
                      className="w-full h-full object-cover scale-[5] object-[30%_25%]"
                    />
                  </div>
                  {/* Avatar 3 */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0 bg-muted/20">
                    <img
                      src={ABOUT_DATA.floatingCard.avatars}
                      alt="Team member 3"
                      className="w-full h-full object-cover scale-[5] object-[50%_25%]"
                    />
                  </div>
                  {/* Avatar 4 */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0 bg-muted/20">
                    <img
                      src={ABOUT_DATA.floatingCard.avatars}
                      alt="Team member 4"
                      className="w-full h-full object-cover scale-[5] object-[70%_25%]"
                    />
                  </div>
                  {/* Avatar 5 */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0 bg-muted/20">
                    <img
                      src={ABOUT_DATA.floatingCard.avatars}
                      alt="Team member 5"
                      className="w-full h-full object-cover scale-[5] object-[90%_25%]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Consulo Section Headings, .list-block & Button  */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 lg:pl-4 xl:pl-8">
            {/* 1. Consulo Subheading Pill with 4-Point Sparkle Star Icons */}
            <div ref={badgeRef} className="will-change-transform">
              <div className="subheading inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface border border-border text-primary text-xs sm:text-sm font-bold tracking-wider uppercase shadow-subtle">
                {/* 4-point Sparkle SVG Left */}
                <span className="text-secondary shrink-0">
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286" />
                  </svg>
                </span>
                <span>{ABOUT_DATA.badge}</span>
                {/* 4-point Sparkle SVG Right */}
                <span className="text-secondary shrink-0">
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path d="M8.714 5.286C11.751 5.421 14 5.941 14 7s-2.249 1.58-5.286 1.714C8.579 11.751 8.059 14 7 14s-1.58-2.249-1.714-5.286C2.249 8.579 0 8.059 0 7s2.249-1.58 5.286-1.714C5.421 2.249 5.941 0 7 0s1.58 2.249 1.714 5.286" />
                  </svg>
                </span>
              </div>
            </div>

            {/* 2. Consulo Heading with Highlighted Accent Text */}
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-foreground leading-[1.18] tracking-tight will-change-transform"
            >
              {ABOUT_DATA.titleParts.before}{' '}
              <span className="relative inline-block text-secondary">
                {ABOUT_DATA.titleParts.highlight}
                {/* Consulo curved artistic underline */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-secondary/60"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 9.5C28 2.5 72 2.5 99 9.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              {ABOUT_DATA.titleParts.after}
            </h2>

            {/* 3. Narrative Description from sirigroup.pdf Page 2 */}
            <p
              ref={textRef}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal will-change-transform max-w-xl"
            >
              {ABOUT_DATA.description}
            </p>

            {/* ─────────────────────────────────────────────────────────────
                4. Consulo Signature .list-block (Horizontal 2-Column Row)
                Each column features:
                - Circular 60x60 Outlined SVG Icon (Consulo stroke="#1C2539")
                - Title: "Our ambition" / "Our purpose" (text-22 fw-600)
                - Description line (text-16)
            ───────────────────────────────────────────────────────────── */}
            <ul className="list-block list-unstyled grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pt-4 pb-2">
              {ABOUT_DATA.features.map((feature, idx) => {
                const isAmbition = feature.id === 'ambition';
                return (
                  <li
                    key={feature.id}
                    ref={(el) => (listItemsRef.current[idx] = el)}
                    className="text-item flex flex-col items-start group will-change-transform cursor-pointer"
                  >
                    {/* Consulo 60x60 Circular Outlined SVG Icon */}
                    <div className="w-[60px] h-[60px] rounded-full border-2 border-primary/25 bg-surface flex items-center justify-center text-primary group-hover:border-secondary group-hover:text-secondary group-hover:shadow-[0_0_22px_rgba(101,183,65,0.3)] transition-all duration-300 group-hover:scale-105">
                      {isAmbition ? (
                        /* Consulo Ambition Vector Icon */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:scale-110"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        /* Consulo Purpose Vector Icon */
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 fill-current transition-transform duration-300 group-hover:scale-110"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                        </svg>
                      )}
                    </div>

                    {/* Consulo Title: .title text-22 fw-600 */}
                    <h3 className="title text-xl sm:text-[22px] font-bold text-foreground mt-5 mb-2 group-hover:text-primary transition-colors duration-200">
                      {feature.title}
                    </h3>

                    {/* Consulo Text: .text text-16 */}
                    <p className="text text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </li>
                );
              })}
            </ul>

            {/* ─────────────────────────────────────────────────────────────
                5. Consulo Signature Button: button button--primary
                Pill button with circular white disc & arrow icon
            ───────────────────────────────────────────────────────────── */}
            <div ref={buttonRef} className="buttons pt-2 will-change-transform flex items-center gap-6">
              <a
                href={ABOUT_DATA.cta.href}
                className="button button--primary inline-flex items-center gap-4 px-8 py-3.5 sm:py-4 rounded-full bg-primary text-white font-bold text-base shadow-lg shadow-primary/20 hover:bg-secondary hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label="Explore more about SIRI Group"
              >
                <span>{ABOUT_DATA.cta.label}</span>
                {/* Consulo Circular Arrow SVG Wrapper */}
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 group-hover:bg-white group-hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="m13.337 7.845-7.173 7.172-1.178-1.178 7.172-7.172H5.837V5h9.166v9.167h-1.667z"
                    />
                  </svg>
                </span>
              </a>

              {/* Consultation Hotline Pill */}
              <a
                href="tel:+919989325255"
                className="hidden sm:inline-flex items-center gap-3 text-sm font-medium text-muted hover:text-primary transition-colors duration-200"
                aria-label="Call SIRI Group consultation desk"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary-dark flex-shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[11px] text-muted-light font-bold uppercase tracking-wider">
                    Quick Consultation
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-foreground">
                    +91 99893 25255
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
