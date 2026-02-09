import eslint from '@eslint/js'
import angularEslint from 'angular-eslint'
import arrayFunc from 'eslint-plugin-array-func'
import functional from 'eslint-plugin-functional'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import promise from 'eslint-plugin-promise'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Global ignores (applies to all config blocks)
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
        tsconfigRootDir: new URL('.', import.meta.url).pathname, // Ensure type information is created
      },
    },
    // Set the custom processor which will allow us to have our inline Component templates extracted
    // and treated as if they are HTML files (and therefore have the .html config below applied to them)
    processor: angularEslint.processInlineTemplates,
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
    },
    extends: [
      eslint.configs.recommended, // Apply the recommended eslint core rules
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      functional.configs.externalTypeScriptRecommended,
      functional.configs.recommended,
      functional.configs.stylistic,
      arrayFunc.configs.recommended,
      prettierRecommended,
      sonarjs.configs.recommended,
      security.configs.recommended,
      promise.configs['flat/recommended'],
      unicorn.configs['recommended'],
      ...angularEslint.configs.tsRecommended, // Apply the recommended Angular rules for TypeScript
    ],
    rules: {
      // ESLint rules
      'newline-before-return': 'warn',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['attribute', 'element'],
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

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
    // Everything in this config object targets our HTML files (external templates,
    // and inline templates as long as we have the `processor` set on our TypeScript config above)
    files: ['**/*.html'],
    extends: [
      // Apply the recommended Angular template rules
      ...angularEslint.configs.templateRecommended,
      // Apply the Angular template rules which focus on accessibility of our apps
      ...angularEslint.configs.templateAccessibility,
      prettierRecommended, // here we inherit from the recommended setup from eslint-plugin-prettier for HTML
    ],
    rules: {},
  },
)
