import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    colors: {
      primary: {
        '100': 'hsl(var(--colors-primary-blue-blue-lighter) / <alpha-value>)',
        '200': 'hsl(var(--colors-primary-blue-blue-light) / <alpha-value>)',
        DEFAULT: 'hsl(var(--colors-primary-blue-blue-default) / <alpha-value>)',
        '400': 'hsl(var(--colors-primary-blue-blue-dark) / <alpha-value>)',
        '500': 'hsl(var(--colors-primary-blue-blue-darker) / <alpha-value>)',
      },

      secondary: {
        white:
          'hsl(var(--colors-secondary-white-white-default) / <alpha-value>)',
        '100': 'hsl(var(--colors-secondary-gray-gray-lighter) / <alpha-value>)',
        '200': 'hsl(var(--colors-secondary-gray-gray-light) / <alpha-value>)',
        DEFAULT:
          'hsl(var(--colors-secondary-gray-gray-default) / <alpha-value>)',
        '400': 'hsl(var(--colors-secondary-gray-gray-dark) / <alpha-value>)',
        '500': 'hsl(var(--colors-secondary-gray-gray-darker) / <alpha-value>)',
        black:
          'hsl(var(--colors-secondary-black-black-default) / <alpha-value>)',
      },

      danger: {
        '100': 'hsl(var(--colors-accent-red-red-lighter) / <alpha-value>)',
        '200': 'hsl(var(--colors-accent-red-red-light) / <alpha-value>)',
        DEFAULT: 'hsl(var(--colors-accent-red-red-default) / <alpha-value>)',
        '400': 'hsl(var(--colors-accent-red-red-dark) / <alpha-value>)',
        '500': 'hsl(var(--colors-accent-red-red-darker) / <alpha-value>)',
      },
      success: {
        '100': 'hsl(var(--colors-accent-green-green-lighter) / <alpha-value>)',
        '200': 'hsl(var(--colors-accent-green-green-light) / <alpha-value>)',
        DEFAULT:
          'hsl(var(--colors-accent-green-green-default) / <alpha-value>)',
        '400': 'hsl(var(--colors-accent-green-green-dark) / <alpha-value>)',
        '500': 'hsl(var(--colors-accent-green-green-darker) / <alpha-value>)',
      },

      warning: {
        '100':
          'hsl(var(--colors-accent-yellow-yellow-lighter) / <alpha-value>)',
        '200': 'hsl(var(--colors-accent-yellow-yellow-light) / <alpha-value>)',
        DEFAULT:
          'hsl(var(--colors-accent-yellow-yellow-default) / <alpha-value>)',
        '400': 'hsl(var(--colors-accent-yellow-yellow-dark) / <alpha-value>)',
        '500': 'hsl(var(--colors-accent-yellow-yellow-darker) / <alpha-value>)',
      },
    },

    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      h4: '1.25rem',
      h3: '1.44rem',
      h2: '1.73rem',
      h1: '2.07rem',
    },

    screens: {
      sm: '768px',
      md: '1040px',
      lg: '1366px',
    },

    borderRadius: {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    },

    boxShadow: {
      sm: '0 4px 12px 0 rgba(10, 69, 87, 0.05)',
      md: '0 8px 24px 0 rgba(10, 69, 87, 0.05)',
      lg: '0 16px 48px 0 rgba(10, 69, 87, 0.05)',
    },

    extend: {
      animation: {
        sideways: ' 3s linear infinite',
      },
      keyframes: {
        sideways: {
          '0%, 100%': { left: '0', top: '0' },
          '50%': { left: '100px', top: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
}
export default config
