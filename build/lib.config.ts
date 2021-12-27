import baseConfig from './base.config';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

const { plugins } = baseConfig as any;

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, '../packages/index.ts'),
      name: 'FzUI',
      fileName: (format) => `fzui.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [...plugins, dts()],
});
