import { primaryBlack, primaryGray, primaryWhite, strawBerry } from './src/constants/style-variable';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'right-grow': {
          '0%': { transform: 'scaleX(0.1)', opacity: '0', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', opacity: '1', transformOrigin: 'left' },
        },
        'left-shrink': {
          '0%': { transform: 'scaleX(1)', opacity: '1', transformOrigin: 'right' },
          '100%': { transform: 'scaleX(0.1)', opacity: '0', transformOrigin: 'right' },
        },
        'left-to-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0.8' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'right-to-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0.8' },
        },
      },

      animation: {
        'right-grow': 'right-grow 0.4s ease-in-out',
        'left-shrink': 'left-shrink 0.4s ease-in-out',
        'left-to-right': 'left-to-right 0.2s ease-in-out',
        'right-to-left': 'right-to-left 0.2s ease-in-out',
      },

      colors: {
        'primary-black': primaryBlack,
        'primary-white': primaryWhite,
        'primary-gray': primaryGray,
        'straw-berry': strawBerry,
      },
    },
  },
  plugins: [],
};
