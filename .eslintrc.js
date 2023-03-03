module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['plugin:astro/recommended', 'plugin:tailwindcss/recommended'],
  plugins: ['tailwindcss'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
};
