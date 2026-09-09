import hrImage from '@/assets/images/hero/hr-solutions.jpg';
import csrImage from '@/assets/images/hero/csr-solutions.jpg';
import travelImage from '@/assets/images/hero/corporate-travel.jpg';

/**
 * SIRI Group Hero Slider Data
 *
 * Source of Truth: sirigroup.pdf & Consulo Home-2 Layout Reference
 * Contains the 3 primary corporate service offerings highlighted in the hero.
 */
export const HERO_SLIDES = [
  {
    id: '01',
    category: 'HR SOLUTIONS',
    badge: 'People & Talent',
    title: 'Building High-Performing Teams',
    titleParts: {
      before: 'Building High-Performing',
      highlight: 'Teams',
      after: '',
    },
    subtitle:
      'Talent acquisition, staffing and executive hiring solutions designed to help organizations build strong and capable teams.',
    ctaText: 'Get Started',
    href: '#hr-solutions',
    image: hrImage,
    alt: 'SIRI Group HR Solutions - Executive hiring and talent acquisition meeting',
    metric: {
      value: '500+',
      label: 'Executive Placements',
      tag: 'Pan-India Talent Network',
    },
  },
  {
    id: '02',
    category: 'CSR SOLUTIONS',
    badge: 'Purpose & Community',
    title: 'Creating Meaningful Social Impact',
    titleParts: {
      before: 'Creating Meaningful Social',
      highlight: 'Impact',
      after: '',
    },
    subtitle:
      'Strategic CSR programs designed around community needs, business values and measurable social impact.',
    ctaText: 'Get Started',
    href: '#csr-solutions',
    image: csrImage,
    alt: 'SIRI Group CSR Solutions - Community sustainability and social development initiative',
    metric: {
      value: '100%',
      label: 'Verified Social Reach',
      tag: 'Green & Community Initiatives',
    },
  },
  {
    id: '03',
    category: 'CORPORATE TRAVEL',
    badge: 'Seamless Travel',
    title: 'Smart Business Travel Solutions',
    titleParts: {
      before: 'Smart Business',
      highlight: 'Travel',
      after: 'Solutions',
    },
    subtitle:
      'End-to-end corporate travel support designed to simplify business travel and improve the employee experience.',
    ctaText: 'Get Started',
    href: '#corporate-travel',
    image: travelImage,
    alt: 'SIRI Group Corporate Travel - Streamlined business travel and executive support',
    metric: {
      value: '24/7',
      label: 'Corporate Travel Desk',
      tag: 'Flight, Hotel & Risk Support',
    },
  },
];

export const HERO_BRAND_TAGLINE = 'Empowering Business Through People, Purpose & Seamless Travel';

export const HERO_SUPPORT_CONTACT = {
  label: 'Need Quick Consultation?',
  phone: '+91 99893 25255',
  href: 'tel:+919989325255',
};
