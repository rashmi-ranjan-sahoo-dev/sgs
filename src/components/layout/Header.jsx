import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { NAV_LINKS } from '@/data/navigation';
import siriLogo from '@/assets/images/siri-logo.png';

/**
 * SIRI Group Header Component — Final Responsive Refinement
 *
 * Implements:
 * 1. Desktop Navigation Alignment: Balanced 3-column layout (Logo Left | Centered Nav Links | Contact Us Right)
 * 2. Mobile/Tablet Menu Button: "MENU ☰" on >= 480px, "☰" on < 480px, with NO border or container background
 * 3. Mobile Navigation Panel: Full-height off-canvas drawer via React Portal (immune to header transforms/clipping)
 * 4. Staggered Menu Item Entrance: Subtle opacity + y movement on drawer open
 * 5. Smooth Services Mobile Expansion: GSAP-animated height + opacity + subtle item movement (0.58s open / 0.46s close)
 * 6. Smooth Services Icon Animation: Rotating SVG morphing naturally between "+" and "−"
 * 7. Top-of-page transparent state morphing smoothly via GSAP to compact sticky white navigation
 * 8. Scroll locking with unmount cleanup & Escape key listener
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navListRef = useRef(null);
  const ctaRef = useRef(null);
  const menuBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const mobileBackdropRef = useRef(null);
  const mobileSubmenuRef = useRef(null);
  const mobileSubmenuInnerRef = useRef(null);
  const mobileMenuTimelineRef = useRef(null);
  const servicesAnimationRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Client-side mount flag for React Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. Scroll Detection & GSAP Sticky Morphing
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      if (isScrolled) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.borderBottomColor = 'rgba(226, 232, 240, 0.9)';
        header.style.boxShadow = '0 10px 25px -4px rgba(10, 46, 92, 0.08)';
        header.style.paddingTop = '10px';
        header.style.paddingBottom = '10px';
      } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
        header.style.borderBottomColor = 'rgba(226, 232, 240, 0.85)';
        header.style.boxShadow = '0 4px 20px -2px rgba(10, 46, 92, 0.06)';
        header.style.paddingTop = '14px';
        header.style.paddingBottom = '14px';
      }
      return;
    }

    gsap.to(header, {
      backgroundColor: isScrolled
        ? 'rgba(255, 255, 255, 0.98)'
        : 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottomColor: isScrolled
        ? 'rgba(226, 232, 240, 0.95)'
        : 'rgba(226, 232, 240, 0.85)',
      boxShadow: isScrolled
        ? '0 10px 25px -4px rgba(10, 46, 92, 0.09)'
        : '0 4px 20px -2px rgba(10, 46, 92, 0.06)',
      paddingTop: isScrolled ? '10px' : '14px',
      paddingBottom: isScrolled ? '10px' : '14px',
      duration: 0.35,
      ease: 'power2.out',
    });

    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: isScrolled ? 0.94 : 1,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  }, [isScrolled]);

  // ─────────────────────────────────────────────────────────────
  // 2. Initial Page-Load Entrance Animation
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const navItems = navListRef.current
        ? navListRef.current.querySelectorAll('.desktop-nav-item')
        : [];

      const tl = gsap.timeline({
        delay: 1.1, // Synchronized with PageLoader curtain reveal
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -35 },
        { opacity: 1, y: 0, duration: 1.0 }
      );

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.75'
        );
      }

      if (navItems.length > 0) {
        tl.fromTo(
          navItems,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.7 },
          '-=0.65'
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.65 },
          '-=0.5'
        );
      }

      if (menuBtnRef.current) {
        tl.fromTo(
          menuBtnRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.65 },
          '-=0.5'
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 3. Desktop Services Dropdown Handlers
  // ─────────────────────────────────────────────────────────────
  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 140);
  }, []);

  useEffect(() => {
    if (!dropdownRef.current) return;
    const el = dropdownRef.current;

    if (servicesOpen) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 8, scale: 0.98, display: 'block' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.22,
          ease: 'power2.out',
        }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 6,
        scale: 0.98,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          if (el) el.style.display = 'none';
        },
      });
    }
  }, [servicesOpen]);

  // ─────────────────────────────────────────────────────────────
  // 4. Mobile Menu Drawer & Scroll Locking
  // ─────────────────────────────────────────────────────────────
  const openMobileMenu = () => {
    setIsMobileOpen(true);
  };

  const closeMobileMenu = useCallback(() => {
    if (mobileMenuTimelineRef.current) {
      mobileMenuTimelineRef.current.reverse();
    } else {
      setIsMobileOpen(false);
    }
  }, []);

  // Manage body scroll lock
  useEffect(() => {
    if (isMobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        window.scrollTo(0, scrollY);
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [isMobileOpen]);

  // Mobile menu open/close GSAP timeline
  useEffect(() => {
    if (!isMobileOpen || !mobileDrawerRef.current) return;

    const drawer = mobileDrawerRef.current;
    const backdrop = mobileBackdropRef.current;
    const items = drawer.querySelectorAll('.mobile-menu-item');
    const footer = drawer.querySelector('.mobile-menu-footer');

    const tl = gsap.timeline({
      onReverseComplete: () => {
        setIsMobileOpen(false);
        setMobileServicesOpen(false);
      },
    });

    mobileMenuTimelineRef.current = tl;

    // 1. Backdrop fade in
    tl.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.28, ease: 'power2.out' }
    )
      // 2. Drawer panel slide in smoothly
      .fromTo(
        drawer,
        { x: '100%' },
        { x: '0%', duration: 0.42, ease: 'power3.out' },
        '-=0.18'
      )
      // 3. Stagger menu items with subtle opacity + y movement
      .fromTo(
        items,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.32, ease: 'power2.out' },
        '-=0.14'
      );

    if (footer) {
      tl.fromTo(
        footer,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' },
        '-=0.15'
      );
    }
  }, [isMobileOpen]);

  // ─────────────────────────────────────────────────────────────
  // 5. Smooth GSAP Mobile Services Expansion / Collapse
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const submenu = mobileSubmenuRef.current;
    const inner = mobileSubmenuInnerRef.current;
    if (!submenu || !inner) return;

    if (servicesAnimationRef.current) {
      servicesAnimationRef.current.kill();
    }

    const submenuItems = inner.querySelectorAll('.submenu-item');

    if (mobileServicesOpen) {
      // Opening: 0.58s smooth reveal (height + opacity + subtle item movement)
      const targetHeight = inner.offsetHeight;
      gsap.set(submenu, { overflow: 'hidden' });

      const tl = gsap.timeline();
      servicesAnimationRef.current = tl;

      tl.fromTo(
        submenu,
        { height: submenu.offsetHeight, opacity: submenu.style.opacity || 0 },
        {
          height: targetHeight,
          opacity: 1,
          duration: 0.58,
          ease: 'power2.out',
          onComplete: () => {
            if (submenu) submenu.style.height = 'auto';
          },
        }
      ).fromTo(
        submenuItems,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.36, ease: 'power2.out' },
        '-=0.42'
      );
    } else {
      // Closing: 0.46s smooth collapse
      const currentHeight = submenu.offsetHeight;
      gsap.set(submenu, { height: currentHeight, overflow: 'hidden' });

      const tl = gsap.timeline();
      servicesAnimationRef.current = tl;

      tl.to(submenuItems, {
        opacity: 0,
        y: -4,
        duration: 0.22,
        stagger: 0.02,
        ease: 'power2.in',
      }).to(
        submenu,
        {
          height: 0,
          opacity: 0,
          duration: 0.46,
          ease: 'power2.inOut',
        },
        '-=0.12'
      );
    }
  }, [mobileServicesOpen]);

  // Keyboard accessibility: ESC key closes menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (servicesOpen) setServicesOpen(false);
        if (isMobileOpen) closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [servicesOpen, isMobileOpen, closeMobileMenu]);

  // Locate Services item for dropdown & accordion rendering
  const servicesItem = NAV_LINKS.find((item) => item.hasDropdown);

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/85 bg-surface/92 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(10,46,92,0.06)] py-3.5"
        style={{ willChange: 'padding, background-color, box-shadow' }}
      >
        {/* ─────────────────────────────────────────────────────────────
            Header Layout:
            On Desktop (xl+): Balanced 3-column grid
            [ Logo (Left) ]  [ Navigation (Center) ]  [ Contact Us (Right) ]
            On Mobile/Tablet: Flex between
            [ Logo (Left) ] ────────────────────────── [ MENU ☰ (Right) ]
        ───────────────────────────────────────────────────────────── */}
        <div className="container flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between gap-4">
          {/* Column 1: Brand Logo (Left-aligned) */}
          <div className="flex items-center justify-start shrink-0">
            <a
              ref={logoRef}
              href="#home"
              aria-label="SIRI Groups — Home"
              className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary rounded-lg transition-transform duration-200"
            >
              <img
                src={siriLogo}
                alt="SIRI Groups Logo"
                width="176"
                height="66"
                className="h-9 sm:h-10 md:h-[42px] w-auto object-contain transition-all duration-300 group-hover:opacity-95"
                loading="eager"
              />
            </a>
          </div>

          {/* Column 2: Desktop Navigation Links (Visually Centered) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center justify-center"
          >
            <ul
              ref={navListRef}
              role="menubar"
              className="flex items-center gap-7 2xl:gap-8 m-0 p-0 list-none"
            >
              {NAV_LINKS.filter((item) => !item.isCta).map((item) => {
                if (item.hasDropdown) {
                  return (
                    <li
                      key={item.label}
                      role="none"
                      className="desktop-nav-item relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        type="button"
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((prev) => !prev)}
                        className="group flex items-center gap-1.5 py-2 text-[15px] font-semibold tracking-[-0.01em] text-foreground/85 hover:text-primary transition-colors duration-200 rounded-lg focus-visible:outline-2 focus-visible:outline-secondary relative cursor-pointer"
                      >
                        <span>{item.label}</span>

                        {/* Subtle Chevron indicator */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`w-4 h-4 text-muted/80 transition-transform duration-300 group-hover:text-primary ${
                            servicesOpen ? 'rotate-180 text-secondary' : ''
                          }`}
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {/* Subtle Green Accent Underline Hover Indicator */}
                        <span
                          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full transform origin-left transition-transform duration-300 ease-out ${
                            servicesOpen
                              ? 'scale-x-100'
                              : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Desktop Services Dropdown */}
                      <div
                        ref={dropdownRef}
                        role="menu"
                        aria-label="Services Submenu"
                        style={{ display: 'none' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-80 md:w-[350px]"
                      >
                        <div className="bg-surface rounded-xl shadow-hover border border-border p-2 space-y-0.5">
                          <div className="px-3 py-2 border-b border-border/50">
                            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                              Business Services
                            </span>
                          </div>

                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                              className="group/item flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary-soft/70 transition-colors duration-150"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 shrink-0" />
                                <span className="text-body-small font-medium text-foreground group-hover/item:text-primary transition-colors duration-200 truncate">
                                  {child.label}
                                </span>
                              </div>
                              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary/10 text-secondary shrink-0">
                                {child.badge}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.label}
                    role="none"
                    className="desktop-nav-item"
                  >
                    <a
                      href={item.href}
                      role="menuitem"
                      className="group relative py-2 text-[15px] font-semibold tracking-[-0.01em] text-foreground/85 hover:text-primary transition-colors duration-200 rounded-lg focus-visible:outline-2 focus-visible:outline-secondary block"
                    >
                      <span>{item.label}</span>
                      {/* Subtle Green Accent Underline Hover Indicator */}
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Column 3: Desktop CTA or Mobile/Tablet "MENU ☰" Control */}
          <div className="flex items-center justify-end shrink-0">
            {/* Desktop Contact Us CTA (Visible on xl+) */}
            <div className="hidden xl:flex items-center">
              <a
                ref={ctaRef}
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-light text-surface text-[14px] font-semibold tracking-wide shadow-subtle hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary cursor-pointer"
              >
                <span>Contact Us</span>
                <span className="w-4 h-4 rounded-full bg-surface/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 text-surface"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </a>
            </div>

            {/* Tablet & Mobile "MENU ☰" Control (Visible below xl)
                NO container border, NO pill border, NO background, clean typography & icon */}
            <div className="flex xl:hidden items-center">
              <button
                ref={menuBtnRef}
                type="button"
                onClick={openMobileMenu}
                aria-label="Open navigation menu"
                aria-expanded={isMobileOpen}
                className="flex items-center gap-2.5 py-2 px-1 text-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-secondary cursor-pointer border-0 bg-transparent shadow-none"
              >
                <span className="inline-block text-[13px] sm:text-[14px] font-bold tracking-wider text-foreground hover:text-primary uppercase select-none">
                  Menu
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-200"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          Off-Canvas Mobile Navigation Drawer via React Portal
          Mounted directly into document.body to prevent containing-block clipping
      ───────────────────────────────────────────────────────────── */}
      {mounted &&
        isMobileOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-0 z-[999] xl:hidden flex justify-end"
          >
            {/* Backdrop */}
            <div
              ref={mobileBackdropRef}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-dark/50 backdrop-blur-sm cursor-pointer transition-opacity"
              aria-hidden="true"
            />

            {/* Off-Canvas Navigation Panel */}
            <div
              ref={mobileDrawerRef}
              className="relative w-full sm:w-[380px] md:w-[420px] max-w-full bg-surface shadow-2xl z-10 flex flex-col h-dvh min-h-screen overflow-y-auto"
              style={{ willChange: 'transform' }}
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/70 shrink-0 bg-surface">
                <a
                  href="#home"
                  onClick={closeMobileMenu}
                  aria-label="SIRI Groups — Home"
                  className="flex items-center gap-2"
                >
                  <img
                    src={siriLogo}
                    alt="SIRI Groups Logo"
                    width="140"
                    height="52"
                    className="h-8 w-auto object-contain"
                  />
                </a>

                {/* Close Button: "MENU ✕" on >= 480px, "✕" on < 480px. Zero border/background */}
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation menu"
                  className="flex items-center gap-2 py-2 px-1 text-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-secondary cursor-pointer border-0 bg-transparent shadow-none"
                >
                  <span className="inline-block text-[13px] sm:text-[14px] font-bold tracking-wider text-foreground hover:text-primary uppercase select-none">
                    Menu
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                    className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Numbered Navigation List (01 Home, 02 About Us, ...) */}
              <nav
                aria-label="Mobile Navigation Menu"
                className="flex-1 px-6 py-6 space-y-1.5 overflow-y-auto"
              >
                {NAV_LINKS.filter((item) => !item.isCta).map((item, index) => {
                  const numberPrefix = String(index + 1).padStart(2, '0');

                  if (item.hasDropdown) {
                    return (
                      <div key={item.label} className="mobile-menu-item">
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((prev) => !prev)}
                          aria-expanded={mobileServicesOpen}
                          className="w-full flex items-center justify-between py-3.5 px-3 rounded-xl text-left hover:bg-surface-subtle transition-colors duration-200 group cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-[13px] font-bold text-secondary tracking-widest">
                              {numberPrefix}
                            </span>
                            <span className="text-[17px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                              {item.label}
                            </span>
                          </div>

                          {/* Smooth Vector Rotating Icon (+ to −) */}
                          <div className="w-7 h-7 flex items-center justify-center">
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              className={`w-4 h-4 text-primary transition-transform duration-500 ease-out ${
                                mobileServicesOpen ? 'rotate-180' : 'rotate-0'
                              }`}
                              aria-hidden="true"
                            >
                              <line x1="3" y1="10" x2="17" y2="10" />
                              <line
                                x1="10"
                                y1="3"
                                x2="10"
                                y2="17"
                                className={`transition-all duration-500 ease-out origin-center ${
                                  mobileServicesOpen
                                    ? 'opacity-0 scale-y-0'
                                    : 'opacity-100 scale-y-100'
                                }`}
                              />
                            </svg>
                          </div>
                        </button>

                        {/* GSAP-Animated Collapsible Submenu for 5 SIRI Services */}
                        <div
                          ref={mobileSubmenuRef}
                          style={{ height: 0, opacity: 0, overflow: 'hidden' }}
                          className="pl-9 pr-2 border-l-2 border-secondary/30 ml-4 my-1"
                        >
                          <div
                            ref={mobileSubmenuInnerRef}
                            className="py-2 space-y-1"
                          >
                            {servicesItem?.children &&
                              servicesItem.children.map((child) => (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  onClick={closeMobileMenu}
                                  className="submenu-item flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-secondary-soft/70 transition-colors duration-150 group/sub"
                                >
                                  <span className="text-body-small font-medium text-foreground/90 group-hover/sub:text-primary">
                                    {child.label}
                                  </span>
                                  <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-secondary/10 text-secondary">
                                    {child.badge}
                                  </span>
                                </a>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={item.label} className="mobile-menu-item">
                      <a
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-4 py-3.5 px-3 rounded-xl hover:bg-surface-subtle transition-colors duration-200 group"
                      >
                        <span className="text-[13px] font-bold text-secondary tracking-widest">
                          {numberPrefix}
                        </span>
                        <span className="text-[17px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {item.label}
                        </span>
                      </a>
                    </div>
                  );
                })}

                {/* 06 Contact Us inside numbered list */}
                <div className="mobile-menu-item">
                  <a
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 py-3.5 px-3 rounded-xl hover:bg-surface-subtle transition-colors duration-200 group"
                  >
                    <span className="text-[13px] font-bold text-secondary tracking-widest">
                      06
                    </span>
                    <span className="text-[17px] font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      Contact Us
                    </span>
                  </a>
                </div>
              </nav>

              {/* Drawer Footer with Corporate CTA & Tagline */}
              <div className="mobile-menu-footer p-6 border-t border-border/70 mt-auto bg-surface shrink-0 space-y-4">
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-primary hover:bg-primary-light text-surface text-[15px] font-semibold tracking-wide shadow-card transition-all duration-200"
                >
                  <span>Contact Us</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-surface"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <div className="text-center">
                  <p className="text-[12px] text-muted tracking-wide">
                    Empowering Business Through People, Purpose &amp; Seamless
                    Travel
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
