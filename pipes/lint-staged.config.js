export default {
  '*.{ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
  '*.scss': ['stylelint --fix', 'prettier --write'],
};
