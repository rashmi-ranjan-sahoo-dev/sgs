/**
 * SIRI Group - Real Business Data Layer
 * Extracted directly from sirigroup.pdf (Source of Truth)
 */

import travelImg from '@/assets/images/services/corporate-travel.jpg';
import loansImg from '@/assets/images/services/corporate-loans.jpg';
import aboutMainImg from '@/assets/images/about/siri-about-main.jpg';

// =============================================================================
// 1. SIRI GLOBAL SOLUTIONS (Workforce, Staffing & CSR Ecosystem)
// Source: sirigroup.pdf (Pages 1, 2, 3, 4, 5, 6, 7, 8, 11, 15)
// =============================================================================
export const globalSolutionsData = {
  id: 'services-global',
  tag: '01 • Core Industry Vertical',
  badge: 'Workforce & CSR Ecosystem',
  title: 'SIRI Global Solutions',
  tagline: 'Empowering Business Through People, Purpose & Scalable Operations',
  description:
    'A trusted business solutions partner delivering unified talent acquisition, flexible industrial staffing, and high-impact Corporate Social Responsibility programs.',
  bgImage: aboutMainImg,
  accentColor: '#72BF44',
  secondaryColor: '#0072CE',

  // HR Solutions (Pages 3 & 4)
  hrSolutions: {
    title: 'Human Resource Solutions',
    subtitle: 'Building High-Performing Teams',
    summary:
      'End-to-end recruitment infrastructure combining executive precision, rapid bulk hiring, and seamless payroll administration.',
    highlights: ['Faster Hiring', 'Pre-Screened Candidates', 'Friendly Environment'],
    offerings: [
      {
        title: 'Permanent Staffing',
        desc: 'Targeted placement of qualified long-term talent tailored to culture and technical benchmarks.',
      },
      {
        title: 'Executive Search',
        desc: 'Specialized leadership headhunting for CXO, Director, and senior functional management.',
      },
      {
        title: 'Bulk Hiring',
        desc: 'High-volume rapid deployment pipelines for enterprise ramp-ups and greenfield projects.',
      },
      {
        title: 'Payroll & HR Solutions',
        desc: 'Compliant payroll processing, statutory benefits management, and employee administration.',
      },
      {
        title: 'Contract Staffing',
        desc: 'Agile workforce augmentation for fixed-tenure projects and specialized skill mandates.',
      },
    ],
    // 5-Step Process from Page 4
    processSteps: [
      { step: '01', name: 'Role Understanding', desc: 'In-depth analysis of job specs, competency models & team dynamics.' },
      { step: '02', name: 'Candidate Sourcing', desc: 'Multi-channel headhunting across proprietary databases and passive talent pools.' },
      { step: '03', name: 'Screening & Shortlisting', desc: 'Rigorous behavioral assessment, credential verification & benchmark evaluations.' },
      { step: '04', name: 'Interview Coordination', desc: 'Structured scheduling, feedback loops, and transparent panel alignment.' },
      { step: '05', name: 'Offer & Onboarding Support', desc: 'Compensation negotiation, background checks, and smooth Day-1 integration.' },
    ],
  },

  // Manpower Services (Page 5)
  manpowerServices: {
    title: 'Industrial & Facility Manpower',
    subtitle: 'Flexible Staffing Across Industries',
    summary:
      'Verified skilled, semi-skilled, and industrial manpower supporting manufacturing, warehousing, logistics, and facilities.',
    offerings: [
      { title: 'Permanent Staffing', desc: 'Core industrial and technical staff hiring.' },
      { title: 'Temporary & Contract Staffing', desc: 'Flexible shifts and seasonal staffing lines.' },
      { title: 'Industrial Manpower', desc: 'Factory floor, assembly, warehousing, and operations crew.' },
      { title: 'Skilled & Unskilled Workforce', desc: 'Certified technicians to general logistics labor.' },
      { title: 'Payroll Management', desc: 'On-time wage disbursement, PF, ESI, and statutory registers.' },
      { title: 'Facility Staffing', desc: 'Pantry, housekeeping, security, and administrative support.' },
      { title: 'Outsourced Workforce Solutions', desc: 'Complete SLA-driven operational manpower management.' },
      { title: 'Compliance Support', desc: 'Full adherence to Factories Act, minimum wages, and labor laws.' },
    ],
  },

  // CSR Solutions (Pages 7 & 8)
  csrSolutions: {
    title: 'Corporate Social Responsibility (CSR)',
    subtitle: 'Creating Meaningful Social Impact',
    summary:
      'Designing and implementing compliant CSR programs aligned with corporate values and grassroots community needs.',
    focusAreas: [
      { name: 'Education', icon: '🎓', desc: 'School infra & STEM learning' },
      { name: 'Healthcare', icon: '🏥', desc: 'Mobile health camps & maternal care' },
      { name: 'Skill Development', icon: '⚡', desc: 'Youth vocational training' },
      { name: 'Rural Development', icon: '🌾', desc: 'Sanitation & clean drinking water' },
      { name: 'Women Empowerment', icon: '🌸', desc: 'Self-help groups & livelihood' },
      { name: 'Environment', icon: '🌱', desc: 'Afforestation & waste management' },
    ],
    projectManagement: [
      'CSR Strategy Development',
      'NGO Partnerships & Vetting',
      'Program Implementation',
      'Impact Assessment & Audit',
      'Compliance & MCA Reporting',
      'CSR Documentation & Media',
    ],
    pillars: [
      { label: 'Transparent Execution', desc: 'Direct fund tracking & milestone verification' },
      { label: 'Measurable Outcomes', desc: 'Quantifiable social ROI and third-party audits' },
      { label: 'Regulatory Compliance', desc: '100% adherence to Companies Act Sec 135' },
    ],
  },

  // Why Choose HR Solutions (Page 6)
  whyChoose: [
    { title: 'Industry Expertise', desc: 'Deep sectoral understanding across manufacturing, tech, retail & BFSI.' },
    { title: 'Quick Turnaround', desc: 'Rapid fulfillment SLAs through proprietary pre-screened talent pools.' },
    { title: 'Quality Candidate Screening', desc: 'Multi-stage vetting ensuring technical and cultural fit.' },
    { title: 'Dedicated Account Management', desc: 'Single point of contact for unified staffing coordination.' },
    { title: 'Scalable Workforce', desc: 'From niche specialists to 1,000+ member industrial cohorts.' },
    { title: 'Strong Talent Network', desc: 'Pan-India candidate database across tier-1 to tier-3 hubs.' },
  ],
};

