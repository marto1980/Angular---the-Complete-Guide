import type { Config } from 'stylelint'

const config: Config = {
  extends: ['stylelint-config-standard-scss'],
  plugins: [],
  rules: {
    // SCSS compatibility
    'at-rule-no-unknown': undefined,
    'scss/at-rule-no-unknown': true,

    // Reasonable defaults
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'unit-no-unknown': true,
    'color-function-notation': undefined,
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.js',
    '**/*.ts',
    '**/*.html',
  ],
}

export default config
