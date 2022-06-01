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
    markdown({
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        md.use(require('markdown-it-anchor'), {
          permalinkClass: 'anchor',
          permalinkSpace: true,
          permalinkSymbol: '¶',
        });
        // md.use(require('markdown-it-prism'))
        // custom class for table
        md.renderer.rules['table_open'] = () => {
          return '<div class="doc-table"><table>';
        };
        md.renderer.rules['table_close'] = () => {
          return '</table></div>';
        };
      },
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body',
    }),
  ],
});
