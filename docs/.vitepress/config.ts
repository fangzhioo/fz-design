import { defineConfig } from 'vitepress'
import { nav } from './config/nav'
import { sidebar } from './config/sidebar'
import { head } from './config/head'
import { PluginTable, PluginDemo } from './plugin'
import { fileURLToPath, URL } from 'node:url'

/**
 * vitepress 配置项文件
 *
 * @see Introduction https://vitepress.vuejs.org/config/introduction
 */
export default defineConfig({
  base: '/fz-design/',
  title: 'Fz Design',
  description: 'Fz Design 可在 vue3 应用程序中快速构建交互界面，旨在简单高效，单一依赖。',
  head,
  /**
   * vue 相关配置
   *
   * @see vue https://vitepress.dev/reference/site-config#vue
   * @see option https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options
   */
  vue: {
    script: {
      defineModel: true
    }
  },

  /**
   * 覆盖默认主题组件
   * @see vue  https://vitepress.dev/guide/extending-default-theme
   */
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/vp-theme-apperence.vue', import.meta.url)
          )
        }
      ]
    }
  },
  /**
   * 是否显示最后更新时间
   *
   * @see last-updated https://vitepress.vuejs.org/guide/theme-last-updated#last-updated
   */
  lastUpdated: true,
  /**
   * 缓存目录
   *
   * @see cacheDir https://vitepress.dev/reference/site-config#cachedir
   */
  cacheDir: '../../node_modules',
  /**
   * 主题配置
   *
   * @see theme-config https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    /**
     * 显示标题级别
     * 
     * https://vitepress.dev/reference/default-theme-config#outline
     */
    outline: {
      level: [2, 3],
      label: 'Contents'
    },
    /**
     * 搜索配置
     * 
     * https://vitepress.dev/reference/default-theme-search
     */
    search: {
      provider: 'local'
    },
    /**
     * 最后更新时间的文案显示
     * https://vitepress.dev/reference/default-theme-config#lastupdated
     */
    lastUpdated: {
      text: '最后更新时间'
    },
    nav,
    sidebar,
    /**
     * 配置导航栏图表
     *
     * @see socialLinks https://vitepress.dev/reference/default-theme-config#sociallinks
     */
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/fangzhioo/fz-design'
      }
    ],
    /**
     * 配置 logo
     *
     * @see logo https://vitepress.dev/reference/default-theme-config#logo
     */
    logo: 'https://raw.githubusercontent.com/fangzhioo/fz-design/master/logo/fz-design.svg'
  },
  /**
   * 自定义 markdown 解析器
   *
   * @see markdown https://vitepress.dev/reference/site-config#markdown
   */
  markdown: {
    /**
     * 配置 Markdown-it 实例
     *
     * @param { Object } md markdown 实例
     */
    config: (md): void => {
      md.use(PluginTable)
      md.use(PluginDemo)
    },
  }
})
