/**
 * SIRI Group - Centralized Design & Theme Tokens
 *
 * Visual Direction: Deep Blue + Green
 * Brand Identity: Professional, Trustworthy, Modern, Premium, Growth-oriented
 */

export const THEME_COLORS = {
  // Primary: Deep Blue (brand identity, main headings, primary UI, navigation)
  primary: {
    DEFAULT: '#0A2E5C',
    light: '#14427D',
    dark: '#061D3B',
    soft: '#EBF3FC',
  },
  // Secondary: Green (supporting identity, CSR language, growth/impact)
  secondary: {
    DEFAULT: '#65B741',
    light: '#7BC857',
    dark: '#4E932E',
    soft: '#F0F9EC',
  },
  // Accent: Light green & brand cyan highlights (CTA emphasis, small details)
  accent: {
    DEFAULT: '#70B82C',
    light: '#86D251',
    cyan: '#00A3E0',
  },
  // Clean backgrounds & surfaces
  background: '#F8FAFC',
  surface: {
    DEFAULT: '#FFFFFF',
    subtle: '#F1F5F9',
  },
  // Typography colors
  foreground: '#0F172A',
  muted: {
    DEFAULT: '#64748B',
    foreground: '#475569',
    light: '#94A3B8',
  },
  // Borders & dividers
  border: {
    DEFAULT: '#E2E8F0',
    dark: '#1E293B',
  },
  // High-contrast & dark sections
  dark: {
    DEFAULT: '#0B192C',
    deep: '#060E18',
  },
  darkSurface: {
    DEFAULT: '#112240',
    elevated: '#162C52',
  },
  // Feedback
  success: '#22C55E',
};

export const TYPOGRAPHY = {
  fontFamily: {
    sans: '"Plus Jakarta Sans", Inter, system-ui, -apple-system, sans-serif',
  },
  levels: {
    display: {
      fontSize: '3.5rem',
      lineHeight: '1.15',
      letterSpacing: '-0.02em',
      fontWeight: '700',
    },
    h1: {
      fontSize: '2.75rem',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      fontWeight: '700',
    },
    h2: {
      fontSize: '2.25rem',
      lineHeight: '1.25',
      letterSpacing: '-0.015em',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.75rem',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: '1.4',
      fontWeight: '600',
    },
    body: {
      fontSize: '1rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      letterSpacing: '0.04em',
      fontWeight: '500',
    },
    button: {
      fontSize: '0.9375rem',
      lineHeight: '1.2',
      letterSpacing: '0.01em',
      fontWeight: '600',
    },
  },
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
};

export const SPACING = {
  sectionSm: '3.5rem',
  section: '5.5rem',
  sectionLg: '7.5rem',
  cardSm: '1.25rem',
  card: '2rem',
  cardLg: '2.5rem',
};

export const RADIUS = {
  xs: '4px',
  sm: '6px',
  DEFAULT: '8px',
  md: '10px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
};
