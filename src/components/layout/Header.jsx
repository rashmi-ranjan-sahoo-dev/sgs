import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { NAV_LINKS, CTA_BUTTON } from '@/data/navigation';
import siriLogo from '@/assets/images/siri-logo.png';

/**
 * SIRI Group Header Component with GSAP ScrollTrigger & Floating Pill Morph
 *
 * Visual Reference: Consulo Floating Header & Reference Video
 * Content Source of Truth: sirigroup.pdf
 *
 * Specifications Implemented:
 * - Brand Logo: siri-logo.png rendered in 100% original brand colors on desktop & mobile with clean frosted backing
 * - Color Palette: Primary Blue #0072CE, Lime Green #72BF44, Neutral Dark #1E293B
 * - Phase A: Mount entrance from y: -60, opacity: 0 -> y: 0, opacity: 1 (0.8s, power3.out)
 * - Phase B: Scroll-triggered island morphing (Full-Width -> Floating Pill when scrollY > 40px)
 * - Phase C: Smart directional hide / reveal (slow, gentle easing 0.65s power3.out / 0.55s power3.inOut)
 * - Phase D: Services Mega-Dropdown with slow, floaty entrance (0.55s power3.out) & rotating chevron
 * - Mobile Navigation: Brand-new Aurora Gradient Glass drawer matching Header with slow, smooth GSAP slide & accordion animations
 * - CTA Button: Pill button labeled "Contact Us" with enclosed arrow circle
 */