// =============================================================================
// 2. SIRI CORPORATE TRAVEL (Smart Business Travel Solutions)
// Source: sirigroup.pdf (Pages 1, 3, 9, 10, 11)
// =============================================================================
export const corporateTravelData = {
  id: 'services-travel',
  anchor: 'services-travel',
  tag: '02 • Core Industry Vertical',
  badge: 'Smart Business Travel Solutions',
  title: 'SIRI Corporate Travel',
  tagline: 'Empowering Business Through People, Purpose & Seamless Travel',
  description:
    'End-to-end enterprise mobility management. We optimize flight logistics, curated executive accommodation, express visa liaison, and 24/7 corporate duty of care.',
  image: travelImg,
  accentColor: '#0072CE',

  // 5 Managed Services (Page 9)
  services: [
    {
      id: 'flights',
      code: 'FLT-01',
      title: 'Flight Bookings',
      category: 'Air Logistics',
      desc: 'Seamless domestic and international corporate flight reservations with preferred corporate fares, flexible cancellation policies, and seat-inventory priority.',
      icon: '✈️',
      highlights: ['Corporate Fare Advantages', 'Zero-Hassle Rescheduling', 'Preferred Airline Partnerships'],
    },
    {
      id: 'hotels',
      code: 'HTL-02',
      title: 'Hotel Reservations',
      category: 'Hospitality',
      desc: 'Handpicked business hotels, serviced executive apartments, and negotiated corporate rates with complimentary amenities, high-speed Wi-Fi, and early check-ins.',
      icon: '🏨',
      highlights: ['Curated Business Properties', 'Pre-Negotiated Tariffs', 'Direct Corporate Invoicing'],
    },
    {
      id: 'visa',
      code: 'VSA-03',
      title: 'Visa Assistance',
      category: 'Consular Liaison',
      desc: 'Complete documentation guidance, biometric appointment scheduling, business visa processing, and expedited embassy liaisons for global business travelers.',
      icon: '🛂',
      highlights: ['Documentation Verification', 'Expedited Embassy Liaison', 'Multi-Country Transit Guidance'],
    },
    {
      id: 'insurance',
      code: 'INS-04',
      title: 'Travel Insurance',
      category: 'Risk Protection',
      desc: 'Comprehensive international and domestic business travel insurance covering medical contingencies, trip cancellations, lost baggage, and emergency evacuations.',
      icon: '🛡️',
      highlights: ['Emergency Medical Coverage', 'Trip Delay Protection', 'Worldwide Cashless Hospitalization'],
    },
    {
      id: 'transport',
      code: 'TRN-05',
      title: 'Transportation Services',
      category: 'Ground Mobility',
      desc: 'Chauffeured airport transfers, inter-city executive cabs, group coach logistics for corporate events, and vetted vehicle dispatch with GPS tracking.',
      icon: '🚘',
      highlights: ['Verified Professional Drivers', 'Airport Meet & Greet', 'Real-Time Telematics & Tracking'],
    },
  ],

  // 6 Benefits (Page 10)
  benefits: [
    { metric: '18-25%', label: 'Reduced Travel Costs', desc: 'Negotiated corporate tariffs & spend optimization.', icon: '📉' },
    { metric: '5-Star', label: 'Improved Employee Experience', desc: 'Frictionless itineraries & 24/7 concierge.', icon: '⭐' },
    { metric: '1 Desk', label: 'Centralized Management', desc: 'Unified booking portal & ERP billing integration.', icon: '🏢' },
    { metric: '< 15m', label: 'Faster Booking Process', desc: 'Rapid ticket issuance & swift confirmations.', icon: '⚡' },
    { metric: '24/7', label: 'Travel Risk Management', desc: 'Disruption re-routing & emergency assistance.', icon: '🛡️' },
    { metric: '100%', label: 'Detailed Reporting & Analytics', desc: 'GST-compliant itemized billing & spend audits.', icon: '📊' },
  ],

  deskSupport: {
    title: 'Dedicated Corporate Travel Desk',
    subtitle: 'One Partner. Seamless Global Mobility.',
    hours: '24/7/365 Active Response Desk',
  },
};

