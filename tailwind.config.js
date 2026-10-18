/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F4EE',
        surface: '#FFFFFF',
        subtle: '#ECE9DF',
        hairline: '#DFDCD0',
        obsidian: '#0A2118',
        forest: '#113325',
        jade: '#10B981',
        gold: '#D97706',
        slate: '#475569',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        devanagari: ['Noto Sans Devanagari', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
