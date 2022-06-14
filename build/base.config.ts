import { resolve } from 'path';
import { defineConfig } from 'vite';

// 文档: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@fzui': resolve(__dirname, '../packages'),
      'fz-ui': resolve(__dirname, '../packages'),
    },
  },
});
