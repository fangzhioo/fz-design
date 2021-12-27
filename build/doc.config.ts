import baseConfig from './base.config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...baseConfig,
  base: '/fz-ui',
  build: {
    outDir: 'docs',
  },
});
