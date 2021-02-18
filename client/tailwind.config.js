module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      450: '450px',
      430: '430px',
      48: '12rem',
    },
    extend: {
      container: false,
      gridTemplateColumns: {
        '2-form': '10rem auto',
      },
      width: {
        '4/12-4': 'calc(33.333% - 1rem)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      scale: ['active'],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': { maxWidth: '640px' },
          '@screen md': { maxWidth: '768px' },
          '@screen lg': { maxWidth: '975px' },
        },
        'w-right': {
          '@screen sm': { maxWidth: 'calc(640px * 4/12  - 1rem)' },
          '@screen md': { maxWidth: 'calc(768px * 4/12  - 1rem)' },
          '@screen lg': { maxWidth: 'calc(975px * 4/12  - 1rem)' },
        },
      });
    },
  ],
};
