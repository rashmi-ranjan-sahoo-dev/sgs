import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import PageLoader from '@/components/ui/PageLoader';

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-secondary/20 selection:text-primary">
      {/* Slow, cool initial page load / refresh opening animation */}
      <PageLoader />

      {/* Header Navigation */}
      <Header />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <AboutUs />
      </main>
    </div>
  );
}
