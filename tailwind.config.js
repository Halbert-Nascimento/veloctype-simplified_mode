/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#3b82f6',
        background: '#f8fafc',
        text: '#1e293b',
        // Cores adicionais baseadas no projeto atual
        'light-bg': '#f8fafc',
        'light-text': '#1e293b',
        'dark-bg': '#0d1724',
        'dark-surface': '#162032',
        'dark-border': '#1e293b',
        'light-border': '#cbd5e1',
        'light-surface': '#e0e7ef',
        'cyan-primary': '#0891b2',
        'cyan-hover': '#0e7490',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 0.4s linear',
      },
    },
  },
  plugins: [],
}