// =============================================================================
// 3. SIRI FIN HUB (B2B Corporate Loans & Commercial Finance)
// Source: sirigroup.pdf (Pages 1, 3, 12, 13, 14)
// =============================================================================
export const finHubData = {
  id: 'services-loans',
  anchor: 'services-loans',
  tag: '03 • Core Industry Vertical',
  badge: 'Tailored Business Financing',
  title: 'SIRI Fin Hub',
  tagline: 'Empowering Business With The Right Financial Solutions To Accelerate Growth',
  description:
    'Comprehensive B2B loan advisory and structured commercial financing designed to meet the diverse funding requirements of emerging and established enterprises.',
  image: loansImg,
  accentColor: '#00A8E8',

  // 7 B2B Loan Facilities (Page 13)
  loanProducts: [
    {
      id: 'working-capital',
      code: 'FIN-01',
      title: 'Working Capital Loans',
      tag: 'Liquidity & Cash Flow',
      amountRange: '₹25 Lakh - ₹25 Crore+',
      purpose: 'Operational liquidity, payroll cycles & inventory replenishment',
      tenure: '12 - 36 Months Flexible',
      desc: 'Short-term financing structured to bridge working capital gaps, meet supplier payables, and maintain smooth day-to-day business operations without equity dilution.',
      features: ['Revolving credit facility', 'Minimal collateral requirements', 'Fast documentation turnaround'],
      icon: '🔄',
    },
    {
      id: 'business-loans',
      code: 'FIN-02',
      title: 'Business Loans',
      tag: 'Unsecured & Term Loans',
      amountRange: '₹10 Lakh - ₹10 Crore',
      purpose: 'Business scaling, modern technology adoption & new branches',
      tenure: '12 - 60 Months',
      desc: 'Tailored commercial loans providing prompt capital injections for operational scale, franchise expansion, and strategic capital investments.',
      features: ['No end-use restrictions', 'Competitive interest rates', 'Flexible EMI structures'],
      icon: '💼',
    },
    {
      id: 'msme-loans',
      code: 'FIN-03',
      title: 'MSME Loans',
      tag: 'Priority Sector Lending',
      amountRange: '₹10 Lakh - ₹15 Crore',
      purpose: 'Machinery purchase, production scaling & modernization',
      tenure: 'Up to 7 Years',
      desc: 'Specialized financing packages designed for Micro, Small, and Medium Enterprises to access government-backed schemes, credit subsidies, and growth capital.',
      features: ['CGTMSE backed options', 'Subsidized processing fees', 'Speedy appraisal for registered MSMEs'],
      icon: '🏭',
    },
    {
      id: 'overdraft-cc',
      code: 'FIN-04',
      title: 'Overdraft & Cash Credit',
      tag: 'Flexible Drawing Lines',
      amountRange: 'Custom Limit as per Turnaround',
      purpose: 'Overnight liquidity, seasonal inventory & unexpected demands',
      tenure: 'Renewed Annually',
      desc: 'Flexible credit lines allowing enterprises to withdraw funds up to a pre-approved limit against book debts, paying interest only on the utilized sum.',
      features: ['Interest charged only on drawn balance', 'Instant fund transfers', 'Linked to current account'],
      icon: '💳',
    },
    {
      id: 'project-finance',
      code: 'FIN-05',
      title: 'Project Finance',
      tag: 'Capex & Greenfield',
      amountRange: '₹5 Crore - ₹100 Crore+',
      purpose: 'Infrastructure, manufacturing plants & capacity expansion',
      tenure: '5 - 15 Years Structured',
      desc: 'Long-term debt structuring for industrial greenfield and brownfield projects, evaluated primarily against projected cash flows and lifecycle viability.',
      features: ['Moratorium period support', 'Multi-banking consortium syndication', 'Customized repayment milestones'],
      icon: '🏗️',
    },
    {
      id: 'trade-finance',
      code: 'FIN-06',
      title: 'Trade Finance',
      tag: 'Import & Export Credit',
      amountRange: 'Domestic & Cross-Border',
      purpose: 'Letters of Credit (LC), Bank Guarantees (BG) & factoring',
      tenure: 'Transaction-Based (30 - 180 Days)',
      desc: 'Mitigate counterparty risk and facilitate trade transactions through Letters of Credit, Bank Guarantees, pre-shipment, and post-shipment export credit.',
      features: ['Letters of Credit & Bank Guarantees', 'Export-import discounting', 'Forex hedging coordination'],
      icon: '🌐',
    },
    {
      id: 'lap-commercial',
      code: 'FIN-07',
      title: 'Loan Against Property',
      tag: 'Collateral-Backed Credit',
      amountRange: 'Up to 70% Property Valuation',
      purpose: 'High-ticket expansion, debt consolidation & capital expenditure',
      tenure: 'Up to 15 Years',
      desc: 'Unlock the market value of commercial real estate, factories, or offices to secure substantial capital with long repayment tenures and lower interest rates.',
      features: ['High loan-to-value (LTV) ratio', 'Lower interest rate benchmarks', 'Retain full asset ownership'],
      icon: '🏢',
    },
  ],

  // 5 Why Choose Pillars (Page 14)
  whyChoose: [
    { num: '01', title: 'Tailored Financing Solutions', desc: 'Credit facilities mapped precisely to cash flow cycles and sector realities.' },
    { num: '02', title: 'Quick Processing Support', desc: 'Dedicated financial managers handle file modeling and rapid sanctioning.' },
    { num: '03', title: 'Competitive Institutional Rates', desc: 'Strong institutional network with top public, private banks & NBFCs.' },
    { num: '04', title: 'Expert End-to-End Guidance', desc: 'Complete liaison from initial assessment to final fund disbursement.' },
    { num: '05', title: 'Transparent & Hassle-Free', desc: 'Zero hidden clauses, clear sanction terms, and ongoing advisory.' },
  ],
};
