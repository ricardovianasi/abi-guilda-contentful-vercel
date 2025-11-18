module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // General
    'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    'prefer-const': 'warn',
    'no-var': 'error',

    // React/Next.js
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
