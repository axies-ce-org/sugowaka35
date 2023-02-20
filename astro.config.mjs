import { defineConfig } from 'astro/config';
import { config } from './package.json';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  outDir: './static',
  site: 'https://copyright-edu.axies.jp/sugowaka35',
  build: {
    assets: 'assets',
  },
  integrations: [tailwind()],
});
