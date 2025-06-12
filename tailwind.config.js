/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Acumin Pro', 'sans-serif'],
      },
      fontSize: {
        h1: [
          '96px',
          {
            lineHeight: '144px',
            fontWeight: '700',
          },
        ],
        h2: [
          '60px',
          {
            lineHeight: '90px',
            fontWeight: '700',
          },
        ],
        h3: [
          '48px',
          {
            lineHeight: '72px',
            fontWeight: '700',
          },
        ],
        h4: [
          '32px',
          {
            lineHeight: '48px',
            fontWeight: '700',
          },
        ],
        h5: [
          '24px',
          {
            lineHeight: '36px',
            fontWeight: '400',
          },
        ],
        h6: [
          '20px',
          {
            lineHeight: '30px',
            fontWeight: '400',
          },
        ],
        subtitle1: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '700',
          },
        ],
        subtitle2: [
          '14px',
          {
            lineHeight: '24px',
            fontWeight: '700',
          },
        ],
        body1: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '400',
          },
        ],
        body2: [
          '14px',
          {
            lineHeight: '21px',
            fontWeight: '400',
          },
        ],
        button1: [
          '16px',
          {
            lineHeight: '26px',
            fontWeight: '400',
          },
        ],
        button2: [
          '14px',
          {
            lineHeight: '21px',
            fontWeight: '400',
          },
        ],
        caption: [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '400',
          },
        ],
        overline: [
          '10px',
          {
            lineHeight: '16px',
            fontWeight: '400',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          },
        ],
      },
      colors: {},
    },
  },
  plugins: [require('tailwindcss-animate')],
};
