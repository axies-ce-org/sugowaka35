/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      lineHeight: {
        relaxed: 1.75,
      },
      fontFamily: {
        noto: ['"Noto Sans JP"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        3.25: '0.8125rem' /* 13px */,
        3.75: '0.9375rem' /* 15px */,
      },
    },
  },
  plugins: [],
};
