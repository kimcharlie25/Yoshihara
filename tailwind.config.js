/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f9',
          100: '#dfe9f3',
          200: '#bed3e7',
          300: '#8cb2d3',
          400: '#538ab8',
          500: '#316a9a',
          600: '#235481',
          700: '#1d4469',
          800: '#143354',
          900: '#092950',
          950: '#051428'
        },
        accent: {
          50: '#fdf9e9',
          100: '#f9f0c6',
          200: '#f3e18c',
          300: '#ebcc52',
          400: '#e4b628',
          500: '#d4af37', // Gold
          600: '#b48d2a',
          700: '#916b24',
          800: '#775822',
          900: '#654b20',
          950: '#3a2a10'
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        }
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'funnel': ['"Funnel Sans"', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};