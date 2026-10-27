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
        canvas: {
          DEFAULT: '#08090C',
          subtle: '#0D0F14',
          panel: '#12151D',
          elevated: '#181C26',
        },
        accent: {
          lime: '#CCFF00',       // Signature Electric Lime
          'lime-glow': 'rgba(204, 255, 0, 0.25)',
          cyan: '#00F0FF',       // Precision Telemetry Cyan
          emerald: '#10B981',    // Verification Green
          purple: '#8A2BE2',     // Deep Violet
        },
        surface: {
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(204, 255, 0, 0.35)',
          hairline: 'rgba(255, 255, 255, 0.05)',
        },
        editorial: {
          primary: '#F4F5F8',
          secondary: '#9EACB9',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
        mega: '0.28em',
      },
      animation: {
        'marquee-slow': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
