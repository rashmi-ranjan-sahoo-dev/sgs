import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hrSolutionsImg from '@/assets/images/services/hr-solutions.jpg';
import csrSolutionsImg from '@/assets/images/services/csr-solutions.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function SiriGlobalSolutions({ onOpenContact }) {
  const sectionRef = useRef(null);
  const collageRef = useRef(null);
  const contentColRef = useRef(null);
  const statsRef = useRef(null);
  const progressBarsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // 3D Perspective Entrance for Collage
      if (collageRef.current) {
        gsap.fromTo(
          collageRef.current,
          {
            opacity: 0,
            y: 40,
            rotateX: 10,
            rotateY: -8,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content column reveal
      if (contentColRef.current) {
        gsap.fromTo(
          contentColRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animated progress bars with thumb knobs
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
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Bottom stats counter reveal
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
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
    if (typeof window === 'undefined' || window.innerWidth < 1024 || !collageRef.current) return;
    const rect = collageRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(collageRef.current, {
      rotateY: x * 5,
      rotateX: -y * 5,
      transformPerspective: 1200,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (collageRef.current) {
      gsap.to(collageRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const capabilities = [
    { label: 'Talent Acquisition & Executive Search', percentage: 96 },
    { label: 'Industrial Manpower SLA Fulfillment', percentage: 98 },
    { label: 'CSR Impact Governance & MCA Compliance', percentage: 100 },
  ];

  const stats = [
    { number: '15k+', label: 'Placed Professionals' },
    { number: '250+', label: 'Enterprise Clients' },
    { number: '100%', label: 'Statutory Compliant' },
    { number: '15+', label: 'Years of Experience' },
  ];

  return (
    <section
      id="services-global"
      ref={sectionRef}
      className="relative w-full flex flex-col justify-center pt-1 sm:pt-2 lg:pt-3 pb-6 sm:pb-8 lg:pb-10 select-none bg-transparent overflow-hidden scroll-mt-24"
    >
      {/* Target Anchor Hooks for Navbar Hash Links */}
      <div id="services-hr" className="scroll-mt-24" />
      <div id="services-manpower" className="scroll-mt-24" />
      <div id="services-csr" className="scroll-mt-24" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-1 sm:mt-2 lg:mt-3 mb-auto">
        {/* Top Centered Section Badge */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#72BF44]/40 bg-[#F2FBF0]/95 text-[#72BF44] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs backdrop-blur-xs">
            <span className="flex items-center gap-1">
            </span>
            <span> SIRI Global Solutions</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E293B] tracking-tight mt-1.5 max-w-2xl mx-auto leading-tight">
            Empowering Your Success with Workforce & CSR Expertise
          </h2>
        </div>

        {/* Main 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center mb-4 sm:mb-6">
          {/* Left Column: 3D Sculpted Photo Collage + Rotating Circular Seal */}
          <div
            ref={collageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative transition-transform duration-300 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative grid grid-cols-2 gap-2.5 sm:gap-4 items-center">
              {/* Image 1: Unique HR Solutions Team Image */}
              <div className="relative aspect-[16/11] sm:aspect-[4/5] rounded-xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-lg bg-white/90 dark:bg-slate-900/90 group">
                <img
                  src={hrSolutionsImg}
                  alt="SIRI HR & Workforce Solutions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider bg-[#0072CE]/85 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Workforce
                  </span>
                </div>
              </div>

              {/* Image 2: Unique CSR Community Impact Image */}
              <div className="relative aspect-[16/11] sm:aspect-[4/5] rounded-xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-lg bg-white/90 dark:bg-slate-900/90 group translate-y-1 sm:translate-y-4">
                <img
                  src={csrSolutionsImg}
                  alt="SIRI CSR Social Impact & Governance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider bg-[#72BF44]/90 px-1.5 py-0.5 rounded backdrop-blur-xs text-slate-950">
                    CSR Impact
                  </span>
                </div>
              </div>

              {/* Rotating Circular Seal / Badge with 3D Depth */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{ transform: 'translateZ(25px)' }}
              >
                <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-[#1E293B] dark:bg-slate-950 border-2 border-[#72BF44] shadow-2xl flex items-center justify-center animate-spin-slow">
                  <svg className="w-full h-full p-1" viewBox="0 0 100 100" overflow="visible">
                    <path
                      id="circlePathGlobal"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[10.5px] sm:text-[10px] font-extrabold uppercase tracking-[0.16em] fill-[#72BF44]">
                      <textPath href="#circlePathGlobal" startOffset="0%">
                        • SIRI GROUP • WORKFORCE • CSR •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#72BF44] text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm shadow-md">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Card with Simple Data + Animated 3D Progress Bars */}
          <div
            ref={contentColRef}
            className="lg:col-span-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-3.5"
          >
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              SIRI Global Solutions delivers unified talent acquisition, flexible industrial
              staffing, and compliant Corporate Social Responsibility programs designed to build
              resilient corporate teams and lasting social impact.
            </p>

            {/* 3 Progress / Capability Bars */}
            <div className="space-y-2.5 pt-0.5">
              {capabilities.map((cap, idx) => (
                <div key={cap.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#1E293B] dark:text-white">
                    <span className="truncate pr-2">{cap.label}</span>
                    <span className="font-mono text-[#0072CE] shrink-0">
                      {cap.percentage}%
                    </span>
                  </div>
                  <div className="relative w-full h-1.5 sm:h-2 rounded-full bg-slate-100 overflow-visible">
                    <div
                      ref={(el) => (progressBarsRef.current[idx] = el)}
                      data-target-width={`${cap.percentage}%`}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0072CE] to-[#72BF44] rounded-full transition-all duration-300 relative"
                      style={{ width: `${cap.percentage}%` }}
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
                onClick={() => onOpenContact && onOpenContact('Workforce & Staffing Solutions')}
                className="min-h-[40px] px-5 py-2 rounded-full bg-[#0072CE] hover:bg-[#005FA8] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
              >
                <span>Start a Conversation</span>
                <span className="text-sm">→</span>
              </button>

            </div>
          </div>
        </div>

        {/* Bottom 4-Stat Ribbon (Enhanced Contrast & Hierarchy on Mobile) */}
        <div
          ref={statsRef}
          className="pt-3 sm:pt-5 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 items-stretch"
        >
          {stats.map((st) => (
            <div
              key={st.label}
              className="p-3 sm:p-3.5 rounded-2xl bg-white/85 border border-slate-200/90 shadow-xs backdrop-blur-xs flex flex-col justify-center text-center sm:text-left transition-all hover:border-[#0072CE]/40"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0072CE] tracking-tight">
                {st.number}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#334155] mt-0.5 leading-snug">
                {st.label}
              </div>
            </div>
          ))}
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
