import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import relativeLinks from 'astro-relative-links';
import postbuildIntegration from './src/integrations/postbuild';

// https://astro.build/config
export default defineConfig({
  outDir: './static',
  server: {
    port: 3000,
  },
  site: 'https://copyright-edu.axies.jp/sugowaka35',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    relativeLinks(),
    postbuildIntegration(),
  ],
});
