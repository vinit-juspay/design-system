/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Display', 'sans-serif'],
      },
      /**
       * Colors
       * Usage:
       * Background: bg-{color}-{shade} (e.g., bg-gray-100, bg-primary-500)
       * Text: text-{color}-{shade} (e.g., text-gray-900, text-primary-600)
       * Border: border-{color}-{shade} (e.g., border-gray-200)
       * Ring/Focus: ring-{color}-{shade} (e.g., ring-primary-500)
       * Divide: divide-{color}-{shade} (e.g., divide-gray-200)
       */
      colors: {
        // Gray scale colors from Figma
        gray: {
          0: '#FFFFFF',
          25: '#FCFCFD',
          50: '#F5F7FA',
          100: '#F2F4F8',
          150: '#ECEFF3',
          200: '#E1E4EA',
          300: '#CACFD8',
          400: '#99A0AE',
          500: '#717784',
          600: '#525866',
          700: '#2B303B',
          800: '#222530',
          900: '#181B25',
          950: '#0E121B',
          1000: '#050506',
        },
        // Primary blue colors
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BEDBFF',
          300: '#8EC5FF',
          400: '#51A2FF',
          500: '#2B7FFF',
          600: '#0561E2',
          700: '#1447E6',
          800: '#193CB8',
          900: '#1C398E',
          950: '#162456',
        },
        // Purple colors
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D4FF',
          300: '#DAB2FF',
          400: '#C27AFF',
          500: '#AD46FF',
          600: '#9810FA',
          700: '#8200DB',
          800: '#6E11B0',
          900: '#59168B',
          950: '#3C0366',
        },
        // Orange colors
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD4',
          200: '#FFD6A8',
          300: '#FFB86A',
          400: '#FF8904',
          500: '#FF6900',
          600: '#F54A00',
          700: '#CA3500',
          800: '#9F2D00',
          900: '#7E2A0C',
          950: '#441306',
        },
        // Red colors
        red: {
          50: '#FEF2F2',
          100: '#FFE2E2',
          200: '#FFC9C9',
          300: '#FFA2A2',
          400: '#FF6467',
          500: '#FB2C36',
          600: '#E7000B',
          700: '#C10007',
          800: '#9F0712',
          900: '#82181A',
          950: '#460809',
        },
        // Green colors
        green: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#B9F8CF',
          300: '#7BF1A8',
          400: '#00D492',
          500: '#00C951',
          600: '#00A63E',
          700: '#008236',
          800: '#016630',
          900: '#0D542B',
          950: '#052E16',
        },
        // Yellow colors
        yellow: {
          50: '#FEFCE8',
          100: '#FEF9C2',
          200: '#FFF085',
          300: '#FFDF20',
          400: '#FCC800',
          500: '#EFB100',
          600: '#D08700',
          700: '#A65F00',
          800: '#894B00',
          900: '#733E0A',
          950: '#432004',
        },
      },

      /**
       * Font Sizes with Line Heights
       * Usage:
       * Display: text-display-{size} (e.g., text-display-xl, text-display-md)
       * Heading: text-{size} (e.g., text-2xl, text-lg)
       * Body: text-body-{size} (e.g., text-body-lg, text-body-sm)
       * Code: text-code-{size} (e.g., text-code-md)
       *
       * Each size comes with its default line height.
       * To override line height: leading-{size} (e.g., leading-normal)
       */
      fontSize: {
        // Display sizes
        'display-xl': ['72px', { lineHeight: '88px' }], // text-display-xl
        'display-lg': ['64px', { lineHeight: '80px' }], // text-display-lg
        'display-md': ['56px', { lineHeight: '72px' }], // text-display-md
        'display-sm': ['48px', { lineHeight: '64px' }], // text-display-sm
        // Heading sizes
        '2xl': ['40px', { lineHeight: '56px' }], // text-2xl
        xl: ['32px', { lineHeight: '48px' }], // text-xl
        lg: ['24px', { lineHeight: '40px' }], // text-lg
        md: ['20px', { lineHeight: '32px' }], // text-md
        sm: ['18px', { lineHeight: '28px' }], // text-sm
        // Body sizes
        'body-lg': ['16px', { lineHeight: '24px' }], // text-body-lg
        'body-md': ['14px', { lineHeight: '20px' }], // text-body-md
        'body-sm': ['12px', { lineHeight: '18px' }], // text-body-sm
        'body-xs': ['10px', { lineHeight: '14px' }], // text-body-xs
        // Code sizes
        'code-lg': ['14px', { lineHeight: '20px' }], // text-code-lg
        'code-md': ['12px', { lineHeight: '18px' }], // text-code-md
        'code-sm': ['10px', { lineHeight: '16px' }], // text-code-sm
      },

      /**
       * Font Weights
       * Usage:
       * font-{weight} (e.g., font-normal, font-medium, font-bold)
       * Numeric values: font-{100-900} (e.g., font-500)
       */
      fontWeight: {
        100: '100', // font-100 (Thin)
        200: '200', // font-200 (Extra Light)
        300: '300', // font-300 (Light)
        400: '400', // font-400 (Regular)
        500: '500', // font-500 (Medium)
        600: '600', // font-600 (Semi Bold)
        700: '700', // font-700 (Bold)
        800: '800', // font-800 (Extra Bold)
        900: '900', // font-900 (Black)
      },

      /**
       * Line Heights
       * Usage:
       * leading-{size} (e.g., leading-24, leading-normal)
       * Can be used to override default line heights from fontSize
       */
      lineHeight: {
        0: '0', // leading-0
        14: '14px', // leading-14
        16: '16px', // leading-16
        18: '18px', // leading-18
        20: '20px', // leading-20
        22: '22px', // leading-22
        24: '24px', // leading-24
        26: '26px', // leading-26
        32: '32px', // leading-32
        38: '38px', // leading-38
        42: '42px', // leading-42
        46: '46px', // leading-46
        48: '48px', // leading-48
        56: '56px', // leading-56
        64: '64px', // leading-64
        70: '70px', // leading-70
      },

      /**
       * Letter Spacing
       * Usage:
       * tracking-{variant} (e.g., tracking-normal, tracking-expanded)
       * Used to adjust space between letters
       */
      letterSpacing: {
        compressed: '-2px', // tracking-compressed
        condensed: '-1px', // tracking-condensed
        normal: '0px', // tracking-normal
        expanded: '1px', // tracking-expanded
        extended: '2px', // tracking-extended
      },

      /**
       * Box Shadows
       * Usage:
       * shadow-{size} (e.g., shadow-sm, shadow-lg)
       *
       * Properties for each shadow:
       * x: offset-x
       * y: offset-y
       * blur: blur radius
       * spread: spread radius
       * color: shadow color with alpha
       */
      boxShadow: {
        xs: '0px 1px 1px 0px rgba(5, 5, 6, 0.04)',
        sm: '0px 2px 3px 0px rgba(5, 5, 6, 0.05)',
        md: '0px 2px 8px 1px rgba(5, 5, 6, 0.07)',
        lg: '0px 3px 16px 3px rgba(5, 5, 6, 0.07)',
        xl: '0px 10px 20px 3px rgba(5, 5, 6, 0.07)',
        '2xl': '0px 12px 24px 4px rgba(5, 5, 6, 0.07)',
        full: '0px 24px 48px 8px rgba(5, 5, 6, 0.07)',
      },

      /**
       * Border Radius
       * Usage:
       * rounded-{size} (e.g., rounded-sm, rounded-lg)
       * rounded-{t|r|b|l}-{size} for individual corners
       * rounded-{tl|tr|br|bl}-{size} for specific corners
       */
      borderRadius: {
        xs: '2px', // rounded-xs
        sm: '4px', // rounded-sm
        md: '6px', // rounded-md
        lg: '8px', // rounded-lg
        xl: '10px', // rounded-xl
        '2xl': '12px', // rounded-2xl
        full: '9999px', // rounded-full
      },

      /**
       * Animations for UI components
       * Usage:
       * animate-{name} (e.g., animate-fade-in, animate-slide-in-from-top)
       */
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-10px)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(10px)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(10px)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-10px)' },
          to: { transform: 'translateX(0)' },
        },
        'zoom-in': {
          from: { transform: 'scale(0.95)' },
          to: { transform: 'scale(1)' },
        },
        'zoom-out': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0.95)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-out': 'fade-out 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-from-top': 'slide-in-from-top 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-from-right': 'slide-in-from-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-from-bottom': 'slide-in-from-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-from-left': 'slide-in-from-left 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'zoom-in': 'zoom-in 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'zoom-out': 'zoom-out 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
