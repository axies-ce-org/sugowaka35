import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: '/sugowaka35',
  outDir: './static',
  build: {
    assets: 'assets'
  },
  integrations: [tailwind()]
});