module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        negative: -1
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
