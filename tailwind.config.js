/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-green': {
          DEFAULT: '#63A46C',
          '50': '#EFF6F0',
          '100': '#DAE9DD',
          '200': '#B7D4BC',
          '300': '#94BF9A',
          '400': '#79B080',
          '500': '#63A46C',
          '600': '#4F8356',
          '700': '#3B6241',
          '800': '#28422C',
          '900': '#142116'
        },
      },
    },
  },
  plugins: [],
};