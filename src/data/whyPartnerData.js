import hrImage from '@/assets/images/services/hr-solutions.jpg';
import csrImage from '@/assets/images/services/csr-solutions.jpg';
import travelImage from '@/assets/images/services/corporate-travel.jpg';
import financeImage from '@/assets/images/services/corporate-loans.jpg';
import networkImage from '@/assets/images/about/siri-about-thumb.jpg';
import teamImage from '@/assets/images/about/siri-about-main.jpg';

/**
 * Why Partner With Us Data
 *
 * Source of Truth: sirigroup.pdf (Page 11 & Page 15)
 * Visual Reference: Consulo Home-2 "Why Choose Us" (.why-choose-us)
 *
 * The Six Official Reasons from sirigroup.pdf:
 * 01 — HR Expertise
 * 02 — Social Impact Programs
 * 03 — Travel Management Excellence
 * 04 — Customized Solutions
 * 05 — Nationwide Service Network
 * 06 — Dedicated Support Team
 */
export const WHY_PARTNER_DATA = {
  badge: 'WHY PARTNER WITH US?',
  titleParts: {
    before: 'ONE PARTNER.',
    highlight: 'MULTIPLE SOLUTIONS',
  },
  description:
    'We are a trusted business solutions partner delivering integrated capabilities across Human Resource Services, Corporate Social Responsibility (CSR), Corporate Travel, Manpower, and Corporate Loans to help organizations build strong teams, create lasting social impact, and manage business operations seamlessly.',
  reasons: [
    {
      number: '01',
      title: 'HR Expertise',
      description:
        'End-to-end talent acquisition, executive search, permanent staffing, and workforce capability building.',
      badge: 'Talent & Workforce',
      tags: ['Executive Search', 'Permanent Staffing', 'Payroll Management'],
      highlightStat: 'End-to-End Recruitment',
      caption: 'Precision candidate screening & scalable workforce capability frameworks.',
      image: hrImage,
      alt: 'SIRI Group HR recruitment, executive talent sourcing, and staffing solutions',
    },
    {
      number: '02',
      title: 'Social Impact Programs',
      description:
        'Strategic CSR initiatives creating measurable community development and sustainable social value.',
      badge: 'CSR & Sustainability',
      tags: ['Community Impact', 'Statutory Compliance', 'Measurable ROI'],
      highlightStat: 'Measurable Social Value',
      caption: 'High-impact corporate social responsibility programs with transparent monitoring.',
      image: csrImage,
      alt: 'SIRI Group corporate social responsibility and community impact initiatives',
    },
    {
      number: '03',
      title: 'Travel Management Excellence',
      description:
        'Comprehensive corporate travel desk managing flights, hotels, visas, insurance, and risk analytics.',
      badge: 'Corporate Mobility',
      tags: ['24/7 Global Desk', 'Itinerary Optimization', 'Expense Control'],
      highlightStat: '24/7 Travel Desk',
      caption: 'Seamless business itineraries, flight & accommodation coordination, and expense savings.',
      image: travelImage,
      alt: 'SIRI Group corporate travel management, flight coordination, and executive hospitality',
    },
    {
      number: '04',
      title: 'Customized Solutions',
      description:
        'Tailored business, staffing, and financing models aligned with client-focused organizational goals.',
      badge: 'Tailored Frameworks',
      tags: ['Flexible SLAs', 'Corporate Loans', 'Bespoke Delivery'],
      highlightStat: 'Bespoke Client Models',
      caption: 'Flexible business advisory and working capital financing tailored to enterprise scale.',
      image: financeImage,
      alt: 'SIRI Group customized corporate solutions and tailored business advisory',
    },
    {
      number: '05',
      title: 'Nationwide Service Network',
      description:
        'Extensive pan-India service reach ensuring rapid deployment, reliable support, and seamless coordination.',
      badge: 'Pan-India Reach',
      tags: ['Multi-City Delivery', 'Rapid Mobilization', 'Tier-1 & 2 Hubs'],
      highlightStat: 'Pan-India Footprint',
      caption: 'Rapid multi-location deployment across major industrial and corporate hubs in India.',
      image: networkImage,
      alt: 'SIRI Group nationwide service network and pan-India operational presence',
    },
    {
      number: '06',
      title: 'Dedicated Support Team',
      description:
        'Experienced professionals providing dependable, transparent, and continuous client partnership.',
      badge: 'Client Success',
      tags: ['Single Point of Contact', 'Dedicated SPOC', 'Proactive Review'],
      highlightStat: 'Dedicated Account SPOC',
      caption: 'Experienced account managers providing continuous communication and swift resolution.',
      image: teamImage,
      alt: 'SIRI Group dedicated professional support team and executive account management',
    },
  ],
  processCard: {
    tag: 'OUR PROCESS',
    title: 'Simple & Effective',
    caption: 'One-Stop Business Solutions with Experienced Professionals',
  },
};

export default WHY_PARTNER_DATA;