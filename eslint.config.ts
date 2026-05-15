import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import nextConfig from 'eslint-config-next';

export default tseslint.config(
  { ignores: ['.next/**', 'node_modules/**'] },

  js.configs.recommended,
  ...nextConfig,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    extends: [
      ...tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      perfectionist.configs['recommended-natural'],
    ],
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
      'react/jsx-props-no-spreading': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'prettier/prettier': 'error',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'off',
      'react/no-unused-prop-types': 'off',
      'react/require-default-props': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },

  eslintConfigPrettier,
);
