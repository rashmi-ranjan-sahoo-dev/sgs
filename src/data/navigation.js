/**
 * SIRI Group Navigation Configuration
 * Source of truth: sirigroup.pdf
 */

export const NAV_LINKS = [
  {
    label: 'Home',
    href: '#hero',
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
        id: 'hr',
        title: 'HR Solutions',
        href: '#services-hr',
        tag: 'Recruitment',
        color: '#0072CE',
      },
      {
        id: 'manpower',
        title: 'Manpower Services',
        href: '#services-manpower',
        tag: 'Workforce',
        color: '#72BF44',
      },
      {
        id: 'csr',
        title: 'CSR Solutions',
        href: '#services-csr',
        tag: 'Impact',
        color: '#10B981',
      },
      {
        id: 'travel',
        title: 'Corporate Travel',
        href: '#services-travel',
        tag: 'Mobility',
        color: '#0284C7',
      },
      {
        id: 'loans',
        title: 'Corporate Loans (Siri Fin Hub)',
        href: '#services-loans',
        tag: 'Finance',
        color: '#6366F1',
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
];

export const CTA_BUTTON = {
  label: 'Contact Us',
  href: '#contact',
};

export default NAV_LINKS;
