module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: ['airbnb', 'prettier'],
  ignorePatterns: ['dist', 'eslintrc.cjs'],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {react: {version: '18.2'}},
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'off',
    'prettier/prettier': ['error'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'import/extensions': 'off'
  }

}
