import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_DATA = [
  {
    id: 't-hr',
    vertical: 'Workforce & Staffing',
    tagColor: 'text-[#72BF44] bg-[#72BF44]/10 border-[#72BF44]/20',
    quote:
      'SIRI Group streamlined our greenfield factory ramp-up with rapid, compliance-checked industrial staffing. Their structured 5-step screening ensured every shift had certified, pre-screened technical manpower from Day 1.',
    author: 'Rajesh Sharma',
    role: 'VP — Human Resources & Plant Operations',
    company: 'Leading Automotive & Industrial Corp',
    stat: '1,200+ Verified Placements',
    rating: 5,
  },
  {
    id: 't-travel',
    vertical: 'Corporate Travel & Mobility',
    tagColor: 'text-[#0072CE] bg-[#0072CE]/10 border-[#0072CE]/20',
    quote:
      'Centralizing our multi-city executive travel with SIRI Corporate Travel eliminated itinerary friction. From flight bookings to urgent visa assistance and curated hotels, their 24/7 desk delivers complete peace of mind.',
    author: 'Ananya Deshmukh',
    role: 'Director — Procurement & Global Mobility',
    company: 'Enterprise Consulting & IT Services',
    stat: '24/7 Global Desk SLA',
    rating: 5,
  },
  {
    id: 't-loans',
    vertical: 'B2B Financing & Credit',
    tagColor: 'text-[#0072CE] bg-[#0072CE]/10 border-[#0072CE]/20',
    quote:
      'SIRI Fin Hub navigated our working capital syndication with premier institutional lenders effortlessly. Their dedicated documentation advisory and transparent terms saved us critical weeks during operational expansion.',
    author: 'Vikram Malhotra',
    role: 'Managing Director & Founder',
    company: 'Logistics & Infrastructure Solutions',
    stat: 'Fast-Track Credit Sanction',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-14 sm:py-20 lg:py-24 bg-transparent overflow-hidden scroll-mt-24"
      aria-label="Client Testimonials - SIRI Group"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0072CE]/30 bg-[#F0F7FD] text-[#0072CE] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0072CE]" />
            <span>05 • CLIENT VOICES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E293B] tracking-tight">
            Client Testimonials
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-medium">
            Hear what our enterprise partners say about SIRI Group&apos;s execution excellence across
            workforce solutions, corporate mobility, and business financing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={t.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl hover:shadow-2xl hover:border-[#0072CE]/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${t.tagColor}`}
                  >
                    {t.vertical}
                  </span>

                  <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                <div className="text-3xl font-serif text-[#0072CE]/30 leading-none mb-2">
                  &ldquo;
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1E293B] group-hover:text-[#0072CE] transition-colors">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                    <p className="text-[10px] text-slate-600 font-medium">{t.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-semibold text-[#0072CE] bg-[#F0F7FD] px-2.5 py-1 rounded-md mt-1">
                  <span>✓ {t.stat}</span>
                  <span className="font-mono text-[9px] text-slate-600 font-semibold">Verified Client</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
