import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import siriLogo from '@/assets/images/siri-logo.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer Component
 * 
 * Inspired by Consulo Template Footer (home-2)
 * Authentic Content extracted from sigigroup.pdf
 * 
 * Key Features:
 * - Luxury dark slate styling matching Consulo's theme with subtle brand aurora glows
 * - 4-column responsive grid on desktop, clean vertical flow on mobile phones
 * - Real business data: HR, Manpower, CSR, Corporate Travel, and Siri Fin Hub Loans
 * - GSAP ScrollTrigger slow, elegant reveal on scroll
 * - Integrated WhatsApp contact trigger via onOpenContact
 */
export default function Footer({ onOpenContact }) {
  const footerRef = useRef(null);
  const widgetsRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (widgetsRef.current) {
        gsap.fromTo(
          widgetsRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const smoothScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + (window.scrollY ?? window.pageYOffset ?? 0) - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (onOpenContact) {
      onOpenContact('Footer General Inquiry');
    }
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative bg-slate-950 text-slate-300 border-t border-slate-800/80 overflow-hidden select-none"
      aria-label="Footer - SIRI Groups"
    >
      {/* Subtle Brand Atmosphere Glows */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#0072CE]/8 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#72BF44]/8 blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div
          ref={widgetsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-10 items-start"
        >
          {/* ─────────────────────────────────────────────────────────
              COLUMN 1: Brand Logo, Narrative & Socials (lg:col-span-4)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            {/* Logo with Frost Backing */}
            <a
              href="#hero"
              onClick={(e) => smoothScrollTo(e, '#hero')}
              aria-label="SIRI Group Home"
              className="inline-block self-start p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-md hover:scale-[1.02] transition-transform"
            >
              <img
                src={siriLogo}
                alt="SIRI Group Logo"
                className="h-9 sm:h-10 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Tagline & Core Statement (from sigigroup.pdf) */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
              Empowering business through people, purpose, and seamless travel. A trusted partner delivering integrated HR solutions, workforce manpower, governed CSR programs, corporate travel desks, and tailored commercial financing.
            </p>

            {/* NSIC & Compliance Chip */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-pulse" />
              <span>NSIC Registered • 100% Statutory Compliant</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SIRI Group on LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#0072CE] border border-slate-800 hover:border-[#0072CE] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SIRI  on X"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#0072CE] border border-slate-800 hover:border-[#0072CE] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SIRI Group on Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#0072CE] border border-slate-800 hover:border-[#0072CE] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SIRI Group on Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#72BF44] border border-slate-800 hover:border-[#72BF44] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              COLUMN 2: Quick Navigation Links (lg:col-span-2)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => smoothScrollTo(e, '#hero')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => smoothScrollTo(e, '#about')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => smoothScrollTo(e, '#services')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Core Verticals
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => smoothScrollTo(e, '#testimonials')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Client Voices
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="text-slate-400 hover:text-[#0072CE] hover:translate-x-1 inline-block transition-all cursor-pointer"
                >
                  Contact Advisory Desk
                </button>
              </li>
            </ul>
          </div>

          {/* ─────────────────────────────────────────────────────────
              COLUMN 3: Core Verticals & Capabilities (lg:col-span-3)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Core Verticals
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#services-hr"
                  onClick={(e) => smoothScrollTo(e, '#services-hr')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Human Resources & Staffing
                </a>
              </li>
              <li>
                <a
                  href="#services-manpower"
                  onClick={(e) => smoothScrollTo(e, '#services-manpower')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Industrial & Facility Manpower
                </a>
              </li>
              <li>
                <a
                  href="#services-csr"
                  onClick={(e) => smoothScrollTo(e, '#services-csr')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  CSR Project Management
                </a>
              </li>
              <li>
                <a
                  href="#services-travel"
                  onClick={(e) => smoothScrollTo(e, '#services-travel')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  Corporate Travel & Mobility
                </a>
              </li>
              <li>
                <a
                  href="#services-loans"
                  onClick={(e) => smoothScrollTo(e, '#services-loans')}
                  className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  SIRI Fin Hub B2B Loans
                </a>
              </li>
            </ul>
          </div>

          {/* ─────────────────────────────────────────────────────────
              COLUMN 4: Advisory Consultation & Contact (lg:col-span-3)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Enterprise Advisory
            </h3>

            <button
              type="button"
              onClick={handleContactClick}
              className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#0072CE] to-[#0284C7] hover:brightness-110 text-white font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span>Connect Us</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                ↗
              </span>
            </button>

            <div className="space-y-1 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-[#72BF44]">✉</span>
                <a href="mailto:info@sirigroup.com" className="hover:text-white transition-colors">
                  info@sirigroup.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0072CE]">⏰</span>
                <span>24/7 Corporate Mobility Desk SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          FOOTER BOTTOM BAR: Copyright & Statutory Links
      ───────────────────────────────────────────────────────── */}
      <div
        ref={bottomBarRef}
        className="border-t border-slate-800/80 bg-slate-950/80 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            Copyright &copy; {new Date().getFullYear()} SIRI Groups. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <button
              type="button"
              onClick={handleContactClick}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={handleContactClick}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={handleContactClick}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Statutory Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
