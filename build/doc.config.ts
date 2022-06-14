import baseConfig from './base.config';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import markdown from 'vite-plugin-md';
import MarkdownItAnchor from 'markdown-it-anchor';

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
        // custom class for element or node
        // https://github.com/markdown-it/markdown-it/tree/master/lib/rules_inline
        // https://github.com/markdown-it/markdown-it/tree/master/lib/rules_block
        // table
        md.renderer.rules['table_open'] = () => {
          return '<div class="doc-table"><table>';
        };
        md.renderer.rules['table_close'] = () => {
          return '</table></div>';
        };
        // strong
        md.renderer.rules['strong_open'] = function () {
          return '<strong class="bold">';
        };
        // a
        // md.renderer.rules['link_open'] = function () {
        //   return '<a class="link">';
        // };
        // h
        // md.renderer.rules['heading_open'] = function (tokens, i) {
        //   const { tag, level } = tokens[i];
        //   if (tag === 'h') {
        //     return `<h${level} class="heading-${level}"">`;
        //   }
        // };
        // p
        // md.renderer.rules['paragraph_open'] = function () {
        //   return `<p class="paragraph">`;
        // };
        md.use(MarkdownItAnchor, {
          level: [1, 2, 3, 4, 5, 6],
          permalink: true,
          permalinkClass: 'anchor',
          permalinkSpace: true,
          permalinkSymbol: '¶',
          permalinkBefore: true,
        });
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        md.use(require('markdown-it-prism'));
      },
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body',
    }),
  ],
});
