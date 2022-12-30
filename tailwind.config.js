const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

/* Result */
const result = {
  darkMode: 'class', // or 'media',
  content: [
    './src/**/*.tsx', 
    './src/**/*.ts', 
  ],
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.top-full': {
          top: '100%',
        },
        '.max-w-screen-2\\/3': {
          'max-width': '33vw',
        },
        '.aspect-ratio-1x1': {
          'padding-bottom': '100%',
        }
      });
    })
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[600],
      }
    }
  },
};

module.exports = result;
