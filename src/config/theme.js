/**
 * SIRI Group - Centralized Design & Theme Tokens
 *
 * Visual Direction: Deep Blue + Green
 * Brand Identity: Professional, Trustworthy, Modern, Premium, Growth-oriented
 */

// Primary Brand Colors (SIRI Groups Official Palette)
export const themeColors = {
  primary: {
    DEFAULT: '#0072CE',      // Core SIRI Blue (CTAs, key highlights, active links)
    hover: '#005FA8',        // Deeper blue for interactive press/hover states
    light: '#F0F7FD',        // Soft ice blue tint for subtle card/section washes
    focus: 'rgba(0, 114, 206, 0.25)', // Focus ring glow
  },
  accent: {
    DEFAULT: '#72BF44',      // SIRI Lime Green (Badges, checkmarks, starburst icons)
    hover: '#5FA336',        // Darker green for hover
    light: '#F2FBF0',        // Light mint wash for badge backgrounds
  },
  neutral: {
    dark: '#1E293B',         // Deep charcoal slate for primary headings and body text (NO deep navy)
    muted: '#64748B',        // Balanced secondary gray for descriptions/subtitles
    border: '#E2E8F0',       // Subtle clean border line
    surface: '#FFFFFF',      // Pure white card and navbar surface
    backdrop: 'rgba(255, 255, 255, 0.90)', // Glassmorphic navbar/pill fill
  },
  gradient: {
    brand: 'linear-gradient(135deg, #72BF44 0%, #0072CE 100%)', // Logo-matched gradient
  }
};

export const THEME_COLORS = {
  primary: {
    DEFAULT: themeColors.primary.DEFAULT,
    hover: themeColors.primary.hover,
    light: themeColors.primary.light,
    dark: '#005FA8',
    soft: themeColors.primary.light,
    focus: themeColors.primary.focus,
  },
  secondary: {
    DEFAULT: themeColors.accent.DEFAULT,
    hover: themeColors.accent.hover,
    light: themeColors.accent.light,
    dark: '#5FA336',
    soft: themeColors.accent.light,
  },
  accent: {
    DEFAULT: themeColors.accent.DEFAULT,
    hover: themeColors.accent.hover,
    light: themeColors.accent.light,
    cyan: '#0072CE',
  },
  background: '#F8FAFC',
  surface: {
    DEFAULT: themeColors.neutral.surface,
    subtle: '#F1F5F9',
  },
  foreground: themeColors.neutral.dark,
  muted: {
    DEFAULT: themeColors.neutral.muted,
    foreground: '#475569',
    light: '#94A3B8',
  },
  border: {
    DEFAULT: themeColors.neutral.border,
    dark: themeColors.neutral.dark,
  },
  dark: {
    DEFAULT: themeColors.neutral.dark,
    deep: '#0F172A',
  },
  darkSurface: {
    DEFAULT: '#1E293B',
    elevated: '#334155',
  },
  success: '#22C55E',
  gradient: themeColors.gradient,
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
