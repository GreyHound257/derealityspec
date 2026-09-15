import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        brand: {
          primary: '#0F172A', // Deep Blue
        },
        action: {
          urgent: '#EF4444', // Red
        },
        map: {
          available: 'rgba(34, 197, 94, 0.5)', // Translucent Green
          reserved: 'rgba(234, 179, 8, 0.5)', // Translucent Yellow
          sold: 'rgba(239, 68, 68, 0.5)', // Translucent Red
        },
      },
      fontFamily: {
        serif: ['var(--font-editorial-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-clean-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
