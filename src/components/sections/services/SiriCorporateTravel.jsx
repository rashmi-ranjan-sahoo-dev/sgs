import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import corporateTravelImg from '@/assets/images/services/corporate-travel.jpg';
import corporateHotelVisaImg from '@/assets/images/services/corporate-hotel-visa.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function SiriCorporateTravel({ onOpenContact }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3D Stagger Entrance for 3 Cards
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            rotateX: 12,
            rotateY: idx === 0 ? 8 : idx === 2 ? -8 : 0,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.9,
            delay: idx * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  // Interactive 3D Perspective Tilt on Mouse Movement
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
      duration: 0.4,
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

  return (
    <section
      id="services-travel"
      ref={sectionRef}
      className="relative w-full flex flex-col justify-center py-6 sm:py-8 lg:py-10 select-none bg-transparent overflow-hidden scroll-mt-24"
    >

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* Header (Matching Reference Template) */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 sm:mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0072CE]/40 bg-[#F0F7FD]/95 text-[#0072CE] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs backdrop-blur-xs mb-1.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072CE]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072CE]/60" />
              </span>
              <span>02 • SIRI Corporate Travel</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E293B] tracking-tight leading-tight max-w-xl">
              Smart Business Travel with Global Mobility Expertise
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenContact && onOpenContact('Corporate Travel & Mobility')}
            className="self-start md:self-auto min-h-[42px] px-6 py-2.5 rounded-full bg-[#0072CE] hover:bg-[#005FA8] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            <span>Manage Travel Desks</span>
            <span className="text-base">→</span>
          </button>
        </div>

        {/* 3-Cards Layout with 3D Tilt and Unique Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {/* Card 1: Flight & Transit Logistics (Unique Image 1) */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            onMouseMove={(e) => handleCardMouseMove(e, 0)}
            onMouseLeave={() => handleCardMouseLeave(0)}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl flex flex-col justify-between group transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full overflow-hidden">
              <img
                src={corporateTravelImg}
                alt="Corporate Flights and Airport Logistics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-[#0072CE]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  Air & Ground Logistics
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0072CE] font-bold">
                  FLT-01 • Air Mobility
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mt-1 mb-2 group-hover:text-[#0072CE] transition-colors">
                  Flight Bookings & Airport Transfers
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-normal">
                  Corporate fare advantages with zero-hassle cancellations, seat preference, and
                  chauffeured airport transfers.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <span>Preferred Airline Desks</span>
                <span className="text-[#0072CE] font-bold">IATA Certified →</span>
              </div>
            </div>
          </div>

          {/* Card 2: STANDOUT VIBRANT LIME GREEN CARD (Reference Template Standout Element) */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            onMouseMove={(e) => handleCardMouseMove(e, 1)}
            onMouseLeave={() => handleCardMouseLeave(1)}
            className="relative rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 bg-[#72BF44] text-slate-950 flex flex-col justify-between shadow-2xl shadow-[#72BF44]/25 border-2 border-[#8DEB58] transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/10 text-slate-950 text-xs font-bold uppercase tracking-wider mb-3.5">
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                <span>24/7 Corporate Travel Desk</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug mb-2.5">
                Centralized Enterprise Mobility Management
              </h3>

              <p className="text-sm sm:text-base font-semibold text-slate-950 leading-relaxed mb-5">
                One dedicated partner managing duty of care, traveler emergency support, and
                departmental spend governance.
              </p>

              {/* 3 Simple Bullet Points */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-950">
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-[#72BF44] flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </span>
                  <span>18–25% Average Travel Cost Reduction</span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-950">
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-[#72BF44] flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </span>
                  <span>&lt; 15 Minute Rapid Ticket Issuance</span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-950">
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-[#72BF44] flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </span>
                  <span>100% GST Invoice & Audit Compliance</span>
                </div>
              </div>
            </div>

            {/* Bottom Arrow Action */}
            <div className="pt-5 mt-5 border-t border-slate-950/15 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">
                Setup Corporate Account
              </span>
              <button
                type="button"
                onClick={() => onOpenContact && onOpenContact('Corporate Travel & Mobility')}
                className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center text-sm font-bold shadow hover:scale-110 transition-transform cursor-pointer"
                aria-label="Setup Corporate Travel Desk"
              >
                →
              </button>
            </div>
          </div>

          {/* Card 3: Executive Stays, Visas & Insurance (Unique Image 2) */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            onMouseMove={(e) => handleCardMouseMove(e, 2)}
            onMouseLeave={() => handleCardMouseLeave(2)}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl flex flex-col justify-between group transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full overflow-hidden">
              <img
                src={corporateHotelVisaImg}
                alt="Executive 5-Star Hotel Stay & Visa Desks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-[#0072CE]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  Stays & Consular Visas
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#0072CE] font-bold">
                  HTL-02 • Stays & Visas
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mt-1 mb-2 group-hover:text-[#0072CE] transition-colors">
                  Executive Stays, Visas & Insurance
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-normal">
                  Handpicked 5-star corporate hotels with negotiated tariffs, express business visa
                  handling, and comprehensive trip protection.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Fast-Track Consular Liaison</span>
                <span className="text-[#0072CE] font-bold">Worldwide Care →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
