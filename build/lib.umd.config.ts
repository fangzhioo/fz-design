import baseConfig from './base.config';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import css from 'rollup-plugin-css-only';
import vuePlugin from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import banner from 'vite-plugin-banner';
import { resolve } from 'path';
import pkg from '../package.json';

const fileBanner = banner(
  `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author.email}\n * homepage: ${pkg.homepage}\n */`,
);

export default defineConfig({
  ...baseConfig,
  plugins: [
    css(),
    vuePlugin({
      target: 'browser',
    }),
    dts(),
    esbuild({
      sourceMap: true,
      target: 'es2018',
    }),
    fileBanner,
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
        format: 'cjs',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
