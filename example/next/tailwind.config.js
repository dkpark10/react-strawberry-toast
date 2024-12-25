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
      colors: {
        'primary-black': primaryBlack,
        'primary-white': primaryWhite,
        'straw-berry': strawBerry,
      },
    },
  },
  plugins: [],
};
