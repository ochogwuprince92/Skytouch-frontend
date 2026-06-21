/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C81',
          50: '#E6F0F9',
          100: '#CCE0F2',
          200: '#99C2E6',
          300: '#66A3D9',
          400: '#3385CD',
          500: '#0F4C81',
          600: '#0C3D67',
          700: '#092E4D',
          800: '#061E34',
          900: '#030F1A',
        },
        secondary: {
          DEFAULT: '#4A90E2',
          50: '#EBF3FC',
          100: '#D6E7F9',
          200: '#ADCEF3',
          300: '#85B6EC',
          400: '#5C9DE6',
          500: '#4A90E2',
          600: '#2175D5',
          700: '#195AA4',
          800: '#113E72',
          900: '#081F39',
        },
        success: '#00C48C',
        warning: '#F5A623',
        danger: '#FF4D4F',
        background: '#F8FAFC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 76, 129, 0.05)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}