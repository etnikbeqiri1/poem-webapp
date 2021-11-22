module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,mjs}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#C5CAE9',
      'secondary': '#9FA8DA',
      'trenary': '#c9cfe8',
      'danger': '#C2185B',
    }),
        variants: {
      extend: {},
    },
    container: {
      center: true
    },
  },
  plugins: [],
}
