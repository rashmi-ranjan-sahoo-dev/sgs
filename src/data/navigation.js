/**
 * SIRI Group Navigation Configuration
 * Source of truth: sirigroup.pdf
 */

export const NAV_LINKS = [
  {
    label: 'Home',
    href: '#home',
  },
  {
    label: 'About Us',
    href: '#about',
  },
  {
    label: 'Services',
    href: '#services',
    hasDropdown: true,
    children: [
      {
        label: 'HR Solutions',
        href: '#services-hr',
        description: 'Permanent staffing, executive search, bulk hiring & payroll solutions.',
        badge: 'Core Service',
      },
      {
        label: 'Manpower Services',
        href: '#services-manpower',
        description: 'Skilled, semi-skilled & industrial workforce staffing solutions.',
        badge: 'Workforce',
      },
      {
        label: 'CSR Solutions',
        href: '#services-csr',
        description: 'Community development, education, healthcare & sustainability initiatives.',
        badge: 'Impact',
      },
      {
        label: 'Corporate Travel',
        href: '#services-travel',
        description: 'End-to-end flight bookings, hotel reservations, visa & risk management.',
        badge: 'Travel',
      },
      {
        label: 'Corporate Loans',
        href: '#services-loans',
        description: 'B2B business loans, working capital, MSME & tailored project finance.',
        badge: 'Fin Hub',
      },
    ],
  },
  {
    label: 'Why Choose Us',
    href: '#why-choose-us',
  },
  {
    label: 'Testimonials',
    href: '#testimonials',
  },
  {
    label: 'Contact Us',
    href: '#contact',
    isCta: true,
  },
];

export default NAV_LINKS;
