import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import siriLogo from '@/assets/images/siri-logo.png';

const WHATSAPP_NUMBER = '919861341427';

const SERVICE_OPTIONS = [
  'General Enterprise Consultation',
  'Workforce & Staffing Solutions',
  'Corporate Travel & Mobility',
  'B2B Commercial Financing & Loans',
  'CSR Project Governance & Impact',
];

export default function ContactModal({ isOpen, onClose, initialService = '' }) {
  const [mounted, setMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Use refs for animation states to prevent dependency re-trigger loops in React
  const isClosingRef = useRef(false);
  const activeTimelineRef = useRef(null);
  const scrollPosRef = useRef(0);
  const originalStylesRef = useRef({
    bodyOverflow: '',
    docOverflow: '',
    bodyPaddingRight: '',
  });

  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: SERVICE_OPTIONS[0],
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update selected service if provided via props
  useEffect(() => {
    if (initialService) {
      const match = SERVICE_OPTIONS.find(
        (opt) => opt.toLowerCase().includes(initialService.toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        service: match || initialService,
      }));
    }
  }, [initialService]);

  // Smooth Exit Animation (slides completely down on phone, fades & drops on desktop)
  const animateClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    // Dismiss mobile virtual keyboard immediately to prevent viewport jumping
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const isMobile = window.innerWidth < 640;
    const tl = gsap.timeline({
      onComplete: () => {
        // Restore locked scroll styles cleanly
        const { bodyOverflow, docOverflow, bodyPaddingRight } = originalStylesRef.current;
        document.documentElement.style.overflow = docOverflow;
        document.body.style.overflow = bodyOverflow;
        document.body.style.paddingRight = bodyPaddingRight;
        document.body.removeAttribute('data-modal-open');

        // Restore exact scroll position without smooth scroll interference
        const prevBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, scrollPosRef.current);
        document.documentElement.style.scrollBehavior = prevBehavior;

        // Reset internal flags and unmount
        activeTimelineRef.current = null;
        isClosingRef.current = false;
        setIsRendered(false);

        // Notify parent
        onClose();
      },
    });

    activeTimelineRef.current = tl;

    if (backdropRef.current) {
      tl.to(
        backdropRef.current,
        { opacity: 0, duration: 0.28, ease: 'power2.in' },
        0
      );
    }

    if (cardRef.current) {
      if (isMobile) {
        // Slide smoothly and completely down to the bottom
        tl.to(
          cardRef.current,
          { yPercent: 100, y: 0, duration: 0.32, ease: 'power3.in' },
          0
        );
      } else {
        tl.to(
          cardRef.current,
          { opacity: 0, scale: 0.95, y: 30, duration: 0.25, ease: 'power2.in' },
          0
        );
      }
    }
  }, [onClose]);

  // Synchronize isOpen prop with internal isRendered state
  useEffect(() => {
    if (isOpen) {
      if (isRendered) {
        isClosingRef.current = false;
        return;
      }
      isClosingRef.current = false;
      setIsRendered(true);
    } else {
      if (isRendered && !isClosingRef.current) {
        animateClose();
      }
    }
  }, [isOpen, isRendered, animateClose]);

  // Entrance animation and scroll lock when isRendered becomes true
  useEffect(() => {
    if (!isRendered) return;

    // 1. Record exact scroll position BEFORE locking to restore exactly upon close
    const currentScrollY =
      window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
    scrollPosRef.current = currentScrollY;

    // 2. Capture original styles before locking
    originalStylesRef.current = {
      bodyOverflow: document.body.style.overflow || '',
      docOverflow: document.documentElement.style.overflow || '',
      bodyPaddingRight: document.body.style.paddingRight || '',
    };

    // Calculate scrollbar width on desktop to prevent horizontal layout jump
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-modal-open', 'true');
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Play smooth entrance animation
    const isMobile = window.innerWidth < 640;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline();
    activeTimelineRef.current = tl;

    if (backdropRef.current) {
      gsap.set(backdropRef.current, { opacity: 0 });
      tl.to(
        backdropRef.current,
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
        0
      );
    }

    if (cardRef.current) {
      if (isMobile) {
        // Native bottom sheet: slide up smoothly from bottom edge (Lower to Upper)
        gsap.set(cardRef.current, { yPercent: 100, y: 0, opacity: 1 });
        tl.to(
          cardRef.current,
          { yPercent: 0, y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' },
          0
        );
      } else {
        // Desktop dialog: smooth elevation slide up
        gsap.set(cardRef.current, { opacity: 0, scale: 0.95, y: 35, yPercent: 0 });
        tl.to(
          cardRef.current,
          { opacity: 1, scale: 1, y: 0, yPercent: 0, duration: 0.38, ease: 'power3.out' },
          0
        );
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        animateClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Failsafe cleanup if component unmounts unexpectedly
      const { bodyOverflow, docOverflow, bodyPaddingRight } = originalStylesRef.current;
      document.documentElement.style.overflow = docOverflow;
      document.body.style.overflow = bodyOverflow;
      document.body.style.paddingRight = bodyPaddingRight;
      document.body.removeAttribute('data-modal-open');

      const prevBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollPosRef.current);
      document.documentElement.style.scrollBehavior = prevBehavior;
    };
  }, [isRendered, animateClose]);

  // Mobile touch drag-down to dismiss handlers
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const delta = currentY - touchStartY.current;
    if (delta > 0 && cardRef.current) {
      touchDeltaY.current = delta;
      gsap.set(cardRef.current, { y: delta });
    }
  };

  const handleTouchEnd = () => {
    if (touchDeltaY.current > 75) {
      animateClose();
    } else if (cardRef.current) {
      gsap.to(cardRef.current, { y: 0, duration: 0.2, ease: 'power2.out' });
    }
    touchStartY.current = 0;
    touchDeltaY.current = 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-()+]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (cleanPhone.length < 8 || cleanPhone.length > 15) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Construct professional formatted WhatsApp message
    const textMessage = `🌟 *New Inquiry via SIRI Group Website*

👤 *Name:* ${formData.name.trim()}
📞 *Phone:* ${formData.phone.trim()}
✉️ *Email:* ${formData.email.trim()}
🏢 *Service:* ${formData.service}

💬 *Message:*
${formData.message.trim() || 'I would like to know more about your enterprise services.'}

━━━━━━━━━━━━━━━━━━━
_Sent from sirigroup.com_`;

    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
      animateClose();
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: SERVICE_OPTIONS[0],
        message: '',
      });
    }, 400);
  };

  if (!mounted || !isRendered || typeof document === 'undefined' || !document.body) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Single Frosted Glass Backdrop */}
      <div
        ref={backdropRef}
        onClick={animateClose}
        style={{ willChange: 'opacity', opacity: 0 }}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer touch-none"
        aria-hidden="true"
      />

      {/* Bottom Sheet / Floating Modal Card */}
      <div
        ref={cardRef}
        style={{ willChange: 'transform, opacity', opacity: 0 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-[2.25rem] sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200/90 dark:border-slate-800 flex flex-col max-h-[92dvh] sm:max-h-[90vh] z-10 overflow-hidden overscroll-contain"
      >
        {/* Mobile Pull Handle & Header Touch Area */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="select-none"
        >
          {/* Mobile Pull Handle Bar */}
          <div
            onClick={animateClose}
            className="pt-3 pb-1.5 flex justify-center sm:hidden shrink-0 bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer"
            title="Swipe or tap to close"
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* Top Decorative Gradient Accent Bar */}
          <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-[#0072CE] via-[#0284C7] to-[#72BF44] shrink-0" />

          {/* Modal Header (Non-scrolling anchor) */}
          <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs shrink-0">
                <img src={siriLogo} alt="SIRI Group" className="h-6 w-auto object-contain" />
              </div>
              <div>
                <h3
                  id="contact-modal-title"
                  className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug"
                >
                  Connect With SIRI Group
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Direct WhatsApp advisory desk • Response within 15 mins
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={animateClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Body (Scrollable with Momentum & Font Size 16px to prevent mobile iOS zoom glitch) */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1 overscroll-contain pb-8 sm:pb-6"
        >
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="modal-name"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                👤
              </span>
              <input
                id="modal-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 dark:border-slate-700 focus:border-[#0072CE] focus:ring-[#0072CE]/20'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone & Email Dual Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
              >
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                  📞
                </span>
                <input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 dark:border-slate-700 focus:border-[#0072CE] focus:ring-[#0072CE]/20'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="modal-email"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                  ✉️
                </span>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 dark:border-slate-700 focus:border-[#0072CE] focus:ring-[#0072CE]/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Service Selector Field */}
          <div>
            <label
              htmlFor="modal-service"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
            >
              Interested Service
            </label>
            <div className="relative">
              <select
                id="modal-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-base sm:text-sm bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-[#0072CE] focus:ring-[#0072CE]/20 transition-all appearance-none cursor-pointer"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </span>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="modal-message"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
            >
              Message / Notes <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="modal-message"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirement, estimated timeline, or team size..."
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-base sm:text-sm bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-[#0072CE] focus:ring-[#0072CE]/20 transition-all resize-none"
            />
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] hover:brightness-105 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer disabled:opacity-75"
            >
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>{isSubmitting ? 'Opening WhatsApp...' : 'Submit via WhatsApp'}</span>
              <span className="text-sm">→</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            🔒 Connected to official WhatsApp desk <span className="font-bold text-slate-700 dark:text-slate-200">+91 98613 41427</span>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
