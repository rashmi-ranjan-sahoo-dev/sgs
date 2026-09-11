import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import ShowcaseCards from '@/components/sections/ShowcaseCards';
import PageLoader from '@/components/ui/PageLoader';

export default function App() {
  const handleOpenServices = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-secondary/20 selection:text-primary">
      {/* Page Opening Loader */}
      <PageLoader />

      {/* Global Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Mobile-First Hero Section (Consulo Layout Reference + SIRI Content) */}
        <Hero onOpenServicesModal={handleOpenServices} />

        {/* Enterprise Interactive Dual-Mode Showcase Cards Component */}
        <ShowcaseCards onOpenServicesModal={handleOpenServices} />

        <section
          id="about"
          className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 border-t border-slate-100 dark:border-slate-800"
        >
          <div className="max-w-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#72BF44]">
              01 • About Us
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              About SIRI Group
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Trusted corporate partner delivering comprehensive workforce, CSR, travel, and financial solutions.
            </p>
          </div>
        </section>

        <section
          id="services"
          className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800"
        >
          <div className="max-w-4xl text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0072CE]">
              02 • Corporate Solutions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              5 Core Industry Verticals
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              HR Solutions, Manpower Services, CSR Solutions, Corporate Travel, and Corporate Loans (Siri Fin Hub).
            </p>
          </div>
        </section>

        <section
          id="why-partner"
          className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 border-t border-slate-100 dark:border-slate-800"
        >
          <div className="max-w-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#72BF44]">
              03 • Value Proposition
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Partner With Us?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              One Partner. Multiple Solutions. Six core pillars of corporate excellence.
            </p>
          </div>
        </section>

        <section
          id="testimonials"
          className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800"
        >
          <div className="max-w-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0072CE]">
              04 • Client Voices
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Client Testimonials
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Hear what our enterprise partners say about SIRI Group&apos;s execution excellence.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 border-t border-slate-100 dark:border-slate-800"
        >
          <div className="max-w-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#72BF44]">
              05 • Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Let&apos;s Build Together
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Ready to elevate your operations? Contact the SIRI Group team today.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
