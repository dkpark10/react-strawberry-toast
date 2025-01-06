import { primaryBlack, primaryBlack, primaryWhite, strawBerry } from './src/constants/style-variable';

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
      },

      animation: { 'right-grow': 'right-grow 0.4s ease-in-out', 'left-shrink': 'left-shrink 0.4s ease-in-out' },

      colors: {
        'primary-black': primaryBlack,
        'primary-white': primaryWhite,
        'straw-berry': strawBerry,
      },
    },
  },
  plugins: [],
};
