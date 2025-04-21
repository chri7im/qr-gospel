import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

.scroll-snap-y { scroll-snap-type: y mandatory; }
.scroll-snap-align-center > * { scroll-snap-align: center; }
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; /* IE and Edge */ scrollbar-width: none; /* Firefox */ }