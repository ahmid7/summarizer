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
        'six-caps': [ 'SixCaps', 'sans-serif' ]
      },
      keyframes: {
        arrowBounceLeft: {
          '0%, 100%': {
            transform: 'translate(0px)'
          },
          '50%': {
            transform: 'translate(5px)'
          }
        },
        arrowBounceRight: {
          '0%, 100%': {
            transform: 'translate(0px)'
          },
          '50%': {
            transform: 'translate(-5px)'
          }
        },
        marqueeText: {
          '0%': {
            transform:'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        }
      },
      animation: {
        'bounceLeft': 'arrowBounceLeft 1.1s infinite ease-in-out',
        'bounceRight': 'arrowBounceRight 1.1s infinite ease-in-out',
        'textMarque': 'marqueeText 20s linear infinite'
      }
    },
  },
  plugins: [],
}
