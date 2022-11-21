/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        'coffee-text': '#171313',
        'coffee-bean-deep' : '#413333',
        'coffee-bean-brown' : '#9B4C38',
        'coffee-bean-lightbrown': '#F4E0CB'
      },
      fontFamily: {
        'inter': [ 'Inter', 'sans-serif'],
        'merriweather': [ 'Merriweather', 'serif' ],
        'poppins': [ 'Poppins', 'sans-serif' ],
        'six-caps': [ 'Six Caps', 'sans-serif' ]
      }
    },
  },
  plugins: [],
}