export default function Header({ onOpenContact }) {
  const [isPill, setIsPill] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headerWrapperRef = useRef(null);
  const headerPillRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownItemsRef = useRef([]);
  const chevronRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHiddenRef = useRef(false);
  const dropdownTimeoutRef = useRef(null);

  // Mobile drawer and accordion refs for slow, smooth GSAP animations
  const mobileBackdropRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const mobileNavItemsRef = useRef([]);
  const mobileAccordionRef = useRef(null);
  const mobileAccordionChevronRef = useRef(null);
  const mobileAccordionItemsRef = useRef([]);

  // ─────────────────────────────────────────────────────────────
  // Phase A: On Mount Entrance Animation
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerWrapperRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', clearProps: 'opacity' }
      );
    });

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Phase B & C: Scroll-Triggered Morphing & Smart Directional Hide / Reveal
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Threshold check for floating pill morph
      if (currentScrollY > 40) {
        setIsPill(true);
      } else {
        setIsPill(false);
      }

      // Smart Directional Hide / Reveal with slow, smooth easing
      if (currentScrollY > 150) {
        if (delta > 6 && !isHiddenRef.current && !servicesOpen && !mobileOpen) {
          // Scrolling down -> hide smoothly
          isHiddenRef.current = true;
          gsap.to(headerWrapperRef.current, {
            yPercent: -130,
            duration: 0.55,
            ease: 'power3.inOut',
            overwrite: 'auto',
          });
        } else if (delta < -6 && isHiddenRef.current) {
          // Scrolling up -> reveal smoothly
          isHiddenRef.current = false;
          gsap.to(headerWrapperRef.current, {
            yPercent: 0,
            duration: 0.65,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      } else if (currentScrollY <= 20 && isHiddenRef.current) {
        // Reached top -> reset smoothly
        isHiddenRef.current = false;
        gsap.to(headerWrapperRef.current, {
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [servicesOpen, mobileOpen]);

  // ─────────────────────────────────────────────────────────────
  // Phase D: Services Dropdown Menu (Smooth Micro-Interaction)
  // ─────────────────────────────────────────────────────────────
  const openDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesOpen(true);

    // Chevron rotation (slow, smooth)
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotate: 180,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, []);

  const closeDropdown = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      if (chevronRef.current) {
        gsap.to(chevronRef.current, {
          rotate: 0,
          duration: 0.45,
          ease: 'power3.inOut',
        });
      }

      if (dropdownRef.current) {
        gsap.to(dropdownRef.current, {
          opacity: 0,
          y: 12,
          scale: 0.97,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => setServicesOpen(false),
        });
      } else {
        setServicesOpen(false);
      }
    }, 220);
  }, []);

  // Dropdown entrance animation triggered whenever servicesOpen turns true
  useEffect(() => {
    if (servicesOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 16, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }
      );

      const validItems = dropdownItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', delay: 0.08 }
        );
      }
    }
  }, [servicesOpen]);

  // Clean timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Phase E: Smooth Mobile Sidebar (Drawer) Open & Close Controller
  // ─────────────────────────────────────────────────────────────
  const openMobileDrawer = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const closeMobileDrawer = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, []);

  // Stagger items animation and lock body scroll whenever mobile drawer opens
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const validItems = mobileNavItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
        );
      }
    } else {
      if (!document.body.getAttribute('data-modal-open')) {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (!document.body.getAttribute('data-modal-open')) {
        document.body.style.overflow = '';
      }
    };
  }, [mobileOpen]);

  // ─────────────────────────────────────────────────────────────
  // Phase F: Smooth Mobile Services Accordion Controller
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mobileAccordionRef.current) return;

    if (mobileServicesOpen) {
      // Rotate accordion chevron smoothly
      if (mobileAccordionChevronRef.current) {
        gsap.to(mobileAccordionChevronRef.current, {
          rotate: 180,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
      // Expand accordion smoothly and slowly
      gsap.fromTo(
        mobileAccordionRef.current,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.55,
          ease: 'power3.inOut',
        }
      );
      // Stagger child service cards
      const items = mobileAccordionItemsRef.current.filter(Boolean);
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
        );
      }
    } else {
      if (mobileAccordionChevronRef.current) {
        gsap.to(mobileAccordionChevronRef.current, {
          rotate: 0,
          duration: 0.45,
          ease: 'power3.inOut',
        });
      }
      gsap.to(mobileAccordionRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.inOut',
      });
    }
  }, [mobileServicesOpen]);

  // Handle smooth navigation clicks with header offset
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setServicesOpen(false);
    closeMobileDrawer();

    if (href === '#contact') {
      if (mobileBackdropRef.current) {
        gsap.set(mobileBackdropRef.current, { opacity: 0 });
      }
      if (onOpenContact) {
        onOpenContact('General Enterprise Consultation');
      } else {
        window.dispatchEvent(
          new CustomEvent('openContactModal', {
            detail: { service: 'General Enterprise Consultation' },
          })
        );
      }
      return;
    }

    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, elementPosition - headerOffset),
          behavior: 'smooth',
        });
        window.history.pushState({}, '', href);
      } else {
        window.history.pushState({}, '', '/' + href);
      }
    }
  };

  // Close mobile on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMobileDrawer();
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMobileDrawer]);



  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          Outer Fixed Shell for GSAP Directional Hide / Reveal
      ───────────────────────────────────────────────────────── */}
      <div
        ref={headerWrapperRef}
        className={`fixed left-0 right-0 z-50 flex justify-center pointer-events-none ${
          isPill ? 'top-3 sm:top-4 px-3 sm:px-6' : 'top-0 px-0'
        }`}
      >
        {/* ───────────────────────────────────────────────────────
            Inner Morphing Container (Edge-to-Edge <-> Floating Pill)
        ─────────────────────────────────────────────────────── */}
        <header
          ref={headerPillRef}
          className={`pointer-events-auto flex items-center justify-between transition-[max-width,border-radius,padding,box-shadow] duration-500 ease-out select-none ${
            isPill
              ? 'max-w-6xl w-full mx-auto rounded-full bg-gradient-to-r from-[#0072CE]/95 via-[#0284C7]/90 to-[#72BF44]/95 backdrop-blur-xl shadow-2xl shadow-blue-950/25 border border-white/30 py-2 sm:py-2.5 px-5 sm:px-8 ring-1 ring-white/20'
              : 'w-full rounded-none bg-gradient-to-r from-[#0072CE]/95 via-[#0284C7]/90 to-[#72BF44]/95 backdrop-blur-xl shadow-lg border-b border-white/25 py-3 sm:py-3.5 px-5 sm:px-8 lg:px-12'
          }`}
          role="banner"
        >
          {/* ==================================================== */}
          {/* 1. BRAND LOGO (Original Brand Colors Preserved)      */}
          {/* ==================================================== */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300"
            aria-label="SIRI Group Home"
          >
            <img
              src={siriLogo}
              alt="SIRI Group Logo"
              className="h-6 sm:h-7.5 w-auto object-contain transition-transform duration-300 group-hover:scale-103"
            />
          </a>

          {/* ==================================================== */}
          {/* 2. DESKTOP NAVIGATION LINKS (Center)                 */}
          {/* ==================================================== */}
          <nav
            className="hidden md:flex items-center gap-1.5 lg:gap-2 relative"
            role="navigation"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      type="button"
                      onClick={() => (servicesOpen ? closeDropdown() : openDropdown())}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      className={`relative group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                        servicesOpen
                          ? 'text-white bg-white/25 shadow-md shadow-black/10 ring-1 ring-white/30'
                          : 'text-white/90 hover:text-white hover:bg-white/20 hover:shadow-sm'
                      }`}
                    >
                      <span className="relative z-10 transition-colors duration-200">{link.label}</span>
                      <svg
                        ref={chevronRef}
                        className="w-3.5 h-3.5 fill-current text-white/80 transition-transform duration-300 will-change-transform group-hover/btn:translate-y-0.5"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {/* Cool Animated Glow Underline */}
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white/90 rounded-full group-hover/btn:w-3/5 transition-all duration-300 ease-out" />
                    </button>

                    {/* ─────────────────────────────────────────
                        Phase D: Services Floating Mega-Dropdown
                    ───────────────────────────────────────── */}
                    {servicesOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 will-change-transform"
                      >
                        <div className="w-[430px] rounded-2xl bg-gradient-to-b from-[#0072CE]/95 via-[#0284C7]/95 to-[#72BF44]/95 backdrop-blur-2xl p-3.5 shadow-2xl shadow-blue-950/35 border border-white/30 ring-1 ring-white/20 text-white">
                          {/* Dropdown Header */}
                          <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-white/20">
                            <span className="text-[11px] font-black uppercase tracking-wider text-white drop-shadow-xs">
                              ✦ Corporate Solutions
                            </span>
                          </div>

                          {/* 5 Service Verticals from sirigroup.pdf */}
                          <div className="space-y-1.5">
                            {link.children?.map((service, idx) => (
                              <a
                                key={service.id}
                                ref={(el) => (dropdownItemsRef.current[idx] = el)}
                                href={service.href}
                                onClick={(e) => handleNavClick(e, service.href)}
                                className="group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 bg-white/95 hover:bg-white text-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                              >
                                {/* Service Icon Pill */}
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-xs"
                                  style={{
                                    backgroundColor: `${service.color}15`,
                                    color: service.color,
                                  }}
                                >
                                  {service.id === 'hr' && (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                  )}
                                  {service.id === 'manpower' && (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 2l-5.5 9h11z M12 22l5.5-9h-11z" />
                                    </svg>
                                  )}
                                  {service.id === 'csr' && (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                  )}
                                  {service.id === 'travel' && (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                                    </svg>
                                  )}
                                  {service.id === 'loans' && (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                      <path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6z" />
                                    </svg>
                                  )}
                                </div>

                                {/* Text Details */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#0072CE] transition-colors">
                                      {service.title}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-[#0072CE]">
                                      {service.tag}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight line-clamp-1">
                                    {service.description}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative group/navlink px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-bold text-white/90 hover:text-white hover:bg-white/20 tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-none hover:shadow-xs"
                >
                  <span className="relative z-10 transition-transform duration-200 inline-block group-hover/navlink:scale-105">
                    {link.label}
                  </span>
                  {/* Cool Animated Glow Underline */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white rounded-full group-hover/navlink:w-3/5 transition-all duration-300 ease-out" />
                </a>
              );
            })}
          </nav>

          {/* ==================================================== */}
          {/* 3. RIGHT SIDE: CTA Button & Mobile Menu Toggle       */}
          {/* ==================================================== */}
          <div className="flex items-center gap-3">
            {/* Desktop Pill CTA Button with Liquid Shimmer & Dynamic Arrow Glide */}
            <a
              href={CTA_BUTTON.href}
              onClick={(e) => handleNavClick(e, CTA_BUTTON.href)}
              className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0072CE] font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-2xl hover:shadow-white/30 hover:-translate-y-1 active:translate-y-0 active:scale-97 transition-all duration-300 group/cta relative overflow-hidden ring-2 ring-transparent hover:ring-white/40"
              aria-label="Contact SIRI Group"
            >
              {/* Shimmer Light Sweep Effect */}
              <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none rounded-full" />

              <span className="relative z-10 transition-transform duration-300 group-hover/cta:-translate-x-0.5">
                {CTA_BUTTON.label}
              </span>
              <span className="relative z-10 w-5.5 h-5.5 rounded-full bg-[#0072CE]/10 text-[#0072CE] flex items-center justify-center transition-all duration-300 group-hover/cta:bg-[#0072CE] group-hover/cta:text-white group-hover/cta:scale-110 group-hover/cta:rotate-45 shadow-xs">
                <svg className="w-3 h-3 fill-current transition-colors" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => (mobileOpen ? closeMobileDrawer() : openMobileDrawer())}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              className="md:hidden flex items-center justify-center w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white/20 text-white hover:bg-white/30 active:scale-95 transition-all duration-200 focus:outline-none shadow-xs cursor-pointer touch-manipulation z-30"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* ======================================================== */}
      {/* 4. MOBILE OFF-CANVAS DRAWER NAVIGATION                   */}
      {/* Matches the Header's Aurora Gradient Glass Aesthetic     */}
      {/* Smooth CSS slide & fade + GSAP staggered items           */}
      {/* Rendered via Portal directly to body                     */}
      {/* ======================================================== */}
      {mounted &&
        typeof document !== 'undefined' &&
        document.body &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] md:hidden flex justify-end overflow-hidden transition-[visibility] duration-300 ${
              mobileOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
            }`}
          >
            {/* Smooth Backdrop */}
            <div
              ref={mobileBackdropRef}
              className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
                mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={closeMobileDrawer}
              aria-hidden="true"
            />

            {/* Luxury Aurora Gradient Drawer Panel */}
            <div
              ref={mobileDrawerRef}
              className={`relative w-full max-w-xs sm:max-w-sm h-full bg-gradient-to-b from-[#0072CE] via-[#0284C7] to-[#72BF44] text-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 border-l border-white/25 transition-transform duration-300 ease-out will-change-transform ${
                mobileOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Ambient subtle light orbs inside drawer */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 rounded-full bg-black/15 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-white/20">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-sm inline-flex items-center">
                    <img src={siriLogo} alt="SIRI Group" className="h-7 w-auto object-contain" />
                  </div>
                  <button
                    type="button"
                    onClick={closeMobileDrawer}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer touch-manipulation"
                    aria-label="Close menu"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="py-4 space-y-2">
                  {NAV_LINKS.map((link, linkIdx) => {
                    if (link.hasDropdown) {
                      return (
                        <div
                          key={link.label}
                          ref={(el) => (mobileNavItemsRef.current[linkIdx] = el)}
                          className="rounded-2xl bg-white/10 border border-white/15 overflow-hidden transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((prev) => !prev)}
                            className="w-full flex items-center justify-between px-4 py-1 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <span>{link.label}</span>
                             
                            </span>
                            <svg
                              ref={mobileAccordionChevronRef}
                              className="w-4 h-4 text-white/80 transition-transform duration-300 will-change-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Mobile Services Accordion (Animated with GSAP) */}
                          <div
                            ref={mobileAccordionRef}
                            style={{ height: 0, opacity: 0, overflow: 'hidden' }}
                            className="px-3 pb-3 space-y-2"
                          >
                            <div className="pt-2 border-t border-white/15 space-y-2">
                              {link.children?.map((sub, sIdx) => (
                                <a
                                  key={sub.id}
                                  ref={(el) => (mobileAccordionItemsRef.current[sIdx] = el)}
                                  href={sub.href}
                                  onClick={(e) => handleNavClick(e, sub.href)}
                                  className="block p-3 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-sm hover:shadow-md transition-all duration-200 group"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#0072CE] transition-colors">
                                      {sub.title}
                                    </span>
                                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-[#0072CE]">
                                      {sub.tag}
                                    </span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <a
                        key={link.label}
                        ref={(el) => (mobileNavItemsRef.current[linkIdx] = el)}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-bold text-white transition-all duration-200 shadow-xs"
                      >
                        {link.label}
                      </a>
                    );
                  })}
              </div>
            </div>

            {/* Mobile Drawer Bottom CTA */}
            <div className="relative z-10 pt-4 border-t border-white/20 space-y-3">
              <a
                href={CTA_BUTTON.href}
                onClick={(e) => handleNavClick(e, CTA_BUTTON.href)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-white hover:bg-slate-100 active:bg-slate-200 text-[#0072CE] font-extrabold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span>{CTA_BUTTON.label}</span>
                <span className="w-5 h-5 rounded-full bg-[#0072CE]/10 flex items-center justify-center text-[#0072CE]">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </a>

              <div className="text-center text-[11px] text-white/80 font-medium tracking-wide">
                SIRI Group • One Partner. Multiple Solutions.
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
