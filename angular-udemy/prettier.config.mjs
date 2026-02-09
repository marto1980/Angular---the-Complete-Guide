/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '<THIRD_PARTY_MODULES>', // Third-party modules
    '^@core/(.*)$', // Core imports
    '^@server/(.*)$', // Server imports
    '^@ui/(.*)$', // UI imports
    '^@/(.*)$', // Local imports starting with @/
    String.raw`^[./](?!.*\.(css|scss)$)`, // Local imports excluding CSS/SCSS
    String.raw`^\./globals\.css$`, // Specific global CSS file
    String.raw`\.(css|scss)$`, // All other CSS/SCSS files
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
}

export default config
