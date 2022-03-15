module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'rules': {
    'max-len': [
      'error',
      {
        code: 100,
        comments: 120,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
  },
};
