import js from '@eslint/js';
import nextConfig from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['.next/**', 'node_modules/**'] },

  js.configs.recommended,
  ...nextConfig,

  {
    extends: [
      ...tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      perfectionist.configs['recommended-natural'],
    ],
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'off',
      'prettier/prettier': 'error',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unused-prop-types': 'off',
      'react/require-default-props': 'off',
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
  },

  eslintConfigPrettier,
);
