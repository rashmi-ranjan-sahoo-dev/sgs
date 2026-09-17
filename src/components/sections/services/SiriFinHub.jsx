import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import corporateLoansImg from '@/assets/images/services/corporate-loans.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function SiriFinHub({ onOpenContact }) {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const cardColRef = useRef(null);
  const progressBarsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
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
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 3D Entrance for Right Column Card
      if (cardColRef.current) {
        gsap.fromTo(
          cardColRef.current,
          {
            opacity: 0,
            y: 40,
            rotateX: 10,
            rotateY: 8,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      progressBarsRef.current.forEach((bar) => {
        if (!bar) return;
        const targetWidth = bar.dataset.targetWidth || '80%';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
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
  const handleMouseMove = (e) => {
    if (typeof window === 'undefined' || window.innerWidth < 1024 || !cardColRef.current) return;
    const rect = cardColRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(cardColRef.current, {
      rotateY: x * 5,
      rotateX: -y * 5,
      transformPerspective: 1200,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (cardColRef.current) {
      gsap.to(cardColRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const financeMetrics = [
    { label: 'Multi-Banking Consortium Syndication', percentage: 98 },
    { label: 'Credit Appraisal & Sanction Speed', percentage: 94 },
    { label: 'Documentation & Fee Transparency', percentage: 100 },
  ];

  const loanTags = [
    'Working Capital Lines',
    'MSME Growth Loans',
    'Project Finance',
    'Commercial LAP',
    'Trade Credit & BG',
  ];

  return (
    <section
      id="services-loans"
      ref={sectionRef}
      className="relative w-full flex flex-col justify-center py-1 sm:py-2 select-none bg-transparent overflow-hidden scroll-mt-24"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* Top Centered Section Badge */}
        <div className="text-center mb-2.5 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0072CE]/40 bg-[#F0F7FD]/95 text-[#0072CE] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs backdrop-blur-xs">
            <span>SIRI Fin Hub</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E293B] tracking-tight mt-1.5 max-w-2xl mx-auto leading-tight">
            Accelerate Enterprise Growth with Tailored Financing
          </h2>
        </div>

        {/* Main 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Simple Data + Facility Tags + Progress Bars */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-xl space-y-3 sm:space-y-4"
          >
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              Empowering businesses with structured B2B commercial loans to accelerate scale. We provide
              end-to-end liaison with premier public banks, private lenders, and NBFCs for fast-track credit
              sanctions.
            </p>

            {/* Clean Loan Product Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {loanTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#F0F7FD] border border-slate-200/90 text-xs font-bold text-[#0072CE] hover:border-[#0072CE] transition-colors"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>

            {/* 3 Progress / Speed Bars */}
            <div className="space-y-2 pt-0.5">
              {financeMetrics.map((met, idx) => (
                <div key={met.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E293B]">
                    <span>{met.label}</span>
                    <span className="font-mono text-[#0072CE]">
                      {met.percentage}%
                    </span>
                  </div>
                  <div className="relative w-full h-1.5 sm:h-2 rounded-full bg-slate-100 overflow-visible">
                    <div
                      ref={(el) => (progressBarsRef.current[idx] = el)}
                      data-target-width={`${met.percentage}%`}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0072CE] to-[#72BF44] rounded-full transition-all duration-300 relative"
                      style={{ width: `${met.percentage}%` }}
                    >
                      <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#72BF44] border border-white shadow-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onOpenContact && onOpenContact('B2B Commercial Financing & Loans')}
                className="min-h-[38px] px-5 py-2 rounded-full bg-[#0072CE] hover:bg-[#005FA8] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
              >
                <span>Apply for Financing</span>
                <span className="text-base">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Sculpted Photo Card + Rotating Circular Seal */}
          <div
            ref={cardColRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative transition-transform duration-300 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white/90 group aspect-[16/10] sm:aspect-[16/10.5]">
              <img
                src={corporateLoansImg}
                alt="SIRI Fin Hub Corporate Loans"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Card Overlay: 4 Key Specifications */}
              <div
                className="absolute bottom-2.5 left-2.5 right-2.5 p-2 sm:p-2.5 rounded-xl bg-white/95 border border-slate-200/90 backdrop-blur-md grid grid-cols-2 gap-1.5 text-center shadow-lg"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Ticket Size
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-[#0072CE]">
                    ₹25 Lakh - ₹100 Cr+
                  </div>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Processing
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E293B]">
                    Fast Appraisal SLA
                  </div>
                </div>
              </div>

              {/* Rotating Circular Seal / Badge with 3D Depth */}
              <div
                className="absolute top-3.5 right-3.5 z-20 pointer-events-none"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-[#1E293B] border-2 border-[#0072CE] shadow-2xl flex items-center justify-center animate-spin-slow">
                  <svg className="w-full h-full p-1" viewBox="0 0 100 100" overflow="visible">
                    <path
                      id="circlePathLoans"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[10px] sm:text-[9.5px] font-extrabold uppercase tracking-[0.16em] fill-[#38BDF8]">
                      <textPath href="#circlePathLoans" startOffset="0%">
                        • SIRI FIN HUB • B2B CREDIT • LOANS •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0072CE] text-white flex items-center justify-center font-extrabold text-sm shadow">
                    ₹
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 18s linear infinite;
        }
      `}</style>
    </section>
  );
}
