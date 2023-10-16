import { resolve } from 'path'
import type { UserConfigExport } from 'vite'
import { MarkdownTransform } from './.vitepress/plugin/markdown-transform'

export default (): UserConfigExport => {
  return {
    optimizeDeps: {
      exclude: ['vitepress']
    },
    server: {
      port: 9999,
      fs: {
        /**
         * 可以为项目根目录的上一级提供服务
         *
         * @see allow https://cn.vitejs.dev/config/server-options.html#server-fs-allow
         */
        allow: [resolve(__dirname, '..', '..')]
      }
    },
    resolve: {
      alias: {
        'fz-design': resolve(__dirname, '../packages/fz-design/index.ts'),
        '@fz-design/fz-design-icon': resolve(
          __dirname,
          '../packages/fz-design-icon/index.ts'
        )
      }
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule): void => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    },
    plugins: [
      MarkdownTransform()
    ]
  }
}
