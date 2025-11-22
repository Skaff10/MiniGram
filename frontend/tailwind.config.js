/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        loadingcolor: '#faf9f6',
        primary: '#10b981',
        'primary-dark': '#059669',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        'gradient-start': '#6366f1',
        'gradient-end': '#8b5cf6',
      },
      screens: {
        mybrk: '90rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}
