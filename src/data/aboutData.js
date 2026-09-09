import mainImage from '@/assets/images/about/siri-about-main.jpg';
import thumbImage from '@/assets/images/about/siri-about-thumb.jpg';
import avatarsImage from '@/assets/images/about/siri-avatars.jpg';

/**
 * SIRI Group About Us Data
 *
 * Source of Truth: sirigroup.pdf (Page 1, 2, 11, 15)
 * Layout inspiration: Consulo Home-2 "Our Company" (.image-text)
 */
export const ABOUT_DATA = {
  badge: 'Our Company',
  titleParts: {
    before: 'Empowering Business Through People,',
    highlight: 'Purpose',
    after: '& Seamless Travel',
  },
  description:
    'We are a trusted business solutions partner delivering comprehensive services across Human Resource Services, Corporate Social Responsibility (CSR), Corporate Travel, Manpower, and Corporate Loans. Our mission is to help organizations build strong teams, create lasting social impact, and manage business operations efficiently.',
  features: [
    {
      id: 'ambition',
      title: 'Our ambition',
      description:
        'Empowering businesses of all sizes to build strong teams, scale workforce capabilities, and accelerate sustainable corporate growth.',
    },
    {
      id: 'purpose',
      title: 'Our purpose',
      description:
        'Creating measurable social impact through transparent CSR programs and delivering seamless, dependable corporate travel and manpower solutions.',
    },
  ],
  floatingCard: {
    percentage: '98%',
    label: 'Verified placement & client retention',
    subtext: '500+ Organizations Served',
    avatars: avatarsImage,
  },
  cta: {
    label: 'More About Us',
    href: '#about',
  },
  images: {
    main: mainImage,
    thumb: thumbImage,
    altMain: 'SIRI Group corporate executive leadership team strategizing in modern boardroom',
    altThumb: 'SIRI Group partnership handshake and corporate agreement',
  },
};

export default ABOUT_DATA;
