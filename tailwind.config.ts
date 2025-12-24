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
        apple: {
          blue: '#007AFF',
          gray: {
            50: '#F5F5F7',
            100: '#E8E8ED',
            200: '#D2D2D7',
            300: '#C7C7CC',
            400: '#AEAEB2',
            500: '#8E8E93',
            600: '#636366',
            700: '#48484A',
            800: '#3A3A3C',
            900: '#1C1C1E',
          },
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
export default config

