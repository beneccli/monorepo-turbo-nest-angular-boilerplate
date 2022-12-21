module.exports = {
  mode: 'jit',
  // darkMode: 'class',
  darkMode: 'media',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0f5f5',
          100: '#d5f5f6',
          200: '#afecef',
          300: '#7edce2',
          400: '#16bdca',
          500: '#0694a2',
          600: '#047481',
          700: '#036672',
          800: '#05505c',
          900: '#014451',
        },
      },
      boxShadow: {
        border: 'inset 0 -2px 0 0 rgba(0, 0, 0, 0.06)',
        light: 'rgba(0, 0, 0, 0.08) 0px 1px 12px',
        'border-teal': '0 0 0 4px rgb(175, 236, 239)',
      },
      padding: {
        '2/3': '66.666667%',
        '9/16': '56.25%',
        full: '100%',
      },
      margin: {
        '1/2': '50%',
      },
      scale: {
        0: '0',
        full: '1',
      },
      transitionDuration: {
        0: '0ms',
        2000: '2000ms',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['responsive', 'hover', 'last'],
      borderColor: [
        'responsive',
        'hover',
        'focus',
        'active',
        'group-hover',
        'focus-within',
      ],
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      opacity: ['responsive', 'hover', 'focus', 'group-hover'],
      backgroundColor: [
        'responsive',
        'hover',
        'focus',
        'active',
        'group-hover',
      ],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      zIndex: [
        'responsive',
        'hover',
        'focus',
        'active',
        'group-hover',
        'focus-within',
      ],
      boxShadow: [
        'responsive',
        'hover',
        'focus',
        'active',
        'group-hover',
        'focus-within',
      ],
      outline: [
        'responsive',
        'hover',
        'focus',
        'active',
        'group-hover',
        'focus-within',
      ],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
