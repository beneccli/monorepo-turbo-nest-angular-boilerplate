module.exports = {
  root: true,
  // parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'tailwindcss'],
  extends: [
    'plugin:tailwindcss/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['.eslintrc.js', 'karma.conf.js', 'tailwind.config.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true
      }
    ],
    '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'tailwindcss/no-custom-classname': 'off', // Disabled otherwise nightmare to allow each custom tailwind classes
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  },
  settings: {
    tailwindcss: {
      // 'callees': ['classnames', 'clsx', 'ctl'],
      groupByResponsive: true,
      officialSorting: true,
      // prependCustom: false,
      removeDuplicates: true
    }
  }
}
