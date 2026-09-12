export default function ServicesMarquee() {
  const tickerItems = [
    'WORKFORCE SOLUTIONS',
    'CORPORATE TRAVEL DESK',
    'B2B COMMERCIAL FINANCING',
    'CSR PROJECT MANAGEMENT',
    'INDUSTRIAL MANPOWER',
    'EXECUTIVE SEARCH',
    'GLOBAL MOBILITY',
    'WORKING CAPITAL LINES',
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-3.5 border-y border-slate-800/80 select-none">
      {/* Subtle linear glow overlay */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-6 items-center">
        {/* Double the list for continuous infinite loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-300 uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="text-[#72BF44] text-base sm:text-lg font-bold select-none">
              ✳
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marqueeScroll 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
