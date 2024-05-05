// Pliko konfiguracyjny dla eslinta

module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'auto',
      },
    ],
  },
};
