/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode support
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      },
      animation: {
        blob: 'blob 20s infinite ease-in-out',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -50px) scale(1.1)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      colors: {
        'glass-dark': 'rgba(17, 17, 17, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 123, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
