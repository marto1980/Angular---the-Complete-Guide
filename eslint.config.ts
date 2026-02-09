import eslint from '@eslint/js'
import arrayFunc from 'eslint-plugin-array-func'
import functional from 'eslint-plugin-functional'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import prettier from 'eslint-plugin-prettier/recommended'
import promise from 'eslint-plugin-promise'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  functional.configs.externalTypeScriptRecommended,
  functional.configs.recommended,
  functional.configs.stylistic,
  arrayFunc.configs.recommended,
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettier,
  sonarjs.configs.recommended,
  security.configs.recommended,
  promise.configs['flat/recommended'],
  unicorn.configs['recommended'],
  {
    ignores: [
      'node_modules/**', // Ignore node_modules
      'dist/**', // Ignore distribution files
      'build/**', // Ignore build output
      'public/**', // Ignore public assets
      '**/*.min.js', // Ignore minified JS files
      '**/coverage/**', // Ignore coverage reports
      '.eslintcache', // Ignore ESLint cache file
      'eslint.config.ts',
      '*.mjs',
      '.angular/cache/**',
      'lint-staged.config.js',
    ],
  },
  {
    files: ['**/*.{ts,d.ts}'], // Target TypeScript files
    languageOptions: {
      parser: tseslint.parser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname, // Ensure type information is created
      },
    },
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
    },
    rules: {
      // ESLint rules
      'newline-before-return': 'warn',

      // Prettier formatting
      'prettier/prettier': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/prefer-readonly': 'warn', // Enforce immutability where possible
      '@typescript-eslint/no-floating-promises': 'error', // Ensure unhandled promises are caught
      '@typescript-eslint/no-extraneous-class': 'off',

      // Unicorn rules
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-top-level-await': 'off',

      // Functional rules
      'functional/no-return-void': 'off', // Allow void return types
      'functional/functional-parameters': 'off',
      'functional/no-mixed-types': 'off',
      'functional/no-conditional-statements': 'off',
      'functional/no-expression-statements': 'off',
      'functional/no-classes': 'off',

      // SonarJS rules
      'sonarjs/todo-tag': 'warn',

      // Prefer arrow functions
      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],
      // arrayFunc rules
      'array-func/prefer-array-from': 'off',

      // functional rules
      'functional/immutable-data': [
        'error',
        {
          ignoreClasses: true,
        },
      ],
    },
  },
  {
    files: ['**/*.component.ts', '**/*.service.ts', '**/*.directive.ts'], // Angular-specific files
    rules: {
      'functional/no-classes': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,ts}'], // Match test files
    languageOptions: {
      parser: tseslint.parser, // Use TypeScript parser for test files
    },
    rules: {
      // Jest-specific rules
      'jest/no-disabled-tests': 'warn', // Override specific rules
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',

      // Disable all rules from eslint-plugin-functional
      ...Object.fromEntries(
        Object.keys(functional.configs.off.rules ?? {}).map((rule) => [
          rule,
          'off',
        ]),
      ),
      // Add padding line rule for function calls
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: '*', next: 'expression' },
      ],
    },
    settings: {
      jest: {
        version: 'detect', // Automatically detect Jest version
      },
      'testing-library/utils-module': ['**/__test-utils__'],
    },
  },
)
