module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          50: '#97ACED',
          100: '#869DEA',
          200: '#6381E4',
          300: '#4065DE',
          400: '#244DD2',
          500: '#1E40AF',
          600: '#162E7F',
          700: '#0E1D4F',
          800: '#050B1F',
          900: '#000000',
          950: '#000000'
        },
        secondary: '#F59E0B'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  }
}
