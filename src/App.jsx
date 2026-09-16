import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import ShowcaseCards from '@/components/sections/ShowcaseCards';
import ServicesMarquee from '@/components/sections/services/ServicesMarquee';
import ServicesStack from '@/components/sections/services/ServicesStack';
import AboutUs from '@/components/sections/AboutUs';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import GlobalBackground from '@/components/layout/GlobalBackground';
import PageLoader from '@/components/ui/PageLoader';
import ContactModal from '@/components/ui/ContactModal';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactInitialService, setContactInitialService] = useState('');

  const scrollToTarget = (selector) => {
    const el = document.querySelector(selector);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (window.scrollY ?? window.pageYOffset ?? 0) - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      return true;
    }
    return false;
  };

  const handleOpenServices = () => {
    if (!scrollToTarget('#services-global')) {
      scrollToTarget('#services');
    }
  };

  const handleOpenContact = (serviceName = '') => {
    setContactInitialService(typeof serviceName === 'string' ? serviceName : '');
    setIsContactModalOpen(true);
  };

  // Robust Hash & Anchor Navigation Controller with Header Offset
  useEffect(() => {
    const scrollToHash = (hash) => {
      if (!hash) return;
      try {
        scrollToTarget(hash);
      } catch {
        // Ignore invalid selectors
      }
    };

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Allow DOM & GSAP initial layout to settle
        setTimeout(() => scrollToHash(hash), 250);
      }
    };

    const handleOpenContactModalEvent = (e) => {
      const service = e.detail?.service || '';
      handleOpenContact(service);
    };

    handleHashNavigation();
    window.addEventListener('pageLoaderDone', handleHashNavigation);
    window.addEventListener('hashchange', handleHashNavigation);
    window.addEventListener('openContactModal', handleOpenContactModalEvent);

    return () => {
      window.removeEventListener('pageLoaderDone', handleHashNavigation);
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('openContactModal', handleOpenContactModalEvent);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-foreground selection:bg-secondary/20 selection:text-primary">
      {/* Exact Persistent Fixed Hero Background Canvas across the entire website */}
      <GlobalBackground />

      {/* WhatsApp Connected Contact Popup Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialService={contactInitialService}
      />

      {/* Page Opening Loader */}
      <PageLoader />

      {/* Global Header Navigation */}
      <Header onOpenContact={handleOpenContact} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Mobile-First Hero Section */}
        <Hero
          onOpenServicesModal={handleOpenServices}
          onOpenContact={handleOpenContact}
        />

        {/* Enterprise Interactive Dual-Mode Showcase Cards Component */}
        <ShowcaseCards onOpenServicesModal={handleOpenServices} />

        {/* Infinite Starburst Marquee Divider */}
        <ServicesMarquee />

        {/* 3 Core Industry Verticals: 3D Stacking Card Deck */}
        <ServicesStack onOpenContact={handleOpenContact} />

        {/* Enterprise About Us Section (Consulo-Inspired "Our Company" with authentic sigigroup.pdf data) */}
        <AboutUs onOpenContact={handleOpenContact} />

        {/* 3D Perspective Spotlight Testimonials Section (Option 1) */}
        <Testimonials onOpenContact={handleOpenContact} />

        {/* Temporarily disabled for redesign:
        <WhyPartnerUs />
        */}

        {/* Contact Section (Temporarily disabled for redesign) */}
        {/*
        <section
          id="contact"
          className="relative py-16 sm:py-20 lg:py-24 bg-transparent border-t border-slate-200/80 scroll-mt-24"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#72BF44]/40 bg-white/90 text-[#1E293B] text-xs font-bold uppercase tracking-wide shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]" />
              <span className="text-[#0072CE]">06 • GET IN TOUCH</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E293B] tracking-tight">
              Let&apos;s Build Your Dream Team Together
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
              Ready to elevate your operations across human resources, industrial workforce, corporate mobility,
              and tailored commercial financing? Connect with the SIRI Group enterprise advisory desk today.
            </p>

            <div className="pt-3 flex flex-wrap justify-center items-center gap-3.5">
              <a
                href="mailto:contact@sirigroup.com"
                className="min-h-[44px] px-7 py-3 rounded-full bg-[#0072CE] hover:bg-[#005FA8] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Initiate Corporate Consultation</span>
                <span className="text-base">→</span>
              </a>

              <a
                href="tel:+919999999999"
                className="min-h-[44px] px-6 py-3 rounded-full bg-white/90 hover:bg-white text-[#1E293B] border border-slate-200 font-bold text-xs sm:text-sm transition-all shadow-xs hover:border-[#0072CE] flex items-center gap-2"
              >
                <span>📞 Speak With Dedicated SPOC</span>
              </a>
            </div>

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm">
                <div className="text-[11px] font-bold text-[#0072CE] uppercase">Workforce & Staffing</div>
                <div className="text-xs font-semibold text-[#1E293B] mt-1">HR Solutions & Manpower</div>
                <div className="text-[11px] text-slate-500 mt-0.5">talent@sirigroup.com</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm">
                <div className="text-[11px] font-bold text-[#0072CE] uppercase">Corporate Travel</div>
                <div className="text-xs font-semibold text-[#1E293B] mt-1">24/7 Mobility & Desk</div>
                <div className="text-[11px] text-slate-500 mt-0.5">travel@sirigroup.com</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm">
                <div className="text-[11px] font-bold text-[#0072CE] uppercase">Commercial Finance</div>
                <div className="text-xs font-semibold text-[#1E293B] mt-1">SIRI Fin Hub & Credit</div>
                <div className="text-[11px] text-slate-500 mt-0.5">finance@sirigroup.com</div>
              </div>
            </div>
          </div>
        </section>
        */}
      </main>

      {/* Luxury Consulo-Inspired Footer with Authentic SIRI Group Data */}
      <Footer onOpenContact={handleOpenContact} />
    </div>
  );
}
