/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        weather: {
          sunny: '#f59e0b',
          cloudy: '#6b7280',
          rainy: '#3b82f6',
          stormy: '#4b5563',
          snowy: '#e5e7eb',
        },
      },
      backgroundImage: {
        'gradient-sunny': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
        'gradient-night': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      },
    },
  },
  plugins: [],
}