/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      sans: 'Noto Sans TC, sans-serif',
    },
    extend: {
      fontSize: {
        h1: [
          '2rem',
          {
            lineHeight: '3rem',
            fontWeight: '700',
          },
        ],
        h2: [
          '1.5rem',
          {
            lineHeight: '2rem',
            fontWeight: '700',
          },
        ],
        h3: [
          '1.125rem',
          {
            lineHeight: '1.625rem',
            fontWeight: '700',
          },
        ],
        h4: [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '700',
          },
        ],
        h5: [
          '0.875rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '700',
          },
        ],
        h6: [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '700',
          },
        ],
        p: [
          '0.875rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '400',
          },
        ],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        brand: '#0B7D77',
        brandHover: '#096561',
        primarySelected: '#CEE5E4',
        negative: '#D83A52',
        positive: '#0B8652',
        general: '#0073EA',
        dark: '#323338',
        darkGrey: '#676879',
        grey: '#C5C7D0',
        uiGrey: '#E6E9EF',
        lightGrey: '#F5F6F8',
        white: '#FFFFFF',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};