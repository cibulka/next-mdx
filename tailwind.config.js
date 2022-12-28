const plugin = require('tailwindcss/plugin')

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
      });

    })
  ],
};

module.exports = result;
