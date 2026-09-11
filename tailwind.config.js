/** @type {import('tailwindcss').Config} */
import { themeColors } from './src/config/theme.js';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: themeColors.primary,
        accent: themeColors.accent,
        neutral: themeColors.neutral,
        secondary: {
          DEFAULT: themeColors.accent.DEFAULT,
          hover: themeColors.accent.hover,
          light: themeColors.accent.light,
        },
      },
      backgroundImage: {
        'brand-gradient': themeColors.gradient.brand,
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
