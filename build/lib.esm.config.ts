import baseConfig from './base.config';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import css from 'rollup-plugin-css-only';
import vuePlugin from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import banner from 'vite-plugin-banner';
import path from 'path';
import fs from 'fs';
import pkg from '../package.json';

const fileBanner = banner(
  `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author.email}\n * homepage: ${pkg.homepage}\n */`,
);

const entry = {};

// const externals = {
//   vue: 'vue',
// };

function recursionDir(filePath, entryPath, oldAlias, NewAlias) {
  // console.log('=============> ', filePath, entryPath, oldAlias, NewAlias);

  const files = fs.readdirSync(path.resolve(filePath));
  files.forEach((filename) => {
    const name = filename.split('.')[0];
    const ext = filename.split('.')[1];
    const fullPath = path.join(filePath, filename);
    const namePath = `${entryPath}${entryPath ? '/' : ''}${name}`;
    const stats = fs.statSync(fullPath);

    const isFile = stats.isFile(); // 是文件
    const isDir = stats.isDirectory(); // 是文件夹
    const nowOldAlias = `${oldAlias}/${name}`;
    const nowNewAlias = `${NewAlias}/${name}`;
    if (isFile) {
      if (['ts', 'js', 'vue'].includes(ext)) {
        entry[namePath] = fullPath;
      }
    }
    if (isDir) {
      recursionDir(fullPath, namePath, nowOldAlias, nowNewAlias); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
}

recursionDir('./packages', '', '@fzui', '@fzui/es');

console.log('entry', entry);

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
    target: 'es2015',
    outDir: path.resolve(__dirname, '../es'),
    rollupOptions: {
      input: entry,
      context: 'globalThis',
      preserveEntrySignatures: 'strict',
      external: ['vue'],
      output: {
        format: 'esm',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        exports: 'auto',
        sourcemap: false,
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        namespaceToStringTag: true,
        inlineDynamicImports: false,
        manualChunks: undefined,
      },
    },
  },
});
