module.exports = {
  root: true,
  settings: {
    tailwindcss: {
      callees: ['twMerge', 'twJoin'],
      classRegex: '^(active)?[cC]lass(Name)?$',
      whitelist: ['js-.+', 'modal__.+'],
    },
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:tailwindcss/recommended', 'plugin:astro/recommended'],
  plugins: ['@typescript-eslint', 'tailwindcss'],
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
