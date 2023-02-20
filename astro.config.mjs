import { defineConfig } from 'astro/config';
import { config } from './package.jsoon';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  ...config,
  build: {
    assets: 'assets',
  },
  integrations: [tailwind()],
});
