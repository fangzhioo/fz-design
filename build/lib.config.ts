import baseConfig from './base.config';
import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';
import css from 'rollup-plugin-css-only';
import vuePlugin from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import { resolve } from 'path';

export default defineConfig({
  ...baseConfig,
  plugins: [
    css(),
    vuePlugin({
      target: 'browser',
    }),
    // dts(),
    esbuild({
      sourceMap: true,
      target: 'es2018',
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
      // input: inputs.reduce((backObj, curName) => {
      //   const pkgName = curName.split('@gt-ui/')[1]
      //   backObj[pkgName] = path.resolve(__dirname, `../packages/${pkgName}/index.ts`)
      //   return backObj
      // }, {}),
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
