module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['airbnb', 'prettier'],
  ignorePatterns: ['dist', 'eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'off',
    'prettier/prettier': ['error'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],
  },
}
