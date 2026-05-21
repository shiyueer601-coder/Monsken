/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Starry Moonlight Colors (星空概念)
        'moonlight-deep': '#0f172a',
        'moonlight-soft': '#1e293b',
        'jade-white': '#cbd5e1',
        'nordic-fog': '#94a3b8',
        // Soft Morandi Colors
        'morandi-green': '#7fb37f',
        'morandi-blue': '#7f9fb3',
        'morandi-purple': '#9f7fb3',
        'starry-black': '#000000',
        'starry-deep': '#050505',
        'starry-mid': '#0f0f0f',
        'starry-light': '#1a1a1a',
        'moon-white': '#ffffff',
        'moon-soft': '#f5f5f5',
        'moon-mist': '#e5e5e5',
        'moon-glow': '#c0c0c0',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', 'Menlo', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}
