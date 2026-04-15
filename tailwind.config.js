/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0a0a0a',
        'matte-gold': '#d4a574',
        'soft-white': '#f8f8f8',
        'solar-glow': '#f4e4c1',
      },
      fontFamily: {
        'minimal': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'glow': 'glow 3s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'parallax': 'parallax 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        parallax: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-100px)' },
        },
      },
      backdropBlur: {
        'solar': '20px',
      },
    },
  },
  plugins: [],
}
