import baseConfig from './base.config';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import markdown from 'vite-plugin-md';

export default defineConfig({
  ...baseConfig,
  base: '/fz-ui/',
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    markdown(),
  ],
});
