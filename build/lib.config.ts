import baseConfig from './base.config';
import { defineConfig } from 'vite';
import vuePlugin from 'rollup-plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  ...baseConfig,
  plugins: [
    vuePlugin({
      target: 'browser',
    }),
  ],
  build: {
    minify: false,
    emptyOutDir: false,
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, '../packages/index.ts'),
      name: 'FzUI',
      fileName: (format) => `fzui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        format: 'es',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
