// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